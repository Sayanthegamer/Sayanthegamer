import { useEffect, useRef } from 'react';
import { useAchievementStore, type ActiveTheme } from '../store/useAchievementStore';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
}

const Background = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const activeTheme = useAchievementStore((state) => state.activeTheme);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const mouse = { x: null as number | null, y: null as number | null, radius: 120 };

        // Configuration based on active theme
        const getThemeParams = (theme: ActiveTheme) => {
            switch (theme) {
                case 'cyberpunk':
                    return {
                        particleColor: 'rgba(255, 0, 127, 0.45)',
                        lineColor: 'rgba(0, 240, 255, 0.12)',
                        particleCount: 55,
                        connectDist: 110,
                    };
                case 'retro':
                    return {
                        particleColor: 'rgba(57, 255, 20, 0.5)',
                        lineColor: 'rgba(57, 255, 20, 0.1)',
                        particleCount: 40,
                        connectDist: 130,
                    };
                case 'ocean':
                    return {
                        particleColor: 'rgba(0, 180, 216, 0.4)',
                        lineColor: 'rgba(0, 180, 216, 0.12)',
                        particleCount: 65,
                        connectDist: 100,
                    };
                case 'aero':
                default:
                    return {
                        particleColor: 'rgba(194, 80, 39, 0.4)',
                        lineColor: 'rgba(255, 255, 255, 0.05)',
                        particleCount: 50,
                        connectDist: 120,
                    };
            }
        };

        let themeParams = getThemeParams(activeTheme);

        const initParticles = () => {
            particles = [];
            const count = themeParams.particleCount;
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.6,
                    vy: (Math.random() - 0.5) * 0.6,
                    radius: Math.random() * 2 + 1,
                });
            }
        };

        const resizeHandler = () => {
            if (!canvas) return;
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initParticles();
        };

        const mouseMoveHandler = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const mouseLeaveHandler = () => {
            mouse.x = null;
            mouse.y = null;
        };

        const clickHandler = (e: MouseEvent) => {
            // Ripple: push particles slightly away
            const cx = e.clientX;
            const cy = e.clientY;
            particles.forEach((p) => {
                const dx = p.x - cx;
                const dy = p.y - cy;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    const force = (150 - dist) / 10;
                    p.vx += (dx / dist) * force;
                    p.vy += (dy / dist) * force;
                }
            });
        };

        window.addEventListener('resize', resizeHandler);
        window.addEventListener('mousemove', mouseMoveHandler);
        window.addEventListener('mouseleave', mouseLeaveHandler);
        window.addEventListener('click', clickHandler);

        initParticles();

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            // Draw theme background gradients
            if (activeTheme === 'cyberpunk') {
                const grad = ctx.createRadialGradient(width/2, height/2, 10, width/2, height/2, width);
                grad.addColorStop(0, '#050306');
                grad.addColorStop(1, '#020103');
                ctx.fillStyle = grad;
            } else if (activeTheme === 'retro') {
                ctx.fillStyle = '#020402';
            } else if (activeTheme === 'ocean') {
                const grad = ctx.createRadialGradient(width/2, height/2, 10, width/2, height/2, width);
                grad.addColorStop(0, '#010d18');
                grad.addColorStop(1, '#00050a');
                ctx.fillStyle = grad;
            } else {
                const grad = ctx.createRadialGradient(width/2, height/2, 10, width/2, height/2, width);
                grad.addColorStop(0, '#0d0c0c');
                grad.addColorStop(1, '#050404');
                ctx.fillStyle = grad;
            }
            ctx.fillRect(0, 0, width, height);

            themeParams = getThemeParams(activeTheme);

            // Draw grid overlay for retro terminal
            if (activeTheme === 'retro') {
                ctx.strokeStyle = 'rgba(57, 255, 20, 0.02)';
                ctx.lineWidth = 1;
                const gridSize = 40;
                for (let x = 0; x < width; x += gridSize) {
                    ctx.beginPath();
                    ctx.moveTo(x, 0);
                    ctx.lineTo(x, height);
                    ctx.stroke();
                }
                for (let y = 0; y < height; y += gridSize) {
                    ctx.beginPath();
                    ctx.moveTo(0, y);
                    ctx.lineTo(width, y);
                    ctx.stroke();
                }
            }

            // Draw and update particles
            particles.forEach((p, index) => {
                // Move
                p.x += p.vx;
                p.y += p.vy;

                // Wall bounce
                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                // Mouse interaction: push away slightly
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = p.x - mouse.x;
                    const dy = p.y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < mouse.radius) {
                        const force = (mouse.radius - dist) / mouse.radius;
                        p.x += (dx / dist) * force * 1.5;
                        p.y += (dy / dist) * force * 1.5;
                    }
                }

                // Draw Particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = themeParams.particleColor;
                ctx.fill();

                // Draw links between particles
                for (let j = index + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < themeParams.connectDist) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = themeParams.lineColor;
                        ctx.lineWidth = (1 - dist / themeParams.connectDist) * 0.8;
                        ctx.stroke();
                    }
                }
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('resize', resizeHandler);
            window.removeEventListener('mousemove', mouseMoveHandler);
            window.removeEventListener('mouseleave', mouseLeaveHandler);
            window.removeEventListener('click', clickHandler);
            cancelAnimationFrame(animationFrameId);
        };
    }, [activeTheme]);

    return <canvas ref={canvasRef} className="fixed inset-0 -z-50 block w-full h-full pointer-events-none" />;
};

export default Background;
