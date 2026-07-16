import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '../hooks/useIsMobile';

const SpotlightCard = ({ children, className = "", isInverted = false }: { children: React.ReactNode, className?: string, isInverted?: boolean }) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [opacity, setOpacity] = useState(0);
    const isMobile = useIsMobile();

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current || isMobile) return;

        const rect = divRef.current.getBoundingClientRect();
        let x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (isInverted) {
            x = rect.width - x;
        }

        divRef.current.style.setProperty('--mouse-x', `${x}px`);
        divRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    const handleFocus = () => {
        if (!isMobile) setOpacity(1);
    };

    const handleBlur = () => {
        setOpacity(0);
    };

    const handleMouseEnter = () => {
        if (!isMobile) setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <motion.div
            ref={divRef}
            onMouseMove={isMobile ? undefined : handleMouseMove}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseEnter={isMobile ? undefined : handleMouseEnter}
            onMouseLeave={isMobile ? undefined : handleMouseLeave}
            className={`relative overflow-hidden rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg-card)] ${className}`}
            whileHover={isMobile ? undefined : { y: -4, scale: 1.01 }}
            transition={{ duration: 0.3 }}
        >
            {/* Spotlight radial gradient — desktop only */}
            {!isMobile && (
                <div
                    className="pointer-events-none absolute -inset-px transition-opacity duration-300"
                    style={{
                        opacity,
                        background: `radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), var(--theme-glow), transparent 60%)`,
                    }}
                />
            )}
            <div className="relative h-full">{children}</div>
        </motion.div>
    );
};

export default SpotlightCard;

