import { Link, useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/layout";
import MagicPage from "@/components/magic-page";
import { ARTICLES, CLUSTERS } from "@/lib/data";
import { ArrowLeft, Clock, Tag, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type PageData = {
  id: string;
  key: string;
  title: string;
  path: string;
  pageType: string;
  template: string;
  summary?: string;
  content?: string;
  aiStartupHtml?: string;
  seoTitle?: string;
  seoDescription?: string;
  entities?: string[];
  metadata?: {
    contentJson?: any;
  };
  status: string;
};

function decodeHtmlEntities(text: string): string {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
}

function formatContent(content: string): string {
  if (!content) return '';

  let processedContent = content;
  if (content.includes('&lt;') || content.includes('&gt;')) {
    processedContent = decodeHtmlEntities(content);
  }

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

export default function ArticlePage() {
  const [matchSingle, paramsSingle] = useRoute("/science/:slug");
  const [matchCluster, paramsCluster] = useRoute("/science/:cluster/:slug");

  // Build the full path based on which route matched
  const fullPath = matchCluster && paramsCluster
    ? `/science/${paramsCluster.cluster}/${paramsCluster.slug}`
    : matchSingle && paramsSingle
      ? `/science/${paramsSingle.slug}`
      : null;

  const { data: dbPage, isLoading } = useQuery<PageData>({
    queryKey: ["/api/pages/by-path", fullPath],
    queryFn: async () => {
      if (!fullPath) return null;
      const res = await fetch(`/api/pages/by-path${fullPath}`);
      if (!res.ok) {
        if (res.status === 404) return null;
        throw new Error("Failed to fetch page");
      }
      return res.json();
    },
    enabled: !!fullPath,
    retry: false,
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-accent" />
        </div>
      </Layout>
    );
  }

  if (dbPage && dbPage.metadata?.contentJson) {
    return <MagicPage page={dbPage} />;
  }

  // Handle pages with HTML content in the content field
  if (dbPage && dbPage.content) {
    const processedHtml = formatContent(dbPage.content);
    const isFullAndaraPage = processedHtml.includes('andara-page') ||
      processedHtml.includes('andara-container') ||
      processedHtml.includes('<style>');

    if (isFullAndaraPage) {
      return (
        <Layout>
          <div
            className="andara-page-wrapper"
            dangerouslySetInnerHTML={{ __html: processedHtml }}
            data-testid="page-html-content"
          />
        </Layout>
      );
    }

    return (
      <Layout>
        <div className="andara-page">
          <article className="andara-section">
            <div
              className="andara-content-wrapper"
              dangerouslySetInnerHTML={{ __html: processedHtml }}
              data-testid="page-html-content"
            />
          </article>
        </div>
      </Layout>
    );
  }

  // Handle pages with HTML content in the aiStartupHtml field
  if (dbPage && dbPage.aiStartupHtml) {
    // Check if content is JSX/React code that needs integration (not renderable as HTML)
    const isJsxContent = dbPage.aiStartupHtml.includes('motion.') ||
      dbPage.aiStartupHtml.includes('variants={') ||
      dbPage.aiStartupHtml.includes('React.FC') ||
      dbPage.aiStartupHtml.includes('export const') ||
      dbPage.aiStartupHtml.includes('import {');

    if (isJsxContent) {
      return (
        <Layout>
          <div className="andara-page">
            <div className="container mx-auto px-4 py-20 text-center max-w-2xl">
              <h1 className="text-2xl font-bold mb-4" data-testid="text-needs-integration">
                {dbPage.title || 'Page Pending Integration'}
              </h1>
              <p className="text-muted-foreground mb-6">
                This page contains a React component template that needs to be integrated before viewing.
              </p>
              <p className="text-sm text-muted-foreground">
                Go to Admin → Pages → select this page → click "Integrate Page" to generate the component.
              </p>
              <Link href="/science">
                <Button variant="link" className="mt-4" data-testid="link-back-library">Back to Science Library</Button>
              </Link>
            </div>
          </div>
        </Layout>
      );
    }

    const processedHtml = formatContent(dbPage.aiStartupHtml);
    const isFullAndaraPage = processedHtml.includes('andara-page') ||
      processedHtml.includes('andara-container') ||
      processedHtml.includes('<style>');

    if (isFullAndaraPage) {
      return (
        <Layout>
          <div
            className="andara-page-wrapper"
            dangerouslySetInnerHTML={{ __html: processedHtml }}
            data-testid="page-html-content"
          />
        </Layout>
      );
    }

    return (
      <Layout>
        <div className="andara-page">
          <article className="andara-section">
            <div
              className="andara-content-wrapper"
              dangerouslySetInnerHTML={{ __html: processedHtml }}
              data-testid="page-html-content"
            />
          </article>
        </div>
      </Layout>
    );
  }

  const slug = paramsCluster?.slug || paramsSingle?.slug;
  const article = ARTICLES.find(a => a.slug === slug);

  if (!article) {
    return (
      <Layout>
        <div className="container mx-auto py-20 text-center">
          <h1 className="text-2xl font-bold" data-testid="text-not-found">Article not found</h1>
          <Link href="/science">
            <Button variant="link" data-testid="link-back-library">Back to Library</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const cluster = CLUSTERS.find(c => c.id === article.clusterId);

  return (
    <Layout>
      <div className="andara-page">
        <article className="min-h-screen pb-24">
          <div className="bg-slate-900/50 border-b border-slate-800">
            <div className="container mx-auto px-4 py-16 max-w-4xl">
              <Link
                href="/science"
                className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors"
                data-testid="link-back-to-library"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Library
              </Link>

              {cluster && (
                <div className="flex items-center gap-2 mb-6">
                  <cluster.icon className="w-5 h-5 text-accent" />
                  <span className="text-sm font-bold tracking-widest uppercase text-accent">
                    {cluster.name}
                  </span>
                </div>
              )}

              <h1 className="text-4xl md:text-5xl font-display font-medium text-primary mb-6 leading-tight" data-testid="text-article-title">
                {article.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {new Date(article.publishedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  {article.tags.join(", ")}
                </div>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4 py-12 max-w-3xl">
            <div className="text-xl font-medium text-primary/80 mb-10 leading-relaxed border-l-4 border-accent pl-6" data-testid="text-article-summary">
              {article.summary}
            </div>

            <div className="prose prose-slate prose-lg max-w-none">
              {article.content.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
              <p>
                (This is a mockup article. In the full implementation, this section would render rich Markdown content including images, scientific references, and diagrams.)
              </p>
            </div>

            <div className="mt-16 p-8 bg-primary/5 rounded-2xl border border-primary/10 flex flex-col sm:flex-row items-center gap-8">
              <div className="flex-1">
                <h3 className="text-xl font-display font-medium text-primary mb-2">Experience Structured Water</h3>
                <p className="text-muted-foreground mb-4">
                  See how Andara Ionic minerals can transform your daily hydration.
                </p>
                <Link href="/shop/andara-ionic-100ml">
                  <Button data-testid="button-view-product">View Product</Button>
                </Link>
              </div>
            </div>
          </div>
        </article>
      </div>
    </Layout>
  );
}
