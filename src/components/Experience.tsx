"use client";

import { Calendar, MapPin, ArrowUpRight } from "lucide-react";
import content from "@/data/content.json";
import { motion } from "framer-motion";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="relative overflow-hidden border-t border-white/8 bg-[#030303] py-28 sm:py-36"
    >
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute left-1/2 top-1/3 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-cyan-500/5 blur-[160px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="grid gap-8 border-b border-white/10 pb-14 lg:grid-cols-[0.8fr_1.7fr] lg:gap-16">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-cyan-400">
                02 / Experience
              </p>
            </div>
            <div>
              <h2
                id="experience-heading"
                className="max-w-4xl text-5xl font-semibold tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl"
              >
                An engineering record,{" "}
                <span className="text-white/35">built over time.</span>
              </h2>
              <p className="mt-7 max-w-2xl text-base leading-7 text-white/50 sm:text-lg">
                A progression from hands-on data engineering to cloud analytics,
                platform delivery, and AI-enabled software systems.
              </p>
            </div>
          </div>
        </RevealOnScroll>

        <div className="mt-16">
          {content.experience.map((job, index) => {
            const isCurrent = job.period.toLowerCase().includes("present");

            return (
              <motion.article
                key={job.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.55,
                  delay: Math.min(index * 0.06, 0.18),
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group grid gap-8 border-b border-white/10 py-10 first:pt-0 lg:grid-cols-[0.8fr_1.7fr] lg:gap-16 lg:py-14"
              >
                <div className="lg:pr-8">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs uppercase tracking-[0.16em] text-white/40">
                    <span className="inline-flex items-center gap-2">
                      <Calendar size={13} aria-hidden="true" />
                      {job.period}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <MapPin size={13} aria-hidden="true" />
                      {job.location}
                    </span>
                  </div>

                  <div className="mt-6 flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className={`h-2 w-2 rounded-full ${
                        isCurrent
                          ? "bg-cyan-400 shadow-[0_0_14px_rgba(34,211,238,0.65)]"
                          : "bg-white/20"
                      }`}
                    />
                    <span className="text-sm text-white/35">
                      {isCurrent
                        ? "Current role"
                        : `Chapter 0${content.experience.length - index}`}
                    </span>
                  </div>
                </div>

                <div className="min-w-0">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.2em] text-cyan-400/80">
                        {job.company}
                      </p>
                      <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">
                        {job.role}
                      </h3>
                    </div>
                    {isCurrent && (
                      <span className="inline-flex w-fit items-center rounded-full border border-cyan-400/20 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-cyan-300">
                        Now
                      </span>
                    )}
                  </div>

                  <p className="mt-6 max-w-3xl text-base leading-7 text-white/55">
                    {job.description}
                  </p>

                  <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                    {job.achievements.map((achievement) => (
                      <li
                        key={achievement}
                        className="border-l border-white/10 pl-4 text-sm leading-6 text-white/65 transition-colors duration-300 group-hover:border-cyan-400/30"
                      >
                        {achievement}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-wrap gap-x-4 gap-y-2 border-t border-white/8 pt-5">
                    {job.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="text-xs font-medium uppercase tracking-[0.12em] text-white/35"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-10 flex items-center justify-between gap-6 text-xs uppercase tracking-[0.18em] text-white/25">
          <span>Experience / 2019 — Present</span>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 transition-colors hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-4 focus-visible:ring-offset-[#030303]"
          >
            Discuss a project
            <ArrowUpRight
              size={14}
              aria-hidden="true"
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
