import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon } from 'lucide-react';
import { useAchievementStore, type ActiveTheme } from '../store/useAchievementStore';
import BorderGlow from './BorderGlow';

interface HistoryEntry {
    type: 'input' | 'output' | 'raw';
    content: string;
}

const ContactTerminal = () => {
    const [input, setInput] = useState('');
    const { 
        unlockAchievement, 
        resetAchievements, 
        activeTheme, 
        setTheme, 
        unlockedAchievements,
        isMuted,
        setGlassOpen,
        setBeamsOpen
    } = useAchievementStore();

    const [history, setHistory] = useState<HistoryEntry[]>([
        { type: 'output', content: 'Sayan Command Shell [v2.4.0]' },
        { type: 'output', content: 'Type "help" to list available modules.' },
    ]);

    // Matrix Rain Effect Mode
    const [isMatrixMode, setIsMatrixMode] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Trivia Game Mode State
    const [gameStage, setGameStage] = useState<'idle' | 'q1' | 'q2' | 'q3' | 'completed'>('idle');
    const [correctAnswers, setCorrectAnswers] = useState(0);

    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (history.length > 2) {
            bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [history, gameStage]);

    // Matrix Rain Loop
    useEffect(() => {
        if (!isMatrixMode) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        canvas.width = canvas.parentElement?.clientWidth || 700;
        canvas.height = canvas.parentElement?.clientHeight || 400;

        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*';
        const fontSize = 14;
        const columns = Math.floor(canvas.width / fontSize);
        const rainDrops = Array(columns).fill(1);

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = activeTheme === 'retro' ? '#39ff14' : activeTheme === 'cyberpunk' ? '#ff007f' : '#00b4d8';
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < rainDrops.length; i++) {
                const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
                ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

                if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    rainDrops[i] = 0;
                }
                rainDrops[i]++;
            }
            animationFrameId = requestAnimationFrame(draw);
        };

        const handleResize = () => {
            canvas.width = canvas.parentElement?.clientWidth || 700;
            canvas.height = canvas.parentElement?.clientHeight || 400;
        };
        window.addEventListener('resize', handleResize);

        draw();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isMatrixMode, activeTheme]);

    const playSound = (type: 'type' | 'enter' | 'game_success') => {
        if (isMuted) return;
        try {
            let audioPath = '/click.wav';
            if (type === 'enter') audioPath = '/achievement.wav';
            const audio = new Audio(audioPath);
            audio.volume = type === 'enter' ? 0.3 : 0.1;
            audio.play().catch(() => {});
        } catch (e) {}
    };

    const runNeofetch = (): string => {
        const logo = 
`  ██████╗  █████╗ ██╗   ██╗ █████╗ ███╗   ██╗
  ██╔════╝ ██╔══██╗╚██╗ ██╔╝██╔══██╗████╗  ██║
  ███████╗ ███████║ ╚████╔╝ ███████║██╔██╗ ██║
  ╚════██║ ██╔══██║  ╚██╔╝  ██╔══██║██║╚██╗██║
  ███████║ ██║  ██║   ██║   ██║  ██║██║ ╚████║
  ╚══════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝`;

        const specs = [
            `OS: Sayan OS v2.4.0 (x86_64)`,
            `Kernel: React 19 / TypeScript compiler`,
            `Shell: browser-synthesizer-sh`,
            `Active Theme: ${activeTheme.toUpperCase()}`,
            `Unlocked Achievements: ${unlockedAchievements.length} / 7`,
            `Core Techs: Node.js, Next.js, Firebase, Supabase, Tailwind, Gemini`,
            `Contact: sayanbnk2008@gmail.com`
        ];

        let out = logo + '\n-----------------------------------------------\n';
        specs.forEach(s => { out += s + '\n'; });
        return out;
    };

    const handleTriviaInput = (val: string) => {
        const choice = val.trim();
        let newHistory = [...history, { type: 'input' as const, content: val }];

        if (gameStage === 'q1') {
            if (choice === '1') {
                setCorrectAnswers(prev => prev + 1);
                newHistory.push({ type: 'output', content: '✓ Correct answer. Loading question 2...' });
            } else {
                newHistory.push({ type: 'output', content: '✗ Incorrect. Answer was: 1) Representational State Transfer.' });
            }
            newHistory.push({ type: 'raw', content: 'Q2: Which sorting algorithm has an average time complexity of O(n log n)?\n  1) Bubble Sort\n  2) Quick Sort\n  3) Insertion Sort\nType [1, 2, or 3]:' });
            setGameStage('q2');
        } else if (gameStage === 'q2') {
            if (choice === '2') {
                setCorrectAnswers(prev => prev + 1);
                newHistory.push({ type: 'output', content: '✓ Correct answer. Loading question 3...' });
            } else {
                newHistory.push({ type: 'output', content: '✗ Incorrect. Answer was: 2) Quick Sort.' });
            }
            newHistory.push({ type: 'raw', content: 'Q3: In asymmetric cryptography, what type of key is used to decrypt data encrypted with the public key?\n  1) Shared Key\n  2) Private Key\n  3) Symmetric Key\nType [1, 2, or 3]:' });
            setGameStage('q3');
        } else if (gameStage === 'q3') {
            let total = correctAnswers;
            if (choice === '2') {
                total += 1;
                setCorrectAnswers(total);
                newHistory.push({ type: 'output', content: '✓ Correct answer.' });
            } else {
                newHistory.push({ type: 'output', content: '✗ Incorrect. Answer was: 2) Private Key.' });
            }

            newHistory.push({ type: 'output', content: '*** TRIVIA GAME COMPLETED ***' });
            newHistory.push({ type: 'output', content: `Your score: ${total}/3 correct answers.` });

            if (total === 3) {
                newHistory.push({ type: 'output', content: '🏆 PERFECT SCORE! Achievement Unlocked: Cyber Champion!' });
                unlockAchievement('cyber_champ');
                playSound('game_success');
            } else {
                newHistory.push({ type: 'output', content: 'Try again with perfect answers to unlock the secret badge.' });
            }

            setGameStage('idle');
            setCorrectAnswers(0);
        }

        setHistory(newHistory);
    };

    const handleCommand = (cmd: string) => {
        if (gameStage !== 'idle') {
            handleTriviaInput(cmd);
            return;
        }

        const trimmedCmd = cmd.trim();
        const parts = trimmedCmd.toLowerCase().split(' ');
        const mainCmd = parts[0];
        const newHistory = [...history, { type: 'input' as const, content: cmd }];

        if (mainCmd === 'clear') {
            setHistory([]);
            return;
        }

        if (mainCmd === 'reset') {
            resetAchievements();
            setHistory([...history, { type: 'input', content: cmd }, { type: 'output', content: 'System credentials reset. All badges locked.' }]);
            return;
        }

        if (mainCmd === 'help') {
            newHistory.push({ 
                type: 'raw', 
                content: 
`Standard modules:
  whoami       About Sayan
  neofetch     Print hardware profile card
  email        Reach out via standard mail
  github       Open GitHub source profile
  instagram    Social channel link
  
System customizers:
  theme [name] Swap layout theme (aero, cyberpunk, retro, ocean)
  matrix       Open matrix digital rain screensaver
  glass [mode] Open 3D Fluid Glass lab (lens, cube, bar)
  beams        Toggle interactive 3D light beams playground
  play         Boot retro security & coding quiz
  reset        Wipe achievements cache
  clear        Flush terminal logs`
            });
            unlockAchievement('hacker');
        } else if (mainCmd === 'whoami') {
            newHistory.push({ type: 'output', content: 'Sayan - Full-stack Developer, AI enthusiast, and acoustic guitar cover hobbyist.' });
            unlockAchievement('hacker');
        } else if (mainCmd === 'neofetch') {
            newHistory.push({ type: 'raw', content: runNeofetch() });
            unlockAchievement('hacker');
        } else if (mainCmd === 'email') {
            newHistory.push({ type: 'output', content: 'Opening email protocol sayanbnk2008@gmail.com...' });
            window.open('mailto:sayanbnk2008@gmail.com', '_blank');
            unlockAchievement('hacker');
        } else if (mainCmd === 'github') {
            newHistory.push({ type: 'output', content: 'Redirecting to github.com/Sayanthegamer...' });
            window.open('https://github.com/Sayanthegamer', '_blank');
            unlockAchievement('hacker');
        } else if (mainCmd === 'instagram') {
            newHistory.push({ type: 'output', content: 'Redirecting to instagram...' });
            window.open('https://www.instagram.com/nxt_sayan0/', '_blank');
            unlockAchievement('hacker');
        } else if (mainCmd === 'sudo') {
            newHistory.push({ type: 'output', content: 'Sayan is the superuser here. Access denied. (Just kidding, try another command!)' });
        } else if (mainCmd === 'matrix') {
            newHistory.push({ type: 'output', content: 'Loading digital code rain... Press Escape or type "exit" inside console to abort.' });
            setIsMatrixMode(true);
            unlockAchievement('hacker');
        } else if (mainCmd === 'play') {
            newHistory.push({ type: 'output', content: 'Initializing cyber quiz module...' });
            newHistory.push({ type: 'raw', content: 'Q1: What does REST stand for in API designs?\n  1) Representational State Transfer\n  2) Reactive Engine State Trigger\n  3) Relational State Terminal\nType [1, 2, or 3]:' });
            setGameStage('q1');
            setCorrectAnswers(0);
            unlockAchievement('hacker');
        } else if (mainCmd === 'glass') {
            const mode = (parts[1] || 'lens') as any;
            const validMode = ['lens', 'cube', 'bar'].includes(mode) ? mode : 'lens';
            newHistory.push({ type: 'output', content: `Opening 3D Fluid Glass Refraction Lab [Mode: ${validMode.toUpperCase()}]...` });
            setGlassOpen(true, validMode);
            unlockAchievement('hacker');
        } else if (mainCmd === 'beams') {
            newHistory.push({ type: 'output', content: 'Opening interactive 3D light beams playground...' });
            setBeamsOpen(true);
            unlockAchievement('hacker');
        } else if (mainCmd === 'theme') {
            const targetTheme = parts[1] as ActiveTheme;
            if (['aero', 'cyberpunk', 'retro', 'ocean'].includes(targetTheme)) {
                setTheme(targetTheme);
                newHistory.push({ type: 'output', content: `Theme changed successfully to ${targetTheme.toUpperCase()}.` });
            } else {
                newHistory.push({ type: 'output', content: 'Invalid theme slug. Choose: aero, cyberpunk, retro, ocean.' });
            }
        } else if (trimmedCmd !== '') {
            newHistory.push({ type: 'output', content: `bash: command not found: ${trimmedCmd}. Type "help" for a list of modules.` });
        }

        setHistory(newHistory);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        playSound('enter');
        handleCommand(input);
        setInput('');
    };

    // Quit Matrix mode with Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isMatrixMode) {
                setIsMatrixMode(false);
                setHistory(prev => [...prev, { type: 'output', content: 'Matrix rain terminated.' }]);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isMatrixMode]);

    // Handle typing sounds
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
        playSound('type');
    };

    return (
        <section id="contact-terminal" className="py-20 px-4 flex flex-col justify-center items-center w-full">
            <div className="w-full max-w-3xl relative">
                
                {/* Title */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold text-[var(--theme-text-header)] font-serif mb-3">
                        Hacker Console
                    </h2>
                    <p className="text-xs md:text-sm text-[var(--theme-text)]/70 max-w-md mx-auto font-light leading-relaxed">
                        An interactive command line terminal interface. Run utilities like <code className="text-[var(--theme-accent)]">neofetch</code> or start a <code className="text-[var(--theme-accent)]">play</code> quiz.
                    </p>
                </div>

                {/* Main terminal frame */}
                <BorderGlow
                    edgeSensitivity={30}
                    glowColor={
                        activeTheme === 'cyberpunk' ? "330 100 50" :
                        activeTheme === 'retro' ? "120 100 50" :
                        activeTheme === 'ocean' ? "190 100 42" : "15 66 45"
                    }
                    backgroundColor="var(--theme-bg-card)"
                    borderRadius={16}
                    glowRadius={40}
                    glowIntensity={1.2}
                    coneSpread={25}
                    animated
                    colors={
                        activeTheme === 'cyberpunk' ? ['#ff007f', '#00f0ff', '#050505'] :
                        activeTheme === 'retro' ? ['#39ff14', '#ffb000', '#050805'] :
                        activeTheme === 'ocean' ? ['#00b4d8', '#0077b6', '#030306'] :
                        ['#c25027', '#8b8680', '#1e1d1b']
                    }
                    className="w-full"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative rounded-2xl overflow-hidden font-mono text-xs md:text-sm h-[320px] md:h-[450px] w-full"
                    >
                    {/* Matrix screensaver canvas */}
                    {isMatrixMode && (
                        <div className="absolute inset-0 z-30 bg-black cursor-pointer" onClick={() => setIsMatrixMode(false)}>
                            <canvas ref={canvasRef} className="block w-full h-full" />
                            <div className="absolute bottom-4 right-4 text-[10px] text-white/50 bg-black/60 px-3 py-1.5 rounded-full pointer-events-none">
                                Press ESC or Click to Return
                            </div>
                        </div>
                    )}

                    {/* Scanline CRT overlay */}
                    <div className="pointer-events-none absolute inset-0 z-10 scanlines opacity-[0.12]" />
                    
                    {/* Header */}
                    <div className="bg-[var(--theme-bg)]/80 px-4 py-3 flex items-center justify-between border-b border-[var(--theme-border)] relative z-20">
                        <div className="flex gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                        </div>
                        <div className="flex items-center gap-1.5 text-[var(--theme-text)]/50 text-[10px] font-mono tracking-wider">
                            <TerminalIcon size={12} className="text-[var(--theme-accent)]" />
                            <span>visitor@sayan-console:~</span>
                        </div>
                        <div className="w-8" />
                    </div>

                    {/* Terminal body */}
                    <div
                        className="p-4 md:p-6 h-[calc(100%-42px)] overflow-y-auto cursor-text relative z-20 scrollbar-hide bg-black/10"
                        onClick={() => inputRef.current?.focus()}
                    >
                        <div className="space-y-2 whitespace-pre-wrap">
                            {history.map((entry, i) => (
                                <div key={i} className={`${entry.type === 'input' ? 'text-[var(--theme-text-header)]' : 'text-[var(--theme-text)]/80'}`}>
                                    {entry.type === 'input' ? (
                                        <span className="flex gap-2 items-center">
                                            <span className="text-[var(--theme-accent)]">&gt;</span>
                                            <span>{entry.content}</span>
                                        </span>
                                    ) : (
                                        <span className="block">{entry.content}</span>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Input form */}
                        <form onSubmit={handleSubmit} className="mt-3 flex gap-2 items-center">
                            <span className="text-[var(--theme-accent)] animate-pulse">&gt;</span>
                            <input
                                ref={inputRef}
                                type="text"
                                aria-label="Terminal CLI input"
                                value={input}
                                onChange={handleInputChange}
                                className="flex-1 bg-transparent border-none outline-none text-xs md:text-sm text-[var(--theme-text-header)] placeholder-[var(--theme-text)]/20 font-mono"
                            />
                        </form>
                        <div ref={bottomRef} />
                    </div>
                    </motion.div>
                </BorderGlow>

                {/* Direct Mail footer */}
                <p className="text-center text-[var(--theme-text)]/40 text-[10px] tracking-wider mt-8 font-mono">
                    Direct channel: <a href="mailto:sayanbnk2008@gmail.com" className="text-[var(--theme-accent)] hover:underline">SAYANBNK2008@GMAIL.COM</a>
                </p>
            </div>
        </section>
    );
};

export default ContactTerminal;
