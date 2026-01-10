import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useAIChat, AI_MODELS, ChatMessage, AIModel, ParsedBigMindResponse } from '@/hooks/use-ai-chat';
import { PageContentPreview } from './page-content-preview';
import {
  Send, Loader2, Plus, Trash2, Sparkles, Paperclip, X, FileText, ChevronDown, ChevronUp,
  Eye, Zap, Film, LayoutGrid, Image, Box, MousePointer, Layers, CheckCircle2,
  MessageSquare, History, Bot, Brain, Settings2
} from 'lucide-react';

const MOTION_ARCHETYPES = [
  { key: 'liquid-crystal-float', name: 'Liquid Crystal Float', description: 'Gentle floating with crystalline shimmer' },
  { key: 'energetic-pulse', name: 'Energetic Pulse', description: 'Rhythmic pulsing energy waves' },
  { key: 'magnetic-drift', name: 'Magnetic Drift', description: 'Smooth magnetic attraction movement' },
  { key: 'krystal-bloom', name: 'Krystal Bloom', description: 'Organic crystal growth animation' },
  { key: 'scalar-slide', name: 'Scalar Slide', description: 'Smooth scaling transitions' },
  { key: 'vortex-reveal', name: 'Vortex Reveal', description: 'Spiral reveal animation' },
  { key: 'parallax-depth', name: 'Parallax Depth', description: 'Multi-layer depth scrolling' },
  { key: 'ripple-emergence', name: 'Ripple Emergence', description: 'Water ripple reveal effect' },
  { key: 'subtle-shimmer', name: 'Subtle Shimmer', description: 'Gentle light shimmer' },
  { key: 'layered-parallax', name: 'Layered Parallax Scroll', description: 'Immersive multi-speed parallax' },
];

const MOTION_ELEMENTS = [
  { key: 'hero', label: 'Hero Section', icon: LayoutGrid },
  { key: 'content', label: 'Content Sections', icon: FileText },
  { key: 'cards', label: 'Cards/Boxes', icon: Box },
  { key: 'buttons', label: 'Buttons/CTAs', icon: MousePointer },
  { key: 'background', label: 'Background', icon: Layers },
  { key: 'images', label: 'Images', icon: Image },
];

const SUGGESTED_PROMPTS = [
  { label: 'Create page', prompt: 'Create a new page about structured water benefits' },
  { label: 'Add section', prompt: 'Add a new section explaining ionic minerals' },
  { label: 'Enhance SEO', prompt: 'Improve the SEO for the current page' },
  { label: 'Add visuals', prompt: 'Suggest images and visual enhancements' },
  { label: 'Review content', prompt: 'Review and improve the content quality' },
];

export interface AIChatPanelProps {
  mode?: 'cms' | 'library' | 'page-builder';
  persistSessions?: boolean;
  showModelSelector?: boolean;
  showSessionList?: boolean;
  showPreviewPanel?: boolean;
  showMotionLinks?: boolean;
  suggestedPrompts?: Array<{ label: string; prompt: string }>;
  onContentGenerated?: (content: string, parsed: ParsedBigMindResponse | null) => void;
  className?: string;
  compact?: boolean;
}

