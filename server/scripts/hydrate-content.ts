
import { db } from "../db";
import { pages } from "@shared/schema";
import { eq } from "drizzle-orm";

// Flagship Content extracted from KIs
const FLAGSHIP_CONTENT: Record<string, { title: string, content: string }> = {
    "/science/water/structured-water-ez": {
        title: "Structured Water & The Fourth Phase (EZ)",
        content: `
<h1>The Fourth Phase of Water</h1>
<p class="lead">Beyond solid, liquid, and gas, there lies a fourth phase: Exclusion Zone (EZ) Water. This H3O2 hexagonal lattice forms at hydrophilic interfaces, acting as a biological battery.</p>

<section class="andara-section">
  <h2>The H3O2 Liquid Crystal</h2>
  <p>Unlike bulk water (H2O), EZ water forms a dense, ordered hexagonal lattice (H3O2). This structure excludes solutes and protons, creating a zone of extreme purity and negative charge.</p>
  <ul>
     <li><strong>Charge Separation:</strong> The EZ layer is negatively charged, while the bulk water beyond it accumulates positive protons. This creates a voltage potential—a battery.</li>
     <li><strong>Light Recharging:</strong> This phase is powered by light. Infrared energy expands the Exclusion Zone, literally storing photonic energy as chemical potential.</li>
  </ul>
</section>

<section class="andara-section">
  <h2>Biological Significance</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
     <div class="glass-card p-6">
       <h3>The Cellular Battery</h3>
       <p>Cells are filled with interfaces (membranes, proteins). This means much of the water inside you is EZ water, driving cellular work through charge separation.</p>
     </div>
     <div class="glass-card p-6">
       <h3>Stabilization</h3>
       <p>Vortexing and ionic minerals (like sulfates) facilitate the formation of these stable layers, expanding the battery capacity of the fluid.</p>
     </div>
  </div>
</section>
        `
    },
    "/science/bioelectric-water": {
        title: "Bioelectric Water",
        content: `
<h1>The Voltage of Life</h1>
<p class="lead">Humans are electric beings. Health is measured in voltage. Water is the conductor, but ionic minerals are the bridge that allows the current to flow.</p>

<section class="andara-section">
  <h2>Voltage is pH</h2>
  <p>Jerry Tennant's research links electron density directly to acidity. An acidic environment is electron-poor (low voltage), while an alkaline environment is electron-rich (sufficient voltage for repair).</p>
  <ul>
    <li><strong>-20mV to -25mV:</strong> Normal operating voltage for cellular function.</li>
    <li><strong>-50mV:</strong> The voltage required for active healing and regeneration.</li>
  </ul>
</section>

<section class="andara-section">
  <h2>The Mineral Bridge</h2>
  <p>Pure water is an insulator. It requires dissolved electrolytes—ionic minerals—to conduct the signals of life. Hydration is ultimately the management of cellular charge density.</p>
</section>
        `
    },
    "/science/hexagonal-structures": {
        title: "Hexagonal Structures",
        content: `
<h1>Sacred Geometry in Water</h1>
<p class="lead">Nature prefers the hexagon for stability and efficiency. From honeycombs to graphite, and crucially, in structured water.</p>

<section class="andara-section">
  <h2>Aquaporin Efficiency</h2>
  <p>Single-file water transport through cell membranes (aquaporins) requires water to shed its chaotic bulk shell and align. Pre-structured hexagonal units pass through these gates with minimal energy expenditure.</p>
</section>

<section class="andara-section">
  <h2>Phase Transitions</h2>
  <p>Water is constantly shifting. The transition from chaotic liquid to ordered hexagon is catalyzed by:</p>
  <ul class="list-disc pl-6">
    <li>Cold (Ice formation templates)</li>
    <li>Surfaces (Hydrophilic interfaces)</li>
    <li>Ionic Anchors (Andara Minerals)</li>
  </ul>
</section>
        `
    },
    "/science/water-phases-structure-activation": {
        title: "Water Phases & Activation",
        content: `
<h1>Water: The Ultimate Shape-Shifter</h1>
<p class="lead">This node explores the transition from classical phases (Ice, Liquid, Gas) to the subtle activation shifts in microstructure, clustering, and charge distribution.</p>

<section class="andara-section">
    <h2>Activation Defined</h2>
    <p>Activation is not magic; it is measurable. Stable water exhibits distinct shifts in:</p>
    <ul>
        <li><strong>pH:</strong> Shift towards alkalinity (electron richness).</li>
        <li><strong>ORP:</strong> Drop in Oxidation-Reduction Potential (available anti-oxidant electrons).</li>
        <li><strong>Turbidity:</strong> Immediate clarity through flocculation.</li>
    </ul>
</section>

<section class="andara-section">
    <h2>The Directors of Phase</h2>
    <p>Temperature, Minerals, Light, and Flow act as the inputs. Ionic sulfates act as the "subtle structure" agents, nudging water from disorder toward clarity and order.</p>
</section>
        `
    },
    "/science/minerals/types": {
        title: "Ionic vs Colloidal Minerals",
        content: `
<h1>Size & Charge: The Hierarchy of Minerals</h1>
<p class="lead">Not all minerals are created equal. Absorption is defined by size (Angstroms vs Microns) and State (Ionic vs Metallic/Colloidal).</p>

<section class="andara-section">
    <h2>The Angstrom Advantage</h2>
    <p>Ionic minerals are single atoms or small groups (0.1nm size). They require no digestion and can pass directly through cellular aquaporins. Colloidal minerals are larger suspended clumps that the body must process.</p>
</section>

<section class="andara-section">
    <h2>Source Fidelity</h2>
    <p>Andara minerals are sourced from primordial deposits where they exist in natural ionic sulfate form—mirroring the mineral profile of human blood plasma.</p>
</section>
        `
    },
    "/science/water/memory": {
        title: "Water Memory",
        content: `
<h1>The Programmable Medium</h1>
<p class="lead">Water is not a passive solvent; it is an information carrier—a biological hard drive capable of storing and transmitting frequencies.</p>

<section class="andara-section">
    <h2>The Benveniste Effect</h2>
    <p>Controversial yet compelling research suggests that high dilutions of substances can retain the biological activity of the original solute, imprinted into the electromagnetic structure of the water itself.</p>
</section>

<section class="andara-section">
    <h2>Information Overwrite</h2>
    <p>Filtration removes particles, but does it remove the frequency? Andara's approach suggests that coherence (structure) is needed to specific "overwrite" the chaotic signals of toxins with a new, stable pattern.</p>
</section>
         `
    },
    "/science/magnetics-water": {
        title: "Magnetics & Water",
        content: `
<h1>The Invisible Alignment</h1>
<p class="lead">Water is a dipole—a tiny magnet. Everywhere it flows, it responds to the earth's magnetic fields and local forces.</p>

<section class="andara-section">
    <h2>The Compass Metaphor</h2>
    <p>Just as a compass aligns with the north pole, water molecules align in magnetic corridors. This alignment affects solubility, scale formation, and flow dynamics.</p>
</section>

<section class="andara-section">
    <h2>Lorentz Forces & Scale Control</h2>
    <p>Magnetic conditioning is widely used to shift calcium carbonate from hard, sticking Calcite to soft, non-sticking Aragonite. This is not chemistry; it is physics altering the crystallization path.</p>
</section>
        `
    },
    "/science/crystalline-matrix-overview": {
        title: "Crystalline Matrix Hub",
        content: `
<h1>Geometry + Measurement</h1>
<p class="lead">Water, Minerals, and Fields connect through the language of geometry. This hub organizes the transition from "Amorphous Bulk" to "Ordered Matrix".</p>

<section class="andara-section">
    <h2>4 Principles of Coherence</h2>
    <ol>
        <li><strong>Geometry as a Lens:</strong> Viewing biology through shape.</li>
        <li><strong>Interface Structure:</strong> Life happens at the edges.</li>
        <li><strong>Ion Geometry:</strong> The shape of the charge carrier matters.</li>
        <li><strong>Coherence Targets:</strong> Alignment is the goal.</li>
    </ol>
</section>

<section class="andara-section">
    <h2>The Sulfate Bridge</h2>
    <p>The Sulfate ion (SO4) is a perfect tetrahedron. It is the physical manifestation of geometry in chemistry, acting as the anchor for the crystalline matrix in Andara water.</p>
</section>
        `
    }
};

async function hydrateContent() {
    console.log("Starting Knowledge Hydration...");

    for (const [path, data] of Object.entries(FLAGSHIP_CONTENT)) {
        // Find the page
        const existingPageResult = await db.select().from(pages).where(eq(pages.path, path)).limit(1);
        const page = existingPageResult[0];

        if (page) {
            console.log(`Hydrating: ${path}`);
            await db.update(pages)
                .set({
                    title: data.title, // Enforce flagship title
                    content: data.content,
                    aiStartupHtml: data.content,
                    updatedAt: new Date()
                })
                .where(eq(pages.id, page.id));
        } else {
            console.log(`[WARN] Target page not found for hydration: ${path}. Creating it.`);
            await db.insert(pages).values({
                key: path.replace(/[^a-z0-9]/g, '-'),
                title: data.title,
                path: path,
                clusterKey: 'science', // Default
                content: data.content,
                aiStartupHtml: data.content,
                status: 'published',
                template: 'article',
                seoTitle: data.title,
                seoDescription: `Learn about ${data.title} at Andara Ionic.`
            });
        }
    }

    console.log("Hydration Complete.");
    process.exit(0);
}

hydrateContent().catch(console.error);
