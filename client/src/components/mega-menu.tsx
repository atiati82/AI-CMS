import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "wouter";
import { ChevronDown, Menu, X, ShoppingBag, BookOpen, Users, Shield, Newspaper, Microscope, Droplets, Package, Calculator, FlaskConical, Atom, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { CartIcon } from "@/components/cart-drawer";
import { motion, AnimatePresence, stagger, overlay, timing, easing, staggerDelay } from "@/lib/motion";
import { AndaraIcon } from "@/components/andara-icon";

type NavItem = {
  key: string;
  label: string;
  path: string;
};

type NavSection = {
  key: string;
  label: string;
  path: string;
  children: NavItem[];
};

type NavigationData = {
  sections: NavSection[];
  legal: NavItem[];
};

const sectionIcons: Record<string, React.ReactNode> = {
  shop: <ShoppingBag className="w-4 h-4" />,
  science: <Microscope className="w-4 h-4" />,
  ion: <Zap className="w-4 h-4" />,
  experience: <Atom className="w-4 h-4" />,
  about: <Users className="w-4 h-4" />,
  trust: <Shield className="w-4 h-4" />,
  blog: <Newspaper className="w-4 h-4" />,
};

function getItemIcon(key: string, label: string): React.ReactNode {
  const lowerKey = key.toLowerCase();
  const lowerLabel = label.toLowerCase();

  if (lowerKey.includes('100') || lowerLabel.includes('drops')) return <Droplets className="w-4 h-4" />;
  if (lowerKey.includes('bundle') || lowerLabel.includes('bundle') || lowerLabel.includes('pack')) return <Package className="w-4 h-4" />;
  if (lowerKey.includes('calculator') || lowerLabel.includes('calculator')) return <Calculator className="w-4 h-4" />;
  if (lowerLabel.includes('water') || lowerLabel.includes('structured')) return <Droplets className="w-4 h-4" />;
  if (lowerLabel.includes('mineral') || lowerLabel.includes('ionic')) return <Atom className="w-4 h-4" />;
  if (lowerLabel.includes('bioelectric') || lowerLabel.includes('energy')) return <Zap className="w-4 h-4" />;
  if (lowerLabel.includes('science') || lowerLabel.includes('research')) return <FlaskConical className="w-4 h-4" />;
  return null;
}

function categorizeItems(items: NavItem[], sectionKey: string): { category: string; items: NavItem[] }[] {
  if (sectionKey === 'shop') {
    const products: NavItem[] = [];
    const bundles: NavItem[] = [];
    const tools: NavItem[] = [];
    const other: NavItem[] = [];

    items.forEach(item => {
      const lowerLabel = item.label.toLowerCase();
      const lowerKey = item.key.toLowerCase();

      if (lowerLabel.includes('bundle') || lowerLabel.includes('pack')) {
        bundles.push(item);
      } else if (lowerLabel.includes('calculator') || lowerLabel.includes('tool')) {
        tools.push(item);
      } else if (lowerLabel.includes('100 ml') || lowerLabel.includes('1 l') || lowerLabel.includes('drops') || lowerLabel.includes('solution')) {
        products.push(item);
      } else {
        other.push(item);
      }
    });

    const result: { category: string; items: NavItem[] }[] = [];
    if (products.length > 0) result.push({ category: 'Products', items: products });
    if (bundles.length > 0) result.push({ category: 'Bundles', items: bundles });
    if (tools.length > 0) result.push({ category: 'Tools', items: tools });
    if (other.length > 0) result.push({ category: 'More', items: other });

    return result.length > 0 ? result : [{ category: '', items }];
  }

  return [{ category: '', items }];
}

function DesktopDropdown({ section, isActive }: { section: NavSection; isActive: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  };

  const handleItemClick = () => {
    setIsOpen(false);
  };

  if (section.children.length === 0) {
    return (
      <Link
        href={section.path}
        className={cn(
          "flex items-center gap-1.5 px-3 py-2 text-sm font-display font-semibold transition-all rounded-md",
          isActive ? "andara-text-gold-gradient" : "text-white/70 hover:andara-text-gold-gradient"
        )}
        data-testid={`nav-link-${section.key}`}
      >
        {sectionIcons[section.key]}
        {section.label}
      </Link>
    );
  }

  const categorizedItems = categorizeItems(section.children, section.key);

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-1.5 px-3 py-2 text-sm font-display font-semibold transition-all rounded-md cursor-pointer",
          isActive ? "andara-text-gold-gradient" : "text-white/70 hover:andara-text-gold-gradient"
        )}
        data-testid={`nav-link-${section.key}`}
      >
        {sectionIcons[section.key]}
        {section.label}
        <ChevronDown className={cn("w-3 h-3 transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 pt-2 w-80 z-50">
          <div className="andara-glass-menu py-2 max-h-[70vh] overflow-y-auto">
            {categorizedItems.map((group, groupIdx) => (
              <div key={group.category || 'default'}>
                {groupIdx > 0 && <div className="andara-menu-divider" />}

                {group.category && (
                  <div className="andara-menu-section-header">
                    {group.category}
                  </div>
                )}

                {group.items.map((item) => {
                  const icon = getItemIcon(item.key, item.label);
                  return (
                    <Link
                      key={item.key}
                      href={item.path}
                      onClick={handleItemClick}
                      className={cn(
                        icon ? "andara-menu-item" : "andara-menu-item andara-menu-item--compact"
                      )}
                      data-testid={`nav-dropdown-item-${item.key}`}
                    >
                      {icon && (
                        <span className="andara-menu-item-icon">
                          {icon}
                        </span>
                      )}
                      <span className="truncate">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MobileMenu({ sections, isOpen, onClose }: { sections: NavSection[]; isOpen: boolean; onClose: () => void }) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const menuContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
            style={{ top: '64px', zIndex: 99998 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: timing.fast }}
            onClick={onClose}
            data-testid="mobile-menu-backdrop"
          />

          {/* Menu panel */}
          <motion.div
            className="fixed inset-x-0 bottom-0 bg-gradient-to-b from-slate-900 to-slate-950 rounded-t-3xl shadow-2xl"
            style={{
              top: '72px',
              zIndex: 99999,
              WebkitOverflowScrolling: 'touch',
              overflowY: 'auto',
              paddingBottom: 'env(safe-area-inset-bottom, 20px)'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: timing.normal, ease: easing.smooth }}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            data-testid="mobile-menu-overlay"
          >
            {/* Drag indicator */}
            <div className="flex justify-center pt-3 pb-2">
              <motion.div
                className="w-12 h-1 bg-slate-700 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: timing.normal, delay: 0.1 }}
              />
            </div>

            <div className="px-6 pb-6 space-y-1">
              {sections.map((section, idx) => (
                <motion.div
                  key={section.key}
                  className="border-b border-slate-800/50 last:border-b-0"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: timing.normal,
                    delay: staggerDelay(idx),
                    ease: easing.smooth
                  }}
                >
                  <div className="flex items-center justify-between">
                    <Link
                      href={section.path}
                      onClick={() => onClose()}
                      className="flex items-center gap-3 py-4 text-lg font-medium text-white active:text-emerald-400 transition-all active:scale-[0.98] touch-manipulation"
                      data-testid={`mobile-nav-${section.key}`}
                    >
                      <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/10">
                        {sectionIcons[section.key]}
                      </span>
                      {section.label}
                    </Link>
                    {section.children.length > 0 && (
                      <motion.button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setExpandedSection(expandedSection === section.key ? null : section.key);
                        }}
                        className="p-3 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800/50 active:bg-slate-700/50 transition-colors touch-manipulation"
                        whileTap={{ scale: 0.95 }}
                        data-testid={`mobile-expand-${section.key}`}
                      >
                        <motion.div
                          animate={{ rotate: expandedSection === section.key ? 180 : 0 }}
                          transition={{ duration: timing.fast }}
                        >
                          <ChevronDown className="w-5 h-5" />
                        </motion.div>
                      </motion.button>
                    )}
                  </div>
                  <AnimatePresence>
                    {expandedSection === section.key && section.children.length > 0 && (
                      <motion.div
                        className="pl-2 space-y-1 pb-4 border-l-2 border-emerald-500/20"
                        style={{ marginLeft: '52px' }}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: timing.fast }}
                      >
                        {section.children.map((item, itemIdx) => (
                          <motion.div
                            key={item.key}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: timing.fast,
                              delay: staggerDelay(itemIdx, 0.03)
                            }}
                          >
                            <Link
                              href={item.path}
                              onClick={() => onClose()}
                              className="block py-2.5 px-3 text-sm text-slate-300 hover:text-white active:text-emerald-400 rounded-lg hover:bg-slate-800/50 transition-all active:scale-[0.98] touch-manipulation"
                              data-testid={`mobile-nav-item-${item.key}`}
                            >
                              {item.label}
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}

              <motion.div
                className="pt-6 mt-4 border-t border-slate-800/50"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: timing.normal,
                  delay: staggerDelay(sections.length) + 0.1,
                  ease: easing.smooth
                }}
              >
                <motion.div whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/shop"
                    onClick={() => onClose()}
                    className="flex items-center justify-center gap-2 w-full py-4 text-base font-semibold bg-gradient-to-r from-emerald-500 to-emerald-400 text-slate-950 rounded-2xl active:from-emerald-400 active:to-emerald-300 transition-colors shadow-lg shadow-emerald-500/25 mb-3 touch-manipulation"
                    data-testid="mobile-nav-shop-button"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    Shop Now
                  </Link>
                </motion.div>
                <Link
                  href="/admin"
                  onClick={() => onClose()}
                  className="flex items-center justify-center gap-2 w-full py-3 text-sm text-slate-400 hover:text-white transition-colors touch-manipulation"
                  data-testid="mobile-nav-admin"
                >
                  Admin Panel
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(menuContent, document.body);
}

export default function MegaMenu() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { data: navigation } = useQuery<NavigationData>({
    queryKey: ["/api/navigation"],
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const sections = navigation?.sections || [];

  const isActiveSection = (sectionPath: string) => {
    if (sectionPath === '/') return location === '/';
    return location.startsWith(sectionPath);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 andara-glass-header">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" data-testid="logo-link">
          <AndaraIcon size="md" />
          <span className="whitespace-nowrap flex items-baseline">
            <span className="text-lg font-display font-bold tracking-wide andara-text-gold-gradient">ANDARA</span>
            <span className="text-[15px] font-display font-light tracking-widest andara-text-gold-gradient ml-2">IONIC</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1" data-testid="desktop-nav">
          {sections.map((section) => (
            <DesktopDropdown
              key={section.key}
              section={section}
              isActive={isActiveSection(section.path)}
            />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/shop" className="hidden md:flex items-center gap-2 text-sm font-bold andara-btn-gold andara-btn-gold--sm" data-testid="shop-button">
            <ShoppingBag className="w-4 h-4" />
            <span>Shop</span>
          </Link>

          <CartIcon />

          <button
            className="md:hidden p-3 text-primary relative z-50 touch-manipulation"
            onClick={(e) => {
              e.stopPropagation();
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            data-testid="mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <MobileMenu
        sections={sections}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
}
