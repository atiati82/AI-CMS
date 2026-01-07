/**
 * Layout Library Browser
 * 
 * Admin UI component to browse, search, and filter the layout library.
 * Displays layouts, animations, and scroll effects with their tags and vibes.
 */

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
    Search,
    Filter,
    Layers,
    Sparkles,
    Box,
    Zap,
    Eye,
    Copy,
    CheckCircle2,
    Tag,
    Palette,
    ChevronDown,
    LayoutGrid,
    MousePointer,
    Scroll as ScrollIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    LAYOUT_LIBRARY,
    findByTag,
    findByCategory,
    findByVibe,
    getAllTags,
    getAllVibes,
    getStats,
    type LibraryEntry,
    type LibraryCategory,
    type VibeKeyword
} from '@/lib/layout-library-registry';

const CATEGORY_ICONS: Record<LibraryCategory, React.ReactNode> = {
    'layout': <LayoutGrid className="w-4 h-4" />,
    'card': <Box className="w-4 h-4" />,
    'animation': <Sparkles className="w-4 h-4" />,
    'scroll-effect': <ScrollIcon className="w-4 h-4" />,
    'transition': <Zap className="w-4 h-4" />,
    'micro-interaction': <MousePointer className="w-4 h-4" />,
    'visual-component': <Layers className="w-4 h-4" />,
};

const CATEGORY_COLORS: Record<LibraryCategory, string> = {
    'layout': 'bg-blue-500/20 border-blue-500/30 text-blue-400',
    'card': 'bg-purple-500/20 border-purple-500/30 text-purple-400',
    'animation': 'bg-amber-500/20 border-amber-500/30 text-amber-400',
    'scroll-effect': 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400',
    'transition': 'bg-cyan-500/20 border-cyan-500/30 text-cyan-400',
    'micro-interaction': 'bg-pink-500/20 border-pink-500/30 text-pink-400',
    'visual-component': 'bg-indigo-500/20 border-indigo-500/30 text-indigo-400',
};

const VIBE_COLORS: Record<string, string> = {
    'premium': 'bg-amber-500/10 text-amber-400',
    'liquid': 'bg-cyan-500/10 text-cyan-400',
    'crystalline': 'bg-purple-500/10 text-purple-400',
    'scientific': 'bg-blue-500/10 text-blue-400',
    'organic': 'bg-green-500/10 text-green-400',
    'energetic': 'bg-orange-500/10 text-orange-400',
    'calm': 'bg-slate-500/10 text-slate-400',
    'dark': 'bg-slate-800/50 text-slate-300',
    'glowing': 'bg-yellow-500/10 text-yellow-400',
    'minimal': 'bg-gray-500/10 text-gray-400',
    'bold': 'bg-red-500/10 text-red-400',
    'bioelectric': 'bg-emerald-500/10 text-emerald-400',
    'water': 'bg-blue-400/10 text-blue-300',
    'mineral': 'bg-amber-600/10 text-amber-500',
};

