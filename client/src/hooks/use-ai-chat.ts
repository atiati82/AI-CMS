import { useState, useRef, useEffect, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useToast } from './use-toast';

export type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
  functionCalls?: Array<{ name: string; result: any }>;
};

export type AIModel = 'gpt-4.1-mini' | 'gpt-4.1' | 'gemini-2.5-flash' | 'gemini-2.5-pro';

export const AI_MODELS: { value: AIModel; label: string }[] = [
  { value: 'gpt-4.1-mini', label: 'GPT-4.1 Mini (Fast)' },
  { value: 'gpt-4.1', label: 'GPT-4.1 (Advanced)' },
  { value: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash' },
  { value: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro' },
];

export type ParsedEnhancement = {
  id: string;
  type: 'seo' | 'visual' | 'content' | 'motion';
  title: string;
  summary: string;
  field?: string;
  value?: any;
};

export type ParsedBigMindResponse = {
  pageMetadata?: {
    title?: string;
    path?: string;
    template?: string;
    cluster?: string;
    seoTitle?: string;
    seoDescription?: string;
  };
  visualConfig?: {
    vibeKeywords?: string[];
    emotionalTone?: string[];
    motionPreset?: string;
    layout?: string;
    colorScheme?: string;
  };
  html?: string;
  imagePrompts?: string[];
  enhancements?: ParsedEnhancement[];
};

export type ChatSession = {
  id: string;
  title: string;
  mode: string;
  messageCount: number;
  createdAt: string;
  updatedAt: string;
};

async function apiRequest(method: string, url: string, body?: any) {
  const options: RequestInit = {
    method,
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  if (body) {
    options.body = JSON.stringify(body);
  }
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  return res;
}

export interface UseAIChatOptions {
  mode?: 'cms' | 'library' | 'page-builder';
  persistSessions?: boolean;
  onContentGenerated?: (content: string, parsed: ParsedBigMindResponse | null) => void;
}

export function useAIChat(options: UseAIChatOptions = {}) {
  const { mode = 'cms', persistSessions = true, onContentGenerated } = options;
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<AIModel>('gpt-4.1-mini');
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [attachedFile, setAttachedFile] = useState<{ name: string; content: string } | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [parsedOutput, setParsedOutput] = useState<ParsedBigMindResponse | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const { data: chatSessions, refetch: refetchChatSessions } = useQuery<ChatSession[]>({
    queryKey: ['/api/admin/bigmind/sessions'],
    queryFn: async () => {
      const res = await apiRequest('GET', '/api/admin/bigmind/sessions');
      return res.json();
    },
    enabled: persistSessions,
  });

  useEffect(() => {
    if (persistSessions && chatSessions && chatSessions.length > 0 && !currentSessionId) {
      const mostRecent = chatSessions[0];
      if (mostRecent.messageCount > 0) {
        setCurrentSessionId(mostRecent.id);
      }
    }
  }, [chatSessions, currentSessionId, persistSessions]);

  useEffect(() => {
    if (currentSessionId && persistSessions) {
      loadSessionMessages(currentSessionId);
    }
  }, [currentSessionId, persistSessions]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const loadSessionMessages = async (sessionId: string) => {
    try {
      const res = await apiRequest('GET', `/api/admin/bigmind/sessions/${sessionId}/messages`);
      const dbMessages = await res.json();
      const chatMessages: ChatMessage[] = dbMessages.map((m: any) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
        functionCalls: m.functionCalls,
      }));
      setMessages(chatMessages);
    } catch (error) {
      console.error('Failed to load session messages:', error);
    }
  };

  const saveMessageToDb = async (role: string, content: string, functionCalls?: any) => {
    if (!currentSessionId || !persistSessions) return;
    try {
      await apiRequest('POST', `/api/admin/bigmind/sessions/${currentSessionId}/messages`, {
        role,
        content,
        functionCalls,
      });
      refetchChatSessions();
    } catch (error) {
      console.error('Failed to save message:', error);
    }
  };

  const createNewSession = async () => {
    try {
      const res = await apiRequest('POST', '/api/admin/bigmind/sessions', {
        title: 'New Chat',
        mode,
      });
      const session = await res.json();
      setCurrentSessionId(session.id);
      setMessages([]);
      setParsedOutput(null);
      refetchChatSessions();
      toast({ title: 'New Chat', description: 'Started a new conversation' });
      return session.id;
    } catch (error) {
      console.error('Failed to create session:', error);
      return null;
    }
  };

  const switchToSession = (sessionId: string) => {
    setCurrentSessionId(sessionId);
    setParsedOutput(null);
  };

  const deleteSession = async (sessionId: string) => {
    try {
      await apiRequest('DELETE', `/api/admin/bigmind/sessions/${sessionId}`);
      if (currentSessionId === sessionId) {
        setCurrentSessionId(null);
        setMessages([]);
        setParsedOutput(null);
      }
      refetchChatSessions();
      toast({ title: 'Deleted', description: 'Chat session removed' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete session', variant: 'destructive' });
    }
  };

  const updateSessionTitle = async (sessionId: string, firstMessage: string) => {
    const title = firstMessage.substring(0, 50) + (firstMessage.length > 50 ? '...' : '');
    try {
      await apiRequest('PUT', `/api/admin/bigmind/sessions/${sessionId}`, { title });
      refetchChatSessions();
    } catch (error) {
      console.error('Failed to update session title:', error);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      if (file.type === 'application/pdf') {
        const formData = new FormData();
        formData.append('file', file);
        const res = await fetch('/api/admin/parse-pdf', {
          method: 'POST',
          body: formData,
          credentials: 'include',
        });
        if (res.ok) {
          const { text } = await res.json();
          setAttachedFile({ name: file.name, content: text });
          toast({ title: 'PDF Loaded', description: `Extracted ${text.length} characters` });
        }
      } else {
        const text = await file.text();
        setAttachedFile({ name: file.name, content: text });
        toast({ title: 'File Loaded', description: file.name });
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to read file', variant: 'destructive' });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const sendMessage = async (customInput?: string) => {
    const userInput = customInput ?? inputValue.trim();
    if (!userInput && !attachedFile) return;

    let sessionId = currentSessionId;
    if (persistSessions && !sessionId) {
      sessionId = await createNewSession();
      if (!sessionId) return;
    }

    const fullMessage = attachedFile
      ? `${userInput}\n\n[Attached: ${attachedFile.name}]\n${attachedFile.content.substring(0, 50000)}`
      : userInput;

    const userMessage: ChatMessage = { role: 'user', content: fullMessage };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue('');
    setAttachedFile(null);
    setIsLoading(true);

    if (persistSessions && sessionId) {
      await saveMessageToDb('user', fullMessage);
      if (messages.length === 0) {
        await updateSessionTitle(sessionId, userInput);
      }
    }

    try {
      abortControllerRef.current = new AbortController();
      
      const endpoint = mode === 'cms' 
        ? '/api/admin/bigmind/chat' 
        : '/api/admin/andara-chat/stream';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
          model: selectedModel,
        }),
        signal: abortControllerRef.current.signal,
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantContent = '';

      const assistantMessage: ChatMessage = { role: 'assistant', content: '' };
      setMessages([...newMessages, assistantMessage]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') continue;

              try {
                const parsed = JSON.parse(data);
                if (parsed.text) {
                  assistantContent += parsed.text;
                  setMessages(prev => {
                    const updated = [...prev];
                    updated[updated.length - 1] = { ...updated[updated.length - 1], content: assistantContent };
                    return updated;
                  });
                }
                if (parsed.functionCalls) {
                  setMessages(prev => {
                    const updated = [...prev];
                    updated[updated.length - 1] = { 
                      ...updated[updated.length - 1], 
                      functionCalls: parsed.functionCalls 
                    };
                    return updated;
                  });
                }
              } catch (e) {
                assistantContent += data;
                setMessages(prev => {
                  const updated = [...prev];
                  updated[updated.length - 1] = { ...updated[updated.length - 1], content: assistantContent };
                  return updated;
                });
              }
            }
          }
        }
      }

      if (persistSessions && sessionId) {
        await saveMessageToDb('assistant', assistantContent);
      }

      const parsed = parseAIResponse(assistantContent);
      setParsedOutput(parsed);
      
      if (parsed?.html && onContentGenerated) {
        onContentGenerated(parsed.html, parsed);
      }

      queryClient.invalidateQueries({ queryKey: ['/api/pages'] });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/pages'] });

    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.log('Request aborted');
      } else {
        console.error('Chat error:', error);
        toast({ title: 'Error', description: 'Failed to send message', variant: 'destructive' });
        setMessages(newMessages);
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const stopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setParsedOutput(null);
    setCurrentSessionId(null);
  };

  return {
    messages,
    setMessages,
    inputValue,
    setInputValue,
    isLoading,
    selectedModel,
    setSelectedModel,
    currentSessionId,
    chatSessions,
    attachedFile,
    setAttachedFile,
    isUploading,
    parsedOutput,
    setParsedOutput,
    messagesEndRef,
    fileInputRef,
    sendMessage,
    stopGeneration,
    clearChat,
    createNewSession,
    switchToSession,
    deleteSession,
    handleFileUpload,
    refetchChatSessions,
  };
}

function parseAIResponse(content: string): ParsedBigMindResponse | null {
  const result: ParsedBigMindResponse = {};

  const metadataMatch = content.match(/```page-metadata\n([\s\S]*?)```/);
  if (metadataMatch) {
    try {
      result.pageMetadata = JSON.parse(metadataMatch[1]);
    } catch (e) {
      console.error('Failed to parse page-metadata:', e);
    }
  }

  const visualConfigMatch = content.match(/```visual-config\n([\s\S]*?)```/);
  if (visualConfigMatch) {
    try {
      result.visualConfig = JSON.parse(visualConfigMatch[1]);
    } catch (e) {
      console.error('Failed to parse visual-config:', e);
    }
  }

  const htmlMatch = content.match(/```(?:html|andara-html)\n([\s\S]*?)```/);
  if (htmlMatch) {
    result.html = htmlMatch[1].trim();
  }

  const imagePromptsMatch = content.match(/```image-prompts\n([\s\S]*?)```/);
  if (imagePromptsMatch) {
    try {
      result.imagePrompts = JSON.parse(imagePromptsMatch[1]);
    } catch (e) {
      const lines = imagePromptsMatch[1].trim().split('\n').filter(l => l.trim());
      result.imagePrompts = lines;
    }
  }

  const enhancementsMatch = content.match(/```enhancements\n([\s\S]*?)```/);
  if (enhancementsMatch) {
    try {
      result.enhancements = JSON.parse(enhancementsMatch[1]);
    } catch (e) {
      console.error('Failed to parse enhancements:', e);
    }
  }

  return Object.keys(result).length > 0 ? result : null;
}
