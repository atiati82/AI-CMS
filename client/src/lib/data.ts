import { FlaskConical, Droplets, Atom, Activity, Zap, Dna, Info } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  slug: string;
  sizeMl: number;
  descriptionShort: string;
  descriptionLong: string;
  highlights: string[];
  price: number;
  pricePerLiter: number;
  images: string[];
  tags: string[];
  bundles: {
    name: string;
    units: number;
    price: number;
    save: string;
  }[];
}

export interface Cluster {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: any;
  color?: string;
}

export interface ScienceArticle {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string; // Markdown-ish
  clusterId: string;
  tags: string[];
  priority: number;
  publishedAt: string;
  relatedProductIds: string[];
}

// --- MOCK DATA ---

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Andara Ionic – Primordial Sulfate Minerals",
    slug: "andara-ionic-100ml",
    sizeMl: 100,
    descriptionShort: "A concentrated source of ionic sulfate minerals to structure and revitalize your water.",
    descriptionLong: `Andara Ionic is not just a supplement; it is a catalyst for water structure. Sourced from primordial mineral deposits, this ionic sulfate solution is designed to mimic the natural mineralization processes found in pristine mountain springs.
    
    When added to water, Andara Ionic initiates a flocculation process, binding to impurities while simultaneously encouraging the water molecules to align into a coherent, liquid crystalline phase. This is often referred to as "structured water" or EZ (Exclusion Zone) water.
    
    The result is water that feels softer, tastes cleaner, and is more bioavailable to your cells.`,
    highlights: [
      "Restores natural mineral balance",
      "Promotes water structuring (EZ Water)",
      "Bioavailable ionic sulfates",
      "Precipitates impurities via flocculation"
    ],
    price: 49.00,
    pricePerLiter: 490.00,
    images: ["/assets/product-bottle.jpg"], // Placeholder, will be replaced by generated asset import in component
    tags: ["ionic minerals", "sulfate", "structured water", "hydration"],
    bundles: [
      { name: "Starter", units: 1, price: 49.00, save: "" },
      { name: "Family Pack", units: 3, price: 132.00, save: "Save 10%" },
      { name: "Community Box", units: 10, price: 390.00, save: "Save 20%" }
    ]
  },
  {
    id: "p2",
    name: "Andara Ionic – 1 Liter",
    slug: "andara-ionic-1l",
    sizeMl: 1000,
    descriptionShort: "Bulk supply for families and communities.",
    descriptionLong: "The same primordial ionic sulfate minerals in a larger, eco-friendly format.",
    highlights: [
      "Best value for daily use",
      "Sustainable glass packaging",
      "Ideal for whole-house water treatment"
    ],
    price: 350.00,
    pricePerLiter: 350.00,
    images: ["/assets/product-bottle.jpg"],
    tags: ["ionic minerals", "sulfate", "bulk"],
    bundles: []
  },
  {
    id: "p3",
    name: "Andara Ionic – 2 Liters",
    slug: "ion-2",
    sizeMl: 2000,
    descriptionShort: "Extended bulk supply for families.",
    descriptionLong: "Double the quantity for consistent water structuring across your entire household.",
    highlights: ["Family size", "Eco-friendly bulk", "Premium ionization"],
    price: 650.00,
    pricePerLiter: 325.00,
    images: ["/assets/product-bottle.jpg"],
    tags: ["ionic minerals", "bulk", "family"],
    bundles: []
  },
  {
    id: "p4",
    name: "Andara Ionic – 5 Liters",
    slug: "ion-5",
    sizeMl: 5000,
    descriptionShort: "Community-scale water structuring.",
    descriptionLong: "Ideal for clinics, spas, and conscious communities requiring high-volume mineral support.",
    highlights: ["Community value", "High volume", "Industrial grade purity"],
    price: 1500.00,
    pricePerLiter: 300.00,
    images: ["/assets/product-bottle.jpg"],
    tags: ["ionic minerals", "bulk", "community"],
    bundles: []
  },
  {
    id: "p5",
    name: "Andara Ionic – 10 Liters",
    slug: "ion-10",
    sizeMl: 10000,
    descriptionShort: "Maximum bulk format for agricultural and large-scale use.",
    descriptionLong: "Our largest format, designed for regenerative agriculture and large-scale water systems.",
    highlights: ["Maximum value", "Agricultural scale", "Regenerative catalyst"],
    price: 2800.00,
    pricePerLiter: 280.00,
    images: ["/assets/product-bottle.jpg"],
    tags: ["ionic minerals", "bulk", "agriculture"],
    bundles: []
  },
  {
    id: "p6",
    name: "Andara Refill – 20 Liters",
    slug: "refill-20",
    sizeMl: 20000,
    descriptionShort: "Refill station concentrate.",
    descriptionLong: "Concentrated refill for dedicated Andara water stations.",
    highlights: ["Zero-waste refill", "Maximum sustainability", "High-fidelity charge"],
    price: 5200.00,
    pricePerLiter: 260.00,
    images: ["/assets/product-bottle.jpg"],
    tags: ["refill", "bulk", "sustainability"],
    bundles: []
  },
  {
    id: "p7",
    name: "Andara Refill – 50 Liters",
    slug: "refill-50",
    sizeMl: 50000,
    descriptionShort: "Industrial refill format.",
    descriptionLong: "The ultimate reserve for large ecosystems and industrial-scale water structuring.",
    highlights: ["Industrial reserve", "Unmatched value", "Ecosystem scale"],
    price: 12000.00,
    pricePerLiter: 240.00,
    images: ["/assets/product-bottle.jpg"],
    tags: ["refill", "industrial", "ecosystem"],
    bundles: []
  },
  {
    id: "p8",
    name: "Andara Travel Set",
    slug: "travel-set",
    sizeMl: 30,
    descriptionShort: "Portable hydration for the explorer.",
    descriptionLong: "Take the power of Andara with you. Compact, airline-approved, and highly concentrated.",
    highlights: ["TSA-friendly", "Ultra-concentrated", "Vitality on the go"],
    price: 29.00,
    pricePerLiter: 966.67,
    images: ["/assets/product-bottle.jpg"],
    tags: ["travel", "portable", "ionic"],
    bundles: []
  },
  {
    id: "p9",
    name: "Family Bundle Pack",
    slug: "bundle-family",
    sizeMl: 300,
    descriptionShort: "Comprehensive family hydration system.",
    descriptionLong: "A curated set of 100ml bottles and travel sizes for the whole family.",
    highlights: ["Multi-bottle convenience", "Complete set", "Family value"],
    price: 180.00,
    pricePerLiter: 600.00,
    images: ["/assets/product-bottle.jpg"],
    tags: ["bundle", "family", "comprehensive"],
    bundles: []
  }
];