export function AIChatPanel({
  mode = 'cms',
  persistSessions = true,
  showModelSelector = true,
  showSessionList = true,
  showPreviewPanel = true,
  showMotionLinks = true,
  suggestedPrompts = SUGGESTED_PROMPTS,
  onContentGenerated,
  className,
  compact = false,
}: AIChatPanelProps) {
  const chat = useAIChat({ mode, persistSessions, onContentGenerated });
  const [previewExpanded, setPreviewExpanded] = useState(true);
  const [sessionListOpen, setSessionListOpen] = useState(false);
  const [motionLinks, setMotionLinks] = useState<Record<string, string>>({});

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      chat.sendMessage();
    }
  };

  const applyAutoMotionLinks = () => {
    setMotionLinks({
      hero: 'liquid-crystal-float',
      content: 'subtle-shimmer',
      cards: 'krystal-bloom',
      buttons: 'energetic-pulse',
      background: 'parallax-depth',
      images: 'ripple-emergence',
    });
  };

  const clearMotionLinks = () => {
    setMotionLinks({});
  };

  return (
    <div className={cn("flex flex-col h-full", className)} data-testid="ai-chat-panel">
      <div className="flex items-center justify-between p-3 border-b bg-muted/30">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            <span className="font-semibold">AI Assistant</span>
          </div>
          {showModelSelector && (
            <Select value={chat.selectedModel} onValueChange={(v) => chat.setSelectedModel(v as AIModel)}>
              <SelectTrigger className="w-[160px] h-8 text-xs" data-testid="select-ai-model">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {AI_MODELS.map(model => (
                  <SelectItem key={model.value} value={model.value} className="text-xs">
                    {model.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <Badge variant="outline" className="text-xs">
            {mode === 'cms' ? 'CMS Mode' : mode === 'library' ? 'Library Mode' : 'Page Builder'}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          {showSessionList && persistSessions && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8"
              onClick={() => setSessionListOpen(!sessionListOpen)}
              data-testid="button-toggle-sessions"
            >
              <History className="w-4 h-4 mr-1" />
              History
            </Button>
          )}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-8"
            onClick={() => chat.createNewSession()}
            data-testid="button-new-chat"
          >
            <Plus className="w-4 h-4 mr-1" />
            New Chat
          </Button>
        </div>
      </div>

      {sessionListOpen && chat.chatSessions && chat.chatSessions.length > 0 && (
        <div className="border-b p-2 bg-muted/20 max-h-40 overflow-y-auto">
          <div className="space-y-1">
            {chat.chatSessions.map(session => (
              <div
                key={session.id}
                className={cn(
                  "flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors",
                  session.id === chat.currentSessionId
                    ? "bg-primary/20 border border-primary/30"
                    : "hover:bg-muted/50"
                )}
                onClick={() => {
                  chat.switchToSession(session.id);
                  setSessionListOpen(false);
                }}
                data-testid={`session-${session.id}`}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{session.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {session.messageCount} messages
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    chat.deleteSession(session.id);
                  }}
                  data-testid={`button-delete-session-${session.id}`}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      <ScrollArea className={cn("flex-1", compact ? "max-h-[300px]" : "max-h-[500px]")}>
        <div className="p-4 space-y-4" data-testid="chat-messages">
          {chat.messages.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-sm">Start a conversation with AI</p>
              <p className="text-xs mt-1">Ask questions, create pages, or get content suggestions</p>
            </div>
          ) : (
            chat.messages.map((msg, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex gap-3",
                  msg.role === 'user' ? "justify-end" : "justify-start"
                )}
                data-testid={`message-${idx}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <Brain className="w-4 h-4 text-primary" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg p-3",
                    msg.role === 'user'
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  <div className="text-sm whitespace-pre-wrap break-words">
                    {msg.content || (chat.isLoading && idx === chat.messages.length - 1 ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Generating...
                      </span>
                    ) : null)}
                  </div>
                  {msg.functionCalls && msg.functionCalls.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-white/10">
                      <p className="text-xs text-muted-foreground mb-1">Actions performed:</p>
                      <div className="flex flex-wrap gap-1">
                        {msg.functionCalls.map((fc, fcIdx) => (
                          <Badge key={fcIdx} variant="secondary" className="text-xs">
                            {fc.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))
          )}
          <div ref={chat.messagesEndRef} />
        </div>
      </ScrollArea>

      {suggestedPrompts.length > 0 && chat.messages.length === 0 && (
        <div className="px-4 pb-2">
          <p className="text-xs text-muted-foreground mb-2">Suggested Prompts</p>
          <div className="flex flex-wrap gap-2">
            {suggestedPrompts.map((sp, idx) => (
              <Button
                key={idx}
                type="button"
                variant="outline"
                size="sm"
                className="text-xs h-7"
                onClick={() => {
                  chat.setInputValue(sp.prompt);
                }}
                data-testid={`prompt-${idx}`}
              >
                {sp.label}
              </Button>
            ))}
          </div>
        </div>
      )}

      {chat.attachedFile && (
        <div className="px-4 pb-2">
          <div className="flex items-center gap-2 p-2 bg-muted rounded-lg">
            <FileText className="w-4 h-4 text-primary" />
            <span className="text-sm flex-1 truncate">{chat.attachedFile.name}</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => chat.setAttachedFile(null)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      <div className="p-4 border-t bg-background">
        <div className="flex gap-2">
          <input
            ref={chat.fileInputRef}
            type="file"
            accept=".pdf,.txt,.md,.html"
            className="hidden"
            onChange={chat.handleFileUpload}
            data-testid="input-file-upload"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-10 w-10 shrink-0"
            onClick={() => chat.fileInputRef.current?.click()}
            disabled={chat.isUploading}
            data-testid="button-attach-file"
          >
            {chat.isUploading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Paperclip className="w-5 h-5" />
            )}
          </Button>
          <Textarea
            value={chat.inputValue}
            onChange={(e) => chat.setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask AI to help with your content..."
            className="min-h-[80px] resize-none"
            data-testid="textarea-chat-input"
          />
          <Button
            type="button"
            size="icon"
            className="h-10 w-10 shrink-0"
            onClick={() => chat.sendMessage()}
            disabled={(!chat.inputValue.trim() && !chat.attachedFile) || chat.isLoading}
            data-testid="button-send-chat"
          >
            {chat.isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {showPreviewPanel && chat.parsedOutput?.html && (
        <div className="border-t" data-testid="preview-panel">
          <div className="flex items-center justify-between p-3 bg-muted/30">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-primary" />
              <span className="font-medium text-sm">Preview</span>
              {chat.parsedOutput.pageMetadata?.title && (
                <span className="text-sm text-muted-foreground">
                  — {chat.parsedOutput.pageMetadata.title}
                </span>
              )}
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-7"
              onClick={() => setPreviewExpanded(!previewExpanded)}
              data-testid="button-toggle-preview"
            >
              {previewExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </Button>
          </div>

          {previewExpanded && (
            <div className="p-4 space-y-4">
              <div className="rounded-lg border overflow-hidden" style={{ maxHeight: '300px' }}>
                <PageContentPreview
                  content={chat.parsedOutput.html}
                  title={chat.parsedOutput.pageMetadata?.title}
                  path={chat.parsedOutput.pageMetadata?.path}
                  cluster={chat.parsedOutput.pageMetadata?.cluster}
                  showActions={false}
                  defaultExpanded={true}
                  maxHeight="300px"
                />
              </div>

              {showMotionLinks && (
                <div className="space-y-3 p-4 bg-muted/30 rounded-lg border">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium flex items-center gap-2">
                      <Film className="w-4 h-4 text-primary" />
                      Motion Layout Links
                    </h4>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className="h-7 text-xs"
                        onClick={applyAutoMotionLinks}
                        data-testid="button-auto-link-motion"
                      >
                        <Zap className="w-3 h-3 mr-1" />
                        Auto-link
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        className="h-7 text-xs"
                        onClick={clearMotionLinks}
                        data-testid="button-clear-motion"
                      >
                        Clear All
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {MOTION_ELEMENTS.map((element) => {
                      const ElementIcon = element.icon;
                      const linkedMotion = motionLinks[element.key];
                      const motionInfo = MOTION_ARCHETYPES.find(m => m.key === linkedMotion);

                      return (
                        <div
                          key={element.key}
                          className={cn(
                            "p-2 rounded-lg border transition-all",
                            linkedMotion
                              ? "bg-primary/10 border-primary/30"
                              : "bg-background hover:bg-muted/50"
                          )}
                          data-testid={`motion-slot-${element.key}`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <ElementIcon className="w-4 h-4 text-muted-foreground" />
                            <span className="text-xs font-medium">{element.label}</span>
                          </div>
                          <Select
                            value={linkedMotion || "none"}
                            onValueChange={(value) => {
                              if (value === "none") {
                                setMotionLinks(prev => {
                                  const next = { ...prev };
                                  delete next[element.key];
                                  return next;
                                });
                              } else {
                                setMotionLinks(prev => ({
                                  ...prev,
                                  [element.key]: value,
                                }));
                              }
                            }}
                          >
                            <SelectTrigger className="h-7 text-xs">
                              <SelectValue placeholder="Select motion" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none" className="text-xs">None</SelectItem>
                              {MOTION_ARCHETYPES.map(m => (
                                <SelectItem key={m.key} value={m.key} className="text-xs">
                                  {m.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {motionInfo && (
                            <p className="text-[10px] text-muted-foreground mt-1 truncate">
                              {motionInfo.description}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
