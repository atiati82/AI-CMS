import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import {
    Send, Loader2, Plus, Trash2, Bot, User, Copy, Check,
    MessageSquare, History, Brain, Sparkles
} from 'lucide-react';

// Custom message type
interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    createdAt?: Date;
}

// Custom useChat hook implementation
function useChat({ api, body, onFinish, onError }: {
    api: string;
    body?: any;
    onFinish?: (message: Message) => void;
    onError?: (error: Error) => void;
}) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            createdAt: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(api, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content })),
                    ...body,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to get response from BigMind');
            }

            const data = await response.json();
            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: data.response || data.message || 'No response',
                createdAt: new Date(),
            };

            setMessages(prev => [...prev, assistantMessage]);
            if (onFinish) onFinish(assistantMessage);
        } catch (err) {
            const error = err as Error;
            setError(error);
            if (onError) onError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { messages, input, handleInputChange, handleSubmit, isLoading, error };
}

// Modern AI chat component using Vercel AI SDK patterns
export interface BigMindChatModernProps {
    mode?: 'cms' | 'library';
    persistSessions?: boolean;
    className?: string;
}

interface ChatSession {
    id: string;
    title: string;
    createdAt: string;
    updatedAt: string;
}

const AI_MODELS = [
    { id: 'gpt-4.1-mini', name: 'GPT-4.1 Mini', provider: 'openai' },
    { id: 'gpt-4.1', name: 'GPT-4.1', provider: 'openai' },
    { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', provider: 'gemini' },
    { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro', provider: 'gemini' },
] as const;

export function BigMindChatModern({
    mode = 'cms',
    persistSessions = true,
    className,
}: BigMindChatModernProps) {
    const [selectedModel, setSelectedModel] = useState<string>('gpt-4.1-mini');
    const [sessions, setSessions] = useState<ChatSession[]>([]);
    const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
        api: '/api/admin/bigmind/chat',
        body: {
            model: selectedModel,
            sessionId: currentSessionId,
        },
        onFinish: (message: Message) => {
            console.log('[BigMind] Message finished:', message);
        },
        onError: (error: Error) => {
            console.error('[BigMind] Chat error:', error);
        },
    });

    // Auto-scroll to bottom on new messages
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const copyToClipboard = async (text: string, index: number) => {
        await navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    const createNewSession = async () => {
        try {
            const res = await fetch('/api/admin/bigmind/sessions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: 'New Conversation' }),
            });
            const session = await res.json();
            setSessions([session, ...sessions]);
            setCurrentSessionId(session.id);
        } catch (error) {
            console.error('Failed to create session:', error);
        }
    };

    return (
        <div className={cn("flex flex-col h-full bg-background", className)}>
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/30">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <Brain className="w-4 h-4 text-primary" />
                        <h2 className="font-semibold text-sm">BigMind AI</h2>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Select value={selectedModel} onValueChange={setSelectedModel}>
                        <SelectTrigger className="w-[140px] h-8 text-xs">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {AI_MODELS.map((model) => (
                                <SelectItem key={model.id} value={model.id} className="text-xs">
                                    {model.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {persistSessions && (
                        <Button variant="outline" size="sm" onClick={createNewSession} className="h-8 text-xs px-2">
                            <Plus className="w-3 h-3 mr-1" />
                            New Chat
                        </Button>
                    )}
                </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
                <div className="max-w-4xl mx-auto space-y-6">
                    {messages.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                            <Bot className="w-16 h-16 text-muted-foreground mb-4 opacity-50" />
                            <h3 className="text-xl font-semibold mb-2">Welcome to BigMind</h3>
                            <p className="text-muted-foreground max-w-md">
                                I'm your AI CMS Manager. I can create pages, search knowledge, manage content, and help you build your site.
                                Ask me anything!
                            </p>
                        </div>
                    )}

                    {messages.map((message, index) => (
                        <div
                            key={message.id}
                            className={cn(
                                "flex gap-4 group",
                                message.role === 'user' ? 'justify-end' : 'justify-start'
                            )}
                        >
                            {message.role === 'assistant' && (
                                <div className="flex-shrink-0 mt-1">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Bot className="w-5 h-5 text-primary" />
                                    </div>
                                </div>
                            )}

                            <div
                                className={cn(
                                    "flex-1 max-w-[80%] rounded-lg px-4 py-3 relative",
                                    message.role === 'user'
                                        ? 'bg-primary text-primary-foreground ml-auto'
                                        : 'bg-muted'
                                )}
                            >
                                {/* Copy button */}
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className={cn(
                                        "absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0",
                                        message.role === 'user' && 'text-primary-foreground hover:text-primary-foreground'
                                    )}
                                    onClick={() => copyToClipboard(message.content, index)}
                                >
                                    {copiedIndex === index ? (
                                        <Check className="w-3 h-3" />
                                    ) : (
                                        <Copy className="w-3 h-3" />
                                    )}
                                </Button>

                                {/* Message content with markdown */}
                                <div className="prose prose-sm dark:prose-invert max-w-none">
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        components={{
                                            code({ node, className, children, ...props }) {
                                                const match = /language-(\w+)/.exec(className || '');
                                                const isInline = !match && !String(children).includes('\n');
                                                return !isInline && match ? (
                                                    <SyntaxHighlighter
                                                        style={vscDarkPlus}
                                                        language={match[1]}
                                                        PreTag="div"
                                                        className="rounded-md my-4"
                                                    >
                                                        {String(children).replace(/\n$/, '')}
                                                    </SyntaxHighlighter>
                                                ) : (
                                                    <code
                                                        className={cn(
                                                            "px-1.5 py-0.5 rounded bg-muted font-mono text-sm",
                                                            message.role === 'user' && 'bg-primary-foreground/20'
                                                        )}
                                                        {...props}
                                                    >
                                                        {children}
                                                    </code>
                                                );
                                            },
                                            p({ children }) {
                                                return <p className="mb-2 last:mb-0">{children}</p>;
                                            },
                                            ul({ children }) {
                                                return <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>;
                                            },
                                            ol({ children }) {
                                                return <ol className="list-decimal pl-4 mb-2 space-y-1">{children}</ol>;
                                            },
                                            blockquote({ children }) {
                                                return (
                                                    <blockquote className="border-l-4 border-primary/50 pl-4 italic my-4">
                                                        {children}
                                                    </blockquote>
                                                );
                                            },
                                        }}
                                    >
                                        {message.content}
                                    </ReactMarkdown>
                                </div>

                                {/* Timestamp */}
                                <div
                                    className={cn(
                                        "text-xs mt-2 opacity-60",
                                        message.role === 'user' ? 'text-right' : 'text-left'
                                    )}
                                >
                                    {new Date(message.createdAt || Date.now()).toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </div>
                            </div>

                            {message.role === 'user' && (
                                <div className="flex-shrink-0 mt-1">
                                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                                        <User className="w-5 h-5 text-primary-foreground" />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Loading indicator */}
                    {isLoading && (
                        <div className="flex gap-4 justify-start">
                            <div className="flex-shrink-0 mt-1">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Bot className="w-5 h-5 text-primary" />
                                </div>
                            </div>
                            <div className="bg-muted rounded-lg px-4 py-3">
                                <div className="flex items-center gap-2">
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span className="text-sm text-muted-foreground">Thinking...</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Error message */}
                    {error && (
                        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 text-sm text-destructive">
                            <strong>Error:</strong> {error.message}
                        </div>
                    )}
                </div>
            </ScrollArea>

            {/* Input area */}
            <div className="border-t p-4 bg-background">
                <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
                    <div className="flex gap-2">
                        <Textarea
                            value={input}
                            onChange={handleInputChange}
                            placeholder="Tell BigMind what to create, edit, or manage..."
                            className="min-h-[60px] max-h-[200px] resize-none"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSubmit(e as any);
                                }
                            }}
                            disabled={isLoading}
                        />
                        <Button
                            type="submit"
                            size="icon"
                            disabled={isLoading || !input.trim()}
                            className="h-[60px] w-[60px]"
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <Send className="w-5 h-5" />
                            )}
                        </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                        Press <kbd className="px-1.5 py-0.5 rounded bg-muted">Enter</kbd> to send,{' '}
                        <kbd className="px-1.5 py-0.5 rounded bg-muted">Shift + Enter</kbd> for new line
                    </p>
                </form>
            </div>
        </div>
    );
}
