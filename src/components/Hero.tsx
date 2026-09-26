"use client";

import { ArrowDown, ArrowUpRight, Github } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import content from "@/data/content.json";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 36]);
  const opacity = useTransform(scrollYProgress, [0, 0.82], [1, 0.95]);

  return (
    <section
      ref={containerRef}
      id="home"
      aria-labelledby="hero-heading"
      className="site-hero"
    >
      <div className="site-hero-grid" aria-hidden="true" />
      <div className="site-hero-rule" aria-hidden="true" />

      <motion.div
        style={{ y, opacity }}
        className="page-container site-hero-inner"
      >
        <div className="site-hero-content">
          <p className="editorial-meta site-hero-name">{content.personal.name}</p>

          <h1 id="hero-heading" className="editorial-hero site-hero-title">
            SOFTWARE
            <br />
            ENGINEER.
          </h1>

          <div className="site-hero-copy-row">
            <p className="editorial-lede site-hero-lede">
              I build data systems, AI-enabled products, and digital experiences
              that make complex problems feel obvious.
            </p>

            <p className="editorial-copy site-hero-supporting">
              Software engineering grounded in data systems, cloud platforms,
              and practical AI.
            </p>
          </div>

          <div className="site-hero-actions">
            <a href="#projects" className="editorial-button">
              View selected work
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <a
              href={content.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="editorial-button-secondary"
              aria-label="Visit GitHub profile (opens in a new tab)"
            >
              <Github size={16} aria-hidden="true" />
              GitHub
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="site-hero-footer">
          <p className="editorial-meta">Available for software, data + AI engineering</p>
          <a href="#projects" className="site-scroll-link">
            Scroll to explore
            <ArrowDown size={15} aria-hidden="true" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
