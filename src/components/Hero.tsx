import { HeroSection } from './ui/hero-section-with-smooth-bg-shader';
import { useAchievementStore } from '../store/useAchievementStore';

const Hero = () => {
    const isMuted = useAchievementStore((state) => state.isMuted);
    const { activeTheme } = useAchievementStore();

    const playClick = () => {
        if (!isMuted) {
            try {
                const audio = new Audio('/click.mp3');
                audio.volume = 0.2;
                audio.play().catch(() => {});
            } catch (e) {}
        }
    };

    const handleButtonClick = () => {
        playClick();
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <HeroSection
            title="Building interfaces that feel"
            highlightText="right."
            description="Full-stack engineer and creative developer crafting premium, performance-driven web applications with intentional design and fluid motion."
            buttonText="View selected work"
            onButtonClick={handleButtonClick}
            colors={
                activeTheme === 'retro' ? ["#103010", "#39ff14", "#050505", "#144a14", "#1e1d1b", "#091209"] :
                activeTheme === 'cyberpunk' ? ["#ff007f", "#3b0024", "#00f0ff", "#1c000e", "#050505", "#110006"] :
                activeTheme === 'ocean' ? ["#00b4d8", "#0077b6", "#03045e", "#0a192f", "#002b4d", "#030306"] :
                ["#18181b", "#27272a", "#52525b", "#18181b", "#3f3f46", "#52525b"]
            }
            distortion={1.2}
            swirl={0.6}
            speed={0.8}
            offsetX={0.1}
            className="w-full"
            veilOpacity="bg-transparent"
        />
    );
};

export default Hero;
