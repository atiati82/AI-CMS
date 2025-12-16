import React from "react";
import { Search, Bell, Sun, Moon, LogOut, RefreshCw, Settings } from "lucide-react";
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
import { cn } from "@/lib/utils";

type AdminHeaderProps = {
  onLogout: () => void;
  onRefresh: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  isSidebarCollapsed: boolean;
};

export function AdminHeader({ 
  onLogout, 
  onRefresh, 
  isDarkMode, 
  onToggleTheme,
  isSidebarCollapsed 
}: AdminHeaderProps) {
  return (
    <header 
      className={cn(
        "fixed top-0 right-0 z-30 h-16 bg-admin-header border-b border-admin-header-border transition-all duration-300",
        isSidebarCollapsed ? "left-[70px]" : "left-[260px]"
      )}
      data-testid="admin-header"
    >
      <div className="flex items-center justify-between h-full px-6">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-10 bg-admin-search border-admin-search-border focus:border-purple-500 h-10"
              data-testid="input-admin-search"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleTheme}
            className="text-admin-header-foreground hover:bg-admin-header-hover"
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
            className="text-admin-header-foreground hover:bg-admin-header-hover"
            data-testid="button-refresh"
          >
            <RefreshCw className="w-5 h-5" />
          </Button>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative text-admin-header-foreground hover:bg-admin-header-hover"
            data-testid="button-notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </Button>

          {/* User Avatar Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full p-0 hover:bg-admin-header-hover"
                data-testid="button-user-menu"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">A</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Admin</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    admin@andara.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem data-testid="menu-item-settings">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout} data-testid="menu-item-logout">
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
