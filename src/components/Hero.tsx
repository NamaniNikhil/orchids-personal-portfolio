"use client";

import { ArrowDown, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import content from "@/data/content.json";
import { motion, useScroll, useTransform } from "framer-motion";
  import { useRef, useEffect } from "react";
  import { MagneticButton } from "@/components/animations/MagneticButton";
  
  export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const socialIcons = {
    github: Github,
    linkedin: Linkedin,
    email: Mail,
  };

    useEffect(() => {
      if (!titleRef.current) return;
  
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;
  
      // Removed GSAP entrance animation for characters to ensure immediate visibility
    }, []);
  
    return (
    <section
      ref={containerRef}
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#050505]"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-[#050505] to-[#050505]" />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-cyan-500/30 via-emerald-500/20 to-transparent rounded-full blur-[120px] animate-pulse-glow"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-sky-500/20 via-cyan-500/15 to-transparent rounded-full blur-[100px] animate-pulse-glow"
          style={{ animationDelay: "2s" }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-full blur-[80px]"
        />
        
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      </div>

      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 rounded-full border border-cyan-500/20 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
              Available for work
            </span>
          </span>
        </motion.div>

          <h1
            ref={titleRef}
            className="text-5xl sm:text-6xl md:text-8xl font-bold text-white mb-8 leading-[1.1] tracking-tight"
          >
            <span className="inline-block">
              Hi, I'm{" "}
            </span>
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                {content.personal.name.split("").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.5 + i * 0.05,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="inline-block whitespace-pre"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
              <motion.span 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full origin-left"
              />
            </span>
          </h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl sm:text-2xl md:text-3xl text-gray-300 mb-4 font-medium"
        >
          {content.personal.title}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          {content.personal.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-3 mb-12"
          role="list"
          aria-label="Social media links"
        >
          {Object.entries(content.social).map(([platform, url], index) => {
            const Icon = socialIcons[platform as keyof typeof socialIcons];
            if (!Icon) return null;
            return (
              <MagneticButton key={platform}>
                <motion.a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 text-gray-400 hover:text-white bg-white/5 rounded-2xl border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-[#050505] block"
                  aria-label={`Visit my ${platform} profile (opens in new tab)`}
                  role="listitem"
                >
                  <Icon size={22} aria-hidden="true" />
                </motion.a>
              </MagneticButton>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticButton>
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-8 py-4 text-base font-semibold text-white rounded-2xl overflow-hidden transition-all duration-300 shadow-[0_0_40px_rgba(34,211,238,0.3)] hover:shadow-[0_0_60px_rgba(34,211,238,0.4)] block"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-emerald-500 to-cyan-600 animate-gradient bg-[length:200%_auto]" />
              <span className="relative flex items-center gap-2">
                <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
                View My Work
              </span>
            </motion.a>
          </MagneticButton>
          <MagneticButton>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 text-base font-semibold text-white bg-white/5 rounded-2xl border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all duration-300 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-[#050505] block"
            >
              Get In Touch
            </motion.a>
          </MagneticButton>
        </motion.div>
      </motion.div>

      <motion.a
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-600 hover:text-cyan-400 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-[#050505] rounded-full p-2"
        aria-label="Scroll down to About section"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={24} aria-hidden="true" />
        </motion.div>
      </motion.a>
    </section>
  );
}
