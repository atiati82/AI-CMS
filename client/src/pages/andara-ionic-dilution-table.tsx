import React, { useState } from "react";
import StandardPageLayout from "@/components/StandardPageLayout";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import {
    Droplets, Sprout, Bath, RefreshCw, Beaker,
    Waves, Info, Calculator, ArrowRight, ShieldCheck
} from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

// Recalculated Data from Image
// Image Ratio is for "Undiluted Themarox"
// User wants 1:10 Adya (Andara Ritual) Solution, which is 10x more volume for same water.
const DILUTION_DATA = [
    {
        application: "Waste water treatment",
        undiluted: "20ml",
        adya10: "200ml",
        water: "100 Liters",
        howTo: "Add at a dilution rate of approx 5,000 times (Stock) or 500 times (1:10).",
        remarks: "Adjustable depending on the degree of pollution.",
        icon: RefreshCw,
        color: "text-blue-400"
    },
    {
        application: "Domestic Water Purification",
        undiluted: "10ml",
        adya10: "100ml",
        water: "100 Liters",
        howTo: "Add at a dilution rate of 10,000 times (Stock) or 1,000 times (1:10).",
        remarks: "Adjustable depending on original water quality.",
        icon: Droplets,
        color: "text-cyan-400"
    },
    {
        application: "Drinking Minerals & Beverage",
        undiluted: "0.2 ~ 2ml",
        adya10: "2 ~ 20ml",
        water: "2 Liters",
        howTo: "Stir well. Makes mineralized water similar to filtered brands.",
        remarks: "Water becomes more or less acidic and becomes structured/hard water.",
        icon: Beaker,
        color: "text-emerald-400"
    },
    {
        application: "Agricultural Liquid Fertilizers",
        undiluted: "1,000ml (1L)",
        adya10: "10 Liters",
        water: "2,500 - 10,000 Liters",
        howTo: "Water soil at 2,500x stock rate; spray leaves at 10,000x stock rate.",
        remarks: "General treatment for domestic markets and gardens.",
        icon: Sprout,
        color: "text-green-400"
    },
    {
        application: "Aquaculture",
        undiluted: "100ml",
        adya10: "1,000ml (1L)",
        water: "1,000 Liters",
        howTo: "Promotes decomposition of nitrogen compounds and growth of plankton/algae.",
        remarks: "Adjustable depending on status and size of aquarium.",
        icon: Waves,
        color: "text-blue-300"
    },
    {
        application: "Mineral Bath Liquid",
        undiluted: "20ml",
        adya10: "200ml",
        water: "200 Liters",
        howTo: "Add to hot water in bath tub and stir well. Chelating effect causes waste to settle.",
        remarks: "Clean bathtub after use. General treatment for domestic use.",
        icon: Bath,
        color: "text-purple-400"
    },
    {
        application: "Deodorant & Antibacterial",
        undiluted: "0.2ml ~ 4ml",
        adya10: "2 ~ 40ml",
        water: "2 Liters",
        howTo: "500-fold (Stock) inactivates coronavirus; 2000-fold (Stock) inactivates influenza.",
        remarks: "10,000-fold dilution inactivates cholera bacteria.",
        icon: ShieldCheck,
        color: "text-amber-400"
    }
];

