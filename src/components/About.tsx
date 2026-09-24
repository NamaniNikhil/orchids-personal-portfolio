"use client";

import { ArrowUpRight, MapPin } from "lucide-react";
import content from "@/data/content.json";
import Image from "next/image";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative overflow-hidden border-t border-white/8 bg-[#050505] py-28 sm:py-36"
    >
      <div className="pointer-events-none absolute inset-0 opacity-60" aria-hidden="true">
        <div className="absolute right-0 top-0 h-[520px] w-[520px] rounded-full bg-cyan-500/5 blur-[160px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="grid gap-8 border-b border-white/10 pb-14 lg:grid-cols-[0.8fr_1.7fr] lg:gap-16">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-cyan-400">
                04 / About
              </p>
            </div>
            <div>
              <h2
                id="about-heading"
                className="max-w-4xl text-5xl font-semibold tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl"
              >
                I like building systems
                <span className="text-white/35"> that disappear into the experience.</span>
              </h2>
              <p className="mt-7 max-w-2xl text-base leading-7 text-white/50 sm:text-lg">
                Data engineering is the foundation. Software engineering is the
                direction. AI is becoming part of the toolkit.
              </p>
            </div>
          </div>
        </RevealOnScroll>

        <div className="mt-16 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <RevealOnScroll x={-30} y={0}>
            <div className="relative max-w-md">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#090909]">
                <Image
                  src={content.personal.avatar}
                  alt={content.personal.name}
                  width={400}
                  height={400}
                  className="aspect-square w-full object-cover grayscale transition duration-700 hover:grayscale-0"
                />
              </div>
              <div className="absolute -bottom-5 left-5 flex items-center gap-3 rounded-full border border-white/10 bg-[#090909]/95 px-4 py-2.5 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.7)]" />
                <span className="text-xs uppercase tracking-[0.16em] text-zinc-300">
                  Available for work
                </span>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll x={30} y={0} delay={0.08}>
            <div>
              <p className="max-w-2xl text-lg leading-8 text-zinc-300 sm:text-xl">
                I’m a software engineer focused on the intersection of data,
                cloud platforms, and AI-enabled products. My background is in
                building reliable pipelines and analytical systems; today I’m
                extending that foundation into application architecture,
                automation, and developer-facing experiences.
              </p>

              <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">
                <div className="bg-[#090909] p-6">
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-600">
                    Foundation
                  </p>
                  <p className="mt-3 text-sm leading-6 text-zinc-400">
                    5+ years across data engineering, analytics platforms, ETL,
                    warehousing, and cloud delivery.
                  </p>
                </div>
                <div className="bg-[#090909] p-6">
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-600">
                    Direction
                  </p>
                  <p className="mt-3 text-sm leading-6 text-zinc-400">
                    Building software and AI systems where infrastructure,
                    intelligence, and product experience meet.
                  </p>
                </div>
              </div>

              <div className="mt-10 border-t border-white/10 pt-7">
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-zinc-500">
                  <span className="inline-flex items-center gap-2">
                    <MapPin size={15} aria-hidden="true" />
                    {content.personal.location}
                  </span>
                  <span>{content.personal.highlights[3]}</span>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-5">
                <a
                  href={content.personal.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-cyan-300 focus-visible:outline-2 focus-visible:outline-cyan-300 focus-visible:outline-offset-4"
                >
                  Read resume
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-cyan-300 focus-visible:outline-offset-4"
                >
                  Explore selected work
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
