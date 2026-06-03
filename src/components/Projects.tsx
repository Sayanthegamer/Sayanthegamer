import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
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
        tech: ['React', 'TypeScript', 'Firebase', 'Tailwind CSS', 'Framer Motion', 'Vite'],
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
        tech: ['React 19', 'Vite', 'Tailwind CSS 4', 'React Router 7', 'Supabase'],
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
        tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Google Gemini API', 'html-to-image'],
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
        tech: ['React 19', 'TypeScript', 'Google Gemini AI', 'Tailwind CSS', 'Framer Motion'],
        github: 'https://github.com/Sayanthegamer/a-e-t-h-e-r',
        demo: 'https://a-e-t-h-e-r-inky.vercel.app/',
        image: '/aether-preview.png',
    },

    {
        title: 'MuktaVidya',
        description: 'An open-source educational platform or tool.',
        longDescription: 'MuktaVidya is a Next.js project bootstrapped with create-next-app, providing an educational platform.',
        challenges: [
            'Building a robust Next.js application.',
            'Setting up a modern frontend environment.'
        ],
        features: [
            'Built with Next.js',
            'Optimized fonts with next/font',
            'Vercel deployment ready'
        ],
        tech: ['Next.js', 'TypeScript', 'CSS', 'JavaScript'],
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
        tech: ['Python', 'FastAPI', 'Supabase', 'Google Gemini', 'Chrome Extension API', 'FFmpeg'],
        github: 'https://github.com/Sayanthegamer/lecture-notes-pipeline',
        image: '/lecture-notes-preview.png',
    }

];

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const unlockAchievement = useAchievementStore((state) => state.unlockAchievement);

    return (
        <section id="projects" className="section">
            <div className="container mx-auto px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-bold mb-16 text-center font-serif"
                >
                    Featured Projects
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => {
                                setSelectedProject(project);
                                unlockAchievement('deep_diver');
                            }}
                            className="cursor-pointer group"
                        >
                            <SpotlightCard className="h-full flex flex-col bg-slate-900/50 border-slate-800 overflow-hidden">
                                <div className="relative h-48 overflow-hidden">
                                    <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        loading="lazy"
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                </div>

                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="text-xl font-bold mb-2 text-slate-100 group-hover:text-sky-400 transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-slate-400 text-sm mb-4 flex-1 leading-relaxed">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.tech.map((t) => (
                                            <span key={t} className="text-xs px-2 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                                                {t}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center gap-2 text-sky-400 text-sm font-medium mt-auto group/link">
                                        View Details
                                        <ArrowRight size={16} className="transform group-hover/link:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </SpotlightCard>
                        </motion.div>
                    ))}
                </div>
            </div>

            <ProjectModal
                project={selectedProject}
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </section>
    );
};

export default Projects;
