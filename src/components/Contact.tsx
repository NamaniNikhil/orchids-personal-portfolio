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
    <section id="contact" aria-labelledby="contact-heading" className="contact-panel section-space">
      <div className="page-container">
        <RevealOnScroll>
          <div className="grid gap-14 lg:grid-cols-[1fr_0.4fr] lg:gap-20">
            <div>
              <p className="editorial-kicker contact-kicker">Contact</p>
              <h2 id="contact-heading" className="editorial-heading contact-title mt-7 max-w-5xl">
                Let&apos;s build
                <br />
                <span className="contact-title-muted">something worth shipping.</span>
              </h2>
              <p className="contact-copy mt-9 max-w-2xl">
                I&apos;m interested in thoughtful products, data systems, and AI-enabled
                software that solve real problems. If there&apos;s a useful problem to work through, let&apos;s talk.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-6">
                <a href={`mailto:${content.personal.email}`} className="contact-primary-action">
                  <Mail size={17} aria-hidden="true" />
                  Start a conversation
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
                {content.personal.resume && (
                  <a href={content.personal.resume} download className="contact-secondary-action">
                    <Download size={16} aria-hidden="true" />
                    Resume
                  </a>
                )}
              </div>
            </div>

            <div className="flex flex-col justify-end">
              <div className="contact-detail-block">
                <div className="flex items-center gap-3">
                  <MapPin size={15} aria-hidden="true" />
                  <span>{content.personal.location}</span>
                </div>
                <p className="mt-4">Open to conversations around software, data, and AI engineering.</p>
              </div>

              <div className="mt-7 flex flex-wrap gap-x-7 gap-y-3">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social"
                    aria-label={"Visit my " + label + " profile (opens in a new tab)"}
                  >
                    <Icon size={16} aria-hidden="true" />
                    {label}
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </RevealOnScroll>

        <div className="contact-footer-note">
          <span>Nikhil Namani</span>
          <span>Software Engineer · Data / AI Engineering</span>
        </div>
      </div>
    </section>
  );
}
