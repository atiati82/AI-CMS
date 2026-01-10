import { motion } from "framer-motion";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Pause, RotateCcw, Zap, Waves, Magnet, Sparkles, Move, Eye, Layers, Droplets, Sun, Box } from "lucide-react";

const MOTION_ARCHETYPES = [
  {
    key: "liquid-crystal-float",
    name: "Liquid-Crystal Float",
    description: "Slow 3D drifting with subtle scale oscillation",
    useCases: ["Hero backgrounds", "Product highlights", "Premium CTAs"],
    icon: Waves,
    color: "from-blue-500/20 to-indigo-600/20",
    borderColor: "border-blue-500/30",
    animation: {
      animate: {
        y: [-8, 8, -8],
        rotateY: [-2, 2, -2],
        scale: [1, 1.02, 1],
      },
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  },
  {
    key: "energetic-pulse",
    name: "Energetic Pulse",
    description: "Quick expand-contract with glow burst",
    useCases: ["Add-to-cart buttons", "Notifications", "Success states"],
    icon: Zap,
    color: "from-amber-500/20 to-orange-600/20",
    borderColor: "border-amber-500/30",
    animation: {
      animate: {
        scale: [1, 1.08, 1],
        boxShadow: [
          "0 0 0 rgba(251, 191, 36, 0)",
          "0 0 20px rgba(251, 191, 36, 0.4)",
          "0 0 0 rgba(251, 191, 36, 0)",
        ],
      },
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  },
  {
    key: "magnetic-drift",
    name: "Magnetic Drift",
    description: "Slow horizontal pendulum swing",
    useCases: ["Testimonial sliders", "Feature carousels", "Gallery items"],
    icon: Magnet,
    color: "from-purple-500/20 to-violet-600/20",
    borderColor: "border-purple-500/30",
    animation: {
      animate: {
        x: [-12, 12, -12],
        rotate: [-1, 1, -1],
      },
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  },
  {
    key: "krystal-bloom",
    name: "Krystal Bloom",
    description: "Radial scale-up with diamond sparkle overlay",
    useCases: ["Feature cards", "Pricing highlights", "New items"],
    icon: Sparkles,
    color: "from-cyan-500/20 to-teal-600/20",
    borderColor: "border-cyan-500/30",
    animation: {
      animate: {
        scale: [0.95, 1.05, 0.95],
        opacity: [0.8, 1, 0.8],
        filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"],
      },
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  },
  {
    key: "scalar-slide",
    name: "Scalar Slide",
    description: "Smooth horizontal slide with scale entry",
    useCases: ["Section reveals", "Content transitions", "Navigation"],
    icon: Move,
    color: "from-green-500/20 to-emerald-600/20",
    borderColor: "border-green-500/30",
    animation: {
      animate: {
        x: [0, 20, 0],
        scale: [1, 1.03, 1],
      },
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  },
  {
    key: "vortex-reveal",
    name: "Vortex Reveal",
    description: "Circular rotation with zoom emergence",
    useCases: ["Modal opens", "Image popups", "Portal effects"],
    icon: RotateCcw,
    color: "from-rose-500/20 to-pink-600/20",
    borderColor: "border-rose-500/30",
    animation: {
      animate: {
        rotate: [0, 360],
        scale: [0.9, 1, 0.9],
      },
      transition: {
        duration: 10,
        repeat: Infinity,
        ease: "linear" as const,
      },
    },
  },
  {
    key: "parallax-depth",
    name: "Parallax Depth",
    description: "Multi-layer depth with offset scroll",
    useCases: ["Hero sections", "Scroll stories", "Immersive pages"],
    icon: Layers,
    color: "from-sky-500/20 to-blue-600/20",
    borderColor: "border-sky-500/30",
    animation: {
      animate: {
        y: [-6, 6, -6],
        z: [-10, 10, -10],
        opacity: [0.7, 1, 0.7],
      },
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  },
  {
    key: "ripple-emergence",
    name: "Ripple Emergence",
    description: "Outward wave-like reveal",
    useCases: ["Section transitions", "Content loading", "Interactive feedback"],
    icon: Droplets,
    color: "from-indigo-500/20 to-purple-600/20",
    borderColor: "border-indigo-500/30",
    animation: {
      animate: {
        boxShadow: [
          "0 0 0 0 rgba(99, 102, 241, 0.4)",
          "0 0 0 15px rgba(99, 102, 241, 0)",
          "0 0 0 0 rgba(99, 102, 241, 0.4)",
        ],
        scale: [1, 1.02, 1],
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeOut" as const,
      },
    },
  },
  {
    key: "subtle-shimmer",
    name: "Subtle Shimmer",
    description: "Gentle brightness oscillation",
    useCases: ["Inactive UI", "Background textures", "Subtle emphasis"],
    icon: Sun,
    color: "from-yellow-500/20 to-amber-600/20",
    borderColor: "border-yellow-500/30",
    animation: {
      animate: {
        opacity: [0.85, 1, 0.85],
        filter: ["brightness(1)", "brightness(1.15)", "brightness(1)"],
      },
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  },
  {
    key: "layered-parallax",
    name: "Layered Parallax Scroll",
    description: "Background/midground/foreground at different scroll speeds",
    useCases: ["Complex hero sections", "Storytelling pages", "Immersive experiences"],
    icon: Box,
    color: "from-fuchsia-500/20 to-pink-600/20",
    borderColor: "border-fuchsia-500/30",
    animation: {
      animate: {
        perspective: 1000,
        rotateX: [-2, 2, -2],
        y: [-4, 4, -4],
      },
      transition: {
        duration: 7,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  },
];

interface MotionPreviewBoxProps {
  archetype: typeof MOTION_ARCHETYPES[0];
  isPlaying: boolean;
  onSelect?: (key: string) => void;
  isSelected?: boolean;
}

function MotionPreviewBox({ archetype, isPlaying, onSelect, isSelected }: MotionPreviewBoxProps) {
  const Icon = archetype.icon;

  return (
    <Card
      className={`relative overflow-hidden cursor-pointer transition-all duration-300 ${isSelected ? 'ring-2 ring-primary' : 'hover:ring-1 hover:ring-primary/50'
        } ${archetype.borderColor}`}
      onClick={() => onSelect?.(archetype.key)}
      data-testid={`motion-preview-${archetype.key}`}
    >
      <div className={`absolute inset-0 bg-linear-to-br ${archetype.color} opacity-50`} />

      <CardHeader className="relative pb-2">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-primary" />
          <CardTitle className="text-sm">{archetype.name}</CardTitle>
        </div>
        <CardDescription className="text-xs">{archetype.description}</CardDescription>
      </CardHeader>

      <CardContent className="relative pb-4">
        <div className="flex justify-center py-4">
          <motion.div
            className={`w-16 h-16 rounded-lg bg-linear-to-br ${archetype.color} border ${archetype.borderColor} flex items-center justify-center`}
            {...(isPlaying ? archetype.animation : {})}
            data-testid={`motion-box-${archetype.key}`}
          >
            <Icon className="w-6 h-6 text-foreground/80" />
          </motion.div>
        </div>

        <div className="flex flex-wrap gap-1 mt-2">
          {archetype.useCases.slice(0, 2).map((useCase, i) => (
            <Badge key={i} variant="secondary" className="text-[10px] px-1.5 py-0">
              {useCase}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

interface LayeredParallaxDemoProps {
  isPlaying: boolean;
}

function LayeredParallaxDemo({ isPlaying }: LayeredParallaxDemoProps) {
  return (
    <div className="relative w-full h-32 rounded-lg overflow-hidden bg-linear-to-b from-slate-900 to-slate-800" data-testid="layered-parallax-demo">
      <motion.div
        className="absolute inset-0 bg-linear-to-b from-purple-900/20 to-transparent"
        {...(isPlaying ? {
          animate: { y: [-2, 2, -2] },
          transition: { duration: 8, repeat: Infinity, ease: "easeInOut" }
        } : {})}
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-indigo-600/30 to-transparent"
        {...(isPlaying ? {
          animate: { y: [-4, 4, -4] },
          transition: { duration: 5, repeat: Infinity, ease: "easeInOut" }
        } : {})}
      />
      <motion.div
        className="absolute bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary/60"
        {...(isPlaying ? {
          animate: { y: [-8, 8, -8], scale: [1, 1.1, 1] },
          transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        } : {})}
      />
    </div>
  );
}

interface MotionLibraryPreviewProps {
  onSelectArchetype?: (key: string) => void;
  selectedArchetype?: string;
  compact?: boolean;
}

export function MotionLibraryPreview({
  onSelectArchetype,
  selectedArchetype,
  compact = false
}: MotionLibraryPreviewProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeTab, setActiveTab] = useState("grid");

  return (
    <div className="space-y-4" data-testid="motion-library-preview">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Motion Archetypes</h3>
          <p className="text-sm text-muted-foreground">10 Andara Motion Patterns for page elements</p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPlaying(!isPlaying)}
            data-testid="toggle-motion-playback"
          >
            {isPlaying ? <Pause className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
            {isPlaying ? "Pause" : "Play"}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="grid" data-testid="tab-grid">Grid View</TabsTrigger>
          <TabsTrigger value="demo" data-testid="tab-demo">Parallax Demo</TabsTrigger>
        </TabsList>

        <TabsContent value="grid" className="mt-4">
          <div className={`grid gap-3 ${compact ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5'}`}>
            {MOTION_ARCHETYPES.map((archetype) => (
              <MotionPreviewBox
                key={archetype.key}
                archetype={archetype}
                isPlaying={isPlaying}
                onSelect={onSelectArchetype}
                isSelected={selectedArchetype === archetype.key}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="demo" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Layered Parallax Scroll Demo</CardTitle>
              <CardDescription>Background, midground, and foreground layers at different speeds</CardDescription>
            </CardHeader>
            <CardContent>
              <LayeredParallaxDemo isPlaying={isPlaying} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {selectedArchetype && (
        <Card className="border-primary/50" data-testid="selected-archetype-details">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">
              Selected: {MOTION_ARCHETYPES.find(a => a.key === selectedArchetype)?.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {MOTION_ARCHETYPES.find(a => a.key === selectedArchetype)?.description}
            </p>
            <div className="flex flex-wrap gap-1 mt-2">
              {MOTION_ARCHETYPES.find(a => a.key === selectedArchetype)?.useCases.map((useCase, i) => (
                <Badge key={i} variant="outline" className="text-xs">
                  {useCase}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Single archetype preview component for inline use
interface SingleMotionPreviewProps {
  archetypeKey: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function SingleMotionPreview({ archetypeKey, size = 'md', className = '' }: SingleMotionPreviewProps) {
  const archetype = MOTION_ARCHETYPES.find(a => a.key === archetypeKey);
  if (!archetype) return null;

  const Icon = archetype.icon;
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  };
  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-10 h-10'
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} ${className} rounded-xl bg-linear-to-br ${archetype.color} border ${archetype.borderColor} flex items-center justify-center shadow-lg`}
      {...archetype.animation}
      data-testid={`single-motion-preview-${archetypeKey}`}
    >
      <Icon className={`${iconSizes[size]} text-foreground/80`} />
    </motion.div>
  );
}

export { MOTION_ARCHETYPES };
