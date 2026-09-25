"use client";

import { MapPin } from "lucide-react";
import content from "@/data/content.json";
import { motion } from "framer-motion";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";

type Certification = { name: string; issuer: string; year: string };

export function Education() {
  const certifications = content.certifications as Certification[];

  return (
    <section id="education" aria-labelledby="education-heading" className="border-t border-white/10 bg-[#050505] py-24 sm:py-28">
      <div className="page-container">
        <RevealOnScroll>
          <div className="grid gap-8 border-b border-white/10 pb-12 lg:grid-cols-[0.8fr_1.7fr] lg:gap-16">
            <p className="editorial-kicker">Education</p>
            <div>
              <h2 id="education-heading" className="editorial-heading max-w-3xl">
                Formal training in analytics, systems, and applied data work.
              </h2>
              <p className="editorial-subheading mt-6 max-w-2xl">
                One focused academic foundation supporting a broader engineering practice.
              </p>
            </div>
          </div>
        </RevealOnScroll>

        <div className="mt-12">
          {content.education.map((edu, index) => (
            <RevealOnScroll key={index} delay={index * 0.06}>
              <motion.article className="grid gap-6 border-b border-white/10 py-8 lg:grid-cols-[0.75fr_1.75fr] lg:gap-16">
                <div>
                  <p className="editorial-meta">{edu.year}</p>
                  <p className="mt-2 text-sm text-zinc-500">{edu.location}</p>
                </div>
                <div>
                  <h3 className="text-xl font-medium tracking-[-0.02em] text-white sm:text-2xl">
                    {edu.degree} in {edu.field}
                  </h3>
                  <p className="mt-2 text-base text-zinc-400">{edu.school}</p>
                  {edu.highlights?.length ? (
                    <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-zinc-500">
                      {edu.highlights.map((highlight) => (
                        <span key={highlight}>{highlight}</span>
                      ))}
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
            <div className="grid gap-6 sm:grid-cols-2">
              {certifications.map((cert) => (
                <motion.article key={cert.name} className="border-b border-white/10 pb-5">
                  <h3 className="text-base font-medium text-white">{cert.name}</h3>
                  <p className="mt-1 text-sm text-zinc-500">{cert.issuer} · {cert.year}</p>
                </motion.article>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}