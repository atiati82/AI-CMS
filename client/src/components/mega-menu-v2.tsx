import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "wouter";
import { ChevronDown, Menu, X, ShoppingBag, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { CartIcon } from "@/components/cart-drawer";
import { motion, AnimatePresence, timing, easing, staggerDelay } from "@/lib/motion";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { navigationConfig, NavSection, NavCategory, FeaturedItem } from "@/data/navigation-config";
import { AndaraDynamicIcon } from "@/components/visuals/svg/AndaraIconRegistry";

// --- Components ---

function FeaturedCard({ item }: { item: FeaturedItem }) {
  return (
    <Link href={item.path} className="group relative overflow-hidden rounded-xl bg-slate-900/40 border border-white/5 hover:border-emerald-500/30 transition-all duration-300 flex-1 min-w-[200px] flex flex-col justify-end p-5 aspect-[4/3]">
      {/* Texture Layer */}
      {item.texture && (
        <div className="absolute inset-0 z-0">
          <img
            src={item.texture}
            alt=""
            className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-700 mix-blend-overlay filter saturate-0 group-hover:saturate-50"
          />
        </div>
      )}

      {/* Gradient Overlay */}
      <div className={cn("absolute inset-0 bg-gradient-to-br z-10 opacity-60 group-hover:opacity-80 transition-opacity mix-blend-multiply", item.imageGradient)} />

      {/* Text Shadow Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent z-20" />

      <div className="relative z-30">
        <h3 className="text-lg font-display font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors">
          {item.title}
        </h3>
        <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors line-clamp-2">
          {item.subtitle}
        </p>
      </div>
    </Link>
  );
}

function SectionColumn({ category }: { category: NavCategory }) {
  return (
    <div className="space-y-3">
      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-2">
        {category.title}
      </h4>
      <ul className="space-y-1">
        {category.items.map((item) => (
          <li key={item.path}>
            <Link
              href={item.path}
              className="flex items-center gap-2 px-2 py-1.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-md transition-colors"
            >
              {item.icon && <AndaraDynamicIcon topic={item.icon} size={14} showGlow={false} />}
              <span>{item.label}</span>
              {item.badge && (
                <span className="ml-auto text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-full border border-emerald-500/20">
                  {item.badge}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DesktopDropdown({ section, isActive }: { section: NavSection; isActive: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 200);
  };

  const hasContent = (section.featured && section.featured.length > 0) || (section.categories && section.categories.length > 0);

  if (!hasContent) {
    return (
      <Link
        href={section.path}
        className={cn(
          "flex items-center gap-1.5 px-4 py-2 text-sm font-display font-semibold transition-all rounded-full hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-amber-400/50",
          isActive
            ? "andara-text-gold-gradient bg-white/5 shadow-[0_0_12px_rgba(251,191,36,0.3)]"
            : "text-slate-300 hover:text-white"
        )}
      >
        {section.icon && <AndaraDynamicIcon topic={section.icon} size={18} showGlow={false} />}
        {section.label}
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={section.path}
        className={cn(
          "flex items-center gap-1.5 px-4 py-2 text-sm font-display font-semibold transition-all rounded-full group cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400/50",
          isActive
            ? "andara-text-gold-gradient bg-white/5 shadow-[0_0_12px_rgba(251,191,36,0.3)]"
            : isOpen
              ? "text-white bg-white/5"
              : "text-slate-300 hover:text-white hover:bg-white/5"
        )}
        onClick={() => setIsOpen(false)}
      >
        {section.icon && <AndaraDynamicIcon topic={section.icon} size={18} showGlow={false} />}
        {section.label}
        <ChevronDown className={cn("w-3 h-3 transition-transform duration-200 opacity-50 group-hover:opacity-100", isOpen && "rotate-180")} />
      </Link>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-0 pt-4 w-[600px] z-50 origin-top-left"
          >
            <div className="andara-glass-panel p-6 rounded-2xl border border-white/10 shadow-2xl bg-[#020617]/90 backdrop-blur-xl">
              <div className="flex gap-8">
                {/* Visual Featured Side */}
                {section.featured && (
                  <div className="flex-1 flex flex-col gap-3 min-w-[220px]">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Featured</h4>
                    <div className="grid gap-3">
                      {section.featured.map((item) => (
                        <FeaturedCard key={item.path} item={item} />
                      ))}
                    </div>
                  </div>
                )}

                {/* List Categories Side */}
                {section.categories && (
                  <div className={cn("grid gap-8 flex-1", section.categories.length > 1 ? "grid-cols-2" : "grid-cols-1")}>
                    {section.categories.map((cat) => (
                      <SectionColumn key={cat.title} category={cat} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [expandedKey, setExpandedKey] = useState<string | null>(null);

  const toggleExpand = (key: string) => {
    setExpandedKey(expandedKey === key ? null : key);
  };

  if (!isOpen) return null;

  return createPortal(
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[90]"
        onClick={onClose}
      />
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="fixed inset-y-0 right-0 w-full max-w-sm bg-[#020617] border-l border-white/10 z-[100] overflow-y-auto"
      >
        <div className="p-6 space-y-8">
          <div className="flex items-center justify-between">
            <span className="text-lg font-display font-bold text-white">Menu</span>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-white bg-white/5 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
            {navigationConfig.map((section) => (
              <div key={section.key} className="border-b border-white/5 pb-2">
                <div className="flex items-center justify-between">
                  <Link
                    href={section.path}
                    onClick={onClose}
                    className="flex-1 py-3 text-lg font-medium text-slate-200 flex items-center gap-2"
                  >
                    {section.icon && <AndaraDynamicIcon topic={section.icon} size={22} showGlow={false} />}
                    {section.label}
                  </Link>
                  {(section.categories || section.featured) && (
                    <button
                      onClick={() => toggleExpand(section.key)}
                      className="p-3 text-slate-400"
                    >
                      <ChevronDown className={cn("w-5 h-5 transition-transform", expandedKey === section.key && "rotate-180")} />
                    </button>
                  )}
                </div>

                <AnimatePresence>
                  {expandedKey === section.key && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-2 pb-4 px-2 space-y-6">
                        {section.featured && (
                          <div className="space-y-3">
                            <h5 className="text-xs font-bold text-slate-600 uppercase tracking-wider">Featured</h5>
                            {section.featured.map(item => (
                              <Link key={item.path} href={item.path} onClick={onClose} className="block p-3 rounded-lg bg-white/5 border border-white/5">
                                <div className="font-bold text-emerald-400">{item.title}</div>
                                <div className="text-xs text-slate-400">{item.subtitle}</div>
                              </Link>
                            ))}
                          </div>
                        )}
                        {section.categories && section.categories.map(cat => (
                          <div key={cat.title}>
                            <h5 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">{cat.title}</h5>
                            <div className="space-y-2 pl-2 border-l border-white/10">
                              {cat.items.map(item => (
                                <Link key={item.path} href={item.path} onClick={onClose} className="flex items-center gap-2 py-1 text-slate-400 hover:text-emerald-300">
                                  {item.icon && <AndaraDynamicIcon topic={item.icon} size={14} showGlow={false} />}
                                  <span>{item.label}</span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          <div className="pt-4">
            <Link href="/shop" onClick={onClose} className="flex items-center justify-center gap-2 w-full py-4 bg-emerald-600 text-white font-bold rounded-xl active:scale-95 transition-transform">
              <ShoppingBag className="w-5 h-5" />
              Shop Now
            </Link>
          </div>
        </div>
      </motion.div>
    </>,
    document.body
  );
}

export default function MegaMenu() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard navigation: Escape key closes mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  const isActiveSection = (sectionPath: string) => {
    if (sectionPath === '/') return location === '/';
    return location.startsWith(sectionPath);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
          scrolled ? "andara-glass-header py-2" : "bg-transparent border-transparent py-4"
        )}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group z-50">
            <img src="/andara-gold-logo.svg" alt="Andara Ionic" className="h-8 w-auto mr-1 transition-transform group-hover:scale-105" />
            <span className="flex flex-col leading-none">
              <span className="text-lg font-display font-bold tracking-wide andara-text-gold-gradient">ANDARA</span>
              <span className="text-[10px] font-display font-light tracking-[0.2em] text-slate-400 uppercase">Ionic Minerals</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-2">
            {navigationConfig.map((section) => (
              <DesktopDropdown
                key={section.key}
                section={section}
                isActive={isActiveSection(section.path)}
              />
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <ThemeToggle />
            </div>

            <Link href="/shop" className={cn(
              "hidden lg:flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-all",
              scrolled ? "bg-emerald-600/90 text-white hover:bg-emerald-500" : "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
            )}>
              <ShoppingBag className="w-4 h-4" />
              <span>Shop</span>
            </Link>

            <CartIcon />

            <button
              className="lg:hidden p-2 text-slate-200 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}

