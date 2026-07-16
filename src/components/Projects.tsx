import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Terminal, RefreshCw } from 'lucide-react';
import SpotlightCard from './SpotlightCard';
import ProjectModal from './ProjectModal';
import { useAchievementStore } from '../store/useAchievementStore';

export interface Project {
    title: string;
    description: string;
    longDescription?: string;
    challenges?: string[];
    features?: string[];
    tech: string[];
    github: string;
    demo?: string;
    image: string;
}

const projects: Project[] = [
    {
        title: 'Digital Logic Simulator',
        description: 'A high-performance digital logic circuit simulator built in Rust.',
        longDescription: 'A blazingly fast digital logic simulator built entirely in Rust. It allows users to build complex logic gates, test truth tables, and simulate clock cycles with near-native performance.',
        challenges: [
            'Implementing an efficient graph-based evaluation engine for logic gates.',
            'Ensuring high-performance simulation capable of thousands of ticks per second.',
            'Compiling the simulation engine to WebAssembly for browser compatibility.'
        ],
        features: [
            'NAND / NOR / XOR Gate Simulation',
            'Clock Cycle Stepping',
            'Truth Table Generation',
            'High-Performance Rust Engine'
        ],
        tech: ['Rust', 'WebAssembly', 'TypeScript'],
        github: 'https://github.com/Sayanthegamer/digital-logic-rust',
        image: '/rust_logic_simulator.png',
    },
    {
        title: 'Kron0',
        description: 'A modern, neo-glassmorphism inspired productivity companion designed for students.',
        longDescription: 'Kron0 combines a powerful focus timer, a smart weekly schedule managed via Drag & Drop or simple clicks, and detailed productivity insights—all in a beautifully animated interface.',
        challenges: [
            'Building a highly responsive drag-and-drop weekly schedule.',
            'Implementing real-time Firebase syncing across devices.',
            'Designing a cohesive dark, neo-glassmorphism UI.'
        ],
        features: [
            'Configurable Focus Timer (Pomodoro)',
            'Smart Drag & Drop Schedule',
            'Detailed Productivity Stats',
            'Cross-device Firebase Sync',
            'Installable PWA Ready'
        ],
        tech: ['React', 'TypeScript', 'Firebase', 'Tailwind', 'Framer Motion', 'Vite'],
        github: 'https://github.com/Sayanthegamer/kron0',
        demo: 'https://kron0.vercel.app/',
        image: '/kron0-preview.png',
    },
    {
        title: 'Student Manager Pro',
        description: 'The simple, modern way to manage your school\'s student records, fees, and admissions.',
        longDescription: 'Student Manager Pro helps school administrators, principals, and office staff manage student information, track fee payments, process admissions, and issue transfer certificates — all from a browser. Features a premium dual-layer storage system with a local clipboard (sessionStorage) for instant updates and a cloud filing cabinet (Supabase) for secure permanent routing.',
        challenges: [
            'Designing an optimistic UI with dual-layer caching (sessionStorage + Supabase PostgreSQL).',
            'Creating complex, intuitive forms for student admissions and fee penalty calculations.',
            'Building a responsive, scalable filtering and data-table solution for administrators.'
        ],
        features: [
            'Comprehensive Student Records Management',
            'Automated Fee Tracking & Fines',
            '1-Click Admissions Workflow',
            'Transfer Certificates Generation',
            'Interactive Onboarding Tour'
        ],
        tech: ['React', 'Vite', 'Tailwind', 'React Router 7', 'Supabase', 'Security'],
        github: 'https://github.com/Sayanthegamer/student-management',
        demo: 'https://student-management-nine-tawny.vercel.app/',
        image: '/student-manager-preview.png',
    },
    {
        title: 'PhiloMind 🧠',
        description: 'An interactive AI web application that assesses your "Philosophical Maturity".',
        longDescription: 'PhiloMind powered by Google\'s Gemini AI, provides personalized insights into your worldview, ethics, and decision-making style based on your responses to deep, thought-provoking questions. It assigns you a unique "Philosophical Persona" (like Stoic Individualist or Rational Humanist).',
        challenges: [
            'Prompting Gemini to parse deeply nuanced philosophical responses uniformly.',
            'Structuring the React frontend to sequentially reveal the AI\'s diagnostic insights.',
            'Using html-to-image to generate perfectly tailored, shareable social media cards.'
        ],
        features: [
            'Deep Philosophical Questionnaire',
            'AI-Powered Psycho-Ethic Analysis',
            'Unique Philosophical Persona Matching',
            'Generate Shareable Insight Cards'
        ],
        tech: ['React', 'TypeScript', 'Vite', 'Tailwind', 'Google AI Studio'],
        github: 'https://github.com/Sayanthegamer/Philomind',
        demo: 'https://philomind.vercel.app/',
        image: '/philomind-preview.png',
    },
    {
        title: 'Aether | Quiet Reflection',
        description: 'A generative, poetic ambient space designed to help you process your emotions.',
        longDescription: 'By releasing a mood or thought to the Aetherin, users receive a short, healing poem based on elemental themes (Water, Wind, Sun, Earth). The interface is built to be a digital sanctuary—calming, slow, and aesthetically pleasing featuring procedural audio.',
        challenges: [
            'Building a procedural, entirely generative real-time ambient sound engine in the browser.',
            'Styling advanced fluid graphics and liquid animations to complement the mood.',
            'Crafting prompts for Gemini 2.5 Flash to act as an emotional alchemist turning user stress into poetry.'
        ],
        features: [
            'Emotional Alchemy (AI Poetry Generation)',
            'Procedural Ambient Sound Engine',
            'Dynamic Elemental Theme System',
            'Atmospheric Glassmorphism UI',
        ],
        tech: ['React', 'TypeScript', 'Google AI Studio', 'Tailwind', 'Framer Motion'],
        github: 'https://github.com/Sayanthegamer/a-e-t-h-e-r',
        demo: 'https://a-e-t-h-e-r-inky.vercel.app/',
        image: '/aether-preview.png',
    },
    {
        title: 'MuktaVidya',
        description: 'A lightweight, privacy-conscious platform for generating and rendering AI-powered mathematical solutions.',
        longDescription: 'Muktavidya is built to provide seamless, accurate, and beautifully rendered math solutions. By leveraging the Gemini API and a modern web stack, it offers a responsive and robust experience. The application relies on anonymous architecture, avoiding heavy user identity providers. Everything is stored locally, ensuring complete ownership of your data.',
        challenges: [
            'Implementing rate-limiting via browser-driven validation combined with server-side IP tracking.',
            'Using IndexedDB for local state management without heavy third-party authentication.',
            'Rendering beautiful mathematical typography with KaTeX and custom Markdown.'
        ],
        features: [
            'AI-Powered Math Problem Solving',
            'KaTeX & React Markdown Integration',
            'Privacy-First Architecture (IndexedDB)',
            'Strict Dark Mode UI'
        ],
        tech: ['Next.js', 'TypeScript', 'Tailwind', 'Google AI Studio', 'Security'],
        github: 'https://github.com/Sayanthegamer/MuktaVidya',
        demo: 'https://muktavidya.vercel.app/',
        image: '/muktavidya-preview.png',
    },
    {
        title: 'CircuitJS',
        description: 'An interactive, visual, and easy-to-use electronic circuit simulator right in your browser!',
        longDescription: 'CircuitJS is a web-based app that lets you design and test circuits visually. Whether you are a student learning about electricity for the first time, a hobbyist testing an idea, or just someone who likes playing with digital tools, CircuitJS makes electronics accessible to everyone.',
        challenges: [
            'Translating circuit drawing into mathematical matrix equations in real-time.',
            'Building a high-speed rendering engine using HTML5 Canvas for smooth animations.',
            'Ensuring the application is mobile-friendly with touch controls.'
        ],
        features: [
            'Drag & Drop Building',
            'Real-Time Visuals and Current Dots',
            'Voltage Color Indicators',
            'Fully Stocked Parts Bin (Batteries, Resistors, LEDs, etc.)',
            'Advanced Plotter for Voltage/Current over time'
        ],
        tech: ['React', 'TypeScript', 'Vite', 'HTML5 Canvas'],
        github: 'https://github.com/Sayanthegamer/circuitjs',
        demo: 'https://circuitjs.vercel.app/',
        image: '/circuitjs-preview.png',
    },
    {
        title: 'Lecture Notes Scribe',
        description: 'A cloud-native pipeline and extension that processes lecture videos to generate comprehensive study guides.',
        longDescription: 'A cloud-native, asynchronous pipeline and browser extension that processes lecture videos to generate comprehensive, textbook-quality study guides with LaTeX math equations and inline keyframe illustrations. Uses a decoupled state-machine model to handle long-running video processing tasks in distributed cloud environments.',
        challenges: [
            'Handling long-running video processing without blocking the web server.',
            'Bypassing ephemeral storage loss in cloud environments by uploading to Supabase.',
            'Preventing zombie subprocesses during FFmpeg execution with strict timeouts.'
        ],
        features: [
            'Asynchronous Video Processing Queue',
            'Multimodal AI Engine using Gemini API',
            'Inline Keyframe Extraction via FFmpeg',
            'Chrome Extension Integration',
            'Live Status Polling'
        ],
        tech: ['TypeScript', 'Supabase', 'Google AI Studio', 'Security'],
        github: 'https://github.com/Sayanthegamer/lecture-notes-pipeline',
        image: '/lecture-notes-preview.png',
    }
];

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const { unlockAchievement, selectedTechFilter, clearTechFilter, isMuted } = useAchievementStore();

    const playClick = () => {
        if (!isMuted) {
            try {
                const audio = new Audio('/click.mp3');
                audio.volume = 0.15;
                audio.play().catch(() => {});
            } catch (e) {}
        }
    };

    const handleProjectClick = (project: Project) => {
        setSelectedProject(project);
        unlockAchievement('deep_diver');
        playClick();
    };

    // Filter projects based on the active tech stack synthesizer
    const filteredProjects = selectedTechFilter.length === 0
        ? projects
        : projects.filter(p => selectedTechFilter.some(tech => p.tech.includes(tech)));

    return (
        <section id="projects" className="py-20 relative flex flex-col justify-center items-center w-full">
            <div className="w-full max-w-6xl px-4 md:px-6">
                <div className="text-center mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-[var(--theme-text-header)] tracking-tight mb-8"
                    >
                        Selected Work
                    </motion.h2>

                    {/* Minimal Inline Tech Filter */}
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto"
                    >
                        <button 
                            onClick={() => { clearTechFilter(); playClick(); }}
                            className={`px-4 py-1.5 rounded-full text-xs font-mono transition-colors border ${
                                selectedTechFilter.length === 0 
                                ? 'bg-[var(--theme-text-header)] text-[var(--theme-bg)] border-transparent' 
                                : 'bg-transparent text-[var(--theme-text)]/60 border-[var(--theme-border)] hover:text-[var(--theme-text-header)] hover:border-[var(--theme-text)]/30'
                            }`}
                        >
                            All
                        </button>
                        {Array.from(new Set(projects.flatMap(p => p.tech))).sort().map(tech => {
                            const isSelected = selectedTechFilter.includes(tech);
                            return (
                                <button
                                    key={tech}
                                    onClick={() => { 
                                        if (selectedTechFilter.includes(tech) && selectedTechFilter.length === 1) {
                                            clearTechFilter();
                                        } else {
                                            useAchievementStore.getState().toggleTechFilter(tech);
                                        }
                                        playClick(); 
                                    }}
                                    className={`px-4 py-1.5 rounded-full text-xs font-mono transition-colors border ${
                                        isSelected 
                                        ? 'bg-[var(--theme-text-header)] text-[var(--theme-bg)] border-transparent' 
                                        : 'bg-transparent text-[var(--theme-text)]/60 border-[var(--theme-border)] hover:text-[var(--theme-text-header)] hover:border-[var(--theme-text)]/30'
                                    }`}
                                >
                                    {tech}
                                </button>
                            );
                        })}
                    </motion.div>
                </div>

                <motion.div 
                    layout 
                    className="grid grid-cols-1 md:grid-cols-12 gap-6 min-h-[300px]"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, index) => {
                            // Bento Span calculations
                            const getSpan = (i: number) => {
                                switch (i % 5) {
                                    case 0: return "md:col-span-8";
                                    case 1: return "md:col-span-4";
                                    case 2: return "md:col-span-4 lg:col-span-5";
                                    case 3: return "md:col-span-8 lg:col-span-7";
                                    case 4: return "md:col-span-12";
                                    default: return "md:col-span-12";
                                }
                            };

                            return (
                                <motion.div
                                    layout
                                    key={project.title}
                                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                                    className={`${getSpan(index)} h-[380px] md:h-[450px]`}
                                >
                                    <SpotlightCard 
                                        className="h-full flex flex-col justify-end p-6 bg-[var(--theme-bg-card)] border-[var(--theme-border)] group relative cursor-pointer"
                                    >
                                        <div 
                                            onClick={() => handleProjectClick(project)}
                                            className="absolute inset-0 z-0 overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--theme-bg)] via-[var(--theme-bg)]/40 to-transparent z-10 group-hover:scale-105 transition-transform duration-500" />
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                loading="lazy"
                                                decoding="async"
                                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                                            />
                                        </div>

                                        <div 
                                            onClick={() => handleProjectClick(project)}
                                            className="relative z-20 flex flex-col h-full justify-between pointer-events-none"
                                        >
                                            <div className="flex justify-between items-start">
                                                <div className="flex flex-wrap gap-1.5 max-w-[80%]">
                                                    {project.tech.map((t) => (
                                                        <span
                                                            key={t}
                                                            className="px-2 py-0.5 text-[9px] font-mono rounded-md border border-[var(--theme-border)] bg-[var(--theme-bg)]/80 text-[var(--theme-text)]/90"
                                                        >
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>
                                                <div className="w-8 h-8 rounded-full border border-[var(--theme-border)] flex items-center justify-center text-[var(--theme-text)] group-hover:border-[var(--theme-accent)] group-hover:text-[var(--theme-accent)] transition-all bg-[var(--theme-bg)]/60">
                                                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                                                </div>
                                            </div>

                                            <div>
                                                <h3 className="text-xl md:text-2xl font-serif font-bold text-[var(--theme-text-header)] mb-2 group-hover:text-[var(--theme-accent)] transition-colors">
                                                    {project.title}
                                                </h3>
                                                <p className="text-xs md:text-sm text-[var(--theme-text)]/85 font-light line-clamp-2">
                                                    {project.description}
                                                </p>
                                            </div>
                                        </div>
                                    </SpotlightCard>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>

                    {/* Empty Filter State fallback */}
                    {filteredProjects.length === 0 && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="col-span-12 p-12 text-center flex flex-col items-center justify-center gap-4 rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-bg-card)] min-h-[300px]"
                        >
                            <Terminal size={32} className="text-[var(--theme-accent)] animate-pulse" />
                            <h3 className="text-xl font-bold font-serif text-[var(--theme-text-header)]">
                                NO_COMPATIBLE_ENGINES_SYNTHESIZED
                            </h3>
                            <p className="text-xs text-[var(--theme-text)]/60 font-mono tracking-wider max-w-md">
                                The current filter stack combinations ({selectedTechFilter.join(' + ')}) returned 0 running instances. Re-adjust your synthesizer board.
                            </p>
                            <button
                                onClick={() => { clearTechFilter(); playClick(); }}
                                className="mt-2 flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--theme-accent)] text-white text-xs font-mono tracking-wider shadow-[0_0_15px_var(--theme-glow)] border-none"
                            >
                                <RefreshCw size={12} /> REBOOT_SYNTHESIZER
                            </button>
                        </motion.div>
                    )}
                </motion.div>
            </div>

            {/* Project Detailed Modal */}
            <ProjectModal
                project={selectedProject}
                isOpen={selectedProject !== null}
                onClose={() => { setSelectedProject(null); playClick(); }}
            />
        </section>
    );
};

export default Projects;