export default function DilutionTablePage() {
    const [use1to10, setUse1to10] = useState(true);

    return (
        <StandardPageLayout
            title="Dilution Master Table"
            subtitle="Precision Protocols for Every Application"
            heroVariant="cyan"
            heroIcon={Beaker}
            badges={[{ text: "Usage Standard", icon: Info }]}
            seoTitle="Andara Ionic Dilution Table - 1:10 Adya & Themarox Ratios"
            seoDescription="Master dilution table for Andara Ionic. Recalculated for 1:10 Ritual Solution (Adya type) and Undiluted Themarox stock."
        >
            <section className="py-24 relative overflow-hidden">
                <div className="container px-4 max-w-6xl mx-auto relative z-10">

                    {/* TOGGLE CONTROLLER */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 p-6 rounded-2xl border border-white/10 bg-[#0b1020]/40 backdrop-blur-xl">
                        <div className="max-w-md">
                            <h3 className="text-xl font-display font-medium text-white mb-2">Solution Model</h3>
                            <p className="text-sm text-white/50">
                                Choose which bottle you are using to see the correct volume measurements.
                            </p>
                        </div>
                        <div className="flex items-center space-x-4 bg-black/20 p-4 rounded-xl border border-white/5">
                            <Label htmlFor="stock-mode" className={`text-sm ${!use1to10 ? 'text-white font-bold' : 'text-white/40'}`}>Undiluted Stock</Label>
                            <Switch
                                id="stock-mode"
                                checked={use1to10}
                                onCheckedChange={setUse1to10}
                                className="data-[state=checked]:bg-cyan-500"
                            />
                            <Label htmlFor="stock-mode" className={`text-sm ${use1to10 ? 'text-white font-bold' : 'text-white/40'}`}>Andara 1:10 Solution</Label>
                        </div>
                    </div>

                    {/* TABLE */}
                    <div className="rounded-2xl border border-white/10 bg-[#05060b]/60 backdrop-blur-md overflow-hidden shadow-2xl">
                        <Table>
                            <TableHeader className="bg-white/5">
                                <TableRow className="border-white/10">
                                    <TableHead className="text-white py-6">Application</TableHead>
                                    <TableHead className="text-white py-6 lg:w-[120px]">
                                        {use1to10 ? "Andara 1:10" : "Undiluted"}
                                    </TableHead>
                                    <TableHead className="text-white py-6">Water Target</TableHead>
                                    <TableHead className="text-white py-6 hidden md:table-cell">How to Use</TableHead>
                                    <TableHead className="text-white py-6 hidden lg:table-cell">Remarks</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {DILUTION_DATA.map((row, idx) => (
                                    <TableRow key={idx} className="border-white/5 hover:bg-white/[0.02] transition-colors">
                                        <TableCell className="py-6">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center ${row.color}`}>
                                                    <row.icon className="w-5 h-5" />
                                                </div>
                                                <span className="font-medium text-white">{row.application}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-6">
                                            <span className={`text-lg font-bold ${use1to10 ? 'text-cyan-400' : 'text-amber-400'}`}>
                                                {use1to10 ? row.adya10 : row.undiluted}
                                            </span>
                                        </TableCell>
                                        <TableCell className="py-6 text-white/70">
                                            {row.water}
                                        </TableCell>
                                        <TableCell className="py-6 text-white/50 text-sm hidden md:table-cell leading-relaxed">
                                            {row.howTo}
                                        </TableCell>
                                        <TableCell className="py-6 text-white/40 text-xs hidden lg:table-cell italic">
                                            {row.remarks}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {/* MOBILE REMARKS */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
                        {DILUTION_DATA.map((row, idx) => (
                            <div key={idx} className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                                <h4 className="text-white text-sm font-bold mb-1 flex items-center gap-2">
                                    <row.icon className={`w-4 h-4 ${row.color}`} />
                                    {row.application} Remarks
                                </h4>
                                <p className="text-xs text-white/40">{row.remarks}</p>
                            </div>
                        ))}
                    </div>

                    {/* FOOTER CALLOUT */}
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="andara-glass-card p-8 border-cyan-500/20 bg-cyan-950/20">
                            <Calculator className="w-10 h-10 text-cyan-400 mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">Need a custom volume?</h3>
                            <p className="text-white/60 text-sm mb-6">
                                Use our interactive calculator to find the exact dose for your specific water container.
                            </p>
                            <Link href="/andara-dilution-calculator">
                                <Button className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold">
                                    Open Calculator <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        </div>
                        <div className="andara-glass-card p-8 border-purple-500/20 bg-purple-950/20">
                            <Info className="w-10 h-10 text-purple-400 mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">Technical Note</h3>
                            <p className="text-white/60 text-sm mb-6">
                                The 1:10 Ritual Solution is 10 times more diluted than the original stock. 1ml of stock equals 10ml of the Ritual solution.
                            </p>
                            <div className="p-4 rounded bg-white/5 text-xs text-white/40 font-mono">
                                Formula: 1:10 Dose = Stock Dose × 10
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </StandardPageLayout>
    );
}
