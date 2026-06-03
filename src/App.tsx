import HUDHeader from './components/HUDHeader';
import Hero from './components/Hero';
import Hobbies from './components/Hobbies';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import TechStack from './components/TechStack';
import ContactTerminal from './components/ContactTerminal';
import Footer from './components/Footer';
import Background from './components/Background';

import AchievementToast from './components/AchievementToast';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
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
      </div>
    </>
  );
}

export default App;
