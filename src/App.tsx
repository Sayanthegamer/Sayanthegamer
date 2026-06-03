import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import HUDHeader from './components/HUDHeader';
import Hero from './components/Hero';
import Hobbies from './components/Hobbies';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import TechStack from './components/TechStack';
import ContactTerminal from './components/ContactTerminal';
import Footer from './components/Footer';
import Background from './components/Background';
import FluidGlass from './components/FluidGlass';
import ColorBends from './components/ColorBends';

import { useAchievementStore, type GlassMode } from './store/useAchievementStore';
import AchievementToast from './components/AchievementToast';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  const { isGlassOpen, glassMode, setGlassOpen, isMuted, isBendsOpen, setBendsOpen, activeTheme } = useAchievementStore();

  const playClick = () => {
    if (!isMuted) {
      try {
        const audio = new Audio('/click.wav');
        audio.volume = 0.15;
        audio.play().catch(() => {});
      } catch (e) {}
    }
  };

  return (
    <>
      <AchievementToast />
      <div className="min-h-screen bg-[var(--theme-bg)] text-[var(--theme-text)] selection:bg-[rgba(var(--theme-accent-rgb),0.3)] transition-colors duration-400">
        <Background />
        
        {/* Floating HUD controls */}
        <HUDHeader />

        <main className="relative z-10 flex flex-col gap-20 md:gap-32 pb-20 pt-16">
          <Hero />
          <TechStack />
          <Hobbies />
          <Timeline />
          <Projects />
          <ContactTerminal />
        </main>

        <Footer />
        <Analytics />
        <SpeedInsights />

        {/* 3D Fluid Glass Easter Egg Modal */}
        <AnimatePresence>
          {isGlassOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg"
            >
              {/* Modal Container */}
              <motion.div 
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="relative w-full max-w-4xl h-[80vh] rounded-3xl glass-card bg-[#050505]/95 border border-[var(--theme-border)] shadow-2xl flex flex-col overflow-hidden"
              >
                {/* Header Controls */}
                <div className="p-4 md:px-8 md:py-5 border-b border-[var(--theme-border)] flex items-center justify-between z-10 bg-black/40">
                  <div>
                    <h3 className="text-base md:text-lg font-serif font-bold text-[var(--theme-text-header)]">
                      3D Fluid Glass Lab
                    </h3>
                    <p className="text-[10px] md:text-xs font-mono text-[var(--theme-text)]/40 tracking-wider">
                      Interactive refraction simulation. Drag and scroll.
                    </p>
                  </div>

                  {/* Mode selectors */}
                  <div className="flex items-center gap-2 font-mono text-[10px]">
                    {(['lens', 'cube', 'bar'] as GlassMode[]).map((mode) => (
                      <button
                        key={mode}
                        onClick={() => { setGlassOpen(true, mode); playClick(); }}
                        className={`px-3 py-1.5 rounded-full border transition-all uppercase tracking-wider ${
                          glassMode === mode 
                            ? 'bg-[var(--theme-accent)] border-[var(--theme-accent)] text-white shadow-[0_0_10px_var(--theme-glow)]' 
                            : 'bg-transparent border-[var(--theme-border)] text-[var(--theme-text)] hover:text-[var(--theme-text-header)]'
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>

                  {/* Close button */}
                  <button 
                    onClick={() => { setGlassOpen(false); playClick(); }}
                    aria-label="Exit 3D Lab"
                    className="w-9 h-9 rounded-full border border-[var(--theme-border)] flex items-center justify-center text-[var(--theme-text)] hover:border-[var(--theme-accent)] hover:text-[var(--theme-text-header)] transition-all bg-transparent cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Canvas Render viewport */}
                <div className="flex-1 w-full h-full relative bg-black/10">
                  <FluidGlass mode={glassMode} />
                  
                  {/* Visual Drag Instruction helper */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[9px] font-mono tracking-widest text-white/30 pointer-events-none uppercase">
                    Drag object to move // Scroll to zoom & reveal underlying cards
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ColorBends Easter Egg Modal */}
        <AnimatePresence>
          {isBendsOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg"
            >
              {/* Modal Container */}
              <motion.div 
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="relative w-full max-w-4xl h-[80vh] rounded-3xl glass-card bg-[#050505]/95 border border-[var(--theme-border)] shadow-2xl flex flex-col overflow-hidden"
              >
                {/* Header Controls */}
                <div className="p-4 md:px-8 md:py-5 border-b border-[var(--theme-border)] flex items-center justify-between z-10 bg-black/40">
                  <div>
                    <h3 className="text-base md:text-lg font-serif font-bold text-[var(--theme-text-header)]">
                      WebGL ColorBends Playground
                    </h3>
                    <p className="text-[10px] md:text-xs font-mono text-[var(--theme-text)]/40 tracking-wider">
                      Interactive shader art. Hover/Move pointer to warp waves.
                    </p>
                  </div>

                  {/* Close button */}
                  <button 
                    onClick={() => { setBendsOpen(false); playClick(); }}
                    aria-label="Exit ColorBends Playground"
                    className="w-9 h-9 rounded-full border border-[var(--theme-border)] flex items-center justify-center text-[var(--theme-text)] hover:border-[var(--theme-accent)] hover:text-[var(--theme-text-header)] transition-all bg-transparent cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Canvas Render viewport */}
                <div className="flex-1 w-full h-full relative bg-black/10">
                  <ColorBends 
                    colors={
                      activeTheme === 'cyberpunk'
                        ? ['#ff007f', '#00f0ff', '#050505']
                        : activeTheme === 'retro'
                        ? ['#39ff14', '#ffb000', '#050805']
                        : activeTheme === 'ocean'
                        ? ['#00b4d8', '#0077b6', '#030306']
                        : ['#c25027', '#8b8680', '#1e1d1b']
                    }
                    rotation={90}
                    speed={0.25}
                    scale={1}
                    frequency={1}
                    warpStrength={1.2}
                    mouseInfluence={1.2}
                    noise={0.15}
                    parallax={0.5}
                    iterations={1}
                    intensity={1.5}
                    bandWidth={6}
                    transparent
                  />
                  
                  {/* Interactive Helper Text */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[9px] font-mono tracking-widest text-white/30 pointer-events-none uppercase">
                    Move your pointer to warp the color waves
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default App;
