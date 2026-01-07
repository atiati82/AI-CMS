
import React, { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    Brain,
    Send,
    Loader2,
    Plus,
    MessageSquare,
    Trash,
    Bot,
    User,
    Sparkles,
    RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { apiRequest } from "@/lib/queryClient";

interface BigMindSession {
    id: string;
    title: string;
    messageCount: number;
    lastMessageAt: string;
    mode: 'cms' | 'library';
}

interface BigMindMessage {
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    createdAt: string;
}

export default function BigMindTab() {
    const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
    const [inputMessage, setInputMessage] = useState("");
    const [isThinking, setIsThinking] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const queryClient = useQueryClient();
    const { toast } = useToast();

    // Fetch Sessions
    const { data: sessions = [], isLoading: isLoadingSessions } = useQuery<BigMindSession[]>({
        queryKey: ["/api/admin/bigmind/sessions"],
    });

    // Fetch Messages for Active Session
    const { data: messages = [], isLoading: isLoadingMessages } = useQuery<BigMindMessage[]>({
        queryKey: ["/api/admin/bigmind/sessions", activeSessionId, "messages"],
        enabled: !!activeSessionId,
    });

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isThinking]);

    // Select first session if none selected
    useEffect(() => {
        if (sessions.length > 0 && !activeSessionId) {
            setActiveSessionId(sessions[0].id);
        }
    }, [sessions, activeSessionId]);

    // Create Session Mutation
    const createSessionMutation = useMutation({
        mutationFn: async () => {
            const res = await apiRequest("POST", "/api/admin/bigmind/sessions", { title: "New BigMind Chat" });
            return res.json();
        },
        onSuccess: (newSession) => {
            queryClient.invalidateQueries({ queryKey: ["/api/admin/bigmind/sessions"] });
            setActiveSessionId(newSession.id);
        }
    });

    // Delete Session Mutation
    const deleteSessionMutation = useMutation({
        mutationFn: async (id: string) => {
            await apiRequest("DELETE", `/api/admin/bigmind/sessions/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/api/admin/bigmind/sessions"] });
            if (activeSessionId) setActiveSessionId(null);
        }
    });

    // Send Message Handler
    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputMessage.trim() || !activeSessionId) return;

        const currentMsg = inputMessage;
        setInputMessage("");
        setIsThinking(true);

        // Optimistic UI update could go here, but for now we'll rely on invalidation
        try {
            const res = await apiRequest("POST", "/api/admin/bigmind/chat", {
                sessionId: activeSessionId,
                message: currentMsg
            });

            if (!res.ok) throw new Error("Failed to send message");

            // Invalidate to fetch new messages (user + assistant response)
            await queryClient.invalidateQueries({ queryKey: ["/api/admin/bigmind/sessions", activeSessionId, "messages"] });
            await queryClient.invalidateQueries({ queryKey: ["/api/admin/bigmind/sessions"] }); // update counts
        } catch (error) {
            toast({ title: "Error", description: "Failed to send message", variant: "destructive" });
        } finally {
            setIsThinking(false);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-[calc(100vh-140px)]">
            {/* Sidebar: Session List */}
            <div className="bg-card border rounded-xl overflow-hidden flex flex-col md:col-span-1">
                <div className="p-4 border-b bg-muted/20 flex justify-between items-center">
                    <h3 className="font-semibold flex items-center gap-2">
                        <Brain className="w-4 h-4 text-primary" /> Sessions
                    </h3>
                    <Button size="icon" variant="ghost" onClick={() => createSessionMutation.mutate()} disabled={createSessionMutation.isPending}>
                        <Plus className="w-4 h-4" />
                    </Button>
                </div>
                <ScrollArea className="flex-1">
                    <div className="p-2 space-y-2">
                        {isLoadingSessions ? (
                            <div className="flex justify-center p-4"><Loader2 className="animate-spin w-4 h-4" /></div>
                        ) : sessions.length === 0 ? (
                            <div className="text-center p-4 text-muted-foreground text-sm">No active sessions</div>
                        ) : (
                            sessions.map(session => (
                                <div
                                    key={session.id}
                                    onClick={() => setActiveSessionId(session.id)}
                                    className={cn(
                                        "p-3 rounded-lg text-sm cursor-pointer transition-colors hover:bg-muted/50 relative group",
                                        activeSessionId === session.id ? "bg-muted font-medium" : "text-muted-foreground"
                                    )}
                                >
                                    <div className="pr-6 truncate">{session.title}</div>
                                    <div className="text-xs opacity-70 mt-1 flex justify-between">
                                        <span>{session.messageCount} msgs</span>
                                        <span>{new Date(session.lastMessageAt || Date.now()).toLocaleDateString()}</span>
                                    </div>
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="absolute right-1 top-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (confirm('Delete chat?')) deleteSessionMutation.mutate(session.id);
                                        }}
                                    >
                                        <Trash className="w-3 h-3 text-destructive" />
                                    </Button>
                                </div>
                            ))
                        )}
                    </div>
                </ScrollArea>
            </div>

            {/* Main Chat Area */}
            <div className="bg-card border rounded-xl overflow-hidden flex flex-col md:col-span-3 shadow-lg">
                {activeSessionId ? (
                    <>
                        {/* Chat Header */}
                        <div className="p-4 border-b bg-muted/10 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <Bot className="w-5 h-5 text-purple-500" />
                                <span className="font-semibold">BigMind AI</span>
                                <Badge variant="outline" className="text-xs">
                                    GPT-4.1
                                </Badge>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => queryClient.invalidateQueries({ queryKey: ["/api/admin/bigmind/sessions", activeSessionId, "messages"] })}>
                                <RefreshCw className="w-4 h-4" />
                            </Button>
                        </div>

                        {/* Messages List */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-4 space-y-6"
                        >
                            {isLoadingMessages && messages.length === 0 ? (
                                <div className="flex justify-center p-12"><Loader2 className="animate-spin w-8 h-8 text-muted-foreground" /></div>
                            ) : messages.length === 0 ? (
                                <div className="text-center py-20 text-muted-foreground">
                                    <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-20" />
                                    <p>Start a conversation with BigMind...</p>
                                </div>
                            ) : (
                                messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={cn(
                                            "flex gap-4 max-w-3xl",
                                            msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                                            msg.role === 'user' ? "bg-primary text-primary-foreground" : "bg-purple-500 text-white"
                                        )}>
                                            {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                                        </div>
                                        <div className={cn(
                                            "p-4 rounded-2xl whitespace-pre-wrap text-sm leading-relaxed",
                                            msg.role === 'user'
                                                ? "bg-primary text-primary-foreground rounded-tr-none"
                                                : "bg-muted/50 border rounded-tl-none"
                                        )}>
                                            {msg.content}
                                        </div>
                                    </div>
                                ))
                            )}
                            {isThinking && (
                                <div className="flex gap-4 max-w-3xl mr-auto">
                                    <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center shrink-0">
                                        <Bot className="w-4 h-4" />
                                    </div>
                                    <div className="p-4 rounded-2xl bg-muted/50 border rounded-tl-none flex items-center gap-2">
                                        <Loader2 className="w-4 h-4 animate-spin text-purple-500" />
                                        <span className="text-xs text-muted-foreground">BigMind is thinking...</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="p-4 border-t bg-background/50 backdrop-blur-sm">
                            <form onSubmit={handleSendMessage} className="flex gap-2">
                                <Input
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    placeholder="Message BigMind..."
                                    disabled={isThinking}
                                    className="flex-1"
                                />
                                <Button type="submit" disabled={isThinking || !inputMessage.trim()}>
                                    {isThinking ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                </Button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                        <Brain className="w-16 h-16 mb-4 opacity-20" />
                        <p>Select a session or start a new chat</p>
                    </div>
                )}
            </div>
        </div>
    );
}
