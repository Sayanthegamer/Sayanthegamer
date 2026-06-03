import { motion } from 'framer-motion';
import { Code, Terminal, Cpu, Music, Headphones, Activity, Gamepad2 } from 'lucide-react';
import FlipCard from './FlipCard';
import SpotlightCard from './SpotlightCard';

const hobbies = [
    {
        name: 'Full-stack Dev',
        icon: Code,
        color: 'text-[var(--theme-accent)]',
        description: 'Building end-to-end web architectures using React, Next.js, Node.js, and modern relational/NoSQL databases.'
    },
    {
        name: 'Clean Code',
        icon: Terminal,
        color: 'text-[var(--theme-accent)]',
        description: 'Compiling robust, readable, and highly maintainable software systems across TypeScript, Go, and Python.'
    },
    {
        name: 'AI Engineering',
        icon: Cpu,
        color: 'text-[var(--theme-accent)]',
        description: 'Integrating LLMs, prompt pipelines, dynamic agent architectures, and Gemini APIs directly into web apps.'
    },
    {
        name: 'Guitar Covers',
        icon: Music,
        color: 'text-[var(--theme-text)]',
        description: 'Arranging instrumental acoustic covers, fingerstyle patterns, and basic melody tracking in my downtime.'
    },
    {
        name: 'Sound Design',
        icon: Headphones,
        color: 'text-[var(--theme-text)]',
        description: 'Analyzing contemporary audio production, electronic synth tracks, and modern digital mixing mechanics.'
    },
    {
        name: 'Badminton',
        icon: Activity,
        color: 'text-[var(--theme-text)]',
        description: 'Engaging in quick singles and doubles matches to maintain dynamic reflexes and physical fitness.'
    },
    {
        name: 'Gaming & RPGs',
        icon: Gamepad2,
        color: 'text-[var(--theme-text)]',
        description: 'Diving into immersive interactive narratives, puzzle-solving mechanics, and sandbox world-building.'
    },
];

const Hobbies = () => {
    return (
        <section id="hobbies" className="min-h-screen py-20 flex flex-col justify-center items-center w-full overflow-hidden">
            <div className="w-full max-w-6xl px-4 md:px-6">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-[var(--theme-text-header)] font-serif mb-4"
                    >
                        Interests & Focus
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-sm text-[var(--theme-text)]/70 max-w-lg mx-auto font-light"
                    >
                        Click on any card to flip it and explore more about my creative and technical focus areas.
                    </motion.p>
                </div>

                <div className="grid grid-cols-2 gap-3 md:flex md:flex-wrap md:justify-center md:gap-6">
                    {hobbies.map((hobby, index) => (
                        <motion.div
                            key={hobby.name}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.08, duration: 0.4 }}
                            className="w-full md:w-[260px] h-[190px] md:h-[280px]"
                        >
                            <FlipCard
                                frontContent={
                                    <SpotlightCard className="h-full flex flex-col items-center justify-center p-4 bg-[var(--theme-bg-card)] border-[var(--theme-border)] group hover:border-[var(--theme-accent)]/50 transition-colors">
                                        <div className="flex flex-col items-center justify-center h-full p-2">
                                            <div className="relative mb-3 md:mb-5">
                                                <div className="absolute inset-0 blur-xl opacity-20 bg-[var(--theme-accent)]"></div>
                                                <div className="relative w-10 h-10 md:w-16 md:h-16 flex items-center justify-center rounded-xl bg-[var(--theme-bg)] border border-[var(--theme-border)] group-hover:scale-105 transition-transform duration-300 shadow-md">
                                                    <hobby.icon className={`w-5 h-5 md:w-8 md:h-8 ${hobby.color}`} strokeWidth={1.5} />
                                                </div>
                                            </div>
                                            <h3 className="text-xs md:text-lg font-medium text-[var(--theme-text-header)] tracking-wide text-center leading-tight">
                                                {hobby.name}
                                            </h3>
                                            <p className="text-[9px] md:text-xs text-[var(--theme-text)]/40 mt-2 font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                                FLIP
                                            </p>
                                        </div>
                                    </SpotlightCard>
                                }
                                backContent={
                                    <SpotlightCard isInverted className="h-full bg-[var(--theme-bg-card)] border-[var(--theme-accent)]/30">
                                        <div className="flex flex-col items-center justify-center h-full p-4">
                                            <hobby.icon className={`w-5 h-5 md:w-7 md:h-7 ${hobby.color} mb-3 opacity-80`} strokeWidth={1.5} />
                                            <h3 className="text-xs md:text-base font-bold text-[var(--theme-text-header)] mb-2 text-center leading-tight">
                                                {hobby.name}
                                            </h3>
                                            <p className="text-[10px] md:text-xs text-[var(--theme-text)]/80 leading-relaxed text-center font-light">
                                                {hobby.description}
                                            </p>
                                        </div>
                                    </SpotlightCard>
                                }
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hobbies;
