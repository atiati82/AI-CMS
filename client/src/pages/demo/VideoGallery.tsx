import React from 'react';
import { getAllVideos } from '@/data/video-registry';
import StandardPageLayout from '@/components/StandardPageLayout';

export const VideoGallery = () => {
    const videos = getAllVideos();

    return (
        <StandardPageLayout
            title="Video Intelligence Gallery"
            seo={{
                title: 'Andara Video Intelligence Gallery',
                description: 'Review processed video scenes and AI analysis.'
            }}
        >
            <div className="container mx-auto px-4 py-8">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl font-light tracking-wide mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Video Intelligence Gallery
                    </h1>
                    <p className="text-white/60">
                        {videos.length} processed scenes from uploads.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {videos.map((video) => (
                        <div
                            key={video.id}
                            className="bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all duration-300 group"
                        >
                            {/* Video Player */}
                            <div className="aspect-video bg-black relative">
                                <video
                                    src={video.url}
                                    controls
                                    className="w-full h-full object-cover"
                                    preload="metadata"
                                />
                                <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 backdrop-blur text-xs rounded-full border border-white/10">
                                    {video.originalSource.substring(0, 20)}...
                                </div>
                            </div>

                            {/* Metadata */}
                            <div className="p-6 space-y-4">
                                <div>
                                    <h3 className="text-lg font-medium text-white/90 mb-1">
                                        Scene Analysis
                                    </h3>
                                    <p className="text-sm text-white/60 leading-relaxed min-h-[3rem]">
                                        {video.description}
                                    </p>
                                </div>

                                {/* Mood & Color */}
                                <div className="flex items-center justify-between border-t border-white/5 pt-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs uppercase tracking-wider text-white/40">Mood</span>
                                        <span className="text-sm text-blue-300">{video.mood}</span>
                                    </div>
                                    <div className="flex gap-1">
                                        {video.colorPalette.map((color, i) => (
                                            <div
                                                key={i}
                                                className="w-4 h-4 rounded-full border border-white/20"
                                                style={{ backgroundColor: color }}
                                                title={color}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 pt-2">
                                    {video.tags.map((tag, i) => (
                                        <span
                                            key={i}
                                            className="px-2 py-1 text-xs rounded-md bg-white/5 border border-white/5 text-white/70 group-hover:bg-blue-500/10 group-hover:border-blue-500/20 transition-colors"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="text-xs font-mono text-white/20 break-all pt-2 border-t border-white/5">
                                    ID: {video.id}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </StandardPageLayout>
    );
};

export default VideoGallery;
