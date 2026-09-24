"use client";

import { ArrowUpRight, Download, Github, Linkedin, Mail, MapPin } from "lucide-react";
import content from "@/data/content.json";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";

export function Contact() {
  const socialLinks = [
    { label: "GitHub", href: content.social.github, icon: Github },
    { label: "LinkedIn", href: content.social.linkedin, icon: Linkedin },
  ].filter((link) => Boolean(link.href));

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden border-t border-white/10 bg-[#050505] py-24 sm:py-32 lg:py-40"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -right-32 top-16 h-72 w-72 rounded-full border border-cyan-400/10 sm:h-[28rem] sm:w-[28rem]" />
        <div className="absolute -right-12 top-44 h-48 w-48 rounded-full border border-cyan-400/10 sm:h-72 sm:w-72" />
        <div className="absolute bottom-0 left-0 h-px w-2/3 bg-gradient-to-r from-cyan-400/30 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="grid gap-14 lg:grid-cols-[1fr_0.42fr] lg:gap-20">
            <div>
              <p className="mb-7 font-mono text-xs uppercase tracking-[0.28em] text-cyan-300/80">
                05 / Contact
              </p>

              <h2
                id="contact-heading"
                className="max-w-4xl text-[clamp(3.5rem,9vw,8rem)] font-semibold leading-[0.88] tracking-[-0.065em] text-white"
              >
                Let&apos;s build
                <br />
                <span className="text-zinc-500">something worth shipping.</span>
              </h2>

              <p className="mt-9 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
                I&apos;m interested in thoughtful products, data systems, and AI-enabled
                software that solve real problems. If there&apos;s a useful problem to
                work through, let&apos;s talk.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${content.personal.email}`}
                  className="group inline-flex min-h-12 items-center gap-3 border border-white bg-white px-5 py-3 text-sm font-semibold text-black transition-transform duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#050505]"
                >
                  <Mail size={17} aria-hidden="true" />
                  Start a conversation
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </a>

                {content.personal.resume && (
                  <a
                    href={content.personal.resume}
                    download
                    className="inline-flex min-h-12 items-center gap-2 border border-white/15 px-5 py-3 text-sm font-medium text-zinc-300 transition-colors hover:border-white/35 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#050505]"
                  >
                    <Download size={16} aria-hidden="true" />
                    Resume
                  </a>
                )}
              </div>
            </div>

            <div className="flex flex-col justify-end lg:pb-2">
              <div className="border-y border-white/10 py-6">
                <div className="flex items-center gap-3 text-sm text-zinc-400">
                  <MapPin size={16} className="text-cyan-300" aria-hidden="true" />
                  <span>{content.personal.location}</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-zinc-500">
                  Open to conversations around software, data, and AI engineering.
                </p>
              </div>

              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    aria-label={`Visit my ${label} profile (opens in a new tab)`}
                  >
                    <Icon size={16} aria-hidden="true" />
                    {label}
                    <ArrowUpRight
                      size={14}
                      className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </RevealOnScroll>

        <div className="mt-20 border-t border-white/10 pt-6 sm:mt-28">
          <div className="flex flex-col gap-3 text-[11px] uppercase tracking-[0.2em] text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
            <span>Nikhil Namani</span>
            <span>Software Engineer · Data / AI Engineering</span>
          </div>
        </div>
      </div>
    </section>
  );
}
