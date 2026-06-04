import { useState, useEffect } from 'react';
import Beams from './Beams';
import { useAchievementStore } from '../store/useAchievementStore';

const Background = () => {
    const activeTheme = useAchievementStore((state) => state.activeTheme);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const getThemeConfig = () => {
        switch (activeTheme) {
            case 'cyberpunk':
                return {
                    lightColor: '#ff007f', // pink
                    bgColor: '#030303',
                    cssBg: 'radial-gradient(circle at 50% 50%, #17020a 0%, #030303 100%)'
                };
            case 'retro':
                return {
                    lightColor: '#39ff14', // green
                    bgColor: '#050805',
                    cssBg: 'radial-gradient(circle at 50% 50%, #081408 0%, #050805 100%)'
                };
            case 'ocean':
                return {
                    lightColor: '#00b4d8', // teal
                    bgColor: '#010d18',
                    cssBg: 'radial-gradient(circle at 50% 50%, #021a2c 0%, #010d18 100%)'
                };
            case 'aero':
            default:
                return {
                    lightColor: '#c25027', // rust orange
                    bgColor: '#0d0c0c',
                    cssBg: 'radial-gradient(circle at 50% 50%, #1e110b 0%, #0d0c0c 100%)'
                };
        }
    };

    const config = getThemeConfig();

    if (isMobile) {
        // High performance CSS background gradient for mobile devices to prevent WebGL lag
        return (
            <div 
                className="fixed inset-0 -z-50 w-full h-full pointer-events-none select-none"
                style={{ 
                    background: config.cssBg,
                    position: 'fixed'
                }}
            />
        );
    }

    return (
        <Beams 
            className="fixed inset-0 -z-50 w-full h-full pointer-events-none select-none"
            style={{ position: 'fixed' }}
            beamWidth={3.5}
            beamHeight={28}
            beamNumber={24}
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
