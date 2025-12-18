import React from 'react';
import { motion } from 'framer-motion';

/**
 * PatternStackCard - Visual representation of the 4-level Pattern Stack
 * Chemistry → Interfaces → Time → Inputs
 */
export function PatternStackCard({
    className = '',
    compact = false,
    onLevelClick
}: {
    className?: string;
    compact?: boolean;
    onLevelClick?: (level: number) => void;
}) {
    const levels = [
        {
            number: 1,
            title: 'Chemistry',
            description: "What's in the water — EC/TDS gives a rough density window",
            color: '#0EA5E9', // Sky Blue
            icon: '🧪'
        },
        {
            number: 2,
            title: 'Interfaces',
            description: 'Where ordering happens — surfaces, containers, hydration layers',
            color: '#D4AF37', // Gold
            icon: '◇'
        },
        {
            number: 3,
            title: 'Time',
            description: 'Stabilization — water changes after sitting, gas exchange',
            color: '#22C55E', // Nature Green
            icon: '⏱'
        },
        {
            number: 4,
            title: 'Inputs',
            description: 'Flow/field/light — vortex, magnetics, temperature',
            color: '#4F46E5', // Indigo
            icon: '⚡'
        }
    ];

    return (
        <div className={`pattern-stack-card ${compact ? 'compact' : ''} ${className}`}>
            <style>{`
        .pattern-stack-card {
          display: flex;
          flex-direction: column;
          gap: 0;
          max-width: 400px;
        }
        .pattern-stack-card.compact {
          max-width: 300px;
        }
        .stack-level {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 20px;
          background: linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.95) 100%);
          border-left: 4px solid var(--level-color);
          position: relative;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .pattern-stack-card.compact .stack-level {
          padding: 12px 16px;
          gap: 12px;
        }
        .stack-level:hover {
          background: linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(241,245,249,1) 100%);
          transform: translateX(4px);
        }
        .stack-level::after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: -8px;
          width: 2px;
          height: 8px;
          background: #CBD5E1;
        }
        .stack-level:last-child::after {
          display: none;
        }
        .level-number {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--level-color);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 16px;
          flex-shrink: 0;
        }
        .pattern-stack-card.compact .level-number {
          width: 28px;
          height: 28px;
          font-size: 14px;
        }
        .level-content {
          flex: 1;
        }
        .level-title {
          font-weight: 600;
          font-size: 16px;
          color: #1E293B;
          margin: 0 0 4px 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .pattern-stack-card.compact .level-title {
          font-size: 14px;
        }
        .level-description {
          font-size: 13px;
          color: #64748B;
          margin: 0;
          line-height: 1.4;
        }
        .pattern-stack-card.compact .level-description {
          font-size: 12px;
        }
        .level-icon {
          font-size: 18px;
        }
        .pattern-stack-card.compact .level-icon {
          font-size: 14px;
        }
      `}</style>

            {levels.map((level, i) => (
                <motion.div
                    key={level.number}
                    className="stack-level"
                    style={{ '--level-color': level.color } as React.CSSProperties}
                    onClick={() => onLevelClick?.(level.number)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                >
                    <div className="level-number">{level.number}</div>
                    <div className="level-content">
                        <h4 className="level-title">
                            <span className="level-icon">{level.icon}</span>
                            {level.title}
                        </h4>
                        {!compact && <p className="level-description">{level.description}</p>}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

export default PatternStackCard;
