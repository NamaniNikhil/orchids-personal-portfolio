"use client";

import { useCallback, useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import content from "@/data/content.json";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 24);
    const sections = content.navigation.map((item) => item.href.slice(1));
    const position = window.scrollY + 180;

    for (let i = sections.length - 1; i >= 0; i -= 1) {
      const element = document.getElementById(sections[i]);
      if (element && element.offsetTop <= position) {
        setActiveSection(sections[i]);
        break;
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const goTo = (href: string) => {
    const target = document.getElementById(href.slice(1));
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "border-b border-white/[0.07] bg-[#050505]/75 backdrop-blur-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[76px] max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <button
          onClick={() => goTo("#home")}
          className="group text-left"
          aria-label="Go to home"
        >
          <span className="block font-display text-base font-semibold tracking-[-0.03em] text-white">
            NIKHIL<span className="text-cyan-300">.</span>
          </span>
          <span className="mt-0.5 block text-[9px] font-medium uppercase tracking-[0.2em] text-zinc-600">
            {content.personal.title}
          </span>
        </button>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {content.navigation
            .filter((item) => !["Home", "Skills", "Education"].includes(item.label))
            .map((item) => {
              const active = activeSection === item.href.slice(1);
              return (
                <button
                  key={item.href}
                  onClick={() => goTo(item.href)}
                  className={`rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] transition-colors ${
                    active ? "text-white" : "text-zinc-500 hover:text-zinc-200"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          <a
            href={content.personal.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-white/30 hover:bg-white/[0.06]"
          >
            Resume ↗
          </a>
        </nav>

        <button
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          className="rounded-full border border-white/10 bg-white/[0.04] p-2.5 text-zinc-300 md:hidden"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="border-b border-white/10 bg-[#070707]/95 px-5 pb-6 pt-2 backdrop-blur-2xl md:hidden"
          >
            <nav className="mx-auto max-w-[1400px]" aria-label="Mobile navigation">
              {content.navigation.map((item) => (
                <button
                  key={item.href}
                  onClick={() => goTo(item.href)}
                  className={`block w-full border-b border-white/[0.06] py-4 text-left text-sm uppercase tracking-[0.12em] ${
                    activeSection === item.href.slice(1) ? "text-white" : "text-zinc-500"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <a
                href={content.personal.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 block rounded-full bg-white px-5 py-3 text-center text-sm font-semibold text-black"
              >
                Download Resume ↗
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
