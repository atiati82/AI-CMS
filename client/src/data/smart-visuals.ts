import volcanicBg from "@/assets/products/andara-volcanic-origin.webp";
import bioelectricBg from "@/assets/products/andara-bioelectric-glow.webp";
import studioBg from "@/assets/products/andara-studio-clean.webp";

export type SmartVisual = {
    id: string;
    name: string;
    src: string;
    keywords: string[];
    style: 'nature' | 'abstract' | 'studio';
    description: string;
};

export const SMART_VISUALS: SmartVisual[] = [
    {
        id: 'volcanic-origin',
        name: 'Volcanic Origin',
        src: volcanicBg,
        keywords: ['mineral', 'volcanic', 'earth', 'source', 'magnesium', 'sulfate', 'ancient', 'primordial', 'rock', 'foundation'],
        style: 'nature',
        description: 'Dark, elemental volcanic landscape. Best for Origin Story and Mineral Science.'
    },
    {
        id: 'bioelectric-glow',
        name: 'Bioelectric Field',
        src: bioelectricBg,
        keywords: ['energy', 'electric', 'bioelectric', 'frequency', 'field', 'voltage', 'charge', 'quantum', 'ether', 'plasma'],
        style: 'abstract',
        description: 'Ethereal green/blue energy field. Best for Bioelectricity and Quantum Biology.'
    },
    {
        id: 'studio-clean',
        name: 'Studio Clean',
        src: studioBg,
        keywords: ['product', 'shop', 'bottle', 'pure', 'clean', 'dropper', 'medical', 'clinical', 'standard'],
        style: 'studio',
        description: 'High-end studio product shot. Best for Product Pages and Shop.'
    }
];

export function getSmartVisualForTitle(title: string): SmartVisual | null {
    const lowerTitle = title.toLowerCase();

    // Find best match based on keyword overlap
    let bestMatch: SmartVisual | null = null;
    let maxOverlap = 0;

    for (const visual of SMART_VISUALS) {
        let overlap = 0;
        for (const keyword of visual.keywords) {
            if (lowerTitle.includes(keyword)) {
                overlap++;
            }
        }

        if (overlap > maxOverlap) {
            maxOverlap = overlap;
            bestMatch = visual;
        }
    }

    return bestMatch;
}
