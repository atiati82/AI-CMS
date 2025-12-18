/**
 * Water Science AI Agent (Demo Version)
 * 
 * This agent demonstrates the capability to:
 * 1. Interpret natural language about water physics
 * 2. Map concepts to Andara design tokens
 * 3. Generate React/Framer Motion code
 * 
 * In a full production environment, this would call Gemini/GPT-4.
 * For this demo, we use advanced heuristic parsing to ensure reliability and speed.
 */

interface GenerationResult {
    thought: string;
    code: string;
    previewType: 'molecular' | 'structured' | 'interface' | 'vortex' | 'generic';
}

export class WaterScienceAgent {

    static async generate(prompt: string): Promise<GenerationResult> {
        const lowerPrompt = prompt.toLowerCase();

        // 1. Analyze Core Concepts
        const concepts = {
            isInterface: /interface|surface|exclusion|ez|zone/.test(lowerPrompt),
            isFlow: /flow|vortex|spiral|move|current/.test(lowerPrompt),
            isStructure: /structure|hex|crystal|order|lattice/.test(lowerPrompt),
            isCharge: /charge|battery|voltage|plus|minus/.test(lowerPrompt),
            isMolecular: /molecule|h2o|atom|bond/.test(lowerPrompt)
        };

        // 2. Generate "Thought Trace"
        const thought = generateThoughtTrace(concepts, prompt);

        // 3. Generate Code
        const code = generateReactCode(concepts);

        // 4. Determine Preview Type
        let previewType: GenerationResult['previewType'] = 'generic';
        if (concepts.isInterface) previewType = 'interface';
        else if (concepts.isStructure) previewType = 'structured';
        else if (concepts.isFlow) previewType = 'vortex';
        else if (concepts.isMolecular) previewType = 'molecular';

        return { thought, code, previewType };
    }
}

function generateThoughtTrace(concepts: any, originalPrompt: string): string {
    const steps = [
        `1. ANALYSIS: Parsing user input "${originalPrompt.slice(0, 30)}..."`,
        `2. CONCEPT EXTRACTION:`,
        `   - Interface/EZ: ${concepts.isInterface}`,
        `   - Flow/Vortex: ${concepts.isFlow}`,
        `   - Structure: ${concepts.isStructure}`,
        `   - Charge/Energy: ${concepts.isCharge}`,
        `3. DESIGN MAPPING:`,
        `   - Color Palette: ${concepts.isCharge ? 'Emerald/Magenta (#2cff9a)' : concepts.isStructure ? 'Cyan/Aqua (#38ffd1)' : 'Blue (#1aa7ff)'}`,
        `   - Geometry: ${concepts.isStructure ? 'Hexagonal Lattice' : concepts.isFlow ? 'Spiral Vector' : 'Layered Stack'}`,
        `4. COMPONENT ARCHITECTURE:`,
        `   - Selected 'Framer Motion' for physics animation`,
        `   - Applied 'Andara Glass' styling for surfaces`
    ];
    return steps.join('\n');
}

function generateReactCode(concepts: any): string {
    if (concepts.isInterface || concepts.isCharge) {
        return `import { motion } from "framer-motion";

export function InterfaceLayer() {
  return (
    <div className="relative h-64 bg-slate-900 overflow-hidden rounded-xl border border-white/10">
      {/* Hydrophilic Surface */}
      <div className="absolute left-0 top-0 bottom-0 w-4 bg-emerald-400/50 blur-sm" />
      
      {/* EZ Layers (Structured) */}
      {[0, 1, 2].map(i => (
        <motion.div
           key={i}
           className="absolute top-0 bottom-0 border-r border-emerald-400/20"
           style={{ left: \`\${20 + i * 15}px\` }}
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: i * 0.2 }}
        />
      ))}

      {/* Charge Separation */}
      <div className="absolute left-10 text-white font-mono">- - - -</div>
      <div className="absolute left-40 text-rose-400 font-mono">+ + + +</div>
    </div>
  );
}`;
    }

    if (concepts.isStructure) {
        return `import { motion } from "framer-motion";

export function CrystallineLattice() {
  return (
    <div className="grid grid-cols-6 gap-2 p-8 bg-slate-950">
      {/* Hexagonal Grid Generation */}
      {Array.from({ length: 24 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-12 h-12 border border-cyan-400/30 rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            delay: i * 0.05,
            type: "spring"
          }}
          whileHover={{ 
            scale: 1.2,
            backgroundColor: "rgba(56, 255, 209, 0.2)"
          }}
        />
      ))}
    </div>
  );
}`;
    }

    // Default / Flow
    return `import { motion } from "framer-motion";

export function FlowDynamic() {
  return (
    <svg viewBox="0 0 400 200" className="w-full bg-slate-900 rounded-xl">
      {/* Flow Lines */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.path
          key={i}
          d="M 0,100 Q 200,50 400,100"
          fill="none"
          stroke="#1aa7ff"
          strokeWidth={2}
          strokeOpacity={0.5}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}
    </svg>
  );
}`;
}
