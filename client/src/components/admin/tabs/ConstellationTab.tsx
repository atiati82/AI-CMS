import React, { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Text, Billboard, Line } from "@react-three/drei";
import * as THREE from "three";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

// Types
interface Node {
    id: string; // path
    label: string;
    group: string;
    status: string;
    orphan: boolean;
    x?: number;
    y?: number;
    z?: number;
    vx?: number;
    vy?: number;
    vz?: number;
}

interface Edge {
    source: string;
    target: string;
}

interface GraphData {
    nodes: Node[];
    edges: Edge[];
}

// Color Palette
const GROUP_COLORS: Record<string, string> = {
    'science-hub': '#3b82f6', // blue
    'products': '#eab308', // gold
    'landing': '#10b981', // green
    'other': '#a855f7', // purple
};

const ORPHAN_COLOR = '#ef4444'; // red

// --- 3D Components ---

function GraphNode({ node, onClick, onHover }: { node: Node; onClick: (n: Node) => void; onHover: (n: Node | null) => void }) {
    const color = node.orphan ? ORPHAN_COLOR : (GROUP_COLORS[node.group] || '#ffffff');
    const ref = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);

    useFrame(() => {
        if (ref.current) {
            ref.current.position.set(node.x || 0, node.y || 0, node.z || 0);
        }
    });

    // Pulse effect for orphans
    useFrame(({ clock }) => {
        if (node.orphan && ref.current) {
            const s = 1 + Math.sin(clock.getElapsedTime() * 3) * 0.2;
            ref.current.scale.set(s, s, s);
        } else if (hovered && ref.current) {
            ref.current.scale.set(1.5, 1.5, 1.5);
        } else if (ref.current) {
            ref.current.scale.set(1, 1, 1);
        }
    });

    return (
        <group>
            <mesh
                ref={ref}
                onClick={(e) => { e.stopPropagation(); onClick(node); }}
                onPointerOver={(e) => { e.stopPropagation(); setHovered(true); onHover(node); }}
                onPointerOut={() => { setHovered(false); onHover(null); }}
            >
                <sphereGeometry args={[node.orphan ? 0.8 : 0.5, 16, 16]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={hovered ? 2 : (node.orphan ? 1 : 0.5)}
                />
            </mesh>
            {/* Label only on hover or if specialized */}
            {hovered && (
                <Billboard position={[node.x || 0, (node.y || 0) + 1, node.z || 0]}>
                    <Text fontSize={0.5} color="white" anchorX="center" anchorY="bottom">
                        {node.label}
                    </Text>
                </Billboard>
            )}
        </group>
    );
}

function GraphConnections({ nodes, edges }: { nodes: Node[]; edges: Edge[] }) {
    const nodeMap = useMemo(() => new Map(nodes.map(n => [n.id, n])), [nodes]);

    // Re-calculate line positions every frame to follow nodes
    // Line component from drei is expensive if recreated, so we use a custom line set or just simplify.
    // For < 500 edges, straight Lines are mostly fine.
    // Optimizing: We can't easily animate Lines with useFrame without ref manipulation of geometry.
    // Using a simple specialized component for dynamic lines.

    // For this implementation, we'll let the force simulation settle quickly or use a fixed layout for stability,
    // OR we trigger a re-render of lines less frequently using a key?
    // Actually, `drei/Line` updates automatically if points prop changes? No.
    // Let's use `Segment` instanced? No.
    // We will use a key to force update every X frames or just static for now?
    // Dynamic is key.

    // We'll write a simple LineSegments implementation for performance.
    const ref = useRef<THREE.LineSegments>(null);
    const geometryInfo = useMemo(() => {
        const positions = new Float32Array(edges.length * 2 * 3);
        return { positions };
    }, [edges]);

    useFrame(() => {
        if (ref.current) {
            const positions = ref.current.geometry.attributes.position.array as Float32Array;
            let i = 0;
            edges.forEach(edge => {
                const source = nodeMap.get(edge.source);
                const target = nodeMap.get(edge.target);
                if (source && target && source.x !== undefined && source.y !== undefined && source.z !== undefined && target.x !== undefined && target.y !== undefined && target.z !== undefined) {
                    positions[i++] = source.x;
                    positions[i++] = source.y;
                    positions[i++] = source.z;
                    positions[i++] = target.x;
                    positions[i++] = target.y;
                    positions[i++] = target.z;
                } else {
                    // Hide invalid lines
                    i += 6;
                }
            });
            ref.current.geometry.attributes.position.needsUpdate = true;
            // ref.current.geometry.computeBoundingSphere();
        }
    });

    return (
        <lineSegments ref={ref}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={edges.length * 2}
                    args={[geometryInfo.positions, 3]}
                />
            </bufferGeometry>
            <lineBasicMaterial color="rgba(255,255,255,0.1)" opacity={0.15} transparent linewidth={1} />
        </lineSegments>
    );
}

