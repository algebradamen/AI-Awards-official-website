'use client';

import { useState } from 'react';
import Image from 'next/image';

interface TeamMember {
    name: string;
    role: string;
}

interface ProjectData {
    teamNumber: number;
    projectName: string;
    projectType: string;
    description: string;
    technologies?: string[];
    teamMembers?: TeamMember[];
    price?: string;
    imageSrc?: string;
    goat?: boolean;
    promotionalVideo?: string;
    appShowcaseVideo?: string;
    projectUrl?: string;
    folderPath?: string;
}

export default function ProjectCatalog({ projects }: { projects: ProjectData[] }) {
    const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

    return (
        <section className="w-full max-w-7xl mx-auto pb-20">
            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <div
                        key={project.teamNumber}
                        onClick={() => setSelectedProject(project)}
                        className="group relative h-[300px] rounded-2xl overflow-hidden cursor-pointer bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-[1.02]"
                    >
                        {/* Background Image (if available) */}
                        {project.imageSrc ? (
                            <Image
                                src={project.imageSrc}
                                alt={project.projectName}
                                fill
                                className="object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-300 scale-110"
                            />
                        ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black opacity-60 group-hover:opacity-40" />
                        )}

                        {/* Top-right Winner Badges */}
                        <div className="absolute top-4 right-4 z-10 flex gap-2">
                            {project.goat && (
                                <div className="w-10 h-10 rounded-full bg-purple-500/20 backdrop-blur-md border border-purple-500/30 flex items-center justify-center shadow-lg" title="The GOAT">
                                    <span className="text-lg">🐐</span>
                                </div>
                            )}
                            {project.price && (
                                <div className="w-10 h-10 rounded-full bg-yellow-500/20 backdrop-blur-md border border-yellow-500/30 flex items-center justify-center shadow-lg" title={project.price}>
                                    <span className="text-lg">🏆</span>
                                </div>
                            )}
                        </div>

                        {/* Content Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent p-6 flex flex-col justify-end">
                            <span className="text-blue-400 text-xs font-bold tracking-wider uppercase mb-1">
                                {project.projectType}
                            </span>
                            <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                                {project.projectName}
                            </h3>
                            <p className="text-gray-300 text-sm line-clamp-2">
                                {project.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {selectedProject && (
                <>
                    <style jsx global>{`
                        nav {
                            display: none !important;
                        }
                    `}</style>
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-4">
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                            onClick={() => setSelectedProject(null)}
                        ></div>

                        {/* Modal Content */}
                        <div className="relative bg-[#0a0a0a] border border-white/10 rounded-2xl md:rounded-3xl w-full max-w-4xl max-h-[90dvh] overflow-y-auto shadow-2xl flex flex-col md:flex-row overflow-hidden animate-fade-in-up md:max-h-[85vh]">
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-3 right-3 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-white/20 transition-colors backdrop-blur-sm"
                            >
                                ✕
                            </button>

                            {/* Left Side: Image/Visual */}
                            <div className="w-full md:w-2/5 h-48 md:h-auto relative shrink-0">
                                {selectedProject.imageSrc ? (
                                    <Image
                                        src={selectedProject.imageSrc}
                                        alt={selectedProject.projectName}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-gray-800 flex items-center justify-center text-white/20">
                                        No Image
                                    </div>
                                )}
                            </div>

                            {/* Right Side: Details */}
                            <div className="w-full md:w-3/5 p-6 md:p-12 flex flex-col gap-5 md:gap-6">
                                <div>
                                    <div className="flex items-center gap-2 md:gap-3 mb-2 flex-wrap">
                                        <span className="px-2 py-1 md:px-3 md:py-1 rounded-full bg-blue-500/20 text-blue-300 text-[10px] md:text-xs font-bold uppercase tracking-wide border border-blue-500/30">
                                            {selectedProject.projectType}
                                        </span>
                                        {selectedProject.price && (
                                            <span className="px-2 py-1 md:px-3 md:py-1 rounded-full bg-yellow-500/20 text-yellow-300 text-[10px] md:text-xs font-bold uppercase tracking-wide border border-yellow-500/30">
                                                🏆 {selectedProject.price}
                                            </span>
                                        )}
                                        {selectedProject.goat && (
                                            <span className="px-2 py-1 md:px-3 md:py-1 rounded-full bg-purple-500/20 text-purple-300 text-[10px] md:text-xs font-bold uppercase tracking-wide border border-purple-500/30">
                                                🐐 The GOAT
                                            </span>
                                        )}
                                    </div>
                                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-2 md:mb-4">
                                        {selectedProject.projectName}
                                    </h2>
                                    <p className="text-gray-300 text-sm md:text-lg leading-relaxed">
                                        {selectedProject.description}
                                    </p>
                                </div>

                                {/* Promotional Video */}
                                {(selectedProject.folderPath || selectedProject.projectUrl) && (
                                    <div className="w-full mb-4 md:mb-6">
                                        <a
                                            href={selectedProject.projectUrl || `/${selectedProject.folderPath?.replace(/^\//, '')}index.html`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full py-3 md:py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] shadow-lg shadow-blue-900/20 text-sm md:text-base"
                                        >
                                            <span>🌍</span>
                                            VISIT PROJECT WEBSITE
                                        </a>
                                    </div>
                                )}

                                {/* Promotional Video (Project Trailer) */}
                                {selectedProject.promotionalVideo && (
                                    <div className="w-full mb-4 md:mb-6">
                                        <h4 className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-widest mb-2 md:mb-3">Project Trailer</h4>
                                        <div className="relative aspect-video rounded-xl overflow-hidden bg-white/5 border border-white/10">
                                            <video
                                                src={selectedProject.promotionalVideo.replace('../', '/media/')}
                                                controls
                                                className="w-full h-full"
                                                poster={selectedProject.imageSrc}
                                            >
                                                Your browser does not support the video tag.
                                            </video>
                                        </div>
                                    </div>
                                )}

                                {/* App Showcase Video */}
                                {selectedProject.appShowcaseVideo && (
                                    <div className="w-full">
                                        <h4 className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-widest mb-2 md:mb-3">Showcase</h4>
                                        <div className="relative aspect-video rounded-xl overflow-hidden bg-white/5 border border-white/10">
                                            <video
                                                src={selectedProject.appShowcaseVideo}
                                                controls
                                                className="w-full h-full"
                                            >
                                                Your browser does not support the video tag.
                                            </video>
                                        </div>
                                    </div>
                                )}

                                {/* Tech Stack */}
                                {selectedProject.technologies && (
                                    <div>
                                        <h4 className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-widest mb-2 md:mb-3">Technologies</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedProject.technologies.map((tech) => (
                                                <span key={tech} className="px-2 py-1 md:px-3 md:py-1 bg-white/5 border border-white/10 rounded-lg text-xs md:text-sm text-gray-300">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Team Members */}
                                {selectedProject.teamMembers && (
                                    <div>
                                        <h4 className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-widest mb-2 md:mb-3">Team</h4>
                                        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                            {selectedProject.teamMembers.map((member) => (
                                                <div key={member.name} className="flex flex-col">
                                                    <span className="text-white font-medium text-sm md:text-base">{member.name}</span>
                                                    <span className="text-gray-500 text-[10px] md:text-xs">{member.role}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                </>
            )}
        </section>
    );
}
