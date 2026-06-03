import { motion } from 'framer-motion';
import {
    Code2, Globe, Layout, Server, Settings, Terminal,
    Lock, Braces, Flame, Sparkles, SlidersHorizontal, RefreshCw
} from 'lucide-react';
import { useAchievementStore } from '../store/useAchievementStore';

const techStack = [
    { id: 'React', icon: Code2, name: 'React', color: 'text-sky-400', border: 'hover:border-sky-500/40' },
    { id: 'Node.js', icon: Server, name: 'Node.js', color: 'text-emerald-400', border: 'hover:border-emerald-500/40' },
    { id: 'Firebase', icon: Flame, name: 'Firebase', color: 'text-orange-500', border: 'hover:border-orange-500/40' },
    { id: 'Tailwind', icon: Layout, name: 'Tailwind', color: 'text-cyan-400', border: 'hover:border-cyan-500/40' },
    { id: 'Next.js', icon: Globe, name: 'Next.js', color: 'text-slate-100', border: 'hover:border-slate-300/40' },
    { id: 'TypeScript', icon: Settings, name: 'TypeScript', color: 'text-blue-400', border: 'hover:border-blue-500/40' },
    { id: 'Linux', icon: Terminal, name: 'Linux', color: 'text-yellow-400', border: 'hover:border-yellow-500/40' },
    { id: 'Security', icon: Lock, name: 'Security', color: 'text-red-400', border: 'hover:border-red-500/40' },
    { id: 'Google AI Studio', icon: Sparkles, name: 'Google AI Studio', color: 'text-blue-500', border: 'hover:border-blue-600/40' },
    { id: 'GraphQL', icon: Braces, name: 'GraphQL', color: 'text-pink-400', border: 'hover:border-pink-500/40' },
];

const TechStack = () => {
    const { selectedTechFilter, toggleTechFilter, clearTechFilter, isMuted } = useAchievementStore();

    const playClick = () => {
        if (!isMuted) {
            try {
                const audio = new Audio('/click.mp3');
                audio.volume = 0.15;
                audio.play().catch(() => {});
            } catch (e) {}
        }
    };

    return (
        <section id="tech-stack" className="py-20 overflow-hidden bg-[rgba(0,0,0,0.2)] border-y border-[var(--theme-border)]">
            <div className="max-w-6xl mx-auto px-4 mb-16 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-bold text-[var(--theme-text-header)] font-serif mb-4"
                >
                    Tech Synthesizer
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-sm text-[var(--theme-text)]/70 max-w-xl mx-auto font-light leading-relaxed"
                >
                    Interact with the board below to filter my projects dynamically. Toggle multiple technologies to synthesize specific stacks.
                </motion.p>
            </div>

            {/* Synthesizer Panel */}
            <div className="max-w-4xl mx-auto px-4 mb-16">
                <div className="glass-card bg-[var(--theme-bg-card)] rounded-3xl border border-[var(--theme-border)] p-6 md:p-8">
                    <div className="flex items-center justify-between border-b border-[var(--theme-border)] pb-4 mb-6">
                        <div className="flex items-center gap-2 text-xs font-mono text-[var(--theme-text)]/60">
                            <SlidersHorizontal size={14} className="text-[var(--theme-accent)]" />
                            <span>SYNTHESIZER_INPUTS</span>
                        </div>
                        {selectedTechFilter.length > 0 && (
                            <button
                                onClick={() => { clearTechFilter(); playClick(); }}
                                className="flex items-center gap-1.5 font-mono text-[10px] tracking-wider text-[var(--theme-accent)] border-none bg-transparent hover:underline"
                            >
                                <RefreshCw size={10} /> CLEAR_FILTER
                            </button>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-3 justify-center">
                        {techStack.map((tech) => {
                            const isSelected = selectedTechFilter.includes(tech.id);
                            return (
                                <button
                                    key={tech.id}
                                    onClick={() => { toggleTechFilter(tech.id); playClick(); }}
                                    className={`px-4 py-2.5 rounded-xl font-mono text-xs tracking-wider flex items-center gap-2.5 border transition-all ${
                                        isSelected 
                                          ? 'bg-[rgba(var(--theme-accent-rgb),0.1)] border-[var(--theme-accent)] text-[var(--theme-text-header)] shadow-[0_0_15px_var(--theme-glow)]' 
                                          : `bg-[rgba(255,255,255,0.01)] border-[var(--theme-border)] text-[var(--theme-text)]/80 ${tech.border}`
                                    }`}
                                >
                                    <tech.icon className={`w-4 h-4 ${tech.color} ${isSelected ? 'animate-pulse' : ''}`} />
                                    <span>{tech.name}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Continuous Marquees */}
            <div className="relative flex flex-col gap-6">
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[var(--theme-bg)] to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[var(--theme-bg)] to-transparent z-10" />

                {/* Row 1: Left to Right */}
                <div className="flex overflow-hidden group">
                    <motion.div
                        className="flex gap-4 md:gap-6 px-3 will-change-transform"
                        animate={{ x: [0, -1000] }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 25
                        }}
                    >
                        {[...techStack, ...techStack, ...techStack].map((tech, index) => {
                            const isSelected = selectedTechFilter.includes(tech.id);
                            return (
                                <div
                                    key={index}
                                    className={`flex items-center gap-3 px-5 py-3 rounded-xl border transition-all whitespace-nowrap ${
                                        isSelected 
                                          ? 'bg-[rgba(var(--theme-accent-rgb),0.08)] border-[var(--theme-accent)] shadow-[0_0_10px_var(--theme-glow)]' 
                                          : 'bg-[var(--theme-bg-card)] border-[var(--theme-border)]'
                                    }`}
                                >
                                    <tech.icon className={`w-4.5 h-4.5 ${tech.color}`} />
                                    <span className="text-[var(--theme-text-header)] text-sm font-medium">{tech.name}</span>
                                </div>
                            );
                        })}
                    </motion.div>
                </div>

                {/* Row 2: Right to Left */}
                <div className="flex overflow-hidden group">
                    <motion.div
                        className="flex gap-4 md:gap-6 px-3 will-change-transform"
                        animate={{ x: [-1000, 0] }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 28
                        }}
                    >
                        {[...techStack, ...techStack, ...techStack].reverse().map((tech, index) => {
                            const isSelected = selectedTechFilter.includes(tech.id);
                            return (
                                <div
                                    key={index}
                                    className={`flex items-center gap-3 px-5 py-3 rounded-xl border transition-all whitespace-nowrap ${
                                        isSelected 
                                          ? 'bg-[rgba(var(--theme-accent-rgb),0.08)] border-[var(--theme-accent)] shadow-[0_0_10px_var(--theme-glow)]' 
                                          : 'bg-[var(--theme-bg-card)] border-[var(--theme-border)]'
                                    }`}
                                >
                                    <tech.icon className={`w-4.5 h-4.5 ${tech.color}`} />
                                    <span className="text-[var(--theme-text-header)] text-sm font-medium">{tech.name}</span>
                                </div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default TechStack;
