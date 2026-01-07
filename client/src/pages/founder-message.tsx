import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Search, ArrowRight } from "lucide-react";
import { useLocation, Link } from "wouter";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

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

        // Also add hardcoded routes from App.tsx that might not be in DB yet
        const hardcodedRoutes = [
          { title: "Home", path: "/" },
          { title: "Shop", path: "/shop" },
          { title: "Science Library", path: "/science" },
          { title: "3-6-9 Harmonics", path: "/three-six-nine-harmonics" },
          { title: "Minerals Hub", path: "/science/mineral-science-blueprint" },
          { title: "Crystal Grids", path: "/crystal-grids-in-nature" }
        ];

        const allRoutes = [...validPaths, ...hardcodedRoutes];

        let bestMatch = null;
        let minDistance = Infinity;
        const threshold = 5; // Max distance to consider a match

        // Clean current location for comparison
        const cleanLoc = location.toLowerCase().replace(/\/$/, "");

        for (const route of allRoutes) {
          const cleanRoute = route.path.toLowerCase().replace(/\/$/, "");
          // Skip exact matches (logic shouldn't reach here if router matched, but good safety)
          if (cleanRoute === cleanLoc) continue;

          // Calculate distance on the last segment if it's a deep path, or full path
          // Let's try full path matching first
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

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-lg shadow-xl border-red-100">
        <CardHeader className="bg-red-50/50 border-b border-red-100 pb-8">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
            <div>
              <CardTitle className="text-3xl font-bold text-gray-900 mb-2">Page Not Found</CardTitle>
              <p className="text-gray-500 font-mono text-sm bg-white px-3 py-1 rounded-full border border-gray-200 shadow-sm inline-block">
                {location}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-8 pb-8 px-8">
          <div className="space-y-6">
            <p className="text-center text-gray-600 leading-relaxed">
              We couldn't find the page you're looking for. It might have been moved, renamed, or deleted.
            </p>

            {loading ? (
              <div className="flex items-center justify-center gap-2 text-sm text-gray-400 animate-pulse">
                <Search className="w-4 h-4" />
                <span>Scanning library for matches...</span>
              </div>
            ) : suggestion ? (
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <p className="text-blue-600 text-sm font-medium mb-3 flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  Did you mean?
                </p>
                <Link href={suggestion.path}>
                  <div className="group flex items-center justify-between bg-white p-4 rounded-lg border border-blue-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all cursor-pointer">
                    <div>
                      <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {suggestion.title}
                      </h4>
                      <span className="text-xs text-gray-400 font-mono">{suggestion.path}</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link href="/">
                  <Button variant="outline" className="w-full h-auto py-3">Home</Button>
                </Link>
                <Link href="/shop">
                  <Button variant="outline" className="w-full h-auto py-3">Shop</Button>
                </Link>
                <Link href="/science">
                  <Button variant="outline" className="w-full h-auto py-3">Science Library</Button>
                </Link>
                <Link href="/contact-support">
                  <Button variant="outline" className="w-full h-auto py-3">Contact Support</Button>
                </Link>
              </div>
            )}

            <div className="text-center border-t pt-6 mt-2">
              <Link href="/">
                <Button className="bg-gray-900 hover:bg-black text-white px-8">
                  Return Home
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
