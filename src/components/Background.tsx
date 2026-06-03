import ColorBends from './ColorBends';
import { useAchievementStore } from '../store/useAchievementStore';

const Background = () => {
    const activeTheme = useAchievementStore((state) => state.activeTheme);

    return (
        <ColorBends 
            className="fixed inset-0 -z-50 w-full h-full pointer-events-none select-none"
            style={{ position: 'fixed' }}
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
            speed={0.1}          // Slower animation speed for a non-distracting background
            scale={1.4}          // Larger scale for broader, softer bands
            frequency={0.7}      // Lower frequency for smoother waves
            warpStrength={0.8}   // Moderate warping
            mouseInfluence={0.4} // Subtle pointer tracking reaction
            noise={0.06}         // Very light grain noise
            parallax={0.2}       // Light parallax shift
            iterations={1}       // Single iteration warp for cleaner paths
            intensity={1.1}      // Low intensity to maintain text readability & contrast
            bandWidth={8}        // Wide band transitions
            transparent={false}  // Solid base color canvas background
        />
    );
};

export default Background;
