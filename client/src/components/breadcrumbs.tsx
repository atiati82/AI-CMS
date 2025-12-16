import { Link } from "wouter";
import { ChevronRight, Home } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

type BreadcrumbItem = {
  key: string;
  title: string;
  path: string;
};

interface BreadcrumbsProps {
  pageKey: string;
  className?: string;
}

export default function Breadcrumbs({ pageKey, className = "" }: BreadcrumbsProps) {
  const { data: breadcrumbs, isLoading } = useQuery<BreadcrumbItem[]>({
    queryKey: [`/api/pages/${pageKey}/breadcrumbs`],
    enabled: !!pageKey,
  });

  if (isLoading || !breadcrumbs || breadcrumbs.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center gap-1 text-sm text-muted-foreground ${className}`}
      data-testid="breadcrumbs"
    >
      <Link href="/" className="flex items-center hover:text-primary transition-colors" data-testid="breadcrumb-home">
        <Home className="w-4 h-4" />
      </Link>

      {breadcrumbs.map((item, index) => (
        <span key={item.key} className="flex items-center gap-1">
          <ChevronRight className="w-4 h-4 text-border" />
          {index === breadcrumbs.length - 1 ? (
            <span className="font-medium text-primary truncate max-w-[200px]" data-testid={`breadcrumb-current-${item.key}`}>
              {item.title}
            </span>
          ) : (
            <Link
              href={item.path}
              className="hover:text-primary transition-colors truncate max-w-[150px]"
              data-testid={`breadcrumb-${item.key}`}
            >
              {item.title}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
