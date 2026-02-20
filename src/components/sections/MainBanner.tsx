"use client";
import { motion } from "framer-motion";

export default function MainBanner() {
  return (
    <section className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden bg-[var(--color-city-bg)]">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Grid Line Pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(rgba(56, 189, 248, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56, 189, 248, 0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
          }}
        />
        
        {/* Floaters */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-[var(--color-city-accent)] rounded-full blur-3xl opacity-10"
            style={{
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, 30, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="block text-4xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-[var(--color-city-secondary)] tracking-tight mb-4">
            FULL STACK
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mix-blend-overlay">
            DEVELOPER
          </h1>
          <h1 className="absolute top-0 left-0 w-full text-5xl md:text-8xl font-black text-[var(--color-city-accent)] tracking-tighter opacity-30 blur-sm animate-pulse">
            DEVELOPER
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-8 flex flex-col items-center gap-2"
        >
          <p className="text-xl md:text-2xl text-[var(--color-city-secondary)] font-medium">
            풀스택 개발자 <strong className="text-white">최다예</strong>입니다
          </p>
          <div className="w-1 h-12 bg-gradient-to-b from-[var(--color-city-accent)] to-transparent mt-8" />
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[var(--color-city-secondary)] flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
}
