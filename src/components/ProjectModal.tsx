import type { Project } from "./Projects";
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, CheckCircle2 } from 'lucide-react';


interface ProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
    if (!project) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-[#0d0c0c]/90 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#141312] border border-[rgba(255,255,255,0.06)] rounded-2xl shadow-2xl scrollbar-hide"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors z-50"
                        >
                            <X size={20} />
                        </button>

                        {/* Hero Image */}
                        <div className="relative h-48 md:h-80 w-full overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-[#141312] via-transparent to-transparent z-10" />
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 p-6 md:p-8 z-20">
                                <h2 className="text-3xl md:text-4xl font-bold text-[#f5f3ef] font-serif mb-2">
                                    {project.title}
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((t) => (
                                        <span
                                            key={t}
                                            className="px-3 py-1 text-xs font-medium rounded-full bg-[#1e1d1b]/80 text-[#e0ddd7] border border-[rgba(255,255,255,0.04)] backdrop-blur-md"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="p-4 md:p-8 space-y-8">
                            {/* Description */}
                            <div>
                                <h3 className="text-xl font-bold text-[#e0ddd7] mb-3">Overview</h3>
                                <p className="text-[#8b8680] leading-relaxed">
                                    {project.longDescription || project.description}
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Key Features */}
                                {project.features && (
                                    <div>
                                        <h3 className="text-xl font-bold text-[#e0ddd7] mb-4 flex items-center gap-2">
                                            <CheckCircle2 className="text-[#c25027]" size={20} />
                                            Key Features
                                        </h3>
                                        <ul className="space-y-3">
                                            {project.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-start gap-3 text-[#8b8680] text-sm">
                                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#c25027]/70 flex-shrink-0" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Challenges */}
                                {project.challenges && (
                                    <div>
                                        <h3 className="text-xl font-bold text-[#e0ddd7] mb-4 flex items-center gap-2">
                                            <CheckCircle2 className="text-[#c25027]" size={20} />
                                            Challenges Solved
                                        </h3>
                                        <ul className="space-y-3">
                                            {project.challenges.map((challenge, idx) => (
                                                <li key={idx} className="flex items-start gap-3 text-[#8b8680] text-sm">
                                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#c25027]/70 flex-shrink-0" />
                                                    {challenge}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-[rgba(255,255,255,0.06)]">
                                {project.demo ? (
                                    <a
                                        href={project.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#c25027] hover:bg-transparent hover:text-[#c25027] border border-[#c25027] text-white font-medium transition-all"
                                    >
                                        <ExternalLink size={18} />
                                        View Live Demo
                                    </a>
                                ) : (
                                    <button
                                        disabled
                                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1e1d1b] text-[#8b8680] font-medium cursor-not-allowed"
                                    >
                                        (live demo coming soon...)
                                    </button>
                                )}
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1e1d1b] hover:bg-[#262422] text-[#e0ddd7] font-medium transition-colors"
                                >
                                    <Github size={18} />
                                    View Source Code
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ProjectModal;
