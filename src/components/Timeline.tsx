import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { GraduationCap, Code, Briefcase, Rocket, Shield, Bot, ChevronDown, Terminal } from 'lucide-react';
import SpotlightCard from './SpotlightCard';
import { useAchievementStore } from '../store/useAchievementStore';

const milestones = [
    {
        year: '2020',
        title: 'The Spark',
        description: 'Initiated code-learning through the core building blocks of the web: semantic HTML, responsive layout structures, and JavaScript algorithms.',
        icon: Code,
        color: 'text-sky-400',
        techLog: ['HTML5', 'CSS3', 'ES6 JavaScript', 'Basic DOM Manipulation']
    },
    {
        year: '2021',
        title: 'Expanding Horizons',
        description: 'Pivoted into modular backend logic and scripting using Python, while formalizing collaboration with Git version control and GitHub repositories.',
        icon: Rocket,
        color: 'text-emerald-400',
        techLog: ['Python 3', 'Git', 'GitHub', 'Markdown Documentation']
    },
    {
        year: '2022',
        title: 'Security Focus',
        description: 'Invested in security engineering, network protocols, and scripting-based penetration testing workflows on CTF challenge environments.',
        icon: Shield,
        color: 'text-rose-400',
        techLog: ['Linux Systems', 'Network Security', 'Ethical Hacking', 'Bash Scripting']
    },
    {
        year: '2023',
        title: 'AI & Web Dev',
        description: 'Combined advanced frontend component frameworks with neural network pipelines, integrating open LLM endpoints directly into user environments.',
        icon: Bot,
        color: 'text-violet-400',
        techLog: ['React', 'Framer Motion', 'API Integrations', 'Prompt Engineering']
    },
    {
        year: '2024',
        title: 'Full-Stack Architecture',
        description: 'Architected scalable backend routing servers, local state caching mechanisms, and relational/NoSQL database models for production applications.',
        icon: Briefcase,
        color: 'text-amber-400',
        techLog: ['Node.js', 'Express', 'Zustand', 'Supabase / PostgreSQL', 'Firebase']
    },
    {
        year: '2025',
        title: 'Continuous Growth',
        description: 'Refining complex application lifecycles, optimizing interface performance, and maintaining a high standard of front-end and back-end craft.',
        icon: GraduationCap,
        color: 'text-pink-400',
        techLog: ['Next.js', 'Vite', 'Tailwind CSS v4', 'TypeScript Compiler']
    },
];

const Timeline = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [expandedMilestone, setExpandedMilestone] = useState<number | null>(null);
    const isMuted = useAchievementStore((state) => state.isMuted);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'],
    });

    const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

    const playClick = () => {
        if (!isMuted) {
            try {
                const audio = new Audio('/click.mp3');
                audio.volume = 0.15;
                audio.play().catch(() => {});
            } catch (e) {}
        }
    };

    const toggleExpand = (index: number) => {
        setExpandedMilestone(expandedMilestone === index ? null : index);
        playClick();
    };

    return (
        <section id="timeline" className="py-20 relative overflow-hidden flex flex-col justify-center items-center w-full">
            <div className="w-full max-w-4xl px-4 relative">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-[var(--theme-text-header)] font-serif mb-4"
                    >
                        Engineering Journey
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-sm text-[var(--theme-text)]/70 max-w-lg mx-auto font-light"
                    >
                        A historical timeline of my software development experience and systems expansion. Click cards to view stack details.
                    </motion.p>
                </div>

                <div ref={containerRef} className="relative">
                    {/* Central Line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-[var(--theme-border)] -translate-x-1/2">
                        <motion.div
                            style={{ height }}
                            className="w-full bg-gradient-to-b from-[var(--theme-accent)] via-purple-500 to-[var(--theme-accent)] shadow-[0_0_10px_var(--theme-glow)]"
                        />
                    </div>

                    <div className="space-y-8 md:space-y-16">
                        {milestones.map((milestone, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                className={`relative flex flex-col md:flex-row gap-6 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                            >
                                {/* Timeline Node */}
                                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-[var(--theme-bg)] border-2 border-[var(--theme-accent)] -translate-x-1/2 z-10 mt-6 md:mt-8 shadow-[0_0_8px_var(--theme-glow)]">
                                    <div className="absolute inset-0 rounded-full bg-[var(--theme-accent)] animate-ping opacity-25"></div>
                                </div>

                                {/* Content Card */}
                                <div className="ml-12 md:ml-0 md:w-1/2 md:px-6">
                                    <SpotlightCard className="p-5 bg-[var(--theme-bg-card)] border-[var(--theme-border)] relative cursor-pointer group">
                                        <div onClick={() => toggleExpand(index)}>
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className={`p-2.5 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[var(--theme-border)] ${milestone.color}`}>
                                                    <milestone.icon size={22} />
                                                </div>
                                                <div className="flex-1">
                                                    <span className={`text-xs font-mono font-bold tracking-widest ${milestone.color}`}>{milestone.year}</span>
                                                    <h3 className="text-lg md:text-xl font-bold text-[var(--theme-text-header)] mt-0.5">{milestone.title}</h3>
                                                </div>
                                                <ChevronDown 
                                                    size={16} 
                                                    className={`text-[var(--theme-text)]/40 transition-transform duration-300 ${expandedMilestone === index ? 'rotate-180 text-[var(--theme-accent)]' : 'group-hover:text-[var(--theme-text-header)]'}`} 
                                                />
                                            </div>
                                            <p className="text-[var(--theme-text)]/85 leading-relaxed text-xs md:text-sm font-light">
                                                {milestone.description}
                                            </p>
                                        </div>

                                        {/* Expandable Tech Log Details Drawer */}
                                        <motion.div
                                            initial={false}
                                            animate={{ height: expandedMilestone === index ? 'auto' : 0, opacity: expandedMilestone === index ? 1 : 0 }}
                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                            className="overflow-hidden mt-4 pt-0 border-[var(--theme-border)]"
                                            style={{ borderTopWidth: expandedMilestone === index ? '1px' : '0px' }}
                                        >
                                            <div className="pt-4 flex flex-col gap-2">
                                                <div className="flex items-center gap-1.5 text-[10px] font-mono text-[var(--theme-accent)] uppercase tracking-wider">
                                                    <Terminal size={10} />
                                                    <span>LOGGED_TECHNOLOGIES</span>
                                                </div>
                                                <div className="flex flex-wrap gap-1.5 mt-1">
                                                    {milestone.techLog.map((tech) => (
                                                        <span 
                                                            key={tech} 
                                                            className="text-[10px] font-mono px-2 py-0.5 rounded-md border border-[var(--theme-border)] bg-[rgba(255,255,255,0.02)] text-[var(--theme-text)]/85"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    </SpotlightCard>
                                </div>

                                {/* Empty Space for alignment */}
                                <div className="hidden md:block md:w-1/2" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Timeline;
