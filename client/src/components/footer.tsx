
import { Link } from "wouter";
import { Zap, ZapOff } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useDesignSettings } from "@/lib/design-settings";
import { useState } from "react";

type LegalLink = {
    key: string;
    label: string;
    path: string;
};

type NavigationData = {
    sections: any[];
    legal: LegalLink[];
};

export default function Footer() {
    const { isLiteMode } = useDesignSettings();
    const [localLiteMode, setLocalLiteMode] = useState(isLiteMode);
    const { data: navigation } = useQuery<NavigationData>({
        queryKey: ["/api/navigation"],
        staleTime: 1000 * 60 * 5,
    });

    const legalLinks = navigation?.legal || [];

    const handleToggleLiteMode = () => {
        const newMode = !localLiteMode;
        setLocalLiteMode(newMode);
        localStorage.setItem('design.liteMode', String(newMode));
        // Trigger a page reload to apply the setting
        window.location.reload();
    };

    return (
        <footer className="andara-glass-footer py-10 sm:py-12 relative overflow-hidden">
            {/* Texture Background */}
            <div className="absolute inset-0 z-0 opacity-20 mix-blend-soft-light pointer-events-none select-none">
                <img src="/images/textures/source_volcanic_texture.png" alt="" className="w-full h-full object-cover grayscale opacity-50" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/95 to-transparent z-10" />

            <div className="container mx-auto px-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 relative z-20">
                <div className="col-span-2 md:col-span-2 text-center md:text-left mb-4 md:mb-0">
                    <h4 className="font-display font-bold text-xl mb-3 sm:mb-4 andara-text-gold-gradient">ANDARA IONIC</h4>
                    <p className="text-white/60 max-w-sm mx-auto md:mx-0 text-sm sm:text-base">
                        Restoring the primordial structure of water through ionic mineral science.
                        Ethically sourced and scientifically formulated.
                    </p>
                </div>
                <div className="text-center sm:text-left">
                    <h5 className="font-display font-semibold mb-3 sm:mb-4 text-sm sm:text-base andara-text-gold-gradient">Explore</h5>
                    <ul className="space-y-2 text-xs sm:text-sm text-white/60">
                        <li><Link href="/" className="hover:text-white transition-colors" data-testid="footer-link-home">Home</Link></li>
                        <li><Link href="/shop" className="hover:text-white transition-colors" data-testid="footer-link-shop">Shop</Link></li>
                        <li><Link href="/science" className="hover:text-white transition-colors" data-testid="footer-link-science">Science Library</Link></li>
                        <li><Link href="/ion" className="hover:text-white transition-colors" data-testid="footer-link-ion">ION Science</Link></li>
                        <li><Link href="/about" className="hover:text-white transition-colors" data-testid="footer-link-about">About</Link></li>
                        <li><Link href="/sitemap" className="hover:text-white transition-colors" data-testid="footer-link-sitemap">Sitemap</Link></li>
                        <li><Link href="/admin" className="hover:text-white transition-colors" data-testid="footer-link-admin">Admin</Link></li>
                    </ul>
                </div>
                <div className="text-center sm:text-left">
                    <h5 className="font-display font-semibold mb-3 sm:mb-4 text-sm sm:text-base andara-text-gold-gradient">Legal</h5>
                    <ul className="space-y-2 text-xs sm:text-sm text-white/60">
                        {legalLinks.length > 0 ? (
                            legalLinks.map((link) => (
                                <li key={link.key}>
                                    <Link href={link.path} className="hover:text-white transition-colors" data-testid={`footer-legal-${link.key}`}>
                                        {link.label}
                                    </Link>
                                </li>
                            ))
                        ) : (
                            <>
                                <li><Link href="/imprint" className="hover:text-white transition-colors">Imprint</Link></li>
                                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
            <div className="container mx-auto px-4 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-[rgba(226,184,94,0.15)] flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] sm:text-xs text-white/40">
                <div>
                    © {new Date().getFullYear()} Andara Ionic. All rights reserved.
                </div>

                <button
                    onClick={handleToggleLiteMode}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 ${localLiteMode ? 'bg-emerald-900/40 border-emerald-500/50 text-emerald-300' : 'bg-transparent border-white/10 text-white/40 hover:text-white hover:border-white/30'}`}
                    title={localLiteMode ? "Enable full animations" : "Enable lite mode for better performance"}
                >
                    {localLiteMode ? <ZapOff className="w-3 h-3" /> : <Zap className="w-3 h-3" />}
                    <span className="font-medium">{localLiteMode ? "Lite Mode: ON" : "Lite Mode: OFF"}</span>
                </button>
            </div>
        </footer>
    );
}

