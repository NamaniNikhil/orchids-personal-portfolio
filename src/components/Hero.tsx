"use client";

import { ArrowDown, ArrowUpRight, Github } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import content from "@/data/content.json";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 48]);
  const opacity = useTransform(scrollYProgress, [0, 0.82], [1, 0.94]);

  return (
    <section
      ref={containerRef}
      id="home"
      aria-labelledby="hero-heading"
      className="relative min-h-[100svh] overflow-hidden bg-[#050505]"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px)] bg-[size:88px_88px] [mask-image:linear-gradient(to_bottom,black,transparent_72%)]" />
        <div className="absolute inset-x-0 top-[28%] h-px bg-white/[0.05]" />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="page-container relative z-10 flex min-h-[100svh] flex-col justify-center pb-16 pt-24 sm:pb-20 sm:pt-28"
      >
        <div className="max-w-[1200px]">
          <p className="editorial-meta mb-5 text-zinc-500">
            {content.personal.name}
          </p>

          <h1
            id="hero-heading"
            className="editorial-hero max-w-[12ch] text-white"
          >
            SOFTWARE
            <br />
            ENGINEER.
          </h1>

          <div className="mt-10 grid max-w-6xl gap-8 lg:grid-cols-[1.4fr_0.6fr] lg:items-end">
            <p className="editorial-lede max-w-4xl text-zinc-100">
              I build data systems, AI-enabled products, and digital experiences
              that make complex problems feel obvious.
            </p>

            <p className="editorial-copy max-w-sm text-zinc-400 lg:justify-self-end">
              Software engineering grounded in data systems, cloud platforms,
              and practical AI.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition-transform duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#050505]"
            >
              View selected work
              <ArrowUpRight
                size={17}
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>

            <a
              href={content.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/15 px-5 py-3.5 text-sm font-medium text-zinc-200 transition-colors hover:border-white/30 hover:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#050505]"
              aria-label="Visit GitHub profile (opens in a new tab)"
            >
              <Github size={17} aria-hidden="true" />
              GitHub
            </a>
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-6 border-t border-white/[0.08] pt-6 sm:flex-row sm:items-end sm:justify-between">
          <p className="editorial-meta text-zinc-500">
            Available for software, data + AI engineering
          </p>

          <a
            href="#projects"
            className="group inline-flex items-center gap-3 self-start text-sm text-zinc-500 transition-colors hover:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-4 focus:ring-offset-[#050505] sm:self-auto"
          >
            Scroll to explore
            <ArrowDown
              size={15}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-y-1"
            />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
