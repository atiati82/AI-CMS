import React from 'react';
import { motion } from 'framer-motion';

/**
 * HarmonicsNavigator - 3-6-9 Navigation Component
 * Visual navigator using the 3-6-9 harmonic metaphor for library architecture
 */
export function HarmonicsNavigator({
    className = '',
    links,
    onNavigate
}: {
    className?: string;
    links?: {
        foundation: Array<{ label: string; href: string }>;
        network: Array<{ label: string; href: string }>;
        integration: Array<{ label: string; href: string }>;
    };
    onNavigate?: (href: string) => void;
}) {
    // Default links if none provided
    const defaultLinks = {
        foundation: [
            { label: 'Water Science', href: '/science/water' },
            { label: 'Bioelectricity', href: '/science/bioelectric' },
            { label: 'Crystalline Matrix', href: '/science/geometry' }
        ],
        network: [
            { label: 'Structured Water', href: '/structured-water-basics' },
            { label: 'EZ Water', href: '/ez-water-overview' },
            { label: 'Sulfate Chemistry', href: '/sulfate-chemistry' },
            { label: 'Mineral Blueprint', href: '/mineral-science-blueprint' },
            { label: 'Vortex Tech', href: '/vortex-technologies' },
            { label: 'Light & Water', href: '/light-and-water' }
        ],
        integration: [
            { label: 'Water–Crystal–Geometry Map', href: '/water-crystal-geometry-map' },
            { label: 'Parameter Tracking', href: '/parameter-tracking' },
            { label: 'Home Test Kit', href: '/home-water-test-kit' },
            { label: 'Comparison Protocol', href: '/andara-vs-baseline-water-protocol' },
            { label: 'EC/TDS', href: '/conductivity-tds-water' },
            { label: 'ORP/Redox', href: '/orp-redox-water' },
            { label: 'pH Balance', href: '/ph-balance-water' },
            { label: 'Turbidity', href: '/turbidity-clarity' },
            { label: 'Citizen Science', href: '/citizen-science-hub' }
        ]
    };

    const navLinks = links || defaultLinks;

    const colors = {
        three: '#D4AF37',   // Gold - Foundation
        six: '#0EA5E9',     // Sky Blue - Network
        nine: '#4F46E5',    // Indigo - Integration
        text: '#1E293B',
        textLight: '#64748B'
    };

    const handleClick = (href: string) => {
        if (onNavigate) {
            onNavigate(href);
        } else {
            window.location.href = href;
        }
    };

    return (
        <div className={`harmonics-navigator ${className}`}>
            <style>{`
        .harmonics-navigator {
          display: flex;
          flex-direction: column;
          gap: 24px;
          padding: 24px;
          background: linear-gradient(135deg, #FAFAFA 0%, #F1F5F9 100%);
          border-radius: 16px;
        }
        .harmonics-header {
          text-align: center;
          margin-bottom: 8px;
        }
        .harmonics-title {
          font-size: 24px;
          font-weight: 700;
          color: #1E293B;
          margin: 0 0 8px 0;
        }
        .harmonics-subtitle {
          font-size: 14px;
          color: #64748B;
          margin: 0;
        }
        .harmonic-level {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .level-header {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .level-badge {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: 800;
          color: white;
        }
        .level-badge.three { background: ${colors.three}; }
        .level-badge.six { background: ${colors.six}; }
        .level-badge.nine { background: ${colors.nine}; }
        .level-info h3 {
          font-size: 16px;
          font-weight: 600;
          color: #1E293B;
          margin: 0 0 2px 0;
        }
        .level-info p {
          font-size: 13px;
          color: #64748B;
          margin: 0;
        }
        .level-links {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          padding-left: 52px;
        }
        .nav-chip {
          padding: 6px 14px;
          background: white;
          border: 1px solid #E2E8F0;
          border-radius: 20px;
          font-size: 13px;
          color: #334155;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
        }
        .nav-chip:hover {
          border-color: #4F46E5;
          color: #4F46E5;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.15);
        }
        .nav-chip.three:hover { border-color: ${colors.three}; color: ${colors.three}; }
        .nav-chip.six:hover { border-color: ${colors.six}; color: ${colors.six}; }
        .nav-chip.nine:hover { border-color: ${colors.nine}; color: ${colors.nine}; }
      `}</style>

            <div className="harmonics-header">
                <h2 className="harmonics-title">3 · 6 · 9</h2>
                <p className="harmonics-subtitle">Navigate the Andara Library</p>
            </div>

            {/* 3 - Foundation */}
            <motion.div
                className="harmonic-level"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <div className="level-header">
                    <div className="level-badge three">3</div>
                    <div className="level-info">
                        <h3>Foundation</h3>
                        <p>The three hub pillars</p>
                    </div>
                </div>
                <div className="level-links">
                    {navLinks.foundation.map((link, i) => (
                        <motion.a
                            key={link.href}
                            href={link.href}
                            className="nav-chip three"
                            onClick={(e) => { e.preventDefault(); handleClick(link.href); }}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 + i * 0.05 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            {link.label}
                        </motion.a>
                    ))}
                </div>
            </motion.div>

            {/* 6 - Network */}
            <motion.div
                className="harmonic-level"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <div className="level-header">
                    <div className="level-badge six">6</div>
                    <div className="level-info">
                        <h3>Network</h3>
                        <p>Key topic pages — bridge concepts</p>
                    </div>
                </div>
                <div className="level-links">
                    {navLinks.network.map((link, i) => (
                        <motion.a
                            key={link.href}
                            href={link.href}
                            className="nav-chip six"
                            onClick={(e) => { e.preventDefault(); handleClick(link.href); }}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 + i * 0.03 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            {link.label}
                        </motion.a>
                    ))}
                </div>
            </motion.div>

            {/* 9 - Integration */}
            <motion.div
                className="harmonic-level"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <div className="level-header">
                    <div className="level-badge nine">9</div>
                    <div className="level-info">
                        <h3>Integration</h3>
                        <p>Field view — measurement + validation</p>
                    </div>
                </div>
                <div className="level-links">
                    {navLinks.integration.map((link, i) => (
                        <motion.a
                            key={link.href}
                            href={link.href}
                            className="nav-chip nine"
                            onClick={(e) => { e.preventDefault(); handleClick(link.href); }}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6 + i * 0.02 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            {link.label}
                        </motion.a>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}

export default HarmonicsNavigator;