export const CLUSTERS: Cluster[] = [
  {
    id: "c1",
    name: "Water Science",
    slug: "water-science",
    description: "Understanding the physics and chemistry of liquid crystalline water.",
    icon: Droplets,
    color: "#3b82f6"
  },
  {
    id: "c2",
    name: "Mineral Science",
    slug: "mineral-science",
    description: "The role of ionic sulfates in biology and geology.",
    icon: Atom,
    color: "#8b5cf6"
  },
  {
    id: "c3",
    name: "Bioelectric Health",
    slug: "bioelectric-health",
    description: "How electric potential drives cellular life.",
    icon: Zap,
    color: "#eab308"
  },
  {
    id: "c4",
    name: "Crystalline Matrix",
    slug: "crystalline-matrix",
    description: "Geometric ordering of molecules in nature.",
    icon: Activity,
    color: "#10b981"
  },
  {
    id: "c5",
    name: "Sulfur & Sulfate Pathways",
    slug: "sulfur-sulfate",
    description: "The vital role of sulfur compounds in detox and terrain structuring.",
    icon: FlaskConical,
    color: "#f59e0b"
  },
  {
    id: "c6",
    name: "Microbiome & Minerals",
    slug: "microbiome-minerals",
    description: "How minerals shape gut health and microbial ecosystems.",
    icon: Dna,
    color: "#ec4899"
  },
  {
    id: "c7",
    name: "Liquid Crystal Biology",
    slug: "liquid-crystal",
    description: "The semi-crystalline architecture of fascia and living tissue.",
    icon: Activity,
    color: "#14b8a6"
  },
  {
    id: "c8",
    name: "Consciousness & Fields",
    slug: "consciousness-fields",
    description: "Exploring the intersection of water, minerals, and subtle energy.",
    icon: Info,
    color: "#a855f7"
  },
  {
    id: "c9",
    name: "ION Intelligence",
    slug: "ion",
    description: "The foundational science of ionic chemistry, charge, and natural systems.",
    icon: Zap,
    color: "#06b6d4"
  }
];

