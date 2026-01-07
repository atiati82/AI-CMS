import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, Home, Sprout, SprayCan, Apple, Heart, ShowerHead, Bath } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DilutionRow {
    icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
    application: string;
    dosePerLiter: string;
    ratio: string;
    treats: string;
    note?: string;
}

const dilutionData: DilutionRow[] = [
    {
        icon: Droplets,
        application: "Water Activation",
        dosePerLiter: "0,5 ml = 10 drops",
        ratio: "1 : 2000",
        treats: "200 L"
    },
    {
        icon: Home,
        application: "House Tank",
        dosePerLiter: "1,32 ml = 26 drops",
        ratio: "1 : 760",
        treats: "76 L"
    },
    {
        icon: Sprout,
        application: "Soil Usage",
        dosePerLiter: "0,4 ml = 8 drops",
        ratio: "1 : 2500",
        treats: "2500 L"
    },
    {
        icon: SprayCan,
        application: "Foliar Spray",
        dosePerLiter: "0,1 ml = 2 drops",
        ratio: "1 : 10.000",
        treats: "10.000 L"
    },
    {
        icon: Apple,
        application: "Fruit Rinse",
        dosePerLiter: "1 ml = 20 drops",
        ratio: "1 : 1000",
        treats: "100 L"
    },
    {
        icon: Heart,
        application: "Skin Energizer",
        dosePerLiter: "1 ml = 20 drops",
        ratio: "1 : 1000",
        treats: "100 L"
    },
    {
        icon: ShowerHead,
        application: "Spray Use",
        dosePerLiter: "2 ml = 40 drops",
        ratio: "1 : 500",
        treats: "50 L"
    },
    {
        icon: Bath,
        application: "Bath",
        dosePerLiter: "30-40 ml",
        ratio: "—",
        treats: "2-3 baths"
    }
];

export const DilutionTable: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <div className={cn("w-full max-w-4xl mx-auto", className)}>
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl">
                {/* Header */}
                <div className="grid grid-cols-12 gap-4 p-6 border-b border-white/10 bg-white/5 text-amber-100 font-serif font-medium tracking-wider text-sm uppercase">
                    <div className="col-span-4 pl-2">Application</div>
                    <div className="col-span-4 text-center">Dose per 1 L Water</div>
                    <div className="col-span-2 text-center">Ratio</div>
                    <div className="col-span-2 text-right pr-2">100 ml Treats About...</div>
                </div>

                {/* Body */}
                <div className="divide-y divide-white/5">
                    {dilutionData.map((row, index) => (
                        <motion.div
                            key={row.application}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            viewport={{ once: true }}
                            className="grid grid-cols-12 gap-4 p-5 items-center hover:bg-white/5 transition-colors group"
                        >
                            {/* Application Column */}
                            <div className="col-span-4 flex items-center gap-4 pl-2">
                                <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-900/20 border border-amber-500/30 text-amber-200 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_-3px_rgba(245,158,11,0.3)]">
                                    <row.icon className="w-5 h-5" strokeWidth={1.5} />
                                </div>
                                <span className="font-medium text-slate-200 group-hover:text-white transition-colors">
                                    {row.application}
                                </span>
                            </div>

                            {/* Dose Column */}
                            <div className="col-span-4 text-center font-mono text-sm text-cyan-200/90 tracking-wide">
                                {row.dosePerLiter}
                            </div>

                            {/* Ratio Column */}
                            <div className="col-span-2 text-center font-mono text-xs text-slate-400">
                                {row.ratio}
                            </div>

                            {/* Treats Column */}
                            <div className="col-span-2 text-right pr-2 font-bold text-amber-400/90 shadow-amber-500/20 drop-shadow-sm">
                                {row.treats}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Decorative Glows */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
            </div>

            {/* Mobile Disclaimer */}
            <div className="mt-4 text-center text-xs text-slate-500 italic">
                * Standard dropper size assumed (20 drops ≈ 1 ml)
            </div>
        </div>
    );
};
