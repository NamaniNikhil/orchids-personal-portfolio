"use client";

import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import content from "@/data/content.json";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-[100svh] overflow-hidden bg-[#050505]"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(34,211,238,0.10),transparent_32%),radial-gradient(circle_at_20%_80%,rgba(16,185,129,0.06),transparent_28%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1400px] flex-col justify-center px-5 pb-20 pt-28 sm:px-8 lg:px-12"
      >
        <div className="mb-8 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.24em] text-zinc-500">
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.65)]" />
          Data / software / AI engineering
        </div>

        <div className="max-w-6xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
            {content.personal.name}
          </p>

          <h1 className="font-display text-[clamp(4rem,11vw,10.5rem)] font-semibold leading-[0.82] tracking-[-0.075em] text-white">
            SOFTWARE
            <br />
            <span className="text-zinc-500">ENGINEER</span>
          </h1>

          <div className="mt-10 grid max-w-5xl gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div>
              <p className="max-w-3xl text-[clamp(1.7rem,3.2vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.04em] text-zinc-100">
                I build data systems, AI-enabled products, and digital experiences
                that make complex problems feel obvious.
              </p>
            </div>

            <div className="lg:pb-1">
              <p className="max-w-md text-base leading-7 text-zinc-400">
                Data / software engineer focused on scalable cloud platforms,
                AI-enabled products, and thoughtful user experiences.
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition-transform duration-300 hover:-translate-y-0.5"
            >
              View selected work
              <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href={content.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-5 py-3.5 text-sm font-medium text-zinc-200 transition-colors hover:border-white/25 hover:bg-white/[0.07]"
            >
              <Github size={17} />
              GitHub
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full px-4 py-3.5 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
            >
              <Mail size={17} />
              Contact
            </a>
          </div>
        </div>

        <div className="mt-auto flex items-end justify-between pt-20">
          <div className="hidden gap-3 sm:flex">
            <a aria-label="LinkedIn" href={content.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-zinc-600 transition-colors hover:text-white">
              <Linkedin size={18} />
            </a>
            <a aria-label="GitHub" href={content.social.github} target="_blank" rel="noopener noreferrer" className="text-zinc-600 transition-colors hover:text-white">
              <Github size={18} />
            </a>
          </div>
          <a
            href="#projects"
            className="ml-auto flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-600 transition-colors hover:text-zinc-300"
          >
            Scroll to explore
            <ArrowDown size={15} className="animate-bounce" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
