import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Layout from "@/components/layout";

const easeOut = [0.23, 0.82, 0.35, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 as const },
  transition: { duration: 0.6, ease: easeOut },
};

type HeroSection = {
  headline: string;
  subheadline?: string;
  tldr?: string;
  ctaLabel?: string;
  imageDescription?: string;
};

type TextSection = {
  id: string;
  title: string;
  kind: "text";
  content: string;
};

type ListSection = {
  id: string;
  title: string;
  kind: "list";
  content: {
    items: Array<{
      label: string;
      description: string;
    }>;
  };
};

type FaqSection = {
  id: string;
  title: string;
  kind: "faq";
  content: {
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
};

type CtaSection = {
  id: string;
  title: string;
  kind: "cta";
  content: {
    text: string;
    buttonLabel: string;
  };
};

type Section = TextSection | ListSection | FaqSection | CtaSection;

type RelatedPage = {
  slug: string;
  title: string;
  reason: string;
};

type ContentJson = {
  type: string;
  hero: HeroSection;
  sections: Section[];
  relatedPages?: RelatedPage[];
};

type MagicPageData = {
  id: string;
  key: string;
  title: string;
  path: string;
  summary?: string;
  seoTitle?: string;
  seoDescription?: string;
  entities?: string[];
  metadata?: {
    contentJson?: ContentJson;
  };
};

function renderMarkdown(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-semibold text-white">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={i} className="text-slate-300">{part.slice(1, -1)}</em>;
    }
    return part;
  });
}

function TextContent({ content }: { content: string }) {
  const paragraphs = content.split("\n\n");
  
  return (
    <div className="space-y-4">
      {paragraphs.map((para, i) => {
        if (para.startsWith("- ")) {
          const items = para.split("\n").filter(l => l.startsWith("- "));
          return (
            <ul key={i} className="space-y-3 text-slate-300">
              {items.map((item, j) => (
                <li key={j} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                  <span>{renderMarkdown(item.slice(2))}</span>
                </li>
              ))}
            </ul>
          );
        }
        if (/^\d+\.\s/.test(para)) {
          const items = para.split("\n").filter(l => /^\d+\.\s/.test(l));
          return (
            <ol key={i} className="space-y-3 text-slate-300">
              {items.map((item, j) => (
                <li key={j} className="flex items-start gap-3">
                  <span className="text-emerald-400 font-semibold text-sm mt-0.5">{j + 1}.</span>
                  <span>{renderMarkdown(item.replace(/^\d+\.\s/, ""))}</span>
                </li>
              ))}
            </ol>
          );
        }
        return (
          <p key={i} className="text-slate-300 leading-relaxed">
            {renderMarkdown(para)}
          </p>
        );
      })}
    </div>
  );
}

