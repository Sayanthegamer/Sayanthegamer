import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  return (
    <section className="section relative overflow-hidden min-h-screen flex items-center justify-center">
      <div className="text-center z-10 px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-lg md:text-xl text-primary font-light mb-6 tracking-[0.2em] uppercase"
        >
          Hello, I'm
        </motion.h2>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-8 pb-2 text-[#f5f3ef] font-serif tracking-tighter"
        >
          Sayan
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-xl md:text-2xl text-[#8b8680] max-w-3xl mx-auto font-light leading-relaxed"
        >
          <span className="text-[#e0ddd7] font-medium">Full-stack Developer</span> <span className="opacity-50 mx-2">/</span> <span className="text-[#e0ddd7] font-medium">Musician</span> <span className="opacity-50 mx-2">/</span> <span className="text-[#e0ddd7] font-medium">AI Enthusiast</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16"
        >
          <a href="#tech-stack" className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white transition-all duration-300 bg-[#c25027] border border-[#c25027] hover:bg-transparent hover:text-[#c25027] rounded-full overflow-hidden">
            <span className="relative z-10">Explore My Journey</span>
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <div className="animate-bounce text-slate-500" aria-hidden="true">
          <ArrowDown size={24} />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
