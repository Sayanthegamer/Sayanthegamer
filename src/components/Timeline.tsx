import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Code, Briefcase, Rocket, Shield, Bot } from 'lucide-react';
import SpotlightCard from './SpotlightCard';

const milestones = [
    {
        year: '2020',
        title: 'The Spark',
        description: 'Initiated code-learning through the core building blocks of the web: semantic HTML, responsive layout structures, and JavaScript algorithms.',
        icon: Code,
        techLog: ['HTML5', 'CSS3', 'ES6 JavaScript', 'DOM']
    },
    {
        year: '2021',
        title: 'Expanding Horizons',
        description: 'Pivoted into modular backend logic and scripting using Python, while formalizing collaboration with Git version control and GitHub repositories.',
        icon: Rocket,
        techLog: ['Python 3', 'Git', 'GitHub', 'Markdown']
    },
    {
        year: '2022',
        title: 'Security Focus',
        description: 'Invested in security engineering, network protocols, and scripting-based penetration testing workflows on CTF challenge environments.',
        icon: Shield,
        techLog: ['Linux Systems', 'Network Security', 'Bash Scripting']
    },
    {
        year: '2023',
        title: 'AI & Web Dev',
        description: 'Combined advanced frontend component frameworks with neural network pipelines, integrating open LLM endpoints directly into user environments.',
        icon: Bot,
        techLog: ['React', 'Framer Motion', 'API Integrations']
    },
    {
        year: '2024',
        title: 'Full-Stack Architecture',
        description: 'Architected scalable backend routing servers, local state caching mechanisms, and relational/NoSQL database models for production applications.',
        icon: Briefcase,
        techLog: ['Node.js', 'Express', 'Zustand', 'Supabase']
    },
    {
        year: '2025',
        title: 'Continuous Growth',
        description: 'Refining complex application lifecycles, optimizing interface performance, and maintaining a high standard of front-end and back-end craft.',
        icon: GraduationCap,
        techLog: ['Next.js', 'Vite', 'Tailwind', 'TypeScript']
    },
];

const Timeline = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    
    // We want the scroll progress of the container to drive the line's height
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start center', 'end center'],
    });

    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <section id="timeline" className="py-24 relative overflow-hidden flex flex-col justify-center items-center w-full">
            <div className="w-full max-w-4xl px-6 md:px-12 relative">
                <div className="mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-[var(--theme-text-header)] tracking-tight mb-4"
                    >
                        Experience
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-base text-[var(--theme-text)]/70 max-w-xl font-light"
                    >
                        A historical timeline of my software development experience and systems expansion.
                    </motion.p>
                </div>

                <div ref={containerRef} className="relative">
                    {/* The Rail Background */}
                    <div className="absolute left-4 md:left-[100px] top-0 bottom-0 w-[1px] bg-[var(--theme-border)]" />
                    
                    {/* The Rail Fill (Scroll Driven) */}
                    <motion.div 
                        className="absolute left-4 md:left-[100px] top-0 bottom-0 w-[2px] -ml-[0.5px] bg-[var(--theme-text-header)] origin-top shadow-[0_0_15px_rgba(255,255,255,0.1)] z-10"
                        style={{ scaleY }}
                    />

                    <div className="flex flex-col space-y-12">
                        {milestones.map((milestone, index) => (
                            <div key={index} className="relative flex flex-col md:flex-row md:items-start group">
                                
                                {/* Left Rail: Year & Icon (Desktop) */}
                                <div className="hidden md:flex flex-col items-end justify-start w-[100px] pr-8 pt-1">
                                    <span className="text-sm font-mono text-[var(--theme-text)]/60 font-medium tracking-widest">{milestone.year}</span>
                                </div>

                                {/* Node */}
                                <div className="absolute left-4 md:left-[100px] -translate-x-1/2 mt-1.5 md:mt-2 w-3 h-3 rounded-full bg-[var(--theme-bg)] border-2 border-[var(--theme-border)] group-hover:border-[var(--theme-text-header)] transition-colors duration-300 z-20" />

                                {/* Right Content */}
                                <div className="ml-12 md:ml-12 flex-1">
                                    {/* Year & Icon (Mobile only) */}
                                    <div className="md:hidden flex items-center gap-3 mb-3">
                                        <span className="text-xs font-mono text-[var(--theme-text)]/60 font-medium tracking-widest">{milestone.year}</span>
                                    </div>
                                    
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                                    >
                                        <SpotlightCard className="p-6 md:p-8 bg-[var(--theme-bg-card)] border-[var(--theme-border)] hover:border-[var(--theme-text)]/20 transition-all duration-300 group-hover:-translate-y-1">
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="p-2.5 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[var(--theme-border)] text-[var(--theme-text)]/80 group-hover:text-[var(--theme-text-header)] transition-colors">
                                                    <milestone.icon size={20} strokeWidth={1.5} />
                                                </div>
                                                <h3 className="text-xl font-bold text-[var(--theme-text-header)]">{milestone.title}</h3>
                                            </div>
                                            
                                            <p className="text-[var(--theme-text)]/80 leading-relaxed text-sm font-light mb-6">
                                                {milestone.description}
                                            </p>
                                            
                                            <div className="flex flex-wrap gap-2">
                                                {milestone.techLog.map((tech) => (
                                                    <span 
                                                        key={tech} 
                                                        className="text-[10px] font-mono px-2.5 py-1 rounded border border-[var(--theme-border)] bg-transparent text-[var(--theme-text)]/70 tracking-wide"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </SpotlightCard>
                                    </motion.div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Timeline;
