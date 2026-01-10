import React, { useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';

interface Particle {
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    charge: 'positive' | 'negative';
    size: number;
    opacity: number;
}

interface IONParticleFieldProps {
    className?: string;
    particleCount?: number;
    interactive?: boolean;
}

/**
 * IONParticleField - Advanced particle physics visualization
 * Simulates ionic behavior with cations (+) and anions (-)
 */
export function IONParticleField({
    className = '',
    particleCount = 120,
    interactive = true
}: IONParticleFieldProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });
    const animationFrameRef = useRef<number>();

    // Initialize particles
    const initParticles = useMemo(() => {
        const particles: Particle[] = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                charge: Math.random() > 0.5 ? 'positive' : 'negative',
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.3
            });
        }
        return particles;
    }, [particleCount]);

    useEffect(() => {
        particlesRef.current = initParticles;
    }, [initParticles]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * window.devicePixelRatio;
            canvas.height = rect.height * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Mouse tracking for interactive mode
        const handleMouseMove = (e: MouseEvent) => {
            if (!interactive) return;
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: ((e.clientX - rect.left) / rect.width) * 100,
                y: ((e.clientY - rect.top) / rect.height) * 100,
                active: true
            };
        };

        const handleMouseLeave = () => {
            mouseRef.current.active = false;
        };

        if (interactive) {
            canvas.addEventListener('mousemove', handleMouseMove);
            canvas.addEventListener('mouseleave', handleMouseLeave);
        }

        // Animation loop
        const animate = () => {
            const rect = canvas.getBoundingClientRect();
            ctx.clearRect(0, 0, rect.width, rect.height);

            // Update and draw particles
            particlesRef.current.forEach((particle, index) => {
                // Particle-to-particle interaction (simplified charge physics)
                particlesRef.current.forEach((other, otherIndex) => {
                    if (index === otherIndex) return;

                    const dx = other.x - particle.x;
                    const dy = other.y - particle.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 15 && dist > 0) {
                        const force = (particle.charge === other.charge ? -0.02 : 0.01) / dist;
                        particle.vx += (dx / dist) * force;
                        particle.vy += (dy / dist) * force;
                    }
                });

                // Mouse interaction
                if (interactive && mouseRef.current.active) {
                    const dx = mouseRef.current.x - particle.x;
                    const dy = mouseRef.current.y - particle.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 20) {
                        const force = 0.05 / (dist + 1);
                        particle.vx += (dx / dist) * force;
                        particle.vy += (dy / dist) * force;
                    }
                }

                // Apply velocity with damping
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.vx *= 0.98;
                particle.vy *= 0.98;

                // Boundary wrapping
                if (particle.x < 0) particle.x = 100;
                if (particle.x > 100) particle.x = 0;
                if (particle.y < 0) particle.y = 100;
                if (particle.y > 100) particle.y = 0;

                // Draw particle
                const px = (particle.x / 100) * rect.width;
                const py = (particle.y / 100) * rect.height;

                // Glow effect
                const gradient = ctx.createRadialGradient(px, py, 0, px, py, particle.size * 4);
                if (particle.charge === 'positive') {
                    gradient.addColorStop(0, `rgba(251, 191, 36, ${particle.opacity})`); // Amber
                    gradient.addColorStop(1, 'rgba(251, 191, 36, 0)');
                } else {
                    gradient.addColorStop(0, `rgba(59, 130, 246, ${particle.opacity})`); // Blue
                    gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
                }

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(px, py, particle.size * 4, 0, Math.PI * 2);
                ctx.fill();

                // Core particle
                ctx.fillStyle = particle.charge === 'positive'
                    ? `rgba(251, 191, 36, ${particle.opacity + 0.3})`
                    : `rgba(59, 130, 246, ${particle.opacity + 0.3})`;
                ctx.beginPath();
                ctx.arc(px, py, particle.size, 0, Math.PI * 2);
                ctx.fill();

                // Charge symbol (for larger particles)
                if (particle.size > 1.5) {
                    ctx.fillStyle = particle.charge === 'positive'
                        ? 'rgba(255, 255, 255, 0.6)'
                        : 'rgba(255, 255, 255, 0.6)';
                    ctx.font = '10px sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(particle.charge === 'positive' ? '+' : '−', px, py);
                }
            });

            // Draw connection lines between nearby opposite charges
            ctx.strokeStyle = 'rgba(139, 92, 246, 0.1)'; // Purple
            ctx.lineWidth = 0.5;

            particlesRef.current.forEach((particle, index) => {
                particlesRef.current.forEach((other, otherIndex) => {
                    if (index >= otherIndex) return;
                    if (particle.charge === other.charge) return;

                    const dx = other.x - particle.x;
                    const dy = other.y - particle.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 12) {
                        const px1 = (particle.x / 100) * rect.width;
                        const py1 = (particle.y / 100) * rect.height;
                        const px2 = (other.x / 100) * rect.width;
                        const py2 = (other.y / 100) * rect.height;

                        ctx.beginPath();
                        ctx.moveTo(px1, py1);
                        ctx.lineTo(px2, py2);
                        ctx.stroke();
                    }
                });
            });

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (interactive) {
                canvas.removeEventListener('mousemove', handleMouseMove);
                canvas.removeEventListener('mouseleave', handleMouseLeave);
            }
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [interactive]);

    return (
        <div className={`relative w-full h-full ${className}`}>
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                style={{ width: '100%', height: '100%' }}
            />
        </div>
    );
}

export default IONParticleField;
