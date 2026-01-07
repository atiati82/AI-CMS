import { useQuery } from "@tanstack/react-query";
import { Page, VisualConfig } from "@/types/admin";

export function usePageVisuals(path: string) {
    return useQuery<Page | null>({
        queryKey: [`/api/pages/by-path`, path],
        queryFn: async () => {
            if (!path) return null;
            // Ensure path doesn't start with / for the URL segment, but the API reconstructs it with /
            const cleanPath = path.startsWith('/') ? path.substring(1) : path;
            if (!cleanPath) return null; // Handle root if needed, or pass empty string if API supports it

            const res = await fetch(`/api/pages/by-path/${cleanPath}`);

            if (res.status === 404) {
                return null;
            }

            if (!res.ok) {
                throw new Error(`Failed to fetch page visuals: ${res.statusText}`);
            }

            return res.json();
        },
        enabled: !!path && path !== '/', // Skip for root if not configured, or if API doesn't handle empty path well
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: false
    });
}
