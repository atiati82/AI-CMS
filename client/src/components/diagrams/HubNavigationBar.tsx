import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

/**
 * HubNavigationBar - Cross-hub navigation component
 * Shows the 4 hubs + 1 integrated map for easy cross-linking
 */
export function HubNavigationBar({
    className = '',
    currentPath,
    compact = false
}: {
    className?: string;
    currentPath?: string;
    compact?: boolean;
}) {
    const hubs = [
        {
            key: 'water',
            label: 'Water Science',
            path: '/science/water',
            icon: '💧',
            color: '#0EA5E9',
            zone: 'Z2'
        },
        {
            key: 'bioelectric',
            label: 'Bioelectricity',
            path: '/science/bioelectric',
            icon: '⚡',
            color: '#22C55E',
            zone: 'Z2'
        },
        {
            key: 'geometry',
            label: 'Crystalline Matrix',
            path: '/science/geometry',
            icon: '◇',
            color: '#D4AF37',
            zone: 'Z2'
        },
        {
            key: 'map',
            label: 'Integrated Map',
            path: '/water-crystal-geometry-map',
            icon: '△',
            color: '#4F46E5',
            zone: 'Z2'
        },
        {
            key: 'shop',
            label: 'Products',
            path: '/shop',
            icon: '🧪',
            color: '#8B5CF6',
            zone: 'Z1'
        }
    ];

    return (
        <nav className={`hub-navigation-bar ${compact ? 'compact' : ''} ${className}`}>
            <style>{`
        .hub-navigation-bar {
          display: flex;
          justify-content: center;
          gap: 8px;
          padding: 12px 16px;
          background: linear-gradient(135deg, #FAFAFA 0%, #F1F5F9 100%);
          border-radius: 12px;
          overflow-x: auto;
        }
        .hub-navigation-bar.compact {
          padding: 8px 12px;
          gap: 6px;
        }
        .hub-nav-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          background: white;
          border: 2px solid #E2E8F0;
          border-radius: 8px;
          text-decoration: none;
          color: #334155;
          font-size: 14px;
          font-weight: 500;
          white-space: nowrap;
          transition: all 0.2s ease;
          cursor: pointer;
        }
        .hub-navigation-bar.compact .hub-nav-item {
          padding: 6px 12px;
          font-size: 13px;
          gap: 6px;
        }
        .hub-nav-item:hover {
          border-color: var(--hub-color);
          color: var(--hub-color);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .hub-nav-item.active {
          background: var(--hub-color);
          border-color: var(--hub-color);
          color: white;
        }
        .hub-icon {
          font-size: 18px;
        }
        .hub-navigation-bar.compact .hub-icon {
          font-size: 14px;
        }
        .hub-zone {
          font-size: 10px;
          padding: 2px 6px;
          background: rgba(0, 0, 0, 0.05);
          border-radius: 4px;
          color: #64748B;
        }
        .hub-nav-item.active .hub-zone {
          background: rgba(255, 255, 255, 0.2);
          color: white;
        }
      `}</style>

            {hubs.map((hub, i) => {
                const isActive = currentPath === hub.path;

                return (
                    <motion.div
                        key={hub.key}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                    >
                        <Link href={hub.path}>
                            <a
                                className={`hub-nav-item ${isActive ? 'active' : ''}`}
                                style={{ '--hub-color': hub.color } as React.CSSProperties}
                            >
                                <span className="hub-icon">{hub.icon}</span>
                                <span>{hub.label}</span>
                                {!compact && <span className="hub-zone">{hub.zone}</span>}
                            </a>
                        </Link>
                    </motion.div>
                );
            })}
        </nav>
    );
}

export default HubNavigationBar;
