import { useEffect } from 'react';
import { useLocation } from 'wouter';

/**
 * Hook to scroll to top when the route changes.
 * Commonly used in page components to ensure fresh page loads start at top.
 */
export function useScrollTop() {
    const [location] = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [location]);
}

export default useScrollTop;
