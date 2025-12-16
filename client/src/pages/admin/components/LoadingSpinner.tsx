import { Loader2 } from "lucide-react";

export function LoadingSpinner() {
    return (
    \u003cdiv className = "flex items-center justify-center min-h-[400px]" data - testid="loading-spinner"\u003e
    \u003cdiv className = "text-center"\u003e
    \u003cLoader2 className = "w-8 h-8 animate-spin mx-auto mb-4 text-primary" /\u003e
    \u003cp className = "text-sm text-muted-foreground"\u003eLoading...\u003c / p\u003e
    \u003c / div\u003e
    \u003c / div\u003e
  );
}
