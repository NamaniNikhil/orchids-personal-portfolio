"use client";

import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { motion } from "framer-motion";
import content from "@/data/content.json";

type Certification = { name: string; issuer: string; year: string };

export function Education() {
  const certifications = content.certifications as Certification[];

  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="relative overflow-hidden bg-[var(--background)] section-space"
    >
      <div className="page-container">
        <RevealOnScroll>
          <div className="grid gap-10 border-b border-[var(--border)] pb-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-16">
            <p className="editorial-kicker">Education</p>
            <div>
              <h2 id="education-heading" className="editorial-heading max-w-4xl text-[var(--ink)]">
                Formal training in analytics, systems, and applied data work.
              </h2>
              <p className="editorial-subheading mt-6 max-w-2xl text-[var(--ink-soft)]">
                One focused academic foundation supporting a broader engineering practice.
              </p>
            </div>
          </div>
        </RevealOnScroll>

        <div className="mt-10 border-y border-[var(--border)]">
          {content.education.map((edu, index) => (
            <RevealOnScroll key={index} delay={index * 0.05}>
              <motion.article className="grid gap-6 border-b border-[var(--border)] py-8 last:border-b-0 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16 lg:py-10">
                <div>
                  <p className="editorial-meta text-[var(--ink-muted)]">{edu.year}</p>
                  <p className="mt-2 text-sm text-[var(--ink-muted)]">{edu.location}</p>
                </div>
                <div>
                  <h3 className="font-display text-2xl font-semibold leading-tight tracking-[-0.03em] text-[var(--ink)] sm:text-3xl">
                    {edu.degree} in {edu.field}
                  </h3>
                  <p className="mt-2 text-base text-[var(--ink-soft)]">{edu.school}</p>
                  {edu.highlights?.length ? (
                    <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[var(--ink-muted)]">
                      {edu.highlights.map((highlight) => <span key={highlight}>{highlight}</span>)}
                    </div>
                  ) : null}
                </div>
              </motion.article>
            </RevealOnScroll>
          ))}
        </div>

        {certifications.length > 0 ? (
          <div className="mt-14">
            <p className="editorial-meta mb-5">Certifications</p>
            <div className="border-y border-[var(--border)]">
              {certifications.map((cert) => (
                <motion.article key={cert.name} className="grid gap-2 border-b border-[var(--border)] py-5 last:border-b-0 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-8">
                  <h3 className="text-base font-medium text-[var(--ink)]">{cert.name}</h3>
                  <p className="text-sm text-[var(--ink-muted)]">{cert.issuer} · {cert.year}</p>
                </motion.article>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
