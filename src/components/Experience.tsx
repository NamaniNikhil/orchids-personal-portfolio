"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import content from "@/data/content.json";

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="relative overflow-hidden bg-[var(--surface)] section-space"
    >
      <div className="page-container">
        <div className="grid gap-10 border-b border-[var(--border)] pb-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-16">
          <div>
            <p className="editorial-kicker mb-4">Experience</p>
            <h2 id="experience-heading" className="editorial-heading text-[var(--ink)]">
              An engineering
              <br />
              <span className="text-[var(--ink-muted)]">record in motion.</span>
            </h2>
          </div>
          <p className="editorial-copy max-w-2xl text-[var(--ink-soft)] lg:justify-self-end">
            A progression through data engineering, cloud analytics, platform
            delivery, and the practical systems around AI-enabled products.
          </p>
        </div>

        <div className="mt-3">
          {content.experience.map((job, index) => {
            const isCurrent = job.period.toLowerCase().includes("present");

            return (
              <motion.article
                key={job.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-72px" }}
                transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.15) }}
                className="grid gap-8 border-b border-[var(--border)] py-10 first:pt-9 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16 lg:py-12"
              >
                <div className="content-start">
                  <p className="editorial-meta text-[var(--ink-muted)]">{job.period}</p>
                  <p className="mt-2 text-sm text-[var(--ink-muted)]">{job.location}</p>
                  <p className="mt-5 text-xs text-[var(--ink-muted)]">
                    {isCurrent ? "Current role" : "Previous role"}
                  </p>
                </div>

                <div className="min-w-0">
                  <div className="border-b border-[var(--border)] pb-7">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="editorial-meta text-[var(--accent)]">{job.company}</p>
                        <h3 className="mt-2 max-w-3xl font-display text-3xl font-semibold leading-none tracking-[-0.04em] text-[var(--ink)] sm:text-4xl">
                          {job.role}
                        </h3>
                      </div>
                      {isCurrent && (
                        <span className="editorial-meta text-[var(--accent)]">Current</span>
                      )}
                    </div>
                    <p className="mt-5 max-w-3xl text-base leading-7 text-[var(--ink-soft)]">
                      {job.description}
                    </p>
                  </div>

                  <div className="grid gap-6 pt-7 sm:grid-cols-2">
                    {job.achievements.map((achievement, achievementIndex) => (
                      <div key={achievement} className="grid grid-cols-[auto_1fr] gap-3">
                        <span className="editorial-meta pt-0.5 text-[var(--ink-muted)]">
                          {String(achievementIndex + 1).padStart(2, "0")}
                        </span>
                        <p className="text-sm leading-6 text-[var(--ink-soft)]">{achievement}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t border-[var(--border)] pt-5">
                    {job.technologies.map((technology) => (
                      <span key={technology} className="text-xs text-[var(--ink-muted)]">
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-5 text-sm text-[var(--ink-muted)]">
          <p>2019 — Present · Data / software / AI engineering</p>
          <a href="#contact" className="editorial-link inline-flex items-center gap-2">
            Discuss a project
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
