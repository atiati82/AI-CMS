import { Link } from "wouter";
import Layout from "@/components/layout";
import { CLUSTERS, ARTICLES } from "@/lib/data";
import { ArrowRight } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, ScaleOnHover } from "@/components/animations";

import libraryHeader from "@assets/generated_images/science_library_concept_image.png";

export default function ScienceLibrary() {
  return (
    <Layout>
      <div className="relative bg-primary py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={libraryHeader} className="w-full h-full object-cover" />
        </div>
        <FadeIn className="relative z-10 container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-display font-medium text-white mb-6">
            The Science Library
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Exploring the intersection of primordial minerals, structured water, and bioelectric biology.
          </p>
        </FadeIn>
      </div>

      <div className="container mx-auto px-4 py-16 space-y-20">
        {CLUSTERS.map((cluster) => {
          const clusterArticles = ARTICLES.filter(a => a.clusterId === cluster.id);
          
          if (clusterArticles.length === 0) return null;

          return (
            <FadeIn key={cluster.id}>
              <section id={cluster.slug} className="scroll-mt-24">
                <Link 
                  href={`/science/${cluster.slug}`}
                  className="group flex flex-col md:flex-row gap-6 md:items-end border-b border-border pb-6 mb-8 cursor-pointer hover:border-accent/50 transition-colors" 
                  data-testid={`link-cluster-${cluster.slug}`}
                >
                  <div 
                    className="p-3 rounded-xl w-fit transition-colors"
                    style={{ 
                      backgroundColor: cluster.color ? `${cluster.color}20` : undefined,
                    }}
                  >
                    <cluster.icon 
                      className="w-8 h-8" 
                      style={{ color: cluster.color || 'hsl(var(--accent))' }}
                    />
                  </div>
                  <div className="flex-1">
                    <h2 
                      className="text-3xl font-display font-medium text-primary mb-2 transition-colors flex items-center gap-2 group-hover:opacity-80"
                      style={{ color: cluster.color || undefined }}
                    >
                      {cluster.name}
                      <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </h2>
                    <p className="text-muted-foreground">
                      {cluster.description}
                    </p>
                  </div>
                </Link>

                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {clusterArticles.map(article => (
                    <StaggerItem key={article.id}>
                      <ScaleOnHover>
                        <Link 
                          href={`/science/${article.slug}`}
                          className="group flex flex-col h-full bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:border-accent/30 transition-all duration-300"
                        >
                          <div className="p-8 flex-grow">
                            <div className="flex flex-wrap gap-2 mb-4">
                              {article.tags.slice(0, 3).map(tag => (
                                <span key={tag} className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground bg-muted px-2 py-1 rounded-md">
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <h3 className="text-xl font-display font-medium text-primary mb-3 group-hover:text-accent transition-colors">
                              {article.title}
                            </h3>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                              {article.summary}
                            </p>
                          </div>
                          <div className="px-8 py-4 bg-muted/30 border-t border-border group-hover:bg-accent/5 transition-colors flex items-center justify-between">
                            <span className="text-xs font-medium text-muted-foreground">
                              {new Date(article.publishedAt).toLocaleDateString()}
                            </span>
                            <span className="text-xs font-bold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                              Read <ArrowRight className="w-3 h-3" />
                            </span>
                          </div>
                        </Link>
                      </ScaleOnHover>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </section>
            </FadeIn>
          );
        })}
      </div>
    </Layout>
  );
}
