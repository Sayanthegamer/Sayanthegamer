import { motion } from 'framer-motion';
import { Code, Terminal, Cpu, Music, Headphones, Activity, Gamepad2 } from 'lucide-react';
import FlipCard from './FlipCard';
import SpotlightCard from './SpotlightCard';

const hobbies = [
    {
        name: 'Full-stack Developer',
        icon: Code,
        color: 'text-[#c25027]',
        description: 'Building end-to-end web solutions using modern stacks like MERN, Next.js, and more.'
    },
    {
        name: 'Programming',
        icon: Terminal,
        color: 'text-[#c25027]',
        description: 'Passionate about writing clean, efficient, and scalable code in various languages.'
    },
    {
        name: 'AI Experimentation',
        icon: Cpu,
        color: 'text-[#c25027]',
        description: 'Exploring the frontiers of Artificial Intelligence, LLMs, and generative models.'
    },
    {
        name: 'Guitar',
        icon: Music,
        color: 'text-[#8b8680]',
        description: 'Strumming melodies and creating acoustic covers in my free time.'
    },
    {
        name: 'Modern Music',
        icon: Headphones,
        color: 'text-[#8b8680]',
        description: 'Analyzing and appreciating contemporary music production and sound design.'
    },
    {
        name: 'Badminton',
        icon: Activity,
        color: 'text-[#8b8680]',
        description: 'Staying active and competitive on the court with fast-paced rallies.'
    },
    {
        name: 'Video Games',
        icon: Gamepad2,
        color: 'text-[#8b8680]',
        description: 'Immersing in interactive storytelling and strategic gameplay.'
    },
];

const Hobbies = () => {
    return (
        <section id="hobbies" className="min-h-screen py-20 flex flex-col justify-center items-center w-full overflow-hidden">
            <div className="w-full max-w-6xl px-2 md:px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-bold mb-16 text-center font-serif text-[#f5f3ef]"
                >
                    My Interests
                </motion.h2>

                <div className="grid grid-cols-2 gap-2 md:flex md:flex-wrap md:justify-center md:gap-6">
                    {hobbies.map((hobby, index) => (
                        <motion.div
                            key={hobby.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="w-full md:w-[280px] h-[200px] md:h-[320px]"
                        >
                            <FlipCard
                                frontContent={
                                    <SpotlightCard className="h-full flex flex-col items-center justify-center p-2 md:p-6 bg-[#141312] border-[rgba(255,255,255,0.06)] group hover:border-[#c25027]/50 transition-colors">
                                        <div className="flex flex-col items-center justify-center h-full p-1 md:p-8">
                                            <div className="relative mb-2 md:mb-6">
                                                <div className={`absolute inset-0 blur-xl opacity-10 bg-[#c25027]`}></div>
                                                <div className="relative w-8 h-8 md:w-20 md:h-20 flex items-center justify-center rounded-xl md:rounded-2xl bg-[#1e1d1b] border border-[rgba(255,255,255,0.06)] group-hover:scale-110 transition-transform duration-300 shadow-md">
                                                    <hobby.icon className={`w-4 h-4 md:w-10 md:h-10 ${hobby.color}`} strokeWidth={1.5} />
                                                </div>
                                            </div>
                                            <h3 className="text-[10px] md:text-xl font-medium text-[#e0ddd7] tracking-wide text-center leading-tight break-words w-full px-1">{hobby.name}</h3>
                                            <p className="text-[9px] md:text-xs text-[#8b8680] mt-1 md:mt-4 font-medium uppercase tracking-wider opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">Tap</p>
                                        </div>
                                    </SpotlightCard>
                                }
                                backContent={
                                    <SpotlightCard isInverted className="h-full bg-[#1e1d1b] border-[#c25027]/30">
                                        <div className="flex flex-col items-center justify-center h-full p-2 md:p-8">
                                            <hobby.icon className={`w-4 h-4 md:w-8 md:h-8 ${hobby.color} mb-1 md:mb-4 opacity-70`} strokeWidth={1.5} />
                                            <h3 className="text-[10px] md:text-lg font-bold text-[#f5f3ef] mb-1 md:mb-3 text-center leading-tight">{hobby.name}</h3>
                                            <p className="text-[#e0ddd7] text-[9px] md:text-sm leading-tight md:leading-relaxed text-center font-light line-clamp-4 md:line-clamp-none">
                                                {hobby.description}
                                            </p>
                                        </div>
                                    </SpotlightCard>
                                }
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hobbies;
