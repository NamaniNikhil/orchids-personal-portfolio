"use client";

import { ArrowUpRight, MapPin } from "lucide-react";
import Image from "next/image";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import content from "@/data/content.json";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative overflow-hidden bg-[var(--surface-elevated)] section-space"
    >
      <div className="page-container">
        <RevealOnScroll>
          <div className="grid gap-10 border-b border-[var(--border)] pb-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-16">
            <div><p className="editorial-kicker">About</p></div>
            <div>
              <h2 id="about-heading" className="editorial-heading text-[var(--ink)]">
                I build systems that make
                <br />
                <span className="text-[var(--ink-muted)]">complex products feel simple.</span>
              </h2>
              <p className="editorial-subheading mt-7 max-w-3xl text-[var(--ink-soft)]">
                Software is the product surface. Data is the foundation. AI is an increasingly useful layer between the two.
              </p>
            </div>
          </div>
        </RevealOnScroll>

        <div className="mt-14 grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <RevealOnScroll x={-18} y={0}>
            <figure className="max-w-sm">
              <div className="overflow-hidden border border-[var(--border)] bg-[var(--surface)]">
                <Image
                  src={content.personal.avatar}
                  alt={content.personal.name}
                  width={520}
                  height={520}
                  className="aspect-square w-full object-cover grayscale transition-transform duration-700 hover:scale-[1.01]"
                />
              </div>
              <figcaption className="mt-4 text-sm text-[var(--ink-muted)]">
                Nikhil Namani · Software Engineer
              </figcaption>
            </figure>
          </RevealOnScroll>

          <RevealOnScroll x={18} y={0} delay={0.06}>
            <div>
              <p className="editorial-lede max-w-3xl text-[var(--ink)]">
                I work across data, cloud platforms, and AI-enabled applications, with a background in building reliable pipelines and analytical systems. I&apos;m extending that foundation into application architecture, automation, and developer-facing experiences.
              </p>

              <div className="mt-12 grid gap-8 border-y border-[var(--border)] py-8 sm:grid-cols-2">
                <div>
                  <p className="editorial-meta">Foundation</p>
                  <p className="editorial-copy mt-3 text-[var(--ink-soft)]">
                    Data engineering, analytics platforms, ETL/ELT, warehousing, and cloud delivery.
                  </p>
                </div>
                <div>
                  <p className="editorial-meta">Direction</p>
                  <p className="editorial-copy mt-3 text-[var(--ink-soft)]">
                    Product-minded software and AI systems where infrastructure, intelligence, and experience meet.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-[var(--ink-muted)]">
                <span className="inline-flex items-center gap-2">
                  <MapPin size={15} aria-hidden="true" />
                  {content.personal.location}
                </span>
                <span>{content.personal.highlights[3]}</span>
              </div>

              <div className="mt-8 flex flex-wrap gap-6">
                <a
                  href={content.personal.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="editorial-button-secondary"
                >
                  Read resume
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
                <a href="#projects" className="editorial-button-secondary">
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
