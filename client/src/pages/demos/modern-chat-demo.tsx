import { BigMindChatModern } from '@/components/bigmind-chat-modern';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';

export default function ModernChatDemo() {
    return (
        <div className="min-h-screen bg-background">
            <div className="border-b bg-card">
                <div className="container max-w-7xl mx-auto p-4">
                    <div className="flex items-center gap-4">
                        <Link href="/admin">
                            <a className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                                <ArrowLeft className="w-4 h-4" />
                                Back to Admin
                            </a>
                        </Link>
                        <div className="flex-1">
                            <h1 className="text-2xl font-bold">Modern BigMind Chat (Demo)</h1>
                            <p className="text-sm text-muted-foreground">
                                New ChatGPT-like interface with markdown rendering & syntax highlighting
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container max-w-7xl mx-auto p-4">
                <div style={{ height: 'calc(100vh - 140px)' }}>
                    <BigMindChatModern
                        mode="cms"
                        persistSessions={true}
                        className="h-full"
                    />
                </div>
            </div>
        </div>
    );
}
