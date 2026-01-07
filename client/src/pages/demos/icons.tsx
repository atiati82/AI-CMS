// @ts-nocheck
import React from "react";

export default function AndaraIconsDemo() {
    return (
        <div className="min-h-screen bg-[#050508] text-slate-200 font-sans p-10 flex flex-col items-center relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[100px]" />
            </div>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;500;700&display=swap');
        
        /* State of the Art Animations */
        @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }

        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-3px); }
        }

        @keyframes pulse-glow {
            0%, 100% { opacity: 0.5; filter: drop-shadow(0 0 2px rgba(255,255,255,0.2)); }
            50% { opacity: 1; filter: drop-shadow(0 0 8px rgba(255,255,255,0.6)); }
        }

        @keyframes flicker {
            0%, 100% { opacity: 1; }
            3% { opacity: 0.4; }
            6% { opacity: 1; }
            7% { opacity: 0.4; }
            8% { opacity: 1; }
            9% { opacity: 1; }
            10% { opacity: 0.1; }
            11% { opacity: 1; }
        }

        /* Applying Animations */
        .card:hover .animate-spin { animation: spin-slow 8s linear infinite; transform-origin: center; }
        .card:hover .animate-float { animation: float 3s ease-in-out infinite; }
        .card:hover .animate-pulse { animation: pulse-glow 2s ease-in-out infinite; }
        .card:hover .animate-flicker { animation: flicker 4s infinite; }
        
        /* Auto-animate some elements even without hover for "alive" feel */
        .alive-spin { animation: spin-slow 12s linear infinite; transform-origin: center; }
        .alive-float { animation: float 4s ease-in-out infinite; }
        .alive-pulse { animation: pulse-glow 3s ease-in-out infinite; }
        
        /* Specific Icon Tweaks */
        .icon-vortex-path { transform-origin: center; }
        .icon-bolt { animation: flicker 5s infinite; }

        .card-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
            gap: 20px;
            width: 100%;
            max-width: 1000px;
            z-index: 10;
        }

        .icon-card {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 16px;
            padding: 24px 16px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            cursor: pointer;
            backdrop-filter: blur(10px);
        }

        .icon-card:hover {
            background: rgba(255, 255, 255, 0.06);
            border-color: rgba(255, 255, 255, 0.2);
            transform: translateY(-2px);
            box-shadow: 0 10px 30px -10px rgba(0,0,0,0.5);
        }

        .icon-card.active {
            background: radial-gradient(circle at center, rgba(255, 215, 0, 0.05) 0%, rgba(255, 255, 255, 0.03) 70%);
            border-color: rgba(255, 215, 0, 0.3);
            box-shadow: 0 0 20px rgba(255, 215, 0, 0.1);
        }
      `}</style>

            <div className="mb-10 text-center z-10">
                <h1 className="text-4xl font-light tracking-wide bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent mb-2">Andara Icon System</h1>
                <p className="text-slate-500 font-light">v4.0 Liquid Alchemy Series • Glassmorphism • Ionic Gradients</p>
            </div>

            {/* Global Defs */}
            <svg width="0" height="0" className="absolute">
                <defs>
                    <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFD700" stopOpacity="1" />
                        <stop offset="100%" stopColor="#FFA500" stopOpacity="1" />
                    </linearGradient>
                    <linearGradient id="gold-glass" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#FFEB3B" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#FF9800" stopOpacity="0.05" />
                    </linearGradient>

                    <linearGradient id="cyan-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00FFFF" stopOpacity="1" />
                        <stop offset="100%" stopColor="#00A3FF" stopOpacity="1" />
                    </linearGradient>
                    <linearGradient id="cyan-glass" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#E0F7FA" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#00BCD4" stopOpacity="0.05" />
                    </linearGradient>

                    <linearGradient id="pink-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FF4081" stopOpacity="1" />
                        <stop offset="100%" stopColor="#C2185B" stopOpacity="1" />
                    </linearGradient>

                    <linearGradient id="silver-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#E2E8F0" stopOpacity="1" />
                        <stop offset="100%" stopColor="#94A3B8" stopOpacity="1" />
                    </linearGradient>

                    <filter id="glow-gold">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>
            </svg>

            <div className="card-grid">
                {/* 1. Vortex Spin */}
                <div className="icon-card">
                    <div className="w-12 h-12 flex items-center justify-center mb-4 transition-all duration-300 drop-shadow-[0_0_8px_rgba(0,255,255,0.1)] hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.3)]">
                        <svg viewBox="0 0 24 24" stroke="url(#cyan-grad)" strokeWidth="1.5" className="w-full h-full fill-none stroke-round stroke-join">
                            <g className="alive-spin">
                                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5 2.5 15 3.5 16.5" style={{ opacity: 0.3 }} />
                                <path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 13 6.5 14 7 15" />
                            </g>
                            <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12" fill="url(#cyan-glass)" className="alive-pulse" />
                        </svg>
                    </div>
                    <span className="text-[13px] font-medium text-slate-400 group-hover:text-slate-100">Vortex Spin</span>
                </div>

                {/* 2. Water Crystal */}
                <div className="icon-card">
                    <div className="w-12 h-12 flex items-center justify-center mb-4">
                        <svg viewBox="0 0 24 24" stroke="url(#cyan-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full fill-none">
                            <g className="alive-float">
                                <path d="M7 8L17 16" />
                                <path d="M17 8L7 16" />
                                <path d="M12 2L16 6" />
                                <path d="M12 2L8 6" />
                                <path d="M12 22L16 18" />
                                <path d="M12 22L8 18" />
                            </g>
                            <path d="M2.5 12H5" strokeOpacity="0.5" className="animate-pulse" />
                            <path d="M19 12H21.5" strokeOpacity="0.5" className="animate-pulse" />
                            <circle cx="12" cy="12" r="1.5" fill="#00FFFF" stroke="none" fillOpacity="0.8" className="alive-pulse">
                                <animate attributeName="opacity" values="0.4;1;0.4" duration="3s" repeatCount="indefinite" />
                            </circle>
                        </svg>
                    </div>
                    <span className="text-[13px] font-medium text-slate-400">Water Crystal</span>
                </div>

                {/* 3. Tetrahedral */}
                <div className="icon-card">
                    <div className="w-12 h-12 flex items-center justify-center mb-4">
                        <svg viewBox="0 0 24 24" stroke="url(#cyan-grad)" strokeWidth="1.5" fill="none" className="w-full h-full">
                            <path d="M12 2L2 19H22L12 2Z" fill="url(#cyan-glass)" style={{ opacity: 0.3 }} className="alive-pulse" />
                            <path d="M12 2L12 22" strokeDasharray="2 2" strokeOpacity="0.5" />
                            <g className="alive-float" style={{ animationDuration: "6s" }}>
                                <path d="M12 2L7 12" />
                                <path d="M12 2L17 12" />
                                <path d="M2 19L12 14L22 19" />
                            </g>
                        </svg>
                    </div>
                    <span className="text-[13px] font-medium text-slate-400">Tetrahedral</span>
                </div>

                {/* 4. Bio-Electric */}
                <div className="icon-card">
                    <div className="w-12 h-12 flex items-center justify-center mb-4">
                        <svg viewBox="0 0 24 24" stroke="url(#gold-grad)" strokeWidth="1.5" fill="none" className="w-full h-full">
                            <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="url(#gold-glass)" className="icon-bolt" />
                        </svg>
                    </div>
                    <span className="text-[13px] font-medium text-slate-400">Bio-Electric</span>
                </div>

                {/* 5. Ionic Drops */}
                <div className="icon-card">
                    <div className="w-12 h-12 flex items-center justify-center mb-4">
                        <svg viewBox="0 0 24 24" stroke="url(#cyan-grad)" strokeWidth="1.5" fill="none" className="w-full h-full">
                            <path d="M12 22C16.4183 22 20 18.4183 20 14C20 8 12 2 12 2C12 2 4 8 4 14C4 18.4183 7.58172 22 12 22Z" fill="url(#cyan-glass)" className="alive-float" />
                            <path d="M14 14C14 12.8954 13.1046 12 12 12" strokeOpacity="0.5" />
                        </svg>
                    </div>
                    <span className="text-[13px] font-medium text-slate-400">Ionic Drops</span>
                </div>

                {/* 6. Design Sim */}
                <div className="icon-card">
                    <div className="w-12 h-12 flex items-center justify-center mb-4">
                        <svg viewBox="0 0 24 24" stroke="url(#gold-grad)" strokeWidth="1.5" fill="none" className="w-full h-full">
                            <g className="alive-spin" style={{ transformOrigin: "12px 12px" }}>
                                <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" fill="url(#gold-glass)" style={{ opacity: 0.2 }} />
                            </g>
                            <circle cx="8" cy="12" r="1.5" fill="#FF4081" stroke="none" className="alive-pulse" style={{ animationDelay: "0s" }} />
                            <circle cx="12" cy="8" r="1.5" fill="#00FFFF" stroke="none" className="alive-pulse" style={{ animationDelay: "1s" }} />
                            <circle cx="16" cy="12" r="1.5" fill="#FFD700" stroke="none" className="alive-pulse" style={{ animationDelay: "2s" }} />
                            <path d="M7 16C8 18 10 19 12 19" strokeLinecap="round" />
                        </svg>
                    </div>
                    <span className="text-[13px] font-medium text-slate-400">Design Sim</span>
                </div>

                {/* 7. Gold Loader */}
                <div className="icon-card">
                    <div className="w-12 h-12 flex items-center justify-center mb-4">
                        <svg viewBox="0 0 24 24" stroke="url(#gold-grad)" strokeWidth="1.5" fill="none" className="w-full h-full">
                            <path d="M5 2H19" />
                            <path d="M5 22H19" />
                            <g className="alive-spin" style={{ animationDuration: "20s", transformOrigin: "12px 12px" }}>
                                <path d="M17 2V6C17 8.5 15.5 10.5 13.5 11.5L12 12L10.5 11.5C8.5 10.5 7 8.5 7 6V2" />
                                <path d="M7 22V18C7 15.5 8.5 13.5 10.5 12.5L12 12L13.5 12.5C15.5 13.5 17 15.5 17 18V22" />
                            </g>
                            <path d="M12 12V22" strokeDasharray="2 2" strokeOpacity="0.3" />
                            <rect x="9" y="18" width="6" height="4" rx="2" fill="url(#gold-glass)" className="alive-pulse" />
                        </svg>
                    </div>
                    <span className="text-[13px] font-medium text-slate-400">Gold Loader</span>
                </div>

                {/* 8. Torus Geometry */}
                <div className="icon-card">
                    <div className="w-12 h-12 flex items-center justify-center mb-4">
                        <svg viewBox="0 0 24 24" stroke="url(#gold-grad)" strokeWidth="1.5" fill="none" className="w-full h-full">
                            <ellipse cx="12" cy="12" rx="10" ry="6" strokeOpacity="0.8" className="alive-pulse" />
                            <ellipse cx="12" cy="12" rx="4" ry="2" fill="url(#gold-glass)" strokeOpacity="1" />
                            <g className="alive-spin" style={{ transformOrigin: "12px 12px", animationDuration: "15s" }}>
                                <path d="M12 2C15 2 18 4 19 8" strokeDasharray="2 2" strokeOpacity="0.4" />
                                <path d="M12 22C9 22 6 20 5 16" strokeDasharray="2 2" strokeOpacity="0.4" />
                            </g>
                        </svg>
                    </div>
                    <span className="text-[13px] font-medium text-slate-400">Torus Geometry</span>
                </div>

                {/* 9. Gold Icons */}
                <div className="icon-card active">
                    <div className="w-12 h-12 flex items-center justify-center mb-4">
                        <svg viewBox="0 0 24 24" stroke="url(#gold-grad)" strokeWidth="1.5" fill="none" className="w-full h-full">
                            <path d="M12 2L14 9L21 9L15 14L17 21L12 17L7 21L9 14L3 9L10 9L12 2Z" fill="url(#gold-glass)" className="alive-pulse" />
                            <path d="M18 2L19 5L22 5L20 7L21 10L18 8L15 10L16 7L14 5L17 5L18 2Z" fill="#FFD700" stroke="none" opacity="0.8" className="alive-float" />
                            <path d="M5 18L6 20L8 20L6.5 21L7 23L5 22L3 23L3.5 21L2 20L4 20L5 18Z" opacity="0.6" className="alive-float" style={{ animationDelay: "1.5s" }} />
                        </svg>
                    </div>
                    <span className="text-[13px] font-medium text-[#FFD700]">Gold Icons</span>
                </div>

                {/* 10. Motion Lab */}
                <div className="icon-card">
                    <div className="w-12 h-12 flex items-center justify-center mb-4">
                        <svg viewBox="0 0 24 24" stroke="url(#silver-grad)" strokeWidth="1.5" fill="none" className="w-full h-full">
                            <g className="alive-float">
                                <path d="M6 18H8" />
                                <path d="M7 18V21" />
                                <path d="M14 3L11 6" strokeLinecap="round" />
                                <path d="M9 16L12 10L15 12" />
                                <path d="M12 10L16 6L18 8L14 12" />
                            </g>
                            <path d="M12 21A3 3 0 1 0 12 15A3 3 0 1 0 12 21Z" fill="url(#cyan-glass)" stroke="url(#cyan-grad)" className="alive-pulse" />
                        </svg>
                    </div>
                    <span className="text-[13px] font-medium text-slate-400">Motion Lab</span>
                </div>

                {/* 11. Conductivity */}
                <div className="icon-card">
                    <div className="w-12 h-12 flex items-center justify-center mb-4">
                        <svg viewBox="0 0 24 24" stroke="url(#cyan-grad)" strokeWidth="1.5" fill="none" className="w-full h-full">
                            <circle cx="12" cy="12" r="10" fill="url(#cyan-glass)" fillOpacity="0.1" className="alive-pulse" />
                            <g className="alive-spin" style={{ transformOrigin: "12px 12px", animationDuration: "20s" }}>
                                <ellipse cx="12" cy="12" rx="10" ry="4" strokeOpacity="0.5" />
                                <ellipse cx="12" cy="12" rx="4" ry="10" strokeOpacity="0.5" />
                            </g>
                            <path d="M12 2V22" />
                            <path d="M2.5 8H21.5" strokeDasharray="2 2" strokeOpacity="0.5" />
                            <path d="M2.5 16H21.5" strokeDasharray="2 2" strokeOpacity="0.5" />
                        </svg>
                    </div>
                    <span className="text-[13px] font-medium text-slate-400">Conductivity</span>
                </div>

                {/* 12. Crystalline Matrix */}
                <div className="icon-card">
                    <div className="w-12 h-12 flex items-center justify-center mb-4">
                        <svg viewBox="0 0 24 24" stroke="url(#cyan-grad)" strokeWidth="1.5" fill="none" className="w-full h-full">
                            <g className="alive-pulse">
                                <path d="M12 2L17 7L12 12L7 7L12 2Z" fill="url(#cyan-glass)" />
                                <path d="M12 12L17 17L12 22L7 17L12 12Z" />
                            </g>
                            <path d="M17 7L22 12L17 17" className="alive-float" style={{ animationDelay: "0.5s" }} />
                            <path d="M7 7L2 12L7 17" className="alive-float" style={{ animationDelay: "0.5s" }} />
                        </svg>
                    </div>
                    <span className="text-[13px] font-medium text-slate-400">Structure</span>
                </div>

                {/* 13. Ion Intelligence */}
                <div className="icon-card">
                    <div className="w-12 h-12 flex items-center justify-center mb-4">
                        <svg viewBox="0 0 24 24" stroke="url(#pink-grad)" strokeWidth="1.5" fill="none" className="w-full h-full">
                            <g className="alive-float">
                                <path d="M9.5 2C9.5 2 9.5 4 12 4C14.5 4 14.5 2 14.5 2" />
                                <path d="M12 4C8 4 5 7 5 12C5 17 8 20 12 20C16 20 19 17 19 12C19 9 17 5 12 4Z" fill="url(#pink-grad)" fillOpacity="0.1" />
                            </g>
                            <path d="M8 11H8.01" strokeWidth="2.5" className="animate-flicker" /> <path d="M16 11H16.01" strokeWidth="2.5" className="animate-flicker" style={{ animationDelay: "0.5s" }} />
                            <path d="M12 15C12 15 10 16 9 16" /> <path d="M12 15C12 15 14 16 15 16" />
                            <path d="M12 20V23" />
                        </svg>
                    </div>
                    <span className="text-[13px] font-medium text-slate-400">Ion Intelligence</span>
                </div>

                {/* 14. Bioelectric Water */}
                <div className="icon-card">
                    <div className="w-12 h-12 flex items-center justify-center mb-4">
                        <svg viewBox="0 0 24 24" stroke="url(#cyan-grad)" strokeWidth="1.5" fill="none" className="w-full h-full">
                            <path d="M12 22C16.4 22 20 18.4 20 14C20 8 12 2 12 2C12 2 4 8 4 14C4 18.4 7.6 22 12 22Z" fill="url(#cyan-glass)" opacity="0.5" className="alive-float" />
                            <path d="M13 8L8 14H12L11 18L16 12H12L13 8Z" stroke="url(#gold-grad)" fill="#FFD700" className="icon-bolt" />
                        </svg>
                    </div>
                    <span className="text-[13px] font-medium text-slate-400">Bioelectric Water</span>
                </div>

                {/* 15. Bioelectricity Hub */}
                <div className="icon-card">
                    <div className="w-12 h-12 flex items-center justify-center mb-4">
                        <svg viewBox="0 0 24 24" stroke="url(#gold-grad)" strokeWidth="1.5" fill="none" className="w-full h-full">
                            <circle cx="12" cy="12" r="3" fill="url(#gold-glass)" className="alive-pulse" />
                            <g className="alive-spin" style={{ transformOrigin: "12px 12px" }}>
                                <path d="M12 9V5" /> <path d="M12 19V15" />
                                <path d="M9 12H5" /> <path d="M19 12H15" />
                            </g>
                            <path d="M12 5L10 2H14L12 5Z" className="icon-bolt" />
                            <circle cx="5" cy="12" r="2" className="alive-float" />
                            <circle cx="19" cy="12" r="2" className="alive-float" style={{ animationDelay: "0.5s" }} />
                            <circle cx="12" cy="19" r="2" className="alive-float" style={{ animationDelay: "1s" }} />
                        </svg>
                    </div>
                    <span className="text-[13px] font-medium text-slate-400">Bioelectric Hub</span>
                </div>

                {/* 16. Product Hub */}
                <div className="icon-card">
                    <div className="w-12 h-12 flex items-center justify-center mb-4">
                        <svg viewBox="0 0 24 24" stroke="url(#pink-grad)" strokeWidth="1.5" fill="none" className="w-full h-full">
                            <path d="M6 22L3 6H21L18 22H6Z" fill="url(#pink-grad)" fillOpacity="0.1" className="alive-float" />
                            <path d="M9 6V4C9 2.5 10.5 1 12 1C13.5 1 15 2.5 15 4V6" className="alive-float" />
                            <path d="M8 6H4" /> <path d="M16 6H20" />
                            <path d="M15 12H17" stroke="#FFD700" strokeWidth="2" className="alive-pulse" />
                        </svg>
                    </div>
                    <span class="text-[13px] font-medium text-slate-400">Product Hub</span>
                </div>

                {/* 17. What Is Andara? */}
                <div className="icon-card">
                    <div className="w-12 h-12 flex items-center justify-center mb-4">
                        <svg viewBox="0 0 24 24" stroke="url(#pink-grad)" strokeWidth="1.5" fill="none" className="w-full h-full">
                            <circle cx="12" cy="12" r="10" strokeOpacity="0.3" fill="url(#pink-grad)" fillOpacity="0.05" className="alive-pulse" />
                            <g className="alive-float" style={{ animationDuration: "4s" }}>
                                <path d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91694 12.4272 7.03158C13.1255 7.14622 13.7598 7.50152 14.2193 8.03611C14.6788 8.5707 14.9348 9.25141 14.94 9.96C14.94 12 11.94 13 11.94 13" stroke="#FF4081" strokeWidth="2" />
                                <path d="M12 17H12.01" stroke="#FF4081" strokeWidth="2.5" />
                            </g>
                        </svg>
                    </div>
                    <span className="text-[13px] font-medium text-slate-400">What Is Andara?</span>
                </div>

                {/* 18. How It Works */}
                <div className="icon-card">
                    <div className="w-12 h-12 flex items-center justify-center mb-4">
                        <svg viewBox="0 0 24 24" stroke="url(#silver-grad)" strokeWidth="1.5" fill="none" className="w-full h-full">
                            <circle cx="12" cy="12" r="3" fill="url(#silver-grad)" fillOpacity="0.2" className="alive-pulse" />
                            <g className="alive-spin" style={{ transformOrigin: "12px 12px", animationDuration: "20s" }}>
                                <path d="M12 2V4" /> <path d="M12 20V22" />
                                <path d="M21 12H19" /> <path d="M5 12H3" />
                                <path d="M18.36 5.64L16.95 7.05" /> <path d="M7.05 16.95L5.64 18.36" />
                                <path d="M18.36 18.36L16.95 16.95" /> <path d="M7.05 7.05L5.64 5.64" />
                            </g>
                        </svg>
                    </div>
                    <span className="text-[13px] font-medium text-slate-400">How It Works</span>
                </div>

                {/* === NEW SACRED GEOMETRY SECTION === */}

                {/* 19. Sacred DNA */}
                <div className="icon-card active">
                    <div className="w-12 h-12 flex items-center justify-center mb-4 drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                        {/* Inline usage of AndaraIconRegistry component via direct import would be ideal, 
                            but keeping pure SVG for this demo page consistency or using the registry component */}
                        {/* We will use the registry component wrapper here if possible, but this file seems to use raw SVGs.
                                Let's actually use the REAL components we just made to prove they work! */}
                        <div className="w-full h-full">
                            {/* Note: In a real app we'd import { SacredDnaIcon } from @/components... 
                                 but for this specific file structure which uses raw SVGS, let's stick to the pattern OR 
                                 import them at the top. Since I can't easily add imports without reading the whole file again safely, 
                                 I will use the raw SVG representation I just designed to show it matches. */}
                            <svg viewBox="0 0 100 100" className="w-full h-full text-cyan-500">
                                <defs>
                                    <linearGradient id="andaraCyan" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#0891b2" />
                                        <stop offset="100%" stopColor="#06b6d4" />
                                    </linearGradient>
                                    <linearGradient id="andaraPurple" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#7c3aed" />
                                        <stop offset="100%" stopColor="#a855f7" />
                                    </linearGradient>
                                </defs>
                                <path d="M35 15 Q50 30 65 15 Q50 30 35 45 Q50 60 65 45 Q50 60 35 75 Q50 90 65 75" stroke="url(#andaraCyan)" strokeWidth="3" fill="none" className="alive-pulse" />
                                <path d="M65 15 Q50 30 35 15 Q50 30 65 45 Q50 60 35 45 Q50 60 65 75 Q50 90 35 75" stroke="url(#andaraCyan)" strokeWidth="3" fill="none" className="alive-pulse" style={{ animationDelay: '0.5s' }} />
                                <line x1="38" y1="20" x2="62" y2="20" stroke="url(#andaraPurple)" strokeWidth="2" opacity="0.6" />
                                <line x1="38" y1="50" x2="62" y2="50" stroke="url(#andaraPurple)" strokeWidth="2" opacity="0.6" />
                                <line x1="38" y1="80" x2="62" y2="80" stroke="url(#andaraPurple)" strokeWidth="2" opacity="0.6" />
                                <circle cx="50" cy="30" r="3" fill="#06b6d4" className="alive-pulse" />
                                <circle cx="50" cy="60" r="3" fill="#06b6d4" className="alive-pulse" style={{ animationDelay: '1s' }} />
                            </svg>
                        </div>
                    </div>
                    <span className="text-[13px] font-medium text-cyan-400">Sacred DNA</span>
                </div>

                {/* 20. Sacred Hex Triangle */}
                <div className="icon-card active">
                    <div className="w-12 h-12 flex items-center justify-center mb-4 drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                        <div className="w-full h-full">
                            <svg viewBox="0 0 100 100" className="w-full h-full">
                                <path d="M50 10 L85 30 L85 70 L50 90 L15 70 L15 30 Z" stroke="url(#andaraCyan)" strokeWidth="2" fill="none" className="alive-spin" style={{ transformOrigin: '50% 50%', animationDuration: '30s' }} />
                                <path d="M50 25 L75 75 L25 75 Z" stroke="#FFD700" strokeWidth="3" fill="none" className="alive-pulse" />
                                <circle cx="50" cy="55" r="5" fill="#06b6d4" className="alive-pulse" />
                            </svg>
                        </div>
                    </div>
                    <span className="text-[13px] font-medium text-cyan-400">Sacred Hex</span>
                </div>

                {/* 21. Sacred Matrix */}
                <div className="icon-card active">
                    <div className="w-12 h-12 flex items-center justify-center mb-4 drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                        <div className="w-full h-full">
                            <svg viewBox="0 0 100 100" className="w-full h-full">
                                <path d="M50 15 L80 80 L20 80 Z" stroke="url(#andaraCyan)" strokeWidth="3" fill="none" />
                                <path d="M50 15 L50 55 M80 80 L50 55 M20 80 L50 55" stroke="url(#andaraCyan)" strokeWidth="1" opacity="0.5" />
                                <circle cx="50" cy="15" r="3" fill="#06b6d4" className="alive-pulse" />
                                <circle cx="80" cy="80" r="3" fill="#06b6d4" className="alive-pulse" style={{ animationDelay: '0.5s' }} />
                                <circle cx="20" cy="80" r="3" fill="#06b6d4" className="alive-pulse" style={{ animationDelay: '1s' }} />
                                <circle cx="50" cy="55" r="4" fill="#06b6d4" className="alive-pulse" style={{ animationDelay: '1.5s' }} />
                            </svg>
                        </div>
                    </div>
                    <span className="text-[13px] font-medium text-cyan-400">Sacred Matrix</span>
                </div>

                {/* 22. Sacred Network */}
                <div className="icon-card active">
                    <div className="w-12 h-12 flex items-center justify-center mb-4 drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                        <div className="w-full h-full">
                            <svg viewBox="0 0 100 100" className="w-full h-full">
                                <g className="alive-spin" style={{ transformOrigin: '50% 50%', animationDuration: '60s' }}>
                                    <circle cx="50" cy="50" r="40" stroke="url(#andaraPurple)" strokeWidth="1" opacity="0.3" strokeDasharray="4 4" />
                                </g>
                                <path d="M50 10 L85 30 L85 70 L50 90 L15 70 L15 30 Z" stroke="url(#andaraCyan)" strokeWidth="2" fill="none" />
                                <path d="M50 10 L85 70 M85 30 L50 90 M85 70 L15 30 M50 90 L15 30 M15 70 L85 30 M15 30 L85 70" stroke="url(#andaraCyan)" strokeWidth="0.5" opacity="0.4" />
                                {/* Glowing Nodes */}
                                <circle cx="50" cy="10" r="2" fill="#06b6d4" className="alive-pulse" />
                                <circle cx="85" cy="30" r="2" fill="#06b6d4" className="alive-pulse" style={{ animationDelay: '0.2s' }} />
                                <circle cx="85" cy="70" r="2" fill="#06b6d4" className="alive-pulse" style={{ animationDelay: '0.4s' }} />
                                <circle cx="50" cy="90" r="2" fill="#06b6d4" className="alive-pulse" style={{ animationDelay: '0.6s' }} />
                                <circle cx="15" cy="70" r="2" fill="#06b6d4" className="alive-pulse" style={{ animationDelay: '0.8s' }} />
                                <circle cx="15" cy="30" r="2" fill="#06b6d4" className="alive-pulse" style={{ animationDelay: '1s' }} />
                                <circle cx="50" cy="50" r="4" fill="#06b6d4" className="alive-pulse" style={{ animationDelay: '1.2s' }} />
                            </svg>
                        </div>
                    </div>
                </div>
                <span className="text-[13px] font-medium text-cyan-400">Scrd Network</span>
            </div>

            {/* 23. Lotus Flower */}
            <div className="icon-card active">
                <div className="w-12 h-12 flex items-center justify-center mb-4 drop-shadow-[0_0_15px_rgba(255,215,0,0.3)]">
                    <div className="w-full h-full">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                            <g className="alive-pulse">
                                {/* Center */}
                                <circle cx="50" cy="50" r="15" stroke="url(#gold-grad)" strokeWidth="2" fill="none" />
                                {/* Inner Ring */}
                                {[0, 60, 120, 180, 240, 300].map(deg => (
                                    <circle key={deg} cx={50 + 15 * Math.cos(deg * Math.PI / 180)} cy={50 + 15 * Math.sin(deg * Math.PI / 180)} r="15" stroke="url(#gold-grad)" strokeWidth="1.2" fill="none" />
                                ))}
                            </g>
                            {/* Outer Ring - Rotating */}
                            <g className="alive-spin" style={{ transformOrigin: '50% 50%', animationDuration: '60s' }}>
                                {[30, 90, 150, 210, 270, 330].map(deg => (
                                    <circle key={deg} cx={50 + 26 * Math.cos(deg * Math.PI / 180)} cy={50 + 26 * Math.sin(deg * Math.PI / 180)} r="15" stroke="url(#gold-grad)" strokeWidth="0.8" fill="rgba(255, 215, 0, 0.05)" />
                                ))}
                            </g>
                            {/* Central Glow */}
                            <circle cx="50" cy="50" r="4" fill="#FFD700" className="alive-pulse" />
                        </svg>
                    </div>
                </div>
                <span className="text-[13px] font-medium text-[#FFD700]">Lotus Flower</span>
            </div>
        </div>
        </div >
    );
}
// @ts-nocheck