function HeroSectionComponent({ hero, title }: { hero: HeroSection; title: string }) {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 py-24 md:py-32">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <motion.div {...fadeUp}>
          <Link 
            href="/science"
            className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-emerald-400 mb-8 transition-colors" 
            data-testid="link-back-to-science"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Science Library
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-white mb-6 leading-tight tracking-tight"
            data-testid="text-page-title"
          >
            {hero.headline || title}
          </h1>
          
          {hero.subheadline && (
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed mb-10">
              {hero.subheadline}
            </p>
          )}
          
          {hero.tldr && (
            <motion.div 
              className="bg-slate-900/60 border border-indigo-500/20 rounded-2xl p-6 md:p-8 backdrop-blur-sm mb-10"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              data-testid="text-tldr"
            >
              <p className="text-base md:text-lg text-slate-200 leading-relaxed">
                <span className="text-emerald-400 font-semibold">TL;DR:</span>{" "}
                {hero.tldr}
              </p>
            </motion.div>
          )}
          
          {hero.ctaLabel && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Link href="/shop/andara-ionic-100ml">
                <Button 
                  size="lg" 
                  className="rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/25"
                  data-testid="button-hero-cta"
                >
                  {hero.ctaLabel}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function SectionRenderer({ section, index }: { section: Section; index: number }) {
  const isEven = index % 2 === 0;
  
  if (section.kind === "text") {
    return (
      <motion.section
        {...fadeUp}
        className={`py-16 md:py-20 ${isEven ? 'bg-slate-950' : 'bg-slate-900/50'}`}
        data-testid={`section-${section.id}`}
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-display font-medium text-white mb-6 tracking-tight">
            {section.title}
          </h2>
          <TextContent content={section.content} />
        </div>
      </motion.section>
    );
  }
  
  if (section.kind === "list") {
    return (
      <motion.section
        {...fadeUp}
        className={`py-16 md:py-20 ${isEven ? 'bg-slate-950' : 'bg-slate-900/50'}`}
        data-testid={`section-${section.id}`}
      >
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-display font-medium text-white mb-8 tracking-tight text-center">
            {section.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {section.content.items.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-cyan-600/20 to-indigo-600/20 flex items-center justify-center mb-4">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.label}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {renderMarkdown(item.description)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    );
  }
  
  if (section.kind === "faq") {
    return (
      <motion.section
        {...fadeUp}
        className="py-16 md:py-20 bg-slate-900 border-y border-slate-800/50"
        data-testid={`section-${section.id}`}
      >
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-display font-medium text-white mb-8 tracking-tight text-center">
            {section.title}
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            {section.content.items.map((item, i) => (
              <AccordionItem 
                key={i} 
                value={`faq-${i}`} 
                className="border border-slate-800 rounded-xl px-6 bg-slate-900/50 data-[state=open]:border-indigo-500/30 transition-colors"
              >
                <AccordionTrigger className="text-left text-white font-medium hover:no-underline py-5 hover:text-indigo-400 transition-colors">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-400 pb-5 leading-relaxed">
                  {renderMarkdown(item.answer)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </motion.section>
    );
  }
  
  if (section.kind === "cta") {
    return (
      <motion.section
        {...fadeUp}
        className="py-16 md:py-20 bg-linear-to-b from-slate-950 to-slate-900"
        data-testid={`section-${section.id}`}
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-linear-to-br from-indigo-900/40 via-slate-900 to-emerald-900/30 border border-indigo-500/20 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/30 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/30 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-display font-medium text-white mb-6">
                {section.title}
              </h2>
              <p className="text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
                {renderMarkdown(section.content.text)}
              </p>
              <Link href="/shop/andara-ionic-100ml">
                <Button 
                  size="lg" 
                  className="rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/25"
                  data-testid="button-cta-section"
                >
                  {section.content.buttonLabel}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.section>
    );
  }
  
  return null;
}

function EntityTags({ entities }: { entities: string[] }) {
  if (!entities || entities.length === 0) return null;
  
  return (
    <div className="flex flex-wrap gap-2 py-6">
      {entities.slice(0, 8).map((entity, i) => (
        <span
          key={i}
          className="text-xs font-medium text-slate-400 bg-slate-800/50 border border-slate-700/50 px-3 py-1.5 rounded-full"
        >
          {entity}
        </span>
      ))}
    </div>
  );
}

function RelatedPagesSection({ relatedPages, currentSlug }: { relatedPages: RelatedPage[]; currentSlug: string }) {
  const filteredPages = relatedPages.filter(p => p.slug !== currentSlug);
  
  if (filteredPages.length === 0) return null;
  
  return (
    <motion.section
      {...fadeUp}
      className="py-16 bg-slate-950 border-t border-slate-800/50"
      data-testid="section-related-pages"
    >
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-2xl md:text-3xl font-display font-medium text-white mb-4">
          Continue Exploring the Science
        </h2>
        <p className="text-slate-400 mb-8">
          This topic connects to other foundational pillars in the Andara Ionic Science Library.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPages.map((related, i) => (
            <Link key={i} href={`/science/${related.slug}`}>
              <motion.div
                whileHover={{ y: -4 }}
                className="group bg-slate-900/70 border border-slate-800 rounded-xl p-5 hover:border-emerald-500/30 transition-all cursor-pointer h-full"
                data-testid={`link-related-${related.slug}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors">
                    {related.title}
                  </h3>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors shrink-0 mt-1" />
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {related.reason}
                </p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default function MagicPage({ page }: { page: MagicPageData }) {
  const contentJson = page.metadata?.contentJson;
  
  if (!contentJson) {
    return (
      <Layout>
        <div className="min-h-screen bg-slate-950 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-3xl font-display font-medium text-white mb-4">{page.title}</h1>
            {page.summary && (
              <p className="text-slate-400 max-w-2xl mx-auto">{page.summary}</p>
            )}
            <p className="text-slate-500 mt-8">Page content is being prepared...</p>
          </div>
        </div>
      </Layout>
    );
  }
  
  const currentSlug = page.key || page.path.split('/').pop() || '';
  
  return (
    <Layout>
      <article className="min-h-screen bg-slate-950">
        <HeroSectionComponent hero={contentJson.hero} title={page.title} />
        
        {page.entities && (
          <div className="bg-slate-950 border-b border-slate-800/50">
            <div className="container mx-auto px-4 max-w-4xl">
              <EntityTags entities={page.entities} />
            </div>
          </div>
        )}
        
        {contentJson.sections.map((section, index) => (
          <SectionRenderer key={section.id} section={section} index={index} />
        ))}
        
        {contentJson.relatedPages && contentJson.relatedPages.length > 0 && (
          <RelatedPagesSection 
            relatedPages={contentJson.relatedPages} 
            currentSlug={currentSlug}
          />
        )}
      </article>
    </Layout>
  );
}
