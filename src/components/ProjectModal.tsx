import type { Project } from "./Projects";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, CheckCircle2, Server, Database, User, ShieldAlert, Cpu } from 'lucide-react';
import { useAchievementStore } from '../store/useAchievementStore';

interface ProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

type TabId = 'overview' | 'architecture' | 'challenges';

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
    const [activeTab, setActiveTab] = useState<TabId>('overview');
    const isMuted = useAchievementStore((state) => state.isMuted);

    if (!project) return null;

    const playClick = () => {
        if (!isMuted) {
            try {
                const audio = new Audio('/click.mp3');
                audio.volume = 0.15;
                audio.play().catch(() => {});
            } catch (e) {}
        }
    };

    const handleTabChange = (tab: TabId) => {
        setActiveTab(tab);
        playClick();
    };

    // Returns a custom visual architecture schematic based on project title
    const renderArchitectureDiagram = (title: string) => {
        const flowArrow = (
            <div className="flex flex-col items-center justify-center text-[var(--theme-accent)] select-none">
                <span className="text-sm font-bold">➔</span>
            </div>
        );

        const nodeStyle = "p-3 rounded-xl border border-[var(--theme-border)] bg-[rgba(255,255,255,0.02)] flex flex-col items-center justify-center text-center gap-1.5 min-w-[120px]";

        switch (title) {
            case 'Kron0':
                return (
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 py-8 font-mono text-xs">
                        <div className={nodeStyle}>
                            <User size={16} className="text-sky-400" />
                            <span className="font-bold text-[var(--theme-text-header)]">PWA Client</span>
                            <span className="text-[10px] text-[var(--theme-text)]/50">React / TS</span>
                        </div>
                        {flowArrow}
                        <div className={nodeStyle}>
                            <SlidersHorizontalIcon className="text-orange-400 w-4 h-4" />
                            <span className="font-bold text-[var(--theme-text-header)]">Sync Manager</span>
                            <span className="text-[10px] text-[var(--theme-text)]/50">Zustand Cache</span>
                        </div>
                        {flowArrow}
                        <div className={nodeStyle}>
                            <Database size={16} className="text-yellow-400" />
                            <span className="font-bold text-[var(--theme-text-header)]">Firebase Realtime</span>
                            <span className="text-[10px] text-[var(--theme-text)]/50">Cloud Sync</span>
                        </div>
                    </div>
                );
            case 'Student Manager Pro':
                return (
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 py-8 font-mono text-xs">
                        <div className={nodeStyle}>
                            <User size={16} className="text-emerald-400" />
                            <span className="font-bold text-[var(--theme-text-header)]">Admin Dashboard</span>
                            <span className="text-[10px] text-[var(--theme-text)]/50">React 19 / Vite</span>
                        </div>
                        {flowArrow}
                        <div className={nodeStyle}>
                            <Database size={16} className="text-sky-400" />
                            <span className="font-bold text-[var(--theme-text-header)]">sessionStorage</span>
                            <span className="text-[10px] text-[var(--theme-text)]/50">Optimistic UI Cache</span>
                        </div>
                        {flowArrow}
                        <div className={nodeStyle}>
                            <Server size={16} className="text-emerald-500" />
                            <span className="font-bold text-[var(--theme-text-header)]">Supabase Engine</span>
                            <span className="text-[10px] text-[var(--theme-text)]/50">PostgreSQL Schema</span>
                        </div>
                    </div>
                );
            case 'PhiloMind 🧠':
                return (
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 py-8 font-mono text-xs">
                        <div className={nodeStyle}>
                            <User size={16} className="text-purple-400" />
                            <span className="font-bold text-[var(--theme-text-header)]">React Survey UI</span>
                            <span className="text-[10px] text-[var(--theme-text)]/50">Questionnaire</span>
                        </div>
                        {flowArrow}
                        <div className={nodeStyle}>
                            <Cpu size={16} className="text-violet-400" />
                            <span className="font-bold text-[var(--theme-text-header)]">Gemini AI Model</span>
                            <span className="text-[10px] text-[var(--theme-text)]/50">Psycho-Ethic Diagnostic</span>
                        </div>
                        {flowArrow}
                        <div className={nodeStyle}>
                            <SlidersHorizontalIcon className="text-pink-400 w-4 h-4" />
                            <span className="font-bold text-[var(--theme-text-header)]">html-to-image</span>
                            <span className="text-[10px] text-[var(--theme-text)]/50">Social Card Gen</span>
                        </div>
                    </div>
                );
            case 'Aether | Quiet Reflection':
                return (
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 py-8 font-mono text-xs">
                        <div className={nodeStyle}>
                            <User size={16} className="text-blue-400" />
                            <span className="font-bold text-[var(--theme-text-header)]">Atmospheric UI</span>
                            <span className="text-[10px] text-[var(--theme-text)]/50">Mood Input</span>
                        </div>
                        {flowArrow}
                        <div className={nodeStyle}>
                            <Cpu size={16} className="text-teal-400" />
                            <span className="font-bold text-[var(--theme-text-header)]">Gemini flash 2.5</span>
                            <span className="text-[10px] text-[var(--theme-text)]/50">Alchemical Poetry</span>
                        </div>
                        {flowArrow}
                        <div className={nodeStyle}>
                            <SlidersHorizontalIcon className="text-blue-500 w-4 h-4" />
                            <span className="font-bold text-[var(--theme-text-header)]">Web Audio API</span>
                            <span className="text-[10px] text-[var(--theme-text)]/50">Procedural Ambient Synthesizer</span>
                        </div>
                    </div>
                );
            case 'MuktaVidya':
                return (
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 py-8 font-mono text-xs">
                        <div className={nodeStyle}>
                            <User size={16} className="text-indigo-400" />
                            <span className="font-bold text-[var(--theme-text-header)]">Privacy Math client</span>
                            <span className="text-[10px] text-[var(--theme-text)]/50">IndexedDB local store</span>
                        </div>
                        {flowArrow}
                        <div className={nodeStyle}>
                            <ShieldAlert size={16} className="text-red-400" />
                            <span className="font-bold text(--theme-text-header)">IP Rate Limiter</span>
                            <span className="text-[10px] text-[var(--theme-text)]/50">Server-Side Guard</span>
                        </div>
                        {flowArrow}
                        <div className={nodeStyle}>
                            <Cpu size={16} className="text-purple-400" />
                            <span className="font-bold text-[var(--theme-text-header)]">Gemini math solver</span>
                            <span className="text-[10px] text-[var(--theme-text)]/50">KaTeX rendering</span>
                        </div>
                    </div>
                );
            case 'CircuitJS':
                return (
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 py-8 font-mono text-xs">
                        <div className={nodeStyle}>
                            <User size={16} className="text-green-400" />
                            <span className="font-bold text-[var(--theme-text-header)]">Editor UI</span>
                            <span className="text-[10px] text-[var(--theme-text)]/50">Drag & Drop Component bin</span>
                        </div>
                        {flowArrow}
                        <div className={nodeStyle}>
                            <SlidersHorizontalIcon className="text-yellow-400 w-4 h-4" />
                            <span className="font-bold text-[var(--theme-text-header)]">Matrix Solver</span>
                            <span className="text-[10px] text-[var(--theme-text)]/50">Nodal voltage calculator</span>
                        </div>
                        {flowArrow}
                        <div className={nodeStyle}>
                            <Server size={16} className="text-green-500" />
                            <span className="font-bold text-[var(--theme-text-header)]">HTML5 Canvas</span>
                            <span className="text-[10px] text-[var(--theme-text)]/50">Real-time vector plotter</span>
                        </div>
                    </div>
                );
            case 'Lecture Notes Scribe':
                return (
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 py-8 font-mono text-xs">
                        <div className={nodeStyle}>
                            <User size={16} className="text-amber-400" />
                            <span className="font-bold text-[var(--theme-text-header)]">Chrome extension</span>
                            <span className="text-[10px] text-[var(--theme-text)]/50">Capture Video feed</span>
                        </div>
                        {flowArrow}
                        <div className={nodeStyle}>
                            <Server size={16} className="text-teal-400" />
                            <span className="font-bold text-[var(--theme-text-header)]">FastAPI worker</span>
                            <span className="text-[10px] text-[var(--theme-text)]/50">FFmpeg frame splitter</span>
                        </div>
                        {flowArrow}
                        <div className={nodeStyle}>
                            <Cpu size={16} className="text-amber-500" />
                            <span className="font-bold text-[var(--theme-text-header)]">Gemini Multimodal</span>
                            <span className="text-[10px] text-[var(--theme-text)]/50">LaTeX study guide gen</span>
                        </div>
                    </div>
                );
            default:
                return (
                    <p className="text-xs text-[var(--theme-text)]/40 italic text-center py-6">
                        System topology unavailable for this module.
                    </p>
                );
        }
    };

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
                        className="absolute inset-0 bg-black/85 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 15 }}
                        transition={{ duration: 0.3 }}
                        className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto glass-card bg-[var(--theme-bg-card)] border border-[var(--theme-border)] rounded-3xl shadow-2xl scrollbar-hide z-10"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 rounded-full border border-[var(--theme-border)] text-[var(--theme-text)] hover:text-[var(--theme-text-header)] hover:border-[var(--theme-accent)] transition-all z-50 bg-[var(--theme-bg-card)]"
                        >
                            <X size={18} />
                        </button>

                        {/* Banner Image */}
                        <div className="relative h-44 md:h-72 w-full overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--theme-bg)] to-transparent z-10" />
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 p-6 md:p-8 z-20 w-full flex flex-col md:flex-row md:items-end justify-between gap-4">
                                <div>
                                    <h2 className="text-2xl md:text-4xl font-bold text-[var(--theme-text-header)] font-serif mb-3">
                                        {project.title}
                                    </h2>
                                    <div className="flex flex-wrap gap-1.5">
                                        {project.tech.map((t) => (
                                            <span
                                                key={t}
                                                className="px-2 py-0.5 text-[10px] font-mono rounded-md border border-[var(--theme-border)] bg-[var(--theme-bg)]/80 text-[var(--theme-text)]"
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tab Switcher */}
                        <div className="flex border-b border-[var(--theme-border)] px-4 md:px-8 bg-[var(--theme-bg)]/50 font-mono text-xs">
                            {(['overview', 'architecture', 'challenges'] as TabId[]).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => handleTabChange(tab)}
                                    className={`px-4 py-3 border-b-2 transition-all font-medium uppercase tracking-wider ${
                                        activeTab === tab 
                                          ? 'border-[var(--theme-accent)] text-[var(--theme-accent)]' 
                                          : 'border-transparent text-[var(--theme-text)]/60 hover:text-[var(--theme-text-header)]'
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 md:p-8">
                            <div className="min-h-[220px]">
                                {activeTab === 'overview' && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 5 }} 
                                        animate={{ opacity: 1, y: 0 }}
                                        className="space-y-6"
                                    >
                                        <div>
                                            <h3 className="text-lg font-bold text-[var(--theme-text-header)] mb-3">PROJECT_SUMMARY</h3>
                                            <p className="text-[var(--theme-text)]/85 leading-relaxed text-sm font-light">
                                                {project.longDescription || project.description}
                                            </p>
                                        </div>

                                        {project.features && (
                                            <div>
                                                <h3 className="text-base font-bold text-[var(--theme-text-header)] mb-3 flex items-center gap-2">
                                                    <CheckCircle2 className="text-[var(--theme-accent)]" size={16} />
                                                    KEY_MODULES
                                                </h3>
                                                <ul className="space-y-2">
                                                    {project.features.map((feature, idx) => (
                                                        <li key={idx} className="flex items-start gap-2.5 text-[var(--theme-text)]/75 text-xs md:text-sm font-light">
                                                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)] flex-shrink-0" />
                                                            {feature}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </motion.div>
                                )}

                                {activeTab === 'architecture' && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 5 }} 
                                        animate={{ opacity: 1, y: 0 }}
                                        className="space-y-6"
                                    >
                                        <div>
                                            <h3 className="text-lg font-bold text-[var(--theme-text-header)] mb-1">SYSTEM_ARCHITECTURE</h3>
                                            <p className="text-xs text-[var(--theme-text)]/60 font-light mb-4">
                                                Visual pipeline structure and data transit schematic for the {project.title} module:
                                            </p>
                                            
                                            {/* Render Custom Diagram */}
                                            <div className="p-4 rounded-2xl border border-[var(--theme-border)] bg-black/20">
                                                {renderArchitectureDiagram(project.title)}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'challenges' && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 5 }} 
                                        animate={{ opacity: 1, y: 0 }}
                                        className="space-y-6"
                                    >
                                        {project.challenges && (
                                            <div>
                                                <h3 className="text-lg font-bold text-[var(--theme-text-header)] mb-3 flex items-center gap-2">
                                                    <ShieldAlert className="text-[var(--theme-accent)]" size={18} />
                                                    CRITICAL_CHALLENGES_SOLVED
                                                </h3>
                                                <ul className="space-y-3">
                                                    {project.challenges.map((challenge, idx) => (
                                                        <li key={idx} className="flex items-start gap-3 text-[var(--theme-text)]/80 text-xs md:text-sm font-light">
                                                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)] flex-shrink-0" />
                                                            {challenge}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-[var(--theme-border)] mt-8">
                                {project.demo ? (
                                    <a
                                        href={project.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={playClick}
                                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[var(--theme-accent)] hover:bg-transparent hover:text-[var(--theme-accent)] border border-[var(--theme-accent)] text-white text-xs font-mono tracking-wider font-medium transition-all shadow-[0_0_10px_var(--theme-glow)]"
                                    >
                                        <ExternalLink size={14} />
                                        LAUNCH_DEMO
                                    </a>
                                ) : (
                                    <button
                                        disabled
                                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-[var(--theme-border)] bg-[rgba(255,255,255,0.01)] text-[var(--theme-text)]/40 text-xs font-mono cursor-not-allowed"
                                    >
                                        (demo offline / pending)
                                    </button>
                                )}
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={playClick}
                                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[rgba(255,255,255,0.02)] border border-[var(--theme-border)] hover:border-[var(--theme-accent)] text-[var(--theme-text)] hover:text-[var(--theme-text-header)] text-xs font-mono tracking-wider font-medium transition-all"
                                >
                                    <Github size={14} />
                                    SOURCE_CODE
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

// Simple utility Icon component inside to keep it self-contained
const SlidersHorizontalIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <line x1="4" x2="14" y1="4" y2="4"/>
        <line x1="4" x2="10" y1="12" y2="12"/>
        <line x1="4" x2="18" y1="20" y2="20"/>
        <line x1="18" x2="20" y1="4" y2="4"/>
        <line x1="14" x2="20" y1="12" y2="12"/>
        <line x1="22" x2="22" y1="20" y2="20"/>
        <circle cx="16" cy="4" r="2"/>
        <circle cx="12" cy="12" r="2"/>
        <circle cx="20" cy="20" r="2"/>
    </svg>
);

export default ProjectModal;
