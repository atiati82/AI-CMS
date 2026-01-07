import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Clock, ChevronRight } from 'lucide-react';
import { Link } from 'wouter';

/**
 * RecentPages - Admin dashboard component showing recently updated pages.
 */
export function RecentPages() {
    // Mock data for now based on what an admin dashboard might show
    const recentPages = [
        { id: '1', title: 'Water Science Master', path: '/science/water', updatedAt: '2 mins ago' },
        { id: '2', title: 'Mineral Blueprint', path: '/science/minerals', updatedAt: '1 hour ago' },
        { id: '3', title: 'Home Page', path: '/', updatedAt: '3 hours ago' },
    ];

    return (
        <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Recently Updated
            </h3>
            <div className="grid gap-3">
                {recentPages.map((page) => (
                    <Link key={page.id} href={`/admin/content/pages/${page.id}`}>
                        <motion.div
                            className="group flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
                            whileHover={{ x: 4 }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                                    <FileText className="w-4 h-4" />
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
                                        {page.title}
                                    </div>
                                    <div className="text-xs text-white/40">{page.path}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] text-white/30">{page.updatedAt}</span>
                                <ChevronRight className="w-4 h-4 text-white/20" />
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default RecentPages;
