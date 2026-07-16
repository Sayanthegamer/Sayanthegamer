import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Volume2, VolumeX, Menu, X, CheckCircle2, Lock } from 'lucide-react';
import { useAchievementStore, achievements } from '../store/useAchievementStore';
import GlassSurface from './GlassSurface';
import { useIsMobile } from '../hooks/useIsMobile';


const HUDHeader = () => {
    const { 
        unlockedAchievements, 
        isMuted, 
        setMuted, 
        resetAchievements 
    } = useAchievementStore();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCabinetOpen, setIsCabinetOpen] = useState(false);
    const isMobile = useIsMobile();

    const menuItems = [
        { name: 'Home', href: '#' },
        { name: 'Skills', href: '#tech-stack' },
        { name: 'Interests', href: '#hobbies' },
        { name: 'Journey', href: '#timeline' },
        { name: 'Projects', href: '#projects' },
        { name: 'CLI Terminal', href: '#contact-terminal' },
    ];

    const totalAchievements = Object.keys(achievements).length;
    const unlockedCount = unlockedAchievements.length;

    const playClick = () => {
        if (!isMuted) {
            try {
                const audio = new Audio('/click.wav'); // Fallback or standard click sound
                audio.volume = 0.2;
                audio.play().catch(() => {});
            } catch (e) {}
        }
    };

    return (
        <>
            {/* Main HUD Nav bar */}
            <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl">
                {/* Navbar wrapper: GlassSurface on desktop, lightweight div on mobile */}
                {isMobile ? (
                <div
                    className="w-full h-[62px] rounded-full bg-[rgba(0,0,0,0.7)] border border-[var(--theme-border)] shadow-2xl flex items-center justify-center"
                    style={{ overflow: 'visible' }}
                >
                    <div className="w-full px-4 flex items-center justify-between relative bg-transparent">
                        {/* Brand / Logo */}
                        <a href="#" className="font-bold font-serif text-lg tracking-wider text-[var(--theme-text-header)] flex items-center gap-2">
                            SAYAN<span className="text-[var(--theme-accent)]">.</span>
                        </a>

                        {/* Desktop Navigation Links */}
                        <div className="hidden md:flex items-center gap-6">
                            {menuItems.map((item) => (
                                <a 
                                    key={item.name} 
                                    href={item.href} 
                                    onClick={playClick}
                                    className="text-sm font-medium tracking-wide text-[var(--theme-text)] hover:text-[var(--theme-text-header)] transition-colors py-1"
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>

                        {/* Interactive Control Widgets */}
                        <div className="flex items-center gap-3">
                            {/* Audio Toggle */}
                            <button 
                                onClick={() => { setMuted(!isMuted); playClick(); }}
                                aria-label={isMuted ? "Unmute sound effects" : "Mute sound effects"}
                                className="w-10 h-10 rounded-full flex items-center justify-center border border-[var(--theme-border)] text-[var(--theme-text)] hover:border-[var(--theme-accent)] transition-all bg-transparent hover:scale-105"
                            >
                                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                            </button>



                            {/* Achievement Tracker Widget */}
                            <button 
                                onClick={() => { setIsCabinetOpen(true); playClick(); }}
                                className="h-10 px-4 rounded-full flex items-center gap-2 border border-[var(--theme-border)] text-[var(--theme-text-header)] bg-[rgba(255,255,255,0.02)] hover:border-[var(--theme-accent)] transition-all hover:scale-105 font-mono text-xs"
                            >
                                <Award size={16} className="text-[var(--theme-accent)]" />
                                <span>{unlockedCount}/{totalAchievements}</span>
                            </button>

                            {/* Mobile Menu Toggle */}
                            <button 
                                onClick={() => { setIsMenuOpen(!isMenuOpen); playClick(); }}
                                aria-label="Toggle navigation menu"
                                className="w-10 h-10 rounded-full flex md:hidden items-center justify-center border border-[var(--theme-border)] text-[var(--theme-text)] hover:border-[var(--theme-accent)] transition-all bg-transparent"
                            >
                                {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
                            </button>
                        </div>
                    </div>
                </div>
                ) : (
                <GlassSurface 
                    borderRadius={9999} 
                    backgroundOpacity={0.02} 
                    width="100%" 
                    height="62px" 
                    displace={4} 
                    blur={8} 
                    brightness={45} 
                    distortionScale={-55} 
                    redOffset={0} 
                    greenOffset={3} 
                    blueOffset={6} 
                    borderWidth={0.12} 
                    yChannel="B"
                    className="shadow-2xl" 
                    style={{ overflow: 'visible' }}
                >
                    <div className="w-full px-4 flex items-center justify-between relative bg-transparent">
                        {/* Brand / Logo */}
                        <a href="#" className="font-bold font-serif text-lg tracking-wider text-[var(--theme-text-header)] flex items-center gap-2">
                            SAYAN<span className="text-[var(--theme-accent)]">.</span>
                        </a>

                        {/* Desktop Navigation Links */}
                        <div className="hidden md:flex items-center gap-6">
                            {menuItems.map((item) => (
                                <a 
                                    key={item.name} 
                                    href={item.href} 
                                    onClick={playClick}
                                    className="text-sm font-medium tracking-wide text-[var(--theme-text)] hover:text-[var(--theme-text-header)] transition-colors py-1"
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>

                        {/* Interactive Control Widgets */}
                        <div className="flex items-center gap-3">
                            {/* Audio Toggle */}
                            <button 
                                onClick={() => { setMuted(!isMuted); playClick(); }}
                                aria-label={isMuted ? "Unmute sound effects" : "Mute sound effects"}
                                className="w-10 h-10 rounded-full flex items-center justify-center border border-[var(--theme-border)] text-[var(--theme-text)] hover:border-[var(--theme-accent)] transition-all bg-transparent hover:scale-105"
                            >
                                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                            </button>



                            {/* Achievement Tracker Widget */}
                            <button 
                                onClick={() => { setIsCabinetOpen(true); playClick(); }}
                                className="h-10 px-4 rounded-full flex items-center gap-2 border border-[var(--theme-border)] text-[var(--theme-text-header)] bg-[rgba(255,255,255,0.02)] hover:border-[var(--theme-accent)] transition-all hover:scale-105 font-mono text-xs"
                            >
                                <Award size={16} className="text-[var(--theme-accent)]" />
                                <span>{unlockedCount}/{totalAchievements}</span>
                            </button>

                            {/* Mobile Menu Toggle */}
                            <button 
                                onClick={() => { setIsMenuOpen(!isMenuOpen); playClick(); }}
                                aria-label="Toggle navigation menu"
                                className="w-10 h-10 rounded-full flex md:hidden items-center justify-center border border-[var(--theme-border)] text-[var(--theme-text)] hover:border-[var(--theme-accent)] transition-all bg-transparent"
                            >
                                {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
                            </button>
                        </div>
                    </div>
                </GlassSurface>
                )}

                {/* Mobile Navigation Dropdown */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="mt-2 w-full glass-card rounded-3xl bg-[var(--theme-bg-card)] border border-[var(--theme-border)] p-4 flex flex-col gap-3 shadow-2xl md:hidden z-40"
                        >
                            {menuItems.map((item) => (
                                <a 
                                    key={item.name} 
                                    href={item.href} 
                                    onClick={() => { setIsMenuOpen(false); playClick(); }}
                                    className="px-4 py-2 rounded-xl text-[var(--theme-text)] hover:bg-[rgba(255,255,255,0.04)] hover:text-[var(--theme-text-header)] transition-colors text-sm"
                                >
                                    {item.name}
                                </a>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            {/* Achievement Cabinet Drawer / Modal */}
            <AnimatePresence>
                {isCabinetOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        {/* Backdrop */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsCabinetOpen(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-md"
                        />

                        {/* Modal Box */}
                        <motion.div 
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="relative w-full max-w-lg glass-card bg-[var(--theme-bg-card)] rounded-3xl border border-[var(--theme-border)] shadow-2xl p-6 md:p-8 overflow-hidden z-10"
                        >
                            {/* Decorative background grid */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-20" />

                            <div className="flex items-center justify-between border-b border-[var(--theme-border)] pb-4 mb-6 relative">
                                <h3 className="text-xl md:text-2xl font-serif text-[var(--theme-text-header)] flex items-center gap-3">
                                    <Award className="text-[var(--theme-accent)] w-6 h-6" /> Achievement Cabinet
                                </h3>
                                <button 
                                    onClick={() => { setIsCabinetOpen(false); playClick(); }}
                                    aria-label="Close cabinet modal"
                                    className="w-8 h-8 rounded-full border border-[var(--theme-border)] flex items-center justify-center text-[var(--theme-text)] hover:border-[var(--theme-accent)] transition-all bg-transparent"
                                >
                                    <X size={14} />
                                </button>
                            </div>

                            <p className="text-sm text-[var(--theme-text)] font-light leading-relaxed mb-6">
                                Unlock hidden badges by interacting with Sayan's digital sanctuary: clicking projects, flipping interests, switching themes, or typing in the terminal.
                            </p>

                            <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 scrollbar-hide">
                                {Object.values(achievements).map((ach) => {
                                    const isUnlocked = unlockedAchievements.includes(ach.id);
                                    return (
                                        <div 
                                            key={ach.id}
                                            className={`p-3 rounded-2xl flex items-center gap-4 border transition-all ${
                                                isUnlocked 
                                                  ? 'bg-[rgba(var(--theme-accent-rgb),0.05)] border-[rgba(var(--theme-accent-rgb),0.2)]' 
                                                  : 'bg-transparent border-[var(--theme-border)] opacity-60'
                                            }`}
                                        >
                                            <div className="w-12 h-12 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[var(--theme-border)] flex items-center justify-center text-2xl shrink-0">
                                                {isUnlocked ? ach.icon : <Lock size={20} className="text-[var(--theme-text)]/30" />}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-semibold text-[var(--theme-text-header)] flex items-center gap-2">
                                                    {ach.title}
                                                    {isUnlocked && <CheckCircle2 size={14} className="text-[var(--theme-accent)]" />}
                                                </h4>
                                                <p className="text-xs text-[var(--theme-text)]/70 font-light truncate mt-0.5">
                                                    {ach.description}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {unlockedCount > 0 && (
                                <div className="mt-8 flex justify-end">
                                    <button
                                        onClick={() => {
                                            if (confirm("Reset all achievements?")) {
                                                resetAchievements();
                                                setIsCabinetOpen(false);
                                                playClick();
                                            }
                                        }}
                                        className="text-xs text-[var(--theme-text)]/50 hover:text-[var(--theme-accent)] transition-colors border-none bg-transparent outline-none p-0 cursor-pointer"
                                    >
                                        Reset Cabinet Data
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default HUDHeader;
