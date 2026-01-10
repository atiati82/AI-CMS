import React, { useState } from "react";
import { Search, Bell, Sun, Moon, LogOut, RefreshCw, Settings, CheckCircle2, AlertCircle, Info, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type AdminHeaderProps = {
  onLogout: () => void;
  onRefresh: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  isSidebarCollapsed: boolean;
};

type Notification = {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'info';
  time: string;
  read: boolean;
};

// Mock notifications for professional demo
const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'System Backup Complete',
    message: 'Daily backup of database and assets completed successfully.',
    type: 'success',
    time: '2 mins ago',
    read: false,
  },
  {
    id: '2',
    title: 'BigMind AI Update',
    message: 'New optimization model loaded for Content Agent.',
    type: 'info',
    time: '1 hour ago',
    read: false,
  },
  {
    id: '3',
    title: 'High Traffic Alert',
    message: 'Unusual traffic spike detected on /science/water page.',
    type: 'warning',
    time: '3 hours ago',
    read: true,
  }
];

export function AdminHeader({
  onLogout,
  onRefresh,
  isDarkMode,
  onToggleTheme,
  isSidebarCollapsed
}: AdminHeaderProps) {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const clearNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const handleSettingsClick = () => {
    // Navigate to settings tab using query parameter which admin.tsx listens to on load
    const url = new URL(window.location.href);
    url.searchParams.set('tab', 'settings');
    window.location.href = url.toString();
  };

  return (
    <header
      className={cn(
        "fixed top-0 right-0 z-30 h-16 bg-black/40 backdrop-blur-md border-b border-white/10 transition-all duration-300",
        isSidebarCollapsed ? "left-[70px]" : "left-[260px]"
      )}
      data-testid="admin-header"
    >
      <div className="flex items-center justify-between h-full px-6">
        {/* Search Bar */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-purple-500 transition-colors" />
            <Input
              type="search"
              placeholder="Search admin..."
              className="pl-10 bg-muted/50 border-muted-foreground/20 focus:bg-background focus:border-purple-500 h-10 transition-all font-medium"
              data-testid="input-admin-search"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleTheme}
            className="text-admin-header-foreground hover:text-foreground hover:bg-admin-header-hover"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            data-testid="button-toggle-theme"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>

          {/* Refresh */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onRefresh}
            className="text-admin-header-foreground hover:text-foreground hover:bg-admin-header-hover"
            title="Refresh Data"
            data-testid="button-refresh"
          >
            <RefreshCw className="w-5 h-5" />
          </Button>

          {/* Notifications */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative text-admin-header-foreground hover:text-foreground hover:bg-admin-header-hover"
                data-testid="button-notifications"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="flex items-center justify-between p-4 border-b">
                <h4 className="font-semibold leading-none">Notifications</h4>
                {unreadCount > 0 && (
                  <Button variant="ghost" size="sm" className="h-auto px-2 text-xs text-blue-500 hover:text-blue-600" onClick={handleMarkAllRead}>
                    Mark all read
                  </Button>
                )}
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground">
                    <CheckCircle2 className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No new notifications</p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={cn(
                          "p-4 hover:bg-muted/50 transition-colors relative group bg-background",
                          !notification.read && "bg-blue-50/10"
                        )}
                      >
                        <div className="flex gap-3">
                          <div className={cn(
                            "mt-1 w-2 h-2 rounded-full shrink-0",
                            notification.type === 'success' ? "bg-green-500" :
                              notification.type === 'warning' ? "bg-amber-500" : "bg-blue-500"
                          )} />
                          <div className="flex-1 space-y-1">
                            <p className={cn("text-sm font-medium leading-none", !notification.read && "text-foreground font-semibold")}>
                              {notification.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {notification.message}
                            </p>
                            <p className="text-[10px] text-muted-foreground/60 pt-1">
                              {notification.time}
                            </p>
                          </div>
                          <button
                            onClick={(e) => { e.stopPropagation(); clearNotification(notification.id); }}
                            className="opacity-0 group-hover:opacity-100 absolute top-2 right-2 p-1 hover:bg-background rounded-full text-muted-foreground transition-all"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="p-2 border-t bg-muted/30">
                <Button variant="ghost" size="sm" className="w-full text-xs h-8">
                  View all activity
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          {/* User Avatar Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full p-0 hover:bg-admin-header-hover ml-2 ring-2 ring-purple-500/20"
                data-testid="button-user-menu"
              >
                <div className="w-9 h-9 rounded-full bg-linear-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-sm">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Admin User</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    admin@andara.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSettingsClick} data-testid="menu-item-settings" className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Info className="mr-2 h-4 w-4" />
                <span>Help & Support</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout} data-testid="menu-item-logout" className="text-red-500 focus:text-red-500 cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
