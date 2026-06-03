import Beams from './Beams';
import { useAchievementStore } from '../store/useAchievementStore';

const Background = () => {
    const activeTheme = useAchievementStore((state) => state.activeTheme);

    const getThemeConfig = () => {
        switch (activeTheme) {
            case 'cyberpunk':
                return {
                    lightColor: '#ff007f', // pink
                    bgColor: '#030303'     // black
                };
            case 'retro':
                return {
                    lightColor: '#39ff14', // green
                    bgColor: '#050805'     // dark green
                };
            case 'ocean':
                return {
                    lightColor: '#00b4d8', // teal
                    bgColor: '#010d18'     // dark blue
                };
            case 'aero':
            default:
                return {
                    lightColor: '#c25027', // rust orange
                    bgColor: '#0d0c0c'     // dark gray
                };
        }
    };

    const config = getThemeConfig();

    return (
        <Beams 
            className="fixed inset-0 -z-50 w-full h-full pointer-events-none select-none"
            style={{ position: 'fixed' }}
            beamWidth={1.8}
            beamHeight={28}
            beamNumber={10}
            lightColor={config.lightColor}
            bgColor={config.bgColor}
            speed={1.0}            // Slower speed for a peaceful background flow
            noiseIntensity={1.2}   // Reduced noise intensity to avoid distracting textures
            scale={0.15}           // Smaller noise scale
            rotation={20}
        />
    );
};

export default Background;
