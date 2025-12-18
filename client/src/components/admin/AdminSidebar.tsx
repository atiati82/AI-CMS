import React, { useState } from "react";
import {
  LayoutDashboard, FileText, Package, Beaker, FolderTree, FileUp,
  Target, Wand2, Link, Code2, Settings, Brain, ChevronLeft, ChevronRight,
  ShoppingCart, GraduationCap, Truck, Mail, MessageSquare, Calendar, Kanban,
  Palette, Menu, X, BarChart3, Cpu, Sparkles, Layers, Activity
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

type NavItem = {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: number;
};

type NavSection = {
  title: string;
  items: NavItem[];
};

const navSections: NavSection[] = [
  {
    title: "Apps",
    items: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, badge: 5 },
      { id: "pages", label: "Pages", icon: FileText },
      { id: "products", label: "Products", icon: Package },
      { id: "orders", label: "Orders", icon: ShoppingCart },
      { id: "articles", label: "Articles", icon: Beaker },
    ],
  },
  {
    title: "Content",
    items: [
      { id: "clusters", label: "Clusters", icon: FolderTree },
      { id: 'documents', label: 'Knowledge Base', icon: FileText },
      { id: "functions", label: "Functions", icon: Code2 },
      { id: "templates", label: "Templates", icon: Code2 },
    ],
  },
  {
    title: "SEO & AI",
    items: [
      { id: "seo-brain", label: "SEO Brain", icon: Wand2 },
      { id: "seo", label: "SEO Keywords", icon: Target },
      { id: "analytics", label: "GSC Analytics", icon: BarChart3 },
      { id: "magic", label: "Magic Pages", icon: GraduationCap },
      { id: "linking", label: "Linking Rules", icon: Link },
      { id: "bigmind", label: "Big Mind", icon: Brain },
      { id: "ai-agents", label: "AI Agents", icon: Cpu },
      { id: "ai-audit", label: "AI Audit", icon: Activity },
      { id: "workflows", label: "Workflows", icon: Layers },
    ],
  },
  {
    title: "System",
    items: [
      { id: "design", label: "Design System", icon: Palette },
      { id: "design-interpreter", label: "Visual Interpreter", icon: Sparkles },
      { id: "settings", label: "Settings", icon: Settings },
    ],
  },
];

type AdminSidebarProps = {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
};

function SidebarContent({
  activeTab,
  onTabChange,
  isCollapsed = false,
  onItemClick
}: {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isCollapsed?: boolean;
  onItemClick?: () => void;
}) {
  return (
    <nav className="p-3 space-y-6 overflow-y-auto h-[calc(100vh-64px)]">
      {navSections.map((section) => (
        <div key={section.title}>
          {!isCollapsed && (
            <h3 className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-admin-sidebar-muted">
              {section.title}
            </h3>
          )}
          <ul className="space-y-1">
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      onTabChange(item.id);
                      onItemClick?.();
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-gradient-to-r from-transparent to-cyan-500/10 text-cyan-400 border-r-2 border-cyan-500 shadow-[0_0_15px_-5px_rgba(6,182,212,0.5)]"
                        : "text-muted-foreground hover:bg-white/5 hover:text-white"
                    )}
                    data-testid={`sidebar-${item.id}`}
                  >
                    <Icon className={cn("w-5 h-5 shrink-0", isCollapsed && "mx-auto")} />
                    {!isCollapsed && (
                      <>
                        <span className="flex-1 text-left">{item.label}</span>
                        {item.badge && (
                          <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-purple-500 text-white">
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))
      }
    </nav >
  );
}

export function AdminSidebar({
  activeTab,
  onTabChange,
  isCollapsed,
  onToggleCollapse
}: AdminSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile hamburger button - fixed position */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-4 top-4 z-50 md:hidden bg-admin-sidebar/90 backdrop-blur-sm border border-admin-sidebar-border"
        onClick={() => setMobileOpen(true)}
        data-testid="button-mobile-menu"
      >
        <Menu className="w-5 h-5" />
      </Button>

      {/* Mobile Sheet Navigation */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          side="left"
          className="w-[280px] p-0 border-slate-700 bg-slate-900 [&>button]:hidden"
        >
          <div className="flex items-center justify-between h-16 px-4 border-b border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="font-display font-bold text-white text-lg">
                Andara
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileOpen(false)}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          <SidebarContent
            activeTab={activeTab}
            onTabChange={onTabChange}
            onItemClick={() => setMobileOpen(false)}
          />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar - hidden on mobile */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen bg-admin-sidebar border-r border-admin-sidebar-border transition-all duration-300",
          "hidden md:block",
          isCollapsed ? "w-[70px]" : "w-[260px]"
        )}
        data-testid="admin-sidebar"
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-admin-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-900/50 to-purple-900/50 border border-white/10 flex items-center justify-center shadow-lg shadow-cyan-500/10">
              <span className="text-cyan-400 font-bold text-sm drop-shadow-md">A</span>
            </div>
            {!isCollapsed && (
              <span className="font-display font-bold text-admin-sidebar-foreground text-lg">
                Andara
              </span>
            )}
          </div>
          <button
            onClick={onToggleCollapse}
            className="p-1.5 rounded-lg hover:bg-admin-sidebar-hover text-admin-sidebar-muted transition-colors"
            data-testid="button-toggle-sidebar"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        <SidebarContent
          activeTab={activeTab}
          onTabChange={onTabChange}
          isCollapsed={isCollapsed}
        />
      </aside>
    </>
  );
}
