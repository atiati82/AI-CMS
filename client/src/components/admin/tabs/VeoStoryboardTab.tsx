import React, { useState } from "react";
import { Copy, Check, Video, Film, Music, Lightbulb, Hexagon, Droplets, Zap, Sun, Loader2, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface SceneProps {
  number: number;
  title: string;
  vo: string;
  visual: string;
  prompt: string;
  image?: string;
}

const EPISODE_1_SCENES: SceneProps[] = [
  {
    number: 1,
    title: "The Primordial Origin",
    vo: "Long before there was a blue bottle... there was fire. Ancient. Volcanic. Primordial.",
    visual: "Dark, ancient volcanic landscape. Glowing veins of lava and gold cooling into rock. Steam rising.",
    prompt: "Cinematic macro shot of dark basalt volcanic rock cooling, glowing veins of molten gold and red lava cracking through the surface, steam rising in slow motion, 8k resolution, highly detailed texture, dramatic lighting, dark atmosphere.",
    image: "/images/veo/frame_1_volcano.png"
  },
  {
    number: 2,
    title: "Ionic Dispersion",
    vo: "Through eons of rain and pressure, nature refined these minerals into something rare. Not just rock... but ionic energy.",
    visual: "Microscopic view of minerals dissolving into water. Golden particles turning into a glowing blue mist/liquid.",
    prompt: "Microscopic cinematic shot of golden mineral particles dissolving into clear water, turning into swirling bioluminescent electric blue mist, magical fluid dynamics, 8k, scientific visualization, ethereal glow.",
    image: "/images/veo/frame_2_ionic_dispersion.png"
  },
  {
    number: 3,
    title: "The Structure Forms",
    vo: "This is where the magic happens. The ionic minerals act as anchors. pulling chaotic water molecules into perfect, hexagonal order.",
    visual: "Abstract geometric lattice forming in blue water. Hexagons clicking into place. Crystalline structure growing.",
    prompt: "Abstract scientific visualization of water molecules forming a perfect glowing blue hexagonal crystal lattice structure, sacred geometry in nature, macro photography style, depth of field, 8k, futuristic biological architecture.",
    image: "/images/veo/frame_3_hexagonal_structure.png"
  },
  {
    number: 4,
    title: "The Final Product",
    vo: "From the depths of the earth, to the light of day. Andara Ionic. The foundation of life.",
    visual: "The classic blue Andara bottle sitting on a natural rock surface, with a waterfall or pure stream in background. Sunlight hitting it.",
    prompt: "Product shot of a cobalt blue glass apothecary bottle sitting on wet natural river rock, soft waterfall in background out of focus, golden sunlight ray hitting the bottle, internal blue glow, cinematic commercial lighting, 8k, high end luxury wellness.",
    image: "/images/veo/frame_4_final_product_new.png"
  },
  {
    number: 5,
    title: "Call to Action",
    vo: "Structure your water. Structure your life.",
    visual: "Text overlay 'ANDARA IONIC' with the logo fading in over flowing clear water.",
    prompt: "Cinematic slow motion shot of crystal clear water flowing over smooth glass, high key lighting, clean and pure aesthetic, 8k resolution, commercial background.",
  }
];

const EPISODE_2_SCENES: SceneProps[] = [
  {
    number: 1,
    title: "Order from Chaos",
    vo: "We are taught water has three phases. Solid. Liquid. Vapor. But we were missing the most important one.",
    visual: "Split screen. Left: chaotic dark water. Right: ordered, glowing hexagonal lattice.",
    prompt: "Cinematic 3D microscopic split screen. Left side shows chaotic dark water molecules moving randomly. Right side shows perfectly organized glowing crystalline hexagonal blue water lattice. Camera slow push transition from chaos to order. 8k, scientific visualization, bioluminescent style.",
    image: "public/images/veo/ez_frame_1_chaos_order.png" // Path adjusted for viewing, typically /images/veo/...
  },
  {
    number: 2,
    title: "The Exclusion Zone",
    vo: "Next to hydrophilic surfaces... water transforms. It pushes out everything else. Toxins. Solutes. Debris.",
    visual: "Macro view of water snapping into a grid layout next to a surface, pushing away dark particles.",
    prompt: "Macro scientific animation of water molecules hitting a hydrophilic surface and snapping into a perfect hexagonal grid layer. The forming grid physically pushes away dark floating particles, creating a clear glowing boundary layer. 8k, detailed, clean medical aesthetic.",
  },
  {
    number: 3,
    title: "The Natural Battery",
    vo: "This is not just water. It is a battery. The EZ layer is negative. The bulk water is positive. Separation of charge... creates life.",
    visual: "Abstract battery visualization. Glowing cyan negative zone, adjacent magenta positive zone. Electrical arcs.",
    prompt: "Abstract scientific visualization of a water battery. A glowing cyan layer of hexagonal water with floating negative symbols. Adjacent bulk water layer with floating positive symbols. Subtle electrical arcs connecting the two zones. 8k, holographic style, glowing energy.",
    image: "public/images/veo/ez_frame_2_battery_charge.png"
  },
  {
    number: 4,
    title: "Light Activation",
    vo: "And the fuel? Light. Invisible infrared energy from the sun expands this zone. Charging the battery.",
    visual: "Infrared light beam hitting water, causing the blue hexagonal layer to expand rapidly.",
    prompt: "Cinematic shot of warm infrared light beams striking a body of water. Where the light hits, a glowing blue crystalline water layer rapidly grows and expands, building new hexagonal layers. 8k, ethereal lighting, magical realism.",
    image: "public/images/veo/ez_frame_3_light_activation.png"
  },
  {
    number: 5,
    title: "The Ionic Anchor",
    vo: "But to hold this structure, you need an anchor. Minerals provide the stable foundation.",
    visual: "Gold mineral particle floating, with hexagonal water layers forming stable spheres around it.",
    prompt: "Macro shot of a single glowing gold mineral crystal floating in water. Blue hexagonal water lattice structures form and anchor onto the mineral surface, creating a stable structured sphere around it. 8k, product visualization, luxury scientific.",
    image: "/images/veo/ez_frame_4_ionic_anchor.png"
  }
];

const EPISODE_3_SCENES: SceneProps[] = [
  {
    number: 1,
    title: "The Crystallization of Vitality (Master Shot)",
    vo: "Chaos... becomes Order. This is Andara. Vitality.",
    visual: "Single continuous shot. Camera pushes through chaotic dark water, hits a golden shockwave, instant crystallization into neon cyan grid, rapid pullback to reveal blue bottle in sunlight.",
    prompt: "(8 second continuous shot) (0:00) Extreme macro view inside dark turbulent liquid, chaotic grey particles swirling violently. (0:02) A golden shockwave ripples through the liquid, triggering an instant phase change. The liquid snaps into a glowing neon electric-cyan hexagonal crystal lattice, perfectly ordered and bright. (0:05) Camera rapidly zooms out/pulls back through the glass wall of a cobalt blue bottle. (0:07) Reveal the blue bottle sitting on a mossy river rock in sunlight, water flowing around it. 8k, hyper-realistic physics, volumetric lighting, Arri Alexa, anamorphic lens flare.",
    image: "/images/veo/veo_8s_master_shot.png"
  }
];

const EPISODE_4_SCENES: SceneProps[] = [
  {
    number: 1,
    title: "Wake Up Your Water (Vertical Reel)",
    vo: "Is your water dead? [SNAP] Wake it up. [BASS DROP] Structure. Energy. Vitality. Experience the Fourth Phase.",
    visual: "Vertical split/montage. Dull water -> SNAP -> Explosion of helical light -> Golden Drop -> Bottle Slam -> Link in Bio.",
    prompt: "(12 second flashy montage) (0:00) Central framing. A dull grey glass of water. A finger snaps. (0:02) EXPLOSION of light inside the glass, the water turns into a glowing neon cyan double-helix vortex spinning rapidly. (0:05) Extreme macro of a gold drop hitting the water surface. (0:08) Fast cut to cobalt blue bottle slamming down onto a rock in bright sunlight. (0:10) Text 'LINK IN BIO' appears in 3D floating letters. 8k, dynamic camera, viral tiktok style, high energy.",
    image: "/images/veo/veo_12s_viral_reel.png"
  }
];

const EPISODE_5_SCENES: SceneProps[] = [
  {
    number: 1,
    title: "The Transformation (Website Masterpiece 16:9)",
    vo: "Is your water dead? ... Wake it up. Structure your life. Andara.",
    visual: "Wide Cinematic. Dull water -> Golden Drop -> Widescreen Crystal Explosion -> Rainforest Panorama.",
    prompt: "(Cinematic Widescreen 16:9) (0:00) Wide shot of a dull, grey, lifeless glass of water sitting on a cold concrete design table, negative space on the right. (0:03) A single glowing GOLDEN DROP falls from above and hits the water surface. (0:04) IMPACT. The water instantly phases into a vibrant, glowing NEON CYAN LIQUID CRYSTAL structure. The glass container shatters in slow motion, but the water magically holds a perfect wide hexagonal shape, defying gravity. (0:07) The camera flies THROUGH the glowing water lattice, transitioning into a wider, lush, sunlit rainforest panoramic. (0:10) Reveal the Cobalt Blue Andara Bottle resting on a vibrant green mossy rock in the center of the stream. (0:12) Text 'WAKE UP YOUR WATER' floats in 3D golden letters. 8k, unreal engine 5 style, bioluminescent, high energy transformation, commercial luxury aesthetic.",
    image: "/images/veo/frame_4_final_product_new.png"
  }
];

function SceneCard({ scene }: { scene: SceneProps }) {
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(scene.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateVideo = async () => {
    setGenerating(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/generate-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          prompt: scene.prompt,
          imageRef: scene.image // Pass image for potential image-to-video future use
        })
      });

      const result = await response.json();

      if (result.success && result.videoUrl) {
        setGeneratedVideo(result.videoUrl);
      } else {
        alert("Video generation failed: " + (result.error || "Unknown error"));
      }
    } catch (e) {
      alert("Error generating video");
    } finally {
      setGenerating(false);
    }
  };

  const displayImage = scene.image ? scene.image.replace('public/', '/') : undefined;

  return (
    <Card className="p-6 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all group overflow-hidden relative">
      {/* Background gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative z-10 flex flex-col md:flex-row gap-6">
        {/* Visual Reference Side */}
        <div className="w-full md:w-1/3 shrink-0">
          <div className="aspect-video rounded-lg overflow-hidden bg-muted/50 border border-border/50 relative group-hover:shadow-lg transition-all">
            {(generatedVideo) ? (
              <video
                src={generatedVideo}
                controls
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
              />
            ) : displayImage ? (
              <img
                src={displayImage}
                alt={"Scene " + scene.number + " Reference"}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground p-4 text-center">
                <Video className="w-8 h-8 mb-2 opacity-50" />
                <span className="text-xs">No Ref Image</span>
              </div>
            )}
            <Badge className="absolute top-2 left-2 bg-black/50 backdrop-blur text-white border-none">
              Scene {scene.number}
            </Badge>
          </div>

          {/* Generation Controls */}
          <div className="mt-4">
            <Button
              variant={generatedVideo ? "outline" : "default"}
              size="sm"
              className="w-full text-xs gap-2"
              onClick={handleGenerateVideo}
              disabled={generating}
            >
              {generating ? (
                <>
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Generating...
                </>
              ) : generatedVideo ? (
                <>
                  <Zap className="w-3 h-3 text-yellow-400" />
                  Regenerate Video
                </>
              ) : (
                <>
                  <Video className="w-3 h-3" />
                  Generate with Veo
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Content Side */}
        <div className="flex-1 space-y-4">
          <div>
            <h3 className="text-xl font-display font-bold text-foreground mb-1">{scene.title}</h3>
            <div className="flex items-start gap-2 text-sm text-muted-foreground bg-muted/30 p-3 rounded-md italic">
              <Music className="w-4 h-4 shrink-0 mt-0.5 text-primary/70" />
              <span>"{scene.vo}"</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                <Lightbulb className="w-3 h-3" /> Veo Prompt
              </span>
              <Button
                variant="ghost"
                size="sm"
                className={cn("h-6 text-xs gap-1", copied && "text-green-500 hover:text-green-600")}
                onClick={handleCopy}
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? "Copied!" : "Copy Prompt"}
              </Button>
            </div>
            <div className="bg-slate-950/50 p-3 rounded-md border border-white/5 text-xs font-mono text-slate-300 leading-relaxed break-words">
              {scene.prompt}
            </div>
          </div>

          <div className="text-xs text-muted-foreground border-t border-border/50 pt-2">
            <span className="font-semibold text-primary/80">Visual:</span> {scene.visual}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function VeoStoryboardTab() {
  const [episode, setEpisode] = useState("1");

  const currentScenes = episode === "1" ? EPISODE_1_SCENES
    : episode === "2" ? EPISODE_2_SCENES
      : episode === "3" ? EPISODE_3_SCENES
        : episode === "4" ? EPISODE_4_SCENES
          : EPISODE_5_SCENES;

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-slate-900 to-slate-900/50 p-6 rounded-2xl border border-white/10">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2 flex items-center gap-3">
            <Film className="w-8 h-8 text-primary" />
            Video Production Studio
          </h1>
          <p className="text-slate-400">
            Generate high-fidelity video assets using Google Veo.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-black/20 p-2 rounded-lg border border-white/5">
          <span className="text-sm font-medium text-slate-300 px-2">Select Story:</span>
          <Select value={episode} onValueChange={setEpisode}>
            <SelectTrigger className="w-[250px] bg-slate-800 border-slate-700 text-white">
              <SelectValue placeholder="Select Episode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Ep 1: The Origin Story</SelectItem>
              <SelectItem value="2">Ep 2: EZ Water (Science)</SelectItem>
              <SelectItem value="3">Commercial: 8s Master Spot</SelectItem>
              <SelectItem value="4">Social: 12s Viral Reel</SelectItem>
              <SelectItem value="5">🔥 Ep 5: The Lead Gen Masterpiece</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Controls */}
        <div className="space-y-6">
          <Card className="p-5 bg-card/30 backdrop-blur border-border/50">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Sun className="w-4 h-4 text-amber-400" />
              Production Guide
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                <strong>1. Copy Prompt:</strong> Use the button to copy the optimized Veo prompt.
              </p>
              <p>
                <strong>2. Reference Image:</strong> Download the image (right click) and upload to Veo for style consistency.
              </p>
              <p>
                <strong>3. Generate:</strong> Create 5-10 second clips for each scene.
              </p>
              <p>
                <strong>4. Edit:</strong> Stitch clips together with the voiceover.
              </p>
            </div>
          </Card>

          <Card className="p-5 bg-card/30 backdrop-blur border-border/50">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Hexagon className="w-4 h-4 text-blue-400" />
              Style Palette
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-[#0a192f] border border-white/10"></div>
                <span className="text-xs">Deep Obsidian</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-[#00ffff] border border-white/10 shadow-[0_0_10px_#00ffff]"></div>
                <span className="text-xs">Bioluminescent Cyan</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-[#ffd700] border border-white/10 shadow-[0_0_10px_#ffd700]"></div>
                <span className="text-xs">Ionic Gold</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Timeline / Scenes */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Scene List</h2>
            <Badge variant="outline" className="text-slate-400 border-slate-700">
              {currentScenes.length} Scenes
            </Badge>
          </div>

          {currentScenes.map((scene) => (
            <SceneCard key={scene.number} scene={scene} />
          ))}
        </div>


      </div>
    </div>
  );
}
