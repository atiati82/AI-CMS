import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/layout";
import { ChevronRight, Map, Folder, FileText, ShoppingBag, BookOpen, Users, Shield, Newspaper, Wrench } from "lucide-react";

type Page = {
  id: string;
  key: string;
  title: string;
  path: string;
  parentKey: string | null;
  status: string;
  pageType: string;
  template: string;
  clusterKey: string | null;
};

type PageWithChildren = Page & {
  children: PageWithChildren[];
};

const typeIcons: Record<string, React.ReactNode> = {
  page: <FileText className="w-4 h-4" />,
  product: <ShoppingBag className="w-4 h-4" />,
  article: <BookOpen className="w-4 h-4" />,
  tool: <Wrench className="w-4 h-4" />,
  blog_post: <Newspaper className="w-4 h-4" />,
};

const sectionIcons: Record<string, React.ReactNode> = {
  shop: <ShoppingBag className="w-5 h-5" />,
  science: <BookOpen className="w-5 h-5" />,
  about: <Users className="w-5 h-5" />,
  trust: <Shield className="w-5 h-5" />,
  blog: <Newspaper className="w-5 h-5" />,
};

function PageTreeItem({ page, level = 0 }: { page: PageWithChildren; level?: number }) {
  const hasChildren = page.children && page.children.length > 0;
  
  return (
    <div className="group">
      <Link
        href={page.path}
        className="flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-accent/10 transition-colors"
        style={{ paddingLeft: `${level * 20 + 12}px` }}
        data-testid={`sitemap-link-${page.key}`}
      >
        {typeIcons[page.pageType] || <FileText className="w-4 h-4" />}
        <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
          {page.title}
        </span>
        {hasChildren && (
          <ChevronRight className="w-3 h-3 ml-auto text-border" />
        )}
      </Link>
      {hasChildren && (
        <div className="border-l border-border/50 ml-6">
          {page.children.map((child) => (
            <PageTreeItem key={child.key} page={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

function SectionCard({ title, icon, pages }: { title: string; icon: React.ReactNode; pages: Page[] }) {
  if (pages.length === 0) return null;
  
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
        <div className="p-2 rounded-lg bg-accent/10 text-accent">
          {icon}
        </div>
        <h3 className="text-lg font-display font-medium text-primary">{title}</h3>
        <span className="ml-auto text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
          {pages.length} pages
        </span>
      </div>
      <div className="space-y-1">
        {pages.map((page) => (
          <Link
            key={page.key}
            href={page.path}
            className="flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-accent/10 transition-colors group"
            data-testid={`sitemap-section-link-${page.key}`}
          >
            {typeIcons[page.pageType] || <FileText className="w-4 h-4 text-muted-foreground" />}
            <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
              {page.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function SitemapPage() {
  const { data: pageTree, isLoading } = useQuery<PageWithChildren[]>({
    queryKey: ["/api/pages?tree=true"],
  });

  const { data: allPages } = useQuery<Page[]>({
    queryKey: ["/api/pages"],
  });

  const publishedPages = allPages?.filter(p => p.status === 'published') || [];
  
  const shopPages = publishedPages.filter(p => 
    p.parentKey === 'shop_overview' || p.key === 'shop_overview'
  );
  
  const sciencePages = publishedPages.filter(p => 
    p.parentKey === 'science_library_overview' || 
    p.path.startsWith('/science/')
  );
  
  const aboutPages = publishedPages.filter(p => 
    p.parentKey === 'about_andara' || p.key === 'about_andara'
  );
  
  const trustPages = publishedPages.filter(p => 
    p.parentKey === 'trust_quality_overview' || p.key === 'trust_quality_overview'
  );
  
  const legalPages = publishedPages.filter(p => p.template === 'legal');

  return (
    <Layout>
      <div className="bg-gradient-to-b from-primary/5 via-background to-background py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-accent/10">
              <Map className="w-6 h-6 text-accent" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-medium text-primary" data-testid="sitemap-title">
              Sitemap
            </h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mb-12">
            Explore all pages and content on Andara Ionic. Use this map to discover our science library, 
            products, and educational resources.
          </p>

          {isLoading ? (
            <div className="text-center py-12 text-muted-foreground">
              Loading sitemap...
            </div>
          ) : (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SectionCard 
                  title="Shop" 
                  icon={sectionIcons.shop} 
                  pages={shopPages}
                />
                <SectionCard 
                  title="About" 
                  icon={sectionIcons.about} 
                  pages={aboutPages}
                />
                <SectionCard 
                  title="Trust & Quality" 
                  icon={sectionIcons.trust} 
                  pages={trustPages}
                />
                <SectionCard 
                  title="Legal" 
                  icon={<FileText className="w-5 h-5" />} 
                  pages={legalPages}
                />
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
                  <div className="p-2 rounded-lg bg-accent/10 text-accent">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-display font-medium text-primary">Science Library</h3>
                  <span className="ml-auto text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                    {sciencePages.length} pages
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
                  {sciencePages.map((page) => (
                    <Link
                      key={page.key}
                      href={page.path}
                      className="flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-accent/10 transition-colors group"
                      data-testid={`sitemap-science-${page.key}`}
                    >
                      <BookOpen className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors truncate">
                        {page.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="bg-muted/30 border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Folder className="w-5 h-5 text-accent" />
                  <h3 className="text-lg font-display font-medium text-primary">Full Page Tree</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  Complete hierarchical view of all published pages on the site.
                </p>
                <div className="bg-background rounded-lg border border-border p-4 max-h-[500px] overflow-y-auto">
                  {pageTree?.filter(p => p.status === 'published').map((page) => (
                    <PageTreeItem key={page.key} page={page} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
