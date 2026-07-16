import { motion } from 'framer-motion';

const capabilities = [
  {
    title: 'Frontend Engineering',
    description: 'Building performant, accessible, and responsive user interfaces using React, Next.js, and strict TypeScript patterns.'
  },
  {
    title: 'Backend Architecture',
    description: 'Designing scalable APIs, robust relational databases, and serverless architectures using Node.js and PostgreSQL.'
  },
  {
    title: 'Interactive Motion',
    description: 'Crafting fluid, tactile, physics-based micro-interactions using Framer Motion and WebGL shaders for premium user experiences.'
  }
];

const Capabilities = () => {
  return (
    <section className="py-20 relative flex flex-col justify-center items-center w-full">
        <div className="w-full max-w-5xl px-6 md:px-12 relative">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="border-t border-[var(--theme-border)] pt-12 mb-16"
            >
                <h2 className="text-xs font-mono text-[var(--theme-text)]/40 tracking-[0.2em] uppercase">
                    Core Capabilities
                </h2>
            </motion.div>

            <div className="flex flex-col gap-12 md:gap-16">
                {capabilities.map((cap, i) => (
                    <motion.div
                        key={cap.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: i * 0.1, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                        className="group flex flex-col md:flex-row md:items-start gap-4 md:gap-12"
                    >
                        <h3 className="text-3xl md:text-5xl font-bold text-[var(--theme-text-header)] md:w-1/2 tracking-tight transition-colors duration-500">
                            {cap.title}
                        </h3>
                        <p className="text-base md:text-lg text-[var(--theme-text)]/70 md:w-1/2 font-light leading-relaxed pt-2">
                            {cap.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
  );
};

export default Capabilities;
