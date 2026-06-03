import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useAchievementStore } from '../store/useAchievementStore';

const roles = [
    'Full-stack Engineer',
    'Creative Developer',
    'AI Builder & Integrator',
    'Acoustic Guitarist'
];

const Hero = () => {
    const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const isMuted = useAchievementStore((state) => state.isMuted);

    useEffect(() => {
        let timer: number;
        const currentRole = roles[currentRoleIndex];
        const speed = isDeleting ? 40 : 100;

        if (!isDeleting && displayedText === currentRole) {
            // Pause at full word
            timer = setTimeout(() => {
                setIsDeleting(true);
            }, 2000);
        } else if (isDeleting && displayedText === '') {
            setIsDeleting(false);
            setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        } else {
            timer = setTimeout(() => {
                setDisplayedText(
                    isDeleting 
                      ? currentRole.substring(0, displayedText.length - 1)
                      : currentRole.substring(0, displayedText.length + 1)
                );
            }, speed);
        }

        return () => clearTimeout(timer);
    }, [displayedText, isDeleting, currentRoleIndex]);

    const playClick = () => {
        if (!isMuted) {
            try {
                const audio = new Audio('/click.mp3');
                audio.volume = 0.2;
                audio.play().catch(() => {});
            } catch (e) {}
        }
    };

    return (
        <section className="section relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,var(--theme-bg)_80%)] pointer-events-none" />

            <div className="text-center z-10 px-4 max-w-4xl">
                {/* Live availability indicator */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--theme-border)] bg-[rgba(255,255,255,0.02)] mb-8 font-mono text-[10px] md:text-xs tracking-wider"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-[var(--theme-text)]/80">AVAILABLE FOR COLLABORATION</span>
                </motion.div>

                {/* Sub-eyebrow */}
                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-xs md:text-sm font-mono uppercase tracking-[0.3em] text-[var(--theme-text)]/60 mb-3"
                >
                    System Initialized // Sayan's Space
                </motion.h2>

                {/* Main Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="font-black tracking-tight text-[var(--theme-text-header)] mb-6 select-none"
                    style={{ textShadow: '0 0 40px var(--theme-glow)' }}
                >
                    SAYAN
                </motion.h1>

                {/* Dynamic Typewriter Role */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="h-10 md:h-12 flex items-center justify-center text-lg md:text-2xl font-mono text-[var(--theme-text)] mb-8"
                >
                    <span className="text-[var(--theme-accent)] font-semibold">&gt; </span>
                    <span className="text-[var(--theme-text-header)]">{displayedText}</span>
                    <span className="animate-pulse font-bold text-[var(--theme-accent)]">|</span>
                </motion.div>

                {/* Short Paragraph Description */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-sm md:text-base text-[var(--theme-text)]/75 max-w-2xl mx-auto font-light leading-relaxed mb-12"
                >
                    I build production-grade web interfaces and intelligent software that balances technical craft with visually striking interactivity. Explore this gamified portal to unlock achievements.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <a
                        href="#projects"
                        onClick={playClick}
                        className="w-full sm:w-auto px-8 py-4 rounded-full font-serif font-bold text-sm tracking-wide text-white bg-[var(--theme-accent)] border border-[var(--theme-accent)] hover:bg-transparent hover:text-[var(--theme-accent)] transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_var(--theme-glow)] text-center"
                    >
                        Review Projects
                    </a>
                    <a
                        href="#contact-terminal"
                        onClick={playClick}
                        className="w-full sm:w-auto px-8 py-4 rounded-full font-mono text-xs tracking-wider text-[var(--theme-text)] border border-[var(--theme-border)] hover:border-[var(--theme-accent)] bg-transparent transition-all duration-300 hover:scale-105 active:scale-95 text-center"
                    >
                        Open Console Terminal
                    </a>
                </motion.div>
            </div>

            {/* Scroll Down Chevron */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[var(--theme-text)]/40 pointer-events-none"
            >
                <ArrowDown size={20} className="animate-bounce" />
            </motion.div>
        </section>
    );
};

export default Hero;
