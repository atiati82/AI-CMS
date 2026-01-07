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
  }
];

export const ARTICLES: ScienceArticle[] = [
  // ===== WATER SCIENCE (c1) =====
  {
    id: "w1",
    title: "Water Science Master",
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
    slug: "fourth-phase-water",
    summary: "Discover the exclusion zone (EZ) – a state of water that drives cellular energy.",
    content: "",
    clusterId: "c1",
    tags: ["EZ water", "fourth phase", "Gerald Pollack"],
    priority: 9,
    publishedAt: "2024-11-15",
    relatedProductIds: ["p1"]
  },
  {
    id: "w3",
    title: "Water Structure & Physics",
    slug: "water",
    summary: "Deep exploration of water's molecular architecture and unique properties.",
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
    slug: "flocculation-purification",
    summary: "How ionic minerals naturally clear water of impurities through coagulation.",
    content: "",
    clusterId: "c1",
    tags: ["purification", "flocculation", "clean water"],
    priority: 7,
    publishedAt: "2024-01-05",
    relatedProductIds: ["p1", "p2"]
  },

  // ===== MINERAL SCIENCE (c2) =====
  {
    id: "m1",
    title: "Mineral Sources",
    slug: "mineral-sources",
    summary: "Where minerals come from and why primordial volcanic origin matters.",
    content: "",
    clusterId: "c2",
    tags: ["minerals", "sources", "volcanic"],
    priority: 10,
    publishedAt: "2024-12-01",
    relatedProductIds: ["p1", "p2"]
  },
  {
    id: "m2",
    title: "Sulfate: The Neglected Mineral",
    slug: "sulfate-neglected-mineral",
    summary: "Why ionic sulfate is crucial for biological water structure and detoxification.",
    content: "",
    clusterId: "c2",
    tags: ["sulfate", "minerals", "detox"],
    priority: 9,
    publishedAt: "2023-11-02",
    relatedProductIds: ["p1"]
  },
  {
    id: "m3",
    title: "DNA & Mineral Codes",
    slug: "minerals/dna-mineral-codes",
    summary: "The mineral requirements for DNA function, repair, and genetic expression.",
    content: "",
    clusterId: "c2",
    tags: ["DNA", "minerals", "genetics"],
    priority: 8,
    publishedAt: "2024-11-20",
    relatedProductIds: ["p1"]
  },

  // ===== BIOELECTRIC HEALTH (c3) =====
  {
    id: "b1",
    title: "Bioelectricity Overview",
    slug: "bioelectricity",
    summary: "The master guide to water's role in cellular electricity and voltage.",
    content: "",
    clusterId: "c3",
    tags: ["bioelectric", "overview", "cellular"],
    priority: 10,
    publishedAt: "2024-12-01",
    relatedProductIds: ["p1"]
  },
  {
    id: "b2",
    title: "Bioelectricity and Cellular Voltage",
    slug: "bioelectricity-cellular-voltage",
    summary: "How structured water acts as a battery for your cells.",
    content: "",
    clusterId: "c3",
    tags: ["bioelectric", "voltage", "energy"],
    priority: 9,
    publishedAt: "2023-12-10",
    relatedProductIds: ["p1"]
  },
  {
    id: "b3",
    title: "The Invisible Voltage",
    slug: "bioelectricity/bioelectricity-invisible-voltage",
    summary: "Understanding the electrical nature of living systems and how minerals power it.",
    content: "",
    clusterId: "c3",
    tags: ["voltage", "invisible", "life force"],
    priority: 8,
    publishedAt: "2024-11-25",
    relatedProductIds: ["p1"]
  },

  // ===== CRYSTALLINE MATRIX (c4) =====
  {
    id: "x1",
    title: "The Crystalline Matrix",
    slug: "crystalline-matrix",
    summary: "Introduction to the crystalline organization of living systems and water.",
    content: "",
    clusterId: "c4",
    tags: ["crystalline", "matrix", "structure"],
    priority: 10,
    publishedAt: "2024-12-01",
    relatedProductIds: ["p1"]
  },
  {
    id: "x2",
    title: "The Geometric Language of Water",
    slug: "geometric-language-water",
    summary: "How water molecules align in hexagonal sheets to store information.",
    content: "",
    clusterId: "c4",
    tags: ["geometry", "hexagonal", "information"],
    priority: 8,
    publishedAt: "2024-02-20",
    relatedProductIds: ["p1"]
  }
];