export const ARTICLES: ScienceArticle[] = [
  // ===== WATER SCIENCE (c1) =====
  {
    id: "w1",
    title: "Water Science Master Overview",
    slug: "water-science",
    summary: "The comprehensive guide to water physics, structured water, and biological hydration.",
    content: "",
    clusterId: "c1",
    tags: ["water science", "overview", "structured water"],
    priority: 10,
    publishedAt: "2024-12-01",
    relatedProductIds: ["p1", "p2"]
  },
  {
    id: "w2",
    title: "The Fourth Phase of Water",
    slug: "ez-water-overview",
    summary: "Exploring the exclusion zone (EZ) – a state of water that drives cellular energy.",
    content: "",
    clusterId: "c1",
    tags: ["EZ water", "fourth phase", "Pollack"],
    priority: 9,
    publishedAt: "2024-11-15",
    relatedProductIds: ["p1"]
  },
  {
    id: "w3",
    title: "Water Structure & Physics",
    slug: "water",
    summary: "Deep exploration of water's molecular architecture and phase transitions.",
    content: "",
    clusterId: "c1",
    tags: ["water", "structure", "physics"],
    priority: 8,
    publishedAt: "2024-11-10",
    relatedProductIds: ["p1"]
  },
  {
    id: "w4",
    title: "Flocculation: Nature's Purification",
    slug: "water-clarification-lab",
    summary: "How ionic minerals naturally clear water through natural coagulation.",
    content: "",
    clusterId: "c1",
    tags: ["flocculation", "purification", "minerals"],
    priority: 7,
    publishedAt: "2024-01-05",
    relatedProductIds: ["p1", "p2"]
  },
  {
    id: "w5",
    title: "Turbidity, Clarity & Flocculation",
    slug: "water-clarification-lab",
    summary: "The mechanics of water clarification and mineral binding.",
    content: "",
    clusterId: "c1",
    tags: ["clarity", "physics", "binding"],
    priority: 8,
    publishedAt: "2024-09-25",
    relatedProductIds: ["p1"]
  },
  {
    id: "w6",
    title: "pH, ORP & EC Explained",
    slug: "water-science-master",
    summary: "Mastering the metrics of water quality and bioelectric potential.",
    content: "",
    clusterId: "c1",
    tags: ["pH", "ORP", "metrics"],
    priority: 9,
    publishedAt: "2024-09-20",
    relatedProductIds: ["p1"]
  },
  {
    id: "w7",
    title: "Structured Water Basics",
    slug: "structured-water-basics",
    summary: "A foundational guide to order in liquid water systems.",
    content: "",
    clusterId: "c1",
    tags: ["basics", "structure", "introduction"],
    priority: 8,
    publishedAt: "2024-09-05",
    relatedProductIds: ["p1", "p2"]
  },

  // ===== MINERAL SCIENCE (c2) =====
  {
    id: "m1",
    title: "Mineral Science Blueprint",
    slug: "mineral-science-blueprint",
    summary: "The master architectural framework for mineral biochemistry.",
    content: "",
    clusterId: "c2",
    tags: ["minerals", "blueprint", "biochemistry"],
    priority: 10,
    publishedAt: "2024-12-01",
    relatedProductIds: ["p1", "p2"]
  },
  {
    id: "m2",
    title: "Mineral Sources",
    slug: "mineral-sources",
    summary: "Detailed review of primordial geological deposits and bioavailability.",
    content: "",
    clusterId: "c2",
    tags: ["sources", "geology", "primordial"],
    priority: 9,
    publishedAt: "2024-11-20",
    relatedProductIds: ["p1", "p2"]
  },
  {
    id: "m3",
    title: "Sulfate: The Neglected Mineral",
    slug: "sulfate-chemistry",
    summary: "Why ionic sulfate is the key to biological water structuring.",
    content: "",
    clusterId: "c2",
    tags: ["sulfate", "detox", "biology"],
    priority: 9,
    publishedAt: "2023-11-02",
    relatedProductIds: ["p1"]
  },
  {
    id: "m4",
    title: "DNA & Mineral Codes",
    slug: "minerals/dna-mineral-codes",
    summary: "How ionic elements provide the electrical signaling environment for DNA.",
    content: "",
    clusterId: "c2",
    tags: ["DNA", "genetics", "minerals"],
    priority: 8,
    publishedAt: "2024-11-20",
    relatedProductIds: ["p1"]
  },
  {
    id: "m5",
    title: "Ionic vs Colloidal vs Solid",
    slug: "mineral-sources",
    summary: "Understanding state of matter in mineral absorption.",
    content: "",
    clusterId: "c2",
    tags: ["physics", "absorption", "states"],
    priority: 7,
    publishedAt: "2024-11-25",
    relatedProductIds: ["p1"]
  },

  // ===== BIOELECTRIC HEALTH (c3) =====
  {
    id: "b1",
    title: "Bioelectricity Overview",
    slug: "bioelectricity",
    summary: "Understanding the electrical voltage of life.",
    content: "",
    clusterId: "c3",
    tags: ["bioelectric", "overview", "voltage"],
    priority: 10,
    publishedAt: "2024-12-01",
    relatedProductIds: ["p1"]
  },
  {
    id: "b2",
    title: "Bioelectricity and Cellular Voltage",
    slug: "cell-voltage",
    summary: "How structured water acts as a battery for your cells.",
    content: "",
    clusterId: "c3",
    tags: ["voltage", "energy", "mitochondria"],
    priority: 9,
    publishedAt: "2023-12-10",
    relatedProductIds: ["p1"]
  },
  {
    id: "b3",
    title: "The Invisible Voltage",
    slug: "bioelectricity/bioelectricity-invisible-voltage",
    summary: "Exploring the subtle electrical gradients in healthy tissue.",
    content: "",
    clusterId: "c3",
    tags: ["voltage", "invisible", "life force"],
    priority: 8,
    publishedAt: "2024-11-25",
    relatedProductIds: ["p1"]
  },
  {
    id: "b4",
    title: "Proton Gradients",
    slug: "bioelectric-terrain-model",
    summary: "The flow of charge across membranes driven by water structure.",
    content: "",
    clusterId: "c3",
    tags: ["protons", "energy", "ATP"],
    priority: 7,
    publishedAt: "2024-11-20",
    relatedProductIds: ["p1"]
  },

  // ===== CRYSTALLINE MATRIX (c4) =====
  {
    id: "x1",
    title: "The Crystalline Matrix",
    slug: "crystalline-matrix",
    summary: "The semi-crystalline architecture of living tissue and water.",
    content: "",
    clusterId: "c4",
    tags: ["crystalline", "matrix", "fascia"],
    priority: 10,
    publishedAt: "2024-12-01",
    relatedProductIds: ["p1"]
  },
  {
    id: "x2",
    title: "The Geometric Language of Water",
    slug: "hexagonal-water-structures",
    summary: "How water molecules align in hexagonal sheets to store information.",
    content: "",
    clusterId: "c4",
    tags: ["geometry", "hexagonal", "information"],
    priority: 8,
    publishedAt: "2024-02-20",
    relatedProductIds: ["p1"]
  },
  {
    id: "x3",
    title: "Tetrahedral Geometry",
    slug: "tetrahedral-sulfate-geometry",
    summary: "The sacred geometry of sulfate minerals in solution.",
    content: "",
    clusterId: "c4",
    tags: ["tetrahedral", "sulfate", "geometry"],
    priority: 9,
    publishedAt: "2024-11-15",
    relatedProductIds: ["p1"]
  },

  // ===== SULFUR & SULFATE PATHWAYS (c5) =====
  {
    id: "s1",
    title: "Sulfur & Sulfate Overview",
    slug: "sulfur-sulfate-overview",
    summary: "Why sulfur is the most vital overlooked element in metabolic health.",
    content: "",
    clusterId: "c5",
    tags: ["sulfur", "sulfate", "metabolism"],
    priority: 10,
    publishedAt: "2024-12-01",
    relatedProductIds: ["p1"]
  },
  {
    id: "s2",
    title: "Sulfate Pathways",
    slug: "sulfate-pathways-water-body",
    summary: "Detailed review of detox pathways and sulfur transport.",
    content: "",
    clusterId: "c5",
    tags: ["detox", "pathways", "transport"],
    priority: 9,
    publishedAt: "2024-11-15",
    relatedProductIds: ["p1"]
  },

  // ===== MICROBIOME & MINERALS (c6) =====
  {
    id: "mb1",
    title: "Microbiome & Minerals",
    slug: "minerals-microbiome-water-link",
    summary: "The intersection of soil-based microbes and primordial mineral salts.",
    content: "",
    clusterId: "c6",
    tags: ["gut health", "microbiome", "bacteria"],
    priority: 10,
    publishedAt: "2024-12-01",
    relatedProductIds: ["p1"]
  },

  // ===== LIQUID CRYSTAL BIOLOGY (c7) =====
  {
    id: "lc1",
    title: "Liquid Crystal Biology",
    slug: "crystalline-matrix-overview",
    summary: "Understanding living tissue as a semi-crystalline antenna.",
    content: "",
    clusterId: "c7",
    tags: ["liquid crystal", "fascia", "collagen"],
    priority: 10,
    publishedAt: "2024-12-01",
    relatedProductIds: ["p1"]
  },

  // ===== CONSCIOUSNESS & FIELDS (c8) =====
  {
    id: "co1",
    title: "Consciousness & Fields",
    slug: "sacred-geometry-water",
    summary: "Exploring water's role as the interface between energy and frequency.",
    content: "",
    clusterId: "c8",
    tags: ["consciousness", "energy", "frequency"],
    priority: 10,
    publishedAt: "2024-12-01",
    relatedProductIds: ["p1"]
  },

  // ===== ION INTELLIGENCE (c9) =====
  {
    id: "ion1",
    title: "Ion Fundamentals",
    slug: "ion",
    summary: "What ions are, how they behave, and why they matter for water and biology.",
    content: "",
    clusterId: "c9",
    tags: ["ions", "fundamentals", "charge"],
    priority: 10,
    publishedAt: "2025-01-08",
    relatedProductIds: ["p1"]
  },
  {
    id: "ion2",
    title: "Ions in Water",
    slug: "ion/water",
    summary: "How ions interact with water molecules to create structure and conductivity.",
    content: "",
    clusterId: "c9",
    tags: ["water", "ions", "structure"],
    priority: 9,
    publishedAt: "2025-01-08",
    relatedProductIds: ["p1"]
  },
  {
    id: "ion3",
    title: "Conductivity, EC & TDS",
    slug: "ion/conductivity-ec-tds",
    summary: "Understanding electrical conductivity and dissolved solids in water.",
    content: "",
    clusterId: "c9",
    tags: ["conductivity", "EC", "TDS"],
    priority: 8,
    publishedAt: "2025-01-08",
    relatedProductIds: ["p1"]
  },
  {
    id: "ion4",
    title: "Ion Exchange",
    slug: "ion/ion-exchange",
    summary: "How ions swap positions between water and surfaces in natural systems.",
    content: "",
    clusterId: "c9",
    tags: ["exchange", "CEC", "binding"],
    priority: 8,
    publishedAt: "2025-01-08",
    relatedProductIds: ["p1"]
  },
  {
    id: "ion5",
    title: "ORP & Redox Potential",
    slug: "ion/orp-redox",
    summary: "The oxidation-reduction potential of water and what it tells us.",
    content: "",
    clusterId: "c9",
    tags: ["ORP", "redox", "antioxidant"],
    priority: 8,
    publishedAt: "2025-01-08",
    relatedProductIds: ["p1"]
  },
  {
    id: "ion6",
    title: "Sea Ions",
    slug: "ion/sea",
    summary: "Earth's largest natural ion system and its buffering intelligence.",
    content: "",
    clusterId: "c9",
    tags: ["ocean", "sea", "marine"],
    priority: 7,
    publishedAt: "2025-01-08",
    relatedProductIds: ["p1"]
  },
  {
    id: "ion7",
    title: "Waves & Cleaning",
    slug: "ion/waves-cleaning",
    summary: "How wave action creates natural water purification through ion movement.",
    content: "",
    clusterId: "c9",
    tags: ["waves", "cleaning", "purification"],
    priority: 7,
    publishedAt: "2025-01-08",
    relatedProductIds: ["p1"]
  },
  {
    id: "ion8",
    title: "Lightning & Atmosphere",
    slug: "ion/lightning-atmosphere",
    summary: "Storm electricity and atmospheric ion generation in nature.",
    content: "",
    clusterId: "c9",
    tags: ["lightning", "atmosphere", "storm"],
    priority: 7,
    publishedAt: "2025-01-08",
    relatedProductIds: ["p1"]
  },
  {
    id: "ion9",
    title: "Soil Ions",
    slug: "ion/soil",
    summary: "Earth's living ion bank — soil as a mineral reservoir and exchange system.",
    content: "",
    clusterId: "c9",
    tags: ["soil", "earth", "CEC"],
    priority: 8,
    publishedAt: "2025-01-09",
    relatedProductIds: ["p1"]
  },
  {
    id: "ion10",
    title: "Volcanic Minerals",
    slug: "ion/volcanic-minerals",
    summary: "Fresh Earth charge — why volcanic minerals have unique ionic activity.",
    content: "",
    clusterId: "c9",
    tags: ["volcanic", "minerals", "origin"],
    priority: 8,
    publishedAt: "2025-01-09",
    relatedProductIds: ["p1"]
  },
  {
    id: "ion11",
    title: "Bioelectricity",
    slug: "ion/bioelectric",
    summary: "How ions power life through nerve signals, muscle movement, and cellular communication.",
    content: "",
    clusterId: "c9",
    tags: ["bioelectric", "nerves", "cells"],
    priority: 9,
    publishedAt: "2025-01-09",
    relatedProductIds: ["p1"]
  },
  {
    id: "ion12",
    title: "Electrolytes vs Ionic Minerals",
    slug: "ion/electrolytes-vs-ionic-minerals",
    summary: "Understanding the difference between rapid signaling electrolytes and systemic ionic minerals.",
    content: "",
    clusterId: "c9",
    tags: ["electrolytes", "minerals", "hydration"],
    priority: 8,
    publishedAt: "2025-01-09",
    relatedProductIds: ["p1"]
  },
  {
    id: "ion13",
    title: "Ionic Sulfates",
    slug: "ion/ionic-sulfates",
    summary: "Nature's quiet balancing mineral form — how sulfates mediate and stabilize.",
    content: "",
    clusterId: "c9",
    tags: ["sulfate", "minerals", "balance"],
    priority: 9,
    publishedAt: "2025-01-09",
    relatedProductIds: ["p1"]
  },
  {
    id: "ion14",
    title: "Microdose Logic",
    slug: "ion/microdose-logic",
    summary: "Why small mineral amounts can have big system-wide effects through catalysis.",
    content: "",
    clusterId: "c9",
    tags: ["microdose", "catalysis", "signals"],
    priority: 8,
    publishedAt: "2025-01-09",
    relatedProductIds: ["p1"]
  }
];

