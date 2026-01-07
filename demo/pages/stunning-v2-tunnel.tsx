
import React, { useRef, useMemo } from "react";
import StandardPageLayout from "@/components/StandardPageLayout";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import * as THREE from "three";

function CrystalShard({ position, color, speed }: { position: [number, number, number], color: string, speed: number }) {
    const ref = useRef<THREE.Mesh>(null);
    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x += delta * speed;
            ref.current.rotation.y += delta * speed * 0.5;
            // Move towards camera (z-axis) loop
            ref.current.position.z += delta * 5;
            if (ref.current.position.z > 5) {
                ref.current.position.z = -20; // Reset to back
            }
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={ref} position={position}>
                <octahedronGeometry args={[Math.random() * 0.5 + 0.2]} />
                <meshPhysicalMaterial
                    color={color}
                    roughness={0}
                    metalness={0.8}
                    thickness={2}
                    transmission={0.4}
                    transparent
                    opacity={0.8}
                />
            </mesh>
        </Float>
    );
}

function TunnelScene() {
    // Generate shards
    const shards = useMemo(() => {
        return new Array(50).fill(null).map((_, i) => ({
            position: [
                (Math.random() - 0.5) * 10, // X: Spread out
                (Math.random() - 0.5) * 10, // Y: Spread out
                (Math.random() - 0.5) * 25 - 10  // Z: Depth
            ] as [number, number, number],
            color: Math.random() > 0.5 ? "#38ffd1" : "#f6d56a",
            speed: Math.random() * 0.5 + 0.1
        }));
    }, []);

    useFrame((state) => {
        // Subtle camera swirl
        const t = state.clock.getElapsedTime();
        state.camera.position.x = Math.sin(t * 0.2) * 0.5;
        state.camera.position.y = Math.cos(t * 0.2) * 0.5;
        state.camera.lookAt(0, 0, -10);
    });

    return (
        <>
            <fog attach="fog" args={['#020617', 2, 15]} />
            <ambientLight intensity={0.5} />
            <pointLight position={[0, 0, 0]} intensity={2} color="#38ffd1" distance={10} />

            {shards.map((props, i) => (
                <CrystalShard key={i} {...props} />
            ))}
        </>
    );
}

export default function StunningV2Tunnel() {
    return (
        <StandardPageLayout
            title="Crystal Tunnel"
            subtitle="Phase II: Dimensional Depth"
            seoTitle="3D Crystal Tunnel Demo"
            seoDescription="WebGL flythrough of ionic crystal structures."
        >
            <div className="w-full h-screen fixed inset-0 z-0 bg-[#020617]">
                <Canvas camera={{ position: [0, 0, 2], fov: 75 }}>
                    <TunnelScene />
                    <Environment preset="city" />
                </Canvas>

                {/* Overlay UI */}
                <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center z-10">
                    <h1 className="text-6xl md:text-8xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/0 tracking-tighter mix-blend-overlay">
                        DEPTH
                    </h1>
                </div>
            </div>
        </StandardPageLayout>
    );
}
