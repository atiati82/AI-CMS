import React, { useState, ReactNode } from "react";
import { ChevronDown, ChevronRight, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface AdminSectionProps {
  title: string;
  icon?: LucideIcon;
  children: ReactNode;
  defaultOpen?: boolean;
  collapsible?: boolean;
  variant?: "default" | "muted" | "accent" | "ai";
  headerAction?: ReactNode;
  className?: string;
}

export function AdminSection({
  title,
  icon: Icon,
  children,
  defaultOpen = true,
  collapsible = false,
  variant = "default",
  headerAction,
  className,
}: AdminSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const variantStyles = {
    default: "border-border bg-card",
    muted: "border-muted bg-muted/30",
    accent: "border-primary/20 bg-primary/5",
    ai: "border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-cyan-500/5",
  };

  return (
    <div
      className={cn(
        "rounded-lg border",
        variantStyles[variant],
        className
      )}
      data-testid={`section-${title.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <div
        className={cn(
          "flex items-center justify-between px-4 py-3",
          collapsible && "cursor-pointer hover:bg-muted/50 transition-colors",
          isOpen && "border-b border-border/50"
        )}
        onClick={collapsible ? () => setIsOpen(!isOpen) : undefined}
      >
        <div className="flex items-center gap-2">
          {collapsible && (
            <span className="text-muted-foreground">
              {isOpen ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </span>
          )}
          {Icon && <Icon className="w-4 h-4 text-muted-foreground" />}
          <h3 className="font-medium text-sm">{title}</h3>
        </div>
        {headerAction && (
          <div onClick={(e) => e.stopPropagation()}>{headerAction}</div>
        )}
      </div>
      {isOpen && <div className="p-4 space-y-4">{children}</div>}
    </div>
  );
}

interface FormRowProps {
  children: ReactNode;
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}

export function FormRow({ children, columns = 2, className }: FormRowProps) {
  const colStyles = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={cn("grid gap-4", colStyles[columns], className)}>
      {children}
    </div>
  );
}

interface FormFieldProps {
  children: ReactNode;
  className?: string;
}

export function FormField({ children, className }: FormFieldProps) {
  return <div className={cn("space-y-2", className)}>{children}</div>;
}

interface ActionBarProps {
  children: ReactNode;
  className?: string;
  align?: "left" | "right" | "between";
}

export function ActionBar({ children, className, align = "right" }: ActionBarProps) {
  const alignStyles = {
    left: "justify-start",
    right: "justify-end",
    between: "justify-between",
  };

  return (
    <div
      className={cn(
        "flex items-center gap-2 pt-4 border-t border-border/50",
        alignStyles[align],
        className
      )}
    >
      {children}
    </div>
  );
}
