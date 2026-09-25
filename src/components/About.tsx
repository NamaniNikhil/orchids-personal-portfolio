"use client";

import { ArrowUpRight, MapPin } from "lucide-react";
import content from "@/data/content.json";
import Image from "next/image";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";

export function About() { // Phase 7 narrative refinement
  return (
    <section id="about" aria-labelledby="about-heading" className="border-t border-white/10 bg-[#050505] py-28 sm:py-36">
      <div className="page-container">
        <RevealOnScroll>
          <div className="grid gap-8 border-b border-white/10 pb-14 lg:grid-cols-[0.8fr_1.7fr] lg:gap-16">
            <p className="editorial-kicker">About</p>
            <div>
              <h2 id="about-heading" className="editorial-heading max-w-4xl">
                I build systems that make complex products feel simple.
              </h2>
              <p className="editorial-subheading mt-7 max-w-2xl">
                Software is the product surface. Data is the foundation. AI is an
                increasingly useful layer between the two.
              </p>
            </div>
          </div>
        </RevealOnScroll>

        <div className="mt-16 grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <RevealOnScroll x={-20} y={0}>
            <div className="max-w-sm">
              <div className="overflow-hidden border border-white/10 bg-[#090909]">
                <Image
                  src={content.personal.avatar}
                  alt={content.personal.name}
                  width={400}
                  height={400}
                  className="aspect-square w-full object-cover grayscale"
                />
              </div>
              <p className="mt-4 text-xs text-zinc-500">Nikhil Namani · Software Engineer</p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll x={20} y={0} delay={0.06}>
            <div>
              <p className="editorial-lede max-w-3xl">
                I work across data, cloud platforms, and AI-enabled applications,
                with a background in building reliable pipelines and analytical
                systems. I&apos;m now extending that foundation into application
                architecture, automation, and developer-facing experiences.
              </p>

              <div className="mt-12 grid gap-8 border-y border-white/10 py-8 sm:grid-cols-2">
                <div>
                  <p className="editorial-meta">Foundation</p>
                  <p className="editorial-copy mt-3">
                    Data engineering, analytics platforms, ETL/ELT, warehousing,
                    and cloud delivery.
                  </p>
                </div>
                <div>
                  <p className="editorial-meta">Direction</p>
                  <p className="editorial-copy mt-3">
                    Product-minded software and AI systems where infrastructure,
                    intelligence, and experience meet.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-zinc-500">
                <span className="inline-flex items-center gap-2">
                  <MapPin size={15} aria-hidden="true" />
                  {content.personal.location}
                </span>
                <span>{content.personal.highlights[3]}</span>
              </div>

              <div className="mt-8 flex flex-wrap gap-6">
                <a href={content.personal.resume} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-cyan-300 focus-visible:outline-2 focus-visible:outline-cyan-300 focus-visible:outline-offset-4">
                  Read resume <ArrowUpRight size={16} aria-hidden="true" />
                </a>
                <a href="#projects" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white focus-visible:outline-2 focus-visible:outline-cyan-300 focus-visible:outline-offset-4">
                  Explore selected work <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}