// --- Physics Simulation ---
function ForceSimulation({ nodes, edges }: GraphData) {
    useFrame(() => {
        // Simple force-directed layout
        // Repulsion
        for (let i = 0; i < nodes.length; i++) {
            const a = nodes[i];
            for (let j = i + 1; j < nodes.length; j++) {
                const b = nodes[j];
                const dx = (a.x || 0) - (b.x || 0);
                const dy = (a.y || 0) - (b.y || 0);
                const dz = (a.z || 0) - (b.z || 0);
                const distSq = dx * dx + dy * dy + dz * dz || 1;
                const f = 1 / distSq * 0.5; // Repulsion strength

                const fx = dx * f;
                const fy = dy * f;
                const fz = dz * f;

                a.vx = (a.vx || 0) + fx;
                a.vy = (a.vy || 0) + fy;
                a.vz = (a.vz || 0) + fz;
                b.vx = (b.vx || 0) - fx;
                b.vy = (b.vy || 0) - fy;
                b.vz = (b.vz || 0) - fz;
            }
        }

        // Attraction (Edges)
        const nodeMap = new Map(nodes.map(n => [n.id, n]));
        edges.forEach(edge => {
            const source = nodeMap.get(edge.source);
            const target = nodeMap.get(edge.target);
            if (source && target) {
                const dx = (source.x || 0) - (target.x || 0);
                const dy = (source.y || 0) - (target.y || 0);
                const dz = (source.z || 0) - (target.z || 0);
                const dist = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1;
                const f = (dist - 5) * 0.05; // Spring length 5, strength 0.05

                const fx = dx / dist * f;
                const fy = dy / dist * f;
                const fz = dz / dist * f;

                source.vx = (source.vx || 0) - fx;
                source.vy = (source.vy || 0) - fy;
                source.vz = (source.vz || 0) - fz;

                target.vx = (target.vx || 0) + fx;
                target.vy = (target.vy || 0) + fy;
                target.vz = (target.vz || 0) + fz;
            }
        });

        // Center gravity + Velocity application
        nodes.forEach(n => {
            // Pull to center slightly
            n.vx = (n.vx || 0) - (n.x || 0) * 0.01;
            n.vy = (n.vy || 0) - (n.y || 0) * 0.01;
            n.vz = (n.vz || 0) - (n.z || 0) * 0.01;

            // Apply velocity
            n.vx = (n.vx || 0) * 0.9; // Damping
            n.vy = (n.vy || 0) * 0.9;
            n.vz = (n.vz || 0) * 0.9;

            n.x = (n.x || 0) + n.vx;
            n.y = (n.y || 0) + n.vy;
            n.z = (n.z || 0) + n.vz;
        });
    });
    return null;
}

// --- Main Tab Component ---

export default function ConstellationTab() {
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['/api/admin/system/connectivity'],
        queryFn: async () => {
            const res = await fetch('/api/admin/system/connectivity');
            if (!res.ok) throw new Error('Failed to fetch constellation');
            return res.json();
        }
        // No caching to ensure freshness? Maybe 5 min.
    });

    // Initialize positions once loaded
    const graphData = useMemo<GraphData | null>(() => {
        if (!data || !data.nodes) return null;
        // Clone to avoid mutation of cache
        const nodes = data.nodes.map((n: any) => ({
            ...n,
            x: (Math.random() - 0.5) * 20,
            y: (Math.random() - 0.5) * 20,
            z: (Math.random() - 0.5) * 20,
            vx: 0, vy: 0, vz: 0
        }));
        return {
            nodes,
            edges: data.edges
        };
    }, [data]);

    const [selectedNode, setSelectedNode] = useState<Node | null>(null);
    const [hoveredNode, setHoveredNode] = useState<Node | null>(null);

    if (isLoading) return <div className="h-[600px] flex items-center justify-center"><Loader2 className="animate-spin w-12 h-12 text-slate-500" /></div>;

    return (
        <div className="h-[calc(100vh-120px)] w-full rounded-2xl overflow-hidden border border-border/50 bg-black relative shadow-2xl">
            {/* UI Overlay */}
            <div className="absolute top-4 left-4 z-10 pointer-events-none">
                <Card className="p-4 bg-black/60 backdrop-blur border-white/10 text-white pointer-events-auto w-64">
                    <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">The Constellation</h2>
                    <p className="text-xs text-secondary-foreground mb-4">Interactive Knowledge Graph</p>

                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span>Total Nodes:</span>
                            <span className="font-mono">{graphData?.nodes.length}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Connections:</span>
                            <span className="font-mono">{graphData?.edges.length}</span>
                        </div>
                        <div className="flex justify-between text-red-400">
                            <span>Orphans:</span>
                            <span className="font-mono">{data?.orphanCount}</span>
                        </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/10">
                        {hoveredNode || selectedNode ? (
                            <div className="animate-in fade-in slide-in-from-left-2">
                                <div className="font-bold text-lg leading-tight mb-1">{(hoveredNode || selectedNode)?.label}</div>
                                <div className="font-mono text-xs text-white/50 break-all mb-2">{(hoveredNode || selectedNode)?.id}</div>
                                <Badge variant={(hoveredNode || selectedNode)?.orphan ? "destructive" : "secondary"}>
                                    {(hoveredNode || selectedNode)?.orphan ? "Orphan (No Links)" : (hoveredNode || selectedNode)?.group}
                                </Badge>
                                {(hoveredNode || selectedNode)?.orphan && (
                                    <Button size="sm" className="w-full mt-2 bg-red-500/20 hover:bg-red-500/40 text-red-300">
                                        Rescue (Add Link)
                                    </Button>
                                )}
                            </div>
                        ) : (
                            <p className="text-xs text-white/40 italic">Hover over a star to inspect...</p>
                        )}
                    </div>
                </Card>
            </div>

            {/* 3D Scene */}
            <Canvas camera={{ position: [0, 0, 30], fov: 60 }}>
                <color attach="background" args={['#050510']} />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />

                {graphData && (
                    <>
                        <ForceSimulation nodes={graphData.nodes} edges={graphData.edges} />
                        <GraphConnections nodes={graphData.nodes} edges={graphData.edges} />
                        {graphData.nodes.map((node, i) => (
                            <GraphNode
                                key={node.id}
                                node={node}
                                onClick={setSelectedNode}
                                onHover={setHoveredNode}
                            />
                        ))}
                    </>
                )}

                <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} autoRotate={!selectedNode} autoRotateSpeed={0.5} />
            </Canvas>
        </div>
    );
}
