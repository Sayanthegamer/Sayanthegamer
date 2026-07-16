import { Github, Mail, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAchievementStore } from '../store/useAchievementStore';

const Footer = () => {
    const unlockAchievement = useAchievementStore((state) => state.unlockAchievement);

    return (
        <footer className="py-12 border-t border-[var(--theme-border)] relative z-20 bg-[var(--theme-bg)] text-center">
            <motion.div
                onViewportEnter={() => unlockAchievement('explorer')}
                className="flex justify-center gap-8 mb-6"
            >
                <a href="https://github.com/Sayanthegamer" target="_blank" rel="noopener noreferrer" className="text-[var(--theme-text)]/60 hover:text-[var(--theme-text-header)] transition-colors">
                    <Github size={20} />
                </a>

                <a href="https://www.instagram.com/nxt_sayan0/" target="_blank" rel="noopener noreferrer" className="text-[var(--theme-text)]/60 hover:text-[var(--theme-text-header)] transition-colors">
                    <Instagram size={20} />
                </a>

                <a href="mailto:sayanbnk2008@gmail.com" className="text-[var(--theme-text)]/60 hover:text-[var(--theme-text-header)] transition-colors">
                    <Mail size={20} />
                </a>
            </motion.div>
            <p className="text-[var(--theme-text)]/40 text-xs font-mono tracking-widest uppercase">
                &copy; {new Date().getFullYear()} Sayan. All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;