export function LayoutLibraryBrowser() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<LibraryCategory | 'all'>('all');
    const [selectedVibe, setSelectedVibe] = useState<VibeKeyword | 'all'>('all');
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const stats = useMemo(() => getStats(), []);
    const allVibes = useMemo(() => getAllVibes(), []);

    const filteredEntries = useMemo(() => {
        let results = [...LAYOUT_LIBRARY];

        // Filter by search query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            results = results.filter(entry =>
                entry.name.toLowerCase().includes(query) ||
                entry.description.toLowerCase().includes(query) ||
                entry.tags.some(t => t.toLowerCase().includes(query))
            );
        }

        // Filter by category
        if (selectedCategory !== 'all') {
            results = results.filter(entry => entry.category === selectedCategory);
        }

        // Filter by vibe
        if (selectedVibe !== 'all') {
            results = results.filter(entry => entry.vibes.includes(selectedVibe));
        }

        return results;
    }, [searchQuery, selectedCategory, selectedVibe]);

    const handleCopyImport = (entry: LibraryEntry) => {
        if (entry.importPath) {
            navigator.clipboard.writeText(`import { ${entry.name} } from '${entry.importPath}';`);
            setCopiedId(entry.id);
            setTimeout(() => setCopiedId(null), 2000);
        }
    };

    const categories: (LibraryCategory | 'all')[] = [
        'all', 'layout', 'card', 'animation', 'scroll-effect', 'transition', 'micro-interaction', 'visual-component'
    ];

    return (
        <div className="space-y-6">
            {/* Header Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                <div className="p-3 rounded-xl bg-slate-800/50 border border-white/5 text-center">
                    <div className="text-2xl font-bold text-white">{stats.total}</div>
                    <div className="text-xs text-muted-foreground">Total</div>
                </div>
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center">
                    <div className="text-2xl font-bold text-blue-400">{stats.byCategory.layouts}</div>
                    <div className="text-xs text-blue-400/70">Layouts</div>
                </div>
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center">
                    <div className="text-2xl font-bold text-amber-400">{stats.byCategory.animations}</div>
                    <div className="text-xs text-amber-400/70">Animations</div>
                </div>
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                    <div className="text-2xl font-bold text-emerald-400">{stats.byCategory.scrollEffects}</div>
                    <div className="text-xs text-emerald-400/70">Scroll FX</div>
                </div>
                <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-center">
                    <div className="text-2xl font-bold text-purple-400">{stats.byCategory.cards}</div>
                    <div className="text-xs text-purple-400/70">Cards</div>
                </div>
                <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-center">
                    <div className="text-2xl font-bold text-indigo-400">{stats.byCategory.visualComponents}</div>
                    <div className="text-xs text-indigo-400/70">Visuals</div>
                </div>
                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-center">
                    <div className="text-2xl font-bold text-cyan-400">{stats.tags}</div>
                    <div className="text-xs text-cyan-400/70">Tags</div>
                </div>
            </div>

            {/* Search & Filters */}
            <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search layouts, animations, tags..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800/50 border border-white/10 text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50"
                    />
                </div>

                {/* Category Filter */}
                <div className="flex gap-2 flex-wrap">
                    {categories.map(cat => (
                        <Button
                            key={cat}
                            variant={selectedCategory === cat ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setSelectedCategory(cat)}
                            className={`text-xs ${selectedCategory === cat ? '' : 'border-white/10 hover:bg-white/5'}`}
                        >
                            {cat === 'all' ? (
                                <Filter className="w-3 h-3 mr-1" />
                            ) : (
                                CATEGORY_ICONS[cat]
                            )}
                            <span className="ml-1 capitalize">{cat === 'all' ? 'All' : cat.replace('-', ' ')}</span>
                        </Button>
                    ))}
                </div>
            </div>

            {/* Vibe Quick Filters */}
            <div className="flex flex-wrap gap-2">
                <span className="text-xs text-muted-foreground flex items-center gap-1 mr-2">
                    <Palette className="w-3 h-3" /> Vibes:
                </span>
                <button
                    onClick={() => setSelectedVibe('all')}
                    className={`px-2 py-1 rounded-full text-xs transition-all ${selectedVibe === 'all'
                            ? 'bg-white/10 text-white'
                            : 'bg-white/5 text-muted-foreground hover:bg-white/10'
                        }`}
                >
                    All
                </button>
                {allVibes.map(vibe => (
                    <button
                        key={vibe}
                        onClick={() => setSelectedVibe(vibe as VibeKeyword)}
                        className={`px-2 py-1 rounded-full text-xs transition-all ${selectedVibe === vibe
                                ? VIBE_COLORS[vibe] || 'bg-white/10 text-white'
                                : 'bg-white/5 text-muted-foreground hover:bg-white/10'
                            }`}
                    >
                        {vibe}
                    </button>
                ))}
            </div>

            {/* Results Count */}
            <div className="text-sm text-muted-foreground">
                Showing {filteredEntries.length} of {stats.total} entries
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredEntries.map((entry, index) => (
                    <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.03 }}
                        className={`group relative p-4 rounded-xl border ${CATEGORY_COLORS[entry.category]} bg-slate-900/50 hover:bg-slate-900/70 transition-all cursor-pointer`}
                        onClick={() => setExpandedId(expandedId === entry.id ? null : entry.id)}
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2">
                                <div className={`p-1.5 rounded-lg ${CATEGORY_COLORS[entry.category]}`}>
                                    {CATEGORY_ICONS[entry.category]}
                                </div>
                                <div>
                                    <h4 className="font-medium text-white text-sm">{entry.name}</h4>
                                    <span className="text-[10px] text-muted-foreground capitalize">{entry.category}</span>
                                </div>
                            </div>
                            <div className="flex gap-1">
                                {entry.importPath && (
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleCopyImport(entry); }}
                                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                                        title="Copy import"
                                    >
                                        {copiedId === entry.id ? (
                                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                        ) : (
                                            <Copy className="w-3 h-3 text-muted-foreground" />
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                            {entry.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-2">
                            {entry.tags.slice(0, 4).map(tag => (
                                <span
                                    key={tag}
                                    className="px-1.5 py-0.5 text-[10px] rounded bg-white/5 text-muted-foreground"
                                >
                                    {tag}
                                </span>
                            ))}
                            {entry.tags.length > 4 && (
                                <span className="px-1.5 py-0.5 text-[10px] rounded bg-white/5 text-muted-foreground">
                                    +{entry.tags.length - 4}
                                </span>
                            )}
                        </div>

                        {/* Vibes */}
                        <div className="flex flex-wrap gap-1">
                            {entry.vibes.map(vibe => (
                                <span
                                    key={vibe}
                                    className={`px-1.5 py-0.5 text-[10px] rounded ${VIBE_COLORS[vibe] || 'bg-white/10 text-white'}`}
                                >
                                    {vibe}
                                </span>
                            ))}
                        </div>

                        {/* Expanded Details */}
                        {expandedId === entry.id && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-4 pt-4 border-t border-white/10"
                            >
                                {/* Use Cases */}
                                <div className="mb-3">
                                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Use Cases</span>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                        {entry.useCases.map(useCase => (
                                            <span key={useCase} className="px-2 py-0.5 text-[10px] rounded-full bg-emerald-500/10 text-emerald-400">
                                                {useCase}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Import Path */}
                                {entry.importPath && (
                                    <div className="mb-3">
                                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Import</span>
                                        <div className="mt-1 p-2 rounded bg-slate-950 font-mono text-[10px] text-white overflow-x-auto">
                                            {entry.importPath}
                                        </div>
                                    </div>
                                )}

                                {/* Source */}
                                <div>
                                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Source: </span>
                                    <span className="text-[10px] text-white capitalize">{entry.source}</span>
                                </div>
                            </motion.div>
                        )}

                        {/* Expand indicator */}
                        <div className="absolute bottom-2 right-2">
                            <ChevronDown
                                className={`w-3 h-3 text-muted-foreground transition-transform ${expandedId === entry.id ? 'rotate-180' : ''}`}
                            />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Empty State */}
            {filteredEntries.length === 0 && (
                <div className="text-center py-12">
                    <Search className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <h3 className="font-semibold text-lg mb-2">No entries found</h3>
                    <p className="text-sm text-muted-foreground">
                        Try adjusting your search or filters
                    </p>
                </div>
            )}
        </div>
    );
}

export default LayoutLibraryBrowser;
