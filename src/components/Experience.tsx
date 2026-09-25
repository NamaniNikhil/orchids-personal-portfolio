"use client";

import { ArrowUpRight, Calendar, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import content from "@/data/content.json";

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="relative overflow-hidden bg-[#030303] section-space"
    >
      <div className="page-container">
        <div className="grid gap-10 border-b border-white/[0.08] pb-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-16">
          <div>
            <p className="editorial-kicker mb-4">Experience</p>
            <h2 id="experience-heading" className="editorial-heading text-white">
              An engineering
              <br />
              <span className="text-zinc-600">record in motion.</span>
            </h2>
          </div>

          <p className="editorial-copy max-w-2xl text-zinc-400 lg:justify-self-end">
            From hands-on data engineering to cloud analytics, platform delivery,
            and AI-enabled systems, the work has stayed grounded in useful software.
          </p>
        </div>

        <div className="mt-4">
          {content.experience.map((job, index) => {
            const isCurrent = job.period.toLowerCase().includes("present");

            return (
              <motion.article
                key={job.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-72px" }}
                transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.15) }}
                className="grid gap-8 border-b border-white/[0.08] py-10 first:pt-9 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16 lg:py-12"
              >
                <div className="grid gap-3 content-start">
                  <div className="flex items-center gap-2 text-sm text-zinc-500">
                    <Calendar size={14} aria-hidden="true" />
                    <span>{job.period}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-zinc-600">
                    <MapPin size={14} aria-hidden="true" />
                    <span>{job.location}</span>
                  </div>

                  <p className="mt-4 editorial-meta text-zinc-700">
                    {isCurrent ? "Current role" : "Previous role"}
                  </p>
                </div>

                <div className="min-w-0">
                  <div className="border-b border-white/[0.08] pb-7">
                    <p className="editorial-meta text-cyan-300/90">{job.company}</p>
                    <h3 className="mt-2 max-w-3xl font-display text-3xl font-semibold leading-[1] tracking-[-0.04em] text-white sm:text-4xl">
                      {job.role}
                    </h3>
                    <p className="mt-5 max-w-3xl text-base leading-7 text-zinc-400">
                      {job.description}
                    </p>
                  </div>

                  <div className="grid gap-x-8 gap-y-5 pt-7 sm:grid-cols-2">
                    {job.achievements.map((achievement, achievementIndex) => (
                      <div key={achievement} className="flex gap-3">
                        <span className="pt-1 font-mono text-[10px] text-zinc-700">
                          {String(achievementIndex + 1).padStart(2, "0")}
                        </span>
                        <p className="text-sm leading-6 text-zinc-300">{achievement}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/[0.08] pt-5">
                    {job.technologies.map((technology) => (
                      <span key={technology} className="text-xs text-zinc-600">
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-5 text-sm text-zinc-600">
          <p>2019 — Present · Data / software / AI engineering</p>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 text-zinc-500 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-4 focus-visible:ring-offset-[#030303]"
          >
            Discuss a project
            <ArrowUpRight
              size={15}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
