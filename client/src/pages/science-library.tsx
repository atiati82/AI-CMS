import { useState, useMemo } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import Layout from "@/components/layout";
import { CLUSTERS, ARTICLES } from "@/lib/data";
import { ArrowRight, Search, X } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, ScaleOnHover } from "@/components/animations";
import { Input } from "@/components/ui/input";

import libraryHeader from "@assets/generated_images/science_library_concept_image.png";

export default function ScienceLibrary() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCluster, setSelectedCluster] = useState<string | null>(null);

  // Filter articles based on search and selected cluster
  const filteredArticles = useMemo(() => {
    return ARTICLES.filter(article => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCluster = selectedCluster ? article.clusterId === selectedCluster : true;

      return matchesSearch && matchesCluster;
    });
  }, [searchQuery, selectedCluster]);

  // Group filtered articles by cluster for rendering
  const clustersWithArticles = useMemo(() => {
    return CLUSTERS.filter(cluster => {
      const items = filteredArticles.filter(a => a.clusterId === cluster.id);
      return items.length > 0;
    }).map(cluster => ({
      ...cluster,
      articles: filteredArticles.filter(a => a.clusterId === cluster.id)
    }));
  }, [filteredArticles]);

  return (
    <Layout>
      {/* HERO SECTION */}
      <div className="relative bg-[#020617] py-24 px-4 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 opacity-20 transition-opacity duration-1000">
          <img src={libraryHeader} className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/50 to-[#020617]" />

        <FadeIn className="relative z-10 container mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] tracking-[0.2em] uppercase font-bold mb-4">
            Scientific Validation Repository
          </div>
          <h1 className="text-4xl md:text-7xl font-display font-medium text-white tracking-tight leading-tight">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-purple-400">Science Library</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            Exploring the intersection of primordial minerals, structured water, and bioelectric biology.
          </p>

          {/* SEARCH BAR */}
          <div className="w-full max-w-2xl mx-auto mt-12 bg-white/5 border border-white/10 p-2 rounded-2xl backdrop-blur-xl shadow-2xl relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
            <Input
              placeholder="Search research, minerals, protocols..."
              className="w-full bg-transparent border-none text-white text-lg py-7 pl-12 pr-12 focus-visible:ring-0 placeholder:text-slate-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full text-slate-500 hover:text-white transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </FadeIn>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* COMPACT CLUSTER INDEX */}
        <FadeIn delay={0.2} className="mb-24">
          <div className="text-center mb-8">
            <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-slate-500 mb-4">Library Index</h2>
            <div className="h-px w-12 bg-blue-500/30 mx-auto" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {CLUSTERS.map((cluster) => {
              const isActive = selectedCluster === cluster.id;
              const hasArticles = filteredArticles.some(a => a.clusterId === cluster.id);

              return (
                <button
                  key={cluster.id}
                  onClick={() => setSelectedCluster(isActive ? null : cluster.id)}
                  disabled={!hasArticles && searchQuery !== ""}
                  className={`group relative flex flex-col items-center p-6 rounded-2xl border transition-all duration-300 ${isActive
                    ? "bg-white/10 border-white/20 shadow-xl"
                    : "bg-white/[0.02] border-white/5 hover:bg-white/5 hover:border-white/10"
                    } ${!hasArticles && searchQuery !== "" ? "opacity-30 grayscale cursor-not-allowed" : ""}`}
                >
                  <div
                    className={`p-3 rounded-xl mb-3 transition-transform duration-500 group-hover:scale-110 ${isActive ? "scale-110" : ""}`}
                    style={{ backgroundColor: `${cluster.color}15` }}
                  >
                    <cluster.icon className="w-6 h-6" style={{ color: cluster.color }} />
                  </div>
                  <span className={`text-[10px] text-center font-bold uppercase tracking-wider transition-colors ${isActive ? "text-white" : "text-slate-500 group-hover:text-slate-300"}`}>
                    {cluster.name.split(' ')[0]}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="cluster-active-dot"
                      className="absolute -bottom-1 w-1 h-1 rounded-full"
                      style={{ backgroundColor: cluster.color }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </FadeIn>

        {/* CLUSTER SECTIONS */}
        <div className="space-y-32">
          {clustersWithArticles.length > 0 ? (
            clustersWithArticles.map((cluster) => (
              <FadeIn key={cluster.id}>
                <section id={cluster.slug} className="scroll-mt-24">
                  <div className="group flex flex-col md:flex-row gap-6 md:items-end border-b border-white/10 pb-6 mb-12">
                    <div
                      className="p-3 rounded-xl w-fit transition-colors"
                      style={{
                        backgroundColor: `${cluster.color}15`,
                      }}
                    >
                      <cluster.icon
                        className="w-8 h-8"
                        style={{ color: cluster.color }}
                      />
                    </div>
                    <div className="flex-1">
                      <h2
                        className="text-3xl font-display font-medium mb-2 flex items-center gap-2"
                        style={{ color: cluster.color }}
                      >
                        {cluster.name}
                      </h2>
                      <p className="text-slate-400 font-light">
                        {cluster.description}
                      </p>
                    </div>
                  </div>

                  <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cluster.articles.map(article => (
                      <StaggerItem key={article.id}>
                        <ScaleOnHover>
                          <Link
                            href={`/science/${article.slug}`}
                            className="group flex flex-col h-full bg-white/[0.03] rounded-2xl border border-white/5 overflow-hidden hover:bg-white/[0.06] hover:border-white/10 transition-all duration-500"
                          >
                            <div className="p-8 flex-grow">
                              <div className="flex flex-wrap gap-2 mb-4">
                                {article.tags.slice(0, 3).map(tag => (
                                  <span key={tag} className="text-[10px] uppercase font-bold tracking-wider text-slate-500 bg-white/5 px-2 py-1 rounded-md">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                              <h3 className="text-xl font-display font-medium text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all">
                                {article.title}
                              </h3>
                              <p className="text-slate-400 text-sm leading-relaxed mb-6 font-light">
                                {article.summary}
                              </p>
                            </div>
                            <div className="px-8 py-4 bg-white/[0.02] border-t border-white/5 flex items-center justify-between">
                              <span className="text-xs font-medium text-slate-500 flex items-center gap-2">
                                <span className="w-1 h-1 rounded-full bg-blue-500/50" />
                                {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                              </span>
                              <span className="text-xs font-bold text-white flex items-center gap-1 group-hover:text-blue-400 transition-colors">
                                READ <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                              </span>
                            </div>
                          </Link>
                        </ScaleOnHover>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </section>
              </FadeIn>
            ))
          ) : (
            <FadeIn className="py-32 text-center space-y-8">
              <div className="relative mx-auto w-24 h-24 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                <Search className="w-10 h-10 text-slate-600 animate-pulse" />
              </div>
              <div>
                <h3 className="text-2xl font-display text-white mb-2 tracking-wide font-medium">No results found</h3>
                <p className="text-slate-500 max-w-sm mx-auto font-light leading-relaxed">
                  We couldn't find any articles matching "<strong>{searchQuery}</strong>". <br />Try different keywords or browse all categories.
                </p>
              </div>
            </FadeIn>
          )}
        </div>
      </div>
    </Layout>
  );
}

