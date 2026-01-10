
import React, { useState } from "react";
import { Link } from "wouter"; // Assuming wouter usage based on project
import { AdminFeature, ADMIN_FEATURES, NAV_GROUPS } from '@/config/adminFeatureRegistry';
import { useFeaturePermission } from '@/hooks/useFeaturePermission';
import { cn } from "@/lib/utils";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
    Menu, X, ChevronRight, ChevronLeft
} from "lucide-react";

// Helper to get group data
function getGroupData() {
    const grouped: Record<string, AdminFeature[]> = {};

    Object.values(ADMIN_FEATURES).forEach(feature => {
        if (feature.navigation.hidden) return;
        const group = feature.navigation.group;
        if (!grouped[group]) grouped[group] = [];
        grouped[group].push(feature);
    });

    return Object.entries(NAV_GROUPS)
        .sort(([, a], [, b]) => a.order - b.order)
        .map(([key, groupConfig]) => ({
            key,
            label: groupConfig.label,
            features: (grouped[key] || []).sort((a, b) => a.navigation.slot - b.navigation.slot)
        }))
        .filter(group => group.features.length > 0);
}

function NavItem({
    feature,
    isActive,
    isCollapsed,
    onNavigate
}: {
    feature: AdminFeature;
    isActive: boolean;
    isCollapsed: boolean;
    onNavigate: (tabId: string) => void;
}) {
    const { hasAccess } = useFeaturePermission(feature.featureKey);

    if (!hasAccess) return null;

    const LucideIcon = feature.icon;
    // If we had a mapping of featureKey to specialized Andara Icons, we'd use it here.
    // For now falling back to LucideIcon primarily or a simple check if needed.

    return (
        <li>
            <div
                role="button"
                tabIndex={0}
                onClick={() => onNavigate(feature.route.tabId || feature.featureKey)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onNavigate(feature.route.tabId || feature.featureKey);
                    }
                }}
                className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative cursor-pointer",
                    isActive
                        ? "bg-linear-to-r from-transparent to-cyan-500/10 text-cyan-400 border-r-2 border-cyan-500 shadow-[0_0_15px_-5px_rgba(6,182,212,0.5)]"
                        : "text-muted-foreground hover:bg-white/5 hover:text-white"
                )}
                title={isCollapsed ? feature.navigation.label : undefined}
            >
                <div className={cn("shrink-0 relative flex items-center justify-center", isCollapsed && "mx-auto")}>
                    <LucideIcon className="w-5 h-5" />
                </div>

                {!isCollapsed && (
                    <>
                        <span className="flex-1 text-left ml-1">{feature.navigation.label}</span>
                        {feature.navigation.badge && (
                            <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-purple-500 text-white">
                                {feature.navigation.badge}
                            </span>
                        )}
                    </>
                )}
            </div>
        </li>
    );
}

export function DynamicAdminNav({
    activeTab,
    onTabChange,
    isCollapsed,
    onToggleCollapse
}: {
    activeTab: string;
    onTabChange: (tab: string) => void;
    isCollapsed: boolean;
    onToggleCollapse: () => void;
}) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const navGroups = getGroupData();

    const SidebarContent = () => (
        <nav className="p-3 space-y-6 overflow-y-auto h-[calc(100vh-64px)]">
            {navGroups.map((group) => (
                <div key={group.key}>
                    {!isCollapsed && (
                        <h3 className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/50">
                            {group.label}
                        </h3>
                    )}
                    <ul className="space-y-1">
                        {group.features.map(feature => (
                            <NavItem
                                key={feature.featureKey}
                                feature={feature}
                                isActive={activeTab === (feature.route.tabId || feature.featureKey)}
                                isCollapsed={isCollapsed}
                                onNavigate={(tab) => {
                                    onTabChange(tab);
                                    setMobileOpen(false);
                                }}
                            />
                        ))}
                    </ul>
                </div>
            ))}
        </nav>
    );

    return (
        <>
            {/* Mobile Trigger */}
            <Button
                variant="ghost"
                size="icon"
                className="fixed left-4 top-4 z-50 md:hidden bg-background/90 backdrop-blur-sm border"
                onClick={() => setMobileOpen(true)}
            >
                <Menu className="w-5 h-5" />
            </Button>

            {/* Mobile Sheet */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetContent side="left" className="w-[280px] p-0 border-r bg-background">
                    <div className="flex items-center justify-between h-16 px-4 border-b">
                        <span className="font-bold text-lg">Andara Admin</span>
                        <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)}>
                            <X className="w-5 h-5" />
                        </Button>
                    </div>
                    <SidebarContent />
                </SheetContent>
            </Sheet>

            {/* Desktop Sidebar */}
            <aside
                className={cn(
                    "fixed left-0 top-0 z-40 h-screen bg-card border-r transition-all duration-300 hidden md:block",
                    isCollapsed ? "w-[70px]" : "w-[260px]"
                )}
            >
                <div className="flex items-center justify-between h-16 px-4 border-b">
                    {!isCollapsed && <span className="font-bold text-lg">Andara</span>}
                    <div className={cn("flex items-center", isCollapsed ? "mx-auto" : "")}>
                        <Button variant="ghost" size="icon" onClick={onToggleCollapse} className="h-8 w-8">
                            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                        </Button>
                    </div>
                </div>
                <SidebarContent />
            </aside>
        </>
    );
}
