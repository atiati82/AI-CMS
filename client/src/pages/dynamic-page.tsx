import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import Layout from "@/components/layout";
import Breadcrumbs from "@/components/breadcrumbs";
import MagicPage from "@/components/magic-page";
import AndaraPageRenderer from "@/components/andara-page-renderer";
import { Link } from "wouter";
import { ArrowRight, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Page = {
  id: string;
  key: string;
  title: string;
  path: string;
  pageType: string;
  template: string;
  templateId: string | null;
  clusterKey: string | null;
  parentKey: string | null;
  priority: number;
  summary: string | null;
  content: string | null;
  aiStartupHtml: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  featuredImage: string | null;
  icon: string | null;
  status: string;
  metadata: Record<string, any> | null;
  entities: string[] | null;
};

type HtmlTemplate = {
  id: string;
  name: string;
  slug: string;
  templateType: string;
  htmlContent: string;
  componentClass: string | null;
};

function PageContent({ page, template }: { page: Page; template?: HtmlTemplate | null }) {
  const hasContentJson = page.metadata?.contentJson;
  
  if (template && template.htmlContent) {
    const templateHtml = formatContent(template.htmlContent);
    const pageContent = page.aiStartupHtml ? formatContent(page.aiStartupHtml) : '';
    const combinedHtml = templateHtml.includes('{{content}}') 
      ? templateHtml.replace('{{content}}', pageContent)
      : templateHtml + pageContent;
    
    return <AndaraPageRenderer html={combinedHtml} />;
  }
  
  if (hasContentJson) {
    return (
      <MagicPage 
        page={{
          id: page.id,
          key: page.key,
          title: page.title,
          path: page.path,
          summary: page.summary || undefined,
          seoTitle: page.seoTitle || undefined,
          seoDescription: page.seoDescription || undefined,
          entities: page.entities || undefined,
          metadata: page.metadata || undefined,
        }} 
      />
    );
  }

  if (page.content) {
    return (
      <Layout>
        <div className="bg-gradient-to-b from-primary/5 via-background to-background py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <Breadcrumbs pageKey={page.key} className="mb-8" />
            
            <h1 
              className="text-3xl md:text-4xl lg:text-5xl font-display font-medium text-primary mb-6"
              data-testid="page-title"
            >
              {page.title}
            </h1>
            
            {page.summary && (
              <p className="text-xl text-muted-foreground mb-8" data-testid="page-summary">
                {page.summary}
              </p>
            )}
            
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: formatContent(page.content) }}
              data-testid="page-content"
            />
          </div>
        </div>
      </Layout>
    );
  }

  if (page.aiStartupHtml) {
    const processedHtml = formatContent(page.aiStartupHtml);
    const isFullAndaraPage = processedHtml.includes('andara-page') || 
                              processedHtml.includes('andara-container') ||
                              processedHtml.includes('andara-section') ||
                              processedHtml.includes('<main');
    
    if (isFullAndaraPage) {
      return <AndaraPageRenderer html={processedHtml} />;
    }
    
    return (
      <Layout>
        <article className="min-h-screen pb-16">
          <AndaraPageRenderer html={processedHtml} className="article-content andara-page" />
        </article>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-gradient-to-b from-primary/5 via-background to-background py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Breadcrumbs pageKey={page.key} className="mb-8" />
          
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-6">
              <FileText className="w-8 h-8 text-accent" />
            </div>
            
            <h1 
              className="text-3xl md:text-4xl font-display font-medium text-primary mb-4"
              data-testid="page-title"
            >
              {page.title}
            </h1>
            
            {page.summary && (
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8" data-testid="page-summary">
                {page.summary}
              </p>
            )}
            
            <div className="bg-muted/50 border border-border rounded-xl p-8 max-w-md mx-auto">
              <p className="text-muted-foreground mb-4">
                This page is currently being prepared. Check back soon for full content.
              </p>
              <Link href="/">
                <Button variant="outline" className="rounded-full" data-testid="button-back-home">
                  Back to Home
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function decodeHtmlEntities(text: string): string {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
}

function formatContent(content: string): string {
  if (!content) return '';
  
  // First decode HTML entities if the content appears to be encoded
  let processedContent = content;
  if (content.includes('&lt;') || content.includes('&gt;')) {
    processedContent = decodeHtmlEntities(content);
  }
  
  // Check if it's HTML content
  if (processedContent.trim().startsWith('<') && (
    processedContent.includes('<p>') || 
    processedContent.includes('<h1>') || 
    processedContent.includes('<h2>') || 
    processedContent.includes('<div>') ||
    processedContent.includes('<section>') ||
    processedContent.includes('<main>') ||
    processedContent.includes('<ul>') ||
    processedContent.includes('<ol>') ||
    processedContent.includes('<style>')
  )) {
    return processedContent;
  }
  
  return processedContent
    .split('\n\n')
    .map(para => `<p>${para}</p>`)
    .join('');
}

function usePageSEO(page: Page | undefined) {
  useEffect(() => {
    if (!page) return;

    const originalTitle = document.title;
    const pageTitle = page.seoTitle || page.title;
    document.title = `${pageTitle} | Andara Ionic`;

    const metaDescription = document.querySelector('meta[name="description"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const ogImage = document.querySelector('meta[property="og:image"]');
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');

    const originalMeta = {
      description: metaDescription?.getAttribute('content') ?? null,
      ogTitle: ogTitle?.getAttribute('content') ?? null,
      ogDescription: ogDescription?.getAttribute('content') ?? null,
      ogImage: ogImage?.getAttribute('content') ?? null,
      twitterTitle: twitterTitle?.getAttribute('content') ?? null,
      twitterDescription: twitterDescription?.getAttribute('content') ?? null,
    };

    if (page.seoDescription) {
      metaDescription?.setAttribute('content', page.seoDescription);
      ogDescription?.setAttribute('content', page.seoDescription);
      twitterDescription?.setAttribute('content', page.seoDescription);
    }
    if (pageTitle) {
      ogTitle?.setAttribute('content', pageTitle);
      twitterTitle?.setAttribute('content', pageTitle);
    }
    if (page.featuredImage) {
      ogImage?.setAttribute('content', page.featuredImage);
    }

    return () => {
      document.title = originalTitle;
      if (metaDescription && originalMeta.description !== null) {
        metaDescription.setAttribute('content', originalMeta.description);
      }
      if (ogTitle && originalMeta.ogTitle !== null) {
        ogTitle.setAttribute('content', originalMeta.ogTitle);
      }
      if (ogDescription && originalMeta.ogDescription !== null) {
        ogDescription.setAttribute('content', originalMeta.ogDescription);
      }
      if (ogImage && originalMeta.ogImage !== null) {
        ogImage.setAttribute('content', originalMeta.ogImage);
      }
      if (twitterTitle && originalMeta.twitterTitle !== null) {
        twitterTitle.setAttribute('content', originalMeta.twitterTitle);
      }
      if (twitterDescription && originalMeta.twitterDescription !== null) {
        twitterDescription.setAttribute('content', originalMeta.twitterDescription);
      }
    };
  }, [page]);
}

export default function DynamicPage() {
  const [location] = useLocation();
  
  const { data: page, isLoading, error } = useQuery<Page>({
    queryKey: [`/api/pages/by-path${location}`],
  });

  const { data: template } = useQuery<HtmlTemplate>({
    queryKey: [`/api/html-templates/${page?.templateId}`],
    enabled: !!page?.templateId,
  });

  usePageSEO(page);

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-accent" />
        </div>
      </Layout>
    );
  }

  if (error || !page) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-display font-medium text-primary mb-4">Page Not Found</h1>
            <p className="text-muted-foreground mb-6">The page you're looking for doesn't exist.</p>
            <Link href="/">
              <Button variant="outline" className="rounded-full" data-testid="button-not-found-home">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return <PageContent page={page} template={template} />;
}
