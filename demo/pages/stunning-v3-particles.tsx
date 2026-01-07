
import React, { useRef, useMemo } from "react";
import StandardPageLayout from "@/components/StandardPageLayout";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Reusing R3F
function ParticleBrain() {
    const particlesCount = 2000;
    const points = useRef<THREE.Points>(null);

    // Generate positions: Target (Sphere) vs Chaos (Random)
    const { targetPositions, chaosPositions, colors } = useMemo(() => {
        const target = new Float32Array(particlesCount * 3);
        const chaos = new Float32Array(particlesCount * 3);
        const cols = new Float32Array(particlesCount * 3);
        const color1 = new THREE.Color("#f6d56a");
        const color2 = new THREE.Color("#38ffd1");

        for (let i = 0; i < particlesCount; i++) {
            // Target: Sphere surface
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);
            const r = 2;

            target[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            target[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            target[i * 3 + 2] = r * Math.cos(phi);

            // Chaos: Big box
            chaos[i * 3] = (Math.random() - 0.5) * 20;
            chaos[i * 3 + 1] = (Math.random() - 0.5) * 20;
            chaos[i * 3 + 2] = (Math.random() - 0.5) * 20;

            // Colors
            const mixedColor = i % 2 === 0 ? color1 : color2;
            cols[i * 3] = mixedColor.r;
            cols[i * 3 + 1] = mixedColor.g;
            cols[i * 3 + 2] = mixedColor.b;
        }

        return { targetPositions: target, chaosPositions: chaos, colors: cols };
    }, []);

    // Animation State
    useFrame((state) => {
        if (!points.current) return;

        const t = state.clock.getElapsedTime();
        const positions = points.current.geometry.attributes.position.array as Float32Array;

        // Assembly Factor: Oscillate between 0 (Chaos) and 1 (Target)
        // Or control via mouse? Let's oscillate for demo "breathing"
        const factor = (Math.sin(t * 0.5) + 1) / 2; // 0 to 1

        for (let i = 0; i < particlesCount; i++) {
            const ix = i * 3;
            const iy = i * 3 + 1;
            const iz = i * 3 + 2;

            // Lerp logic
            positions[ix] = THREE.MathUtils.lerp(chaosPositions[ix], targetPositions[ix], factor);
            positions[iy] = THREE.MathUtils.lerp(chaosPositions[iy], targetPositions[iy], factor);
            positions[iz] = THREE.MathUtils.lerp(chaosPositions[iz], targetPositions[iz], factor);
        }

        points.current.geometry.attributes.position.needsUpdate = true;

        // Rotate the whole system
        points.current.rotation.y += 0.002;
    });

    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particlesCount}
                    array={new Float32Array(particlesCount * 3)} // Init container
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={particlesCount}
                    array={colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                vertexColors
                transparent
                opacity={0.8}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

export default function StunningV3Particles() {
    return (
        <StandardPageLayout
            title="Molecular Assembly"
            subtitle="Phase III: Entropic Ordering"
            seoTitle="Particle Assembly Demo"
            seoDescription="3D particle system showing chaos to order transformation."
        >
            <div className="w-full h-screen fixed inset-0 z-0 bg-[#020617]">
                <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
                    <ParticleBrain />
                </Canvas>
                <div className="absolute top-32 left-0 w-full text-center pointer-events-none">
                    <p className="text-cyan-400 font-mono tracking-widest text-sm animate-pulse">
                        SYSTEM STATUS: RE-CALIBRATING ENTROPY...
                    </p>
                </div>
            </div>
        </StandardPageLayout>
    );
}
