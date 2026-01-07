import * as React from "react";
import {
    Calculator,
    Calendar,
    CreditCard,
    Settings,
    Smile,
    User,
    LayoutDashboard,
    FlaskConical,
    ShoppingBag,
    Sparkles,
    Network,
    Search,
    LogOut,
    Moon,
    Sun,
    Globe,
    Database,
    Unplug,
    FileText,
    Link as LinkIcon
} from "lucide-react";
import { STATIC_SITEMAP } from "@/lib/static-sitemap";

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export function CommandPalette() {
    const [open, setOpen] = React.useState(false);
    const [location, setLocation] = useLocation();
    const { toast } = useToast();

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const run = (action: () => void) => {
        setOpen(false);
        action();
    };

    // Prefetch basic stats for "God Mode" info (optional, keeps UI snappy)
    // We won't block UI on this.

    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <div className="andara-glass-panel border-none">
                <CommandInput placeholder="Type a command or search..." className="font-sans" />
                <CommandList className="font-sans">
                    <CommandEmpty>No results found.</CommandEmpty>

                    <CommandGroup heading="Navigation">
                        <CommandItem onSelect={() => run(() => setLocation("/admin"))}>
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            <span>Dashboard</span>
                        </CommandItem>
                        <CommandItem onSelect={() => run(() => setLocation("/admin/pages"))}>
                            <FileText className="mr-2 h-4 w-4" />
                            <span>Pages</span>
                        </CommandItem>
                        <CommandItem onSelect={() => run(() => setLocation("/admin/science-articles"))}>
                            <FlaskConical className="mr-2 h-4 w-4" />
                            <span>Science Library</span>
                        </CommandItem>
                        <CommandItem onSelect={() => run(() => setLocation("/admin/products"))}>
                            <ShoppingBag className="mr-2 h-4 w-4" />
                            <span>Products</span>
                        </CommandItem>
                        <CommandItem onSelect={() => run(() => setLocation("/"))}>
                            <Globe className="mr-2 h-4 w-4" />
                            <span>View Live Site</span>
                        </CommandItem>
                    </CommandGroup>

                    <CommandSeparator />

                    <CommandGroup heading="Global Site Search">
                        {STATIC_SITEMAP.map((page) => (
                            <CommandItem
                                key={page.path}
                                value={`${page.title} ${page.path} ${page.clusterKey || ''}`}
                                onSelect={() => run(() => setLocation(page.path))}
                            >
                                <LinkIcon className="mr-2 h-4 w-4 opacity-50" />
                                <div className="flex flex-col">
                                    <span>{page.title}</span>
                                    <span className="text-[10px] text-muted-foreground font-mono">{page.path}</span>
                                </div>
                                {page.clusterKey && (
                                    <span className="ml-auto text-[10px] uppercase tracking-wider text-muted-foreground/50 border border-white/10 px-1 rounded">
                                        {page.clusterKey}
                                    </span>
                                )}
                            </CommandItem>
                        ))}
                    </CommandGroup>

                    <CommandSeparator />

                    <CommandGroup heading="Tools & Agents">
                        <CommandItem onSelect={() => run(() => {
                            setLocation("/admin");
                            // In a real app we might pass a hash or state to open the tab
                            // For now, navigating is enough, user can click tab.
                            // Or we can trigger an event.
                            toast({ title: "Opening Connectivity Audit..." });
                            setTimeout(() => {
                                const btn = document.querySelector('button[data-tab="connectivity"]'); // If we had data-tab
                                // Since we can't easily control tabs from here without global state context,
                                // we'll just navigate to dashboard and show toast.
                            }, 500);
                        })}>
                            <Network className="mr-2 h-4 w-4" />
                            <span>Connectivity Audit (Orphan Hunter)</span>
                        </CommandItem>

                        <CommandItem onSelect={() => run(async () => {
                            toast({ title: "Running Quick SEO Scan..." });
                            try {
                                // Example of quick action
                                await apiRequest('POST', '/api/admin/seo/scan-all', {}); // Hypothetical
                                toast({ title: "Scan Complete", description: "Check SEO tab for results." });
                            } catch (e) {
                                toast({ title: "Navigating to SEO Tab" });
                                setLocation("/admin");
                            }
                        })}>
                            <Search className="mr-2 h-4 w-4" />
                            <span>Quick SEO Scan</span>
                        </CommandItem>

                        <CommandItem onSelect={() => run(() => {
                            setLocation("/admin");
                            // Hint to user
                            toast({ title: "Asset Intelligence", description: "Go to Page Editor > Media to using Auto-Tagging." });
                        })}>
                            <Sparkles className="mr-2 h-4 w-4" />
                            <span>Asset Intelligence</span>
                        </CommandItem>
                    </CommandGroup>

                    <CommandSeparator />

                    <CommandGroup heading="System">
                        <CommandItem onSelect={() => run(() => {
                            document.documentElement.classList.toggle('dark');
                            toast({ title: "Theme Toggled" });
                        })}>
                            <Moon className="mr-2 h-4 w-4" />
                            <span>Toggle Dark Mode</span>
                        </CommandItem>
                        <CommandItem onSelect={() => run(async () => {
                            // Trigger re-index
                            toast({ title: "Re-indexing Knowledge Base..." });
                            await apiRequest('POST', '/api/admin/documents/reindex');
                            toast({ title: "Indexing started" });
                        })}>
                            <Database className="mr-2 h-4 w-4" />
                            <span>Re-index Knowledge Base</span>
                        </CommandItem>
                        <CommandItem onSelect={() => run(async () => {
                            await apiRequest('POST', '/api/auth/logout');
                            setLocation("/auth");
                        })}>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </div>
        </CommandDialog>
    );
}
