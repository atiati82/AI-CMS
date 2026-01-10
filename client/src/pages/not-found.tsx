import { useEffect, useState } from "react";
import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { AlertCircle, Search, ArrowRight, Home, BookOpen, ShoppingCart, Mail } from "lucide-react";
import UtilityLayout from "@/templates/gpt/UtilityLayout";

// Simple Levenshtein distance for fuzzy matching
const levenshtein = (a: string, b: string): number => {
  const matrix = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(null));

  for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= b.length; j++) matrix[j][0] = j;

  for (let j = 1; j <= b.length; j++) {
    for (let i = 1; i <= a.length; i++) {
      const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,
        matrix[j - 1][i] + 1,
        matrix[j - 1][i - 1] + indicator
      );
    }
  }
  return matrix[b.length][a.length];
};

export default function NotFound() {
  const [location] = useLocation();
  const [suggestion, setSuggestion] = useState<{ title: string; path: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const findMatch = async () => {
      try {
        const res = await fetch('/api/pages');
        if (!res.ok) throw new Error('Failed to fetch pages');

        const pages = await res.json();
        const validPaths = pages
          .filter((p: any) => p.path)
          .map((p: any) => ({ title: p.title, path: p.path }));

        // Also add hardcoded routes that might not be in DB
        const hardcodedRoutes = [
          { title: "Home", path: "/" },
          { title: "Shop", path: "/shop" },
          { title: "Science Library", path: "/science" },
          { title: "How to Use Andara", path: "/how-to-use-andara" },
          { title: "Primordial", path: "/primordial" },
          { title: "ION Cluster", path: "/ion" }
        ];

        const allRoutes = [...validPaths, ...hardcodedRoutes];

        let bestMatch = null;
        let minDistance = Infinity;
        const threshold = 5;

        const cleanLoc = location.toLowerCase().replace(/\/$/, "");

        for (const route of allRoutes) {
          const cleanRoute = route.path.toLowerCase().replace(/\/$/, "");
          if (cleanRoute === cleanLoc) continue;

          const dist = levenshtein(cleanLoc, cleanRoute);

          if (dist < minDistance && dist <= threshold) {
            minDistance = dist;
            bestMatch = route;
          }
        }

        setSuggestion(bestMatch);
      } catch (err) {
        console.error("Smart 404 Error:", err);
      } finally {
        setLoading(false);
      }
    };

    findMatch();
  }, [location]);

  const mainContent = `
    <div class="not-found-content">
      <div class="not-found-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-red-400">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" x2="12" y1="8" y2="12"/>
          <line x1="12" x2="12.01" y1="16" y2="16"/>
        </svg>
      </div>
      <h2 class="not-found-title">Page Not Found</h2>
      <p class="not-found-path"><code>${location}</code></p>
      <p class="not-found-message">
        We couldn't find the page you're looking for. It might have been moved, renamed, or deleted.
      </p>
    </div>
  `;

  return (
    <UtilityLayout
      title="404 – Page Not Found"
      intro="The page you requested could not be found."
      mode="noindex"
      mainHtml={mainContent}
      rightRail={
        <div className="space-y-6">
          {loading ? (
            <div className="flex items-center gap-2 text-sm text-slate-400 animate-pulse p-4 rounded-xl bg-white/5 border border-white/10">
              <Search className="w-4 h-4" />
              <span>Scanning library for matches...</span>
            </div>
          ) : suggestion ? (
            <div className="bg-emerald-950/30 border border-emerald-500/20 rounded-xl p-5 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <p className="text-emerald-400 text-sm font-medium mb-3 flex items-center gap-2">
                <Search className="w-4 h-4" />
                Did you mean?
              </p>
              <Link href={suggestion.path}>
                <div className="group flex items-center justify-between bg-slate-900/50 p-4 rounded-lg border border-emerald-500/30 hover:border-emerald-400/50 transition-all cursor-pointer">
                  <div>
                    <h4 className="font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {suggestion.title}
                    </h4>
                    <span className="text-xs text-slate-500 font-mono">{suggestion.path}</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            </div>
          ) : null}

          <div className="grid grid-cols-1 gap-3">
            <Link href="/">
              <Button variant="outline" className="w-full justify-start gap-2 h-12 bg-white/5 border-white/10 hover:bg-white/10">
                <Home className="w-4 h-4" /> Home
              </Button>
            </Link>
            <Link href="/shop">
              <Button variant="outline" className="w-full justify-start gap-2 h-12 bg-white/5 border-white/10 hover:bg-white/10">
                <ShoppingCart className="w-4 h-4" /> Shop
              </Button>
            </Link>
            <Link href="/science">
              <Button variant="outline" className="w-full justify-start gap-2 h-12 bg-white/5 border-white/10 hover:bg-white/10">
                <BookOpen className="w-4 h-4" /> Science Library
              </Button>
            </Link>
            <Link href="/contact-support">
              <Button variant="outline" className="w-full justify-start gap-2 h-12 bg-white/5 border-white/10 hover:bg-white/10">
                <Mail className="w-4 h-4" /> Contact Support
              </Button>
            </Link>
          </div>
        </div>
      }
      cta={{
        label: "Return Home",
        href: "/"
      }}
    />
  );
}
