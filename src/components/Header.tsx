"use client";

import { useCallback, useEffect, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import content from "@/data/content.json";
import { useTheme } from "next-themes";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

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
    setMounted(true);
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

  const themeLabel = mounted
    ? resolvedTheme === "dark"
      ? "Switch to light mode"
      : "Switch to dark mode"
    : "Change color theme";

  return (
    <header className={`site-header ${isScrolled ? "site-header-scrolled" : ""}`}>
      <div className="page-container site-header-inner">
        <button
          type="button"
          onClick={() => goTo("#home")}
          className="site-brand"
          aria-label="Go to home"
        >
          <span className="site-brand-name">NIKHIL<span aria-hidden="true">.</span></span>
          <span className="site-brand-role">{content.personal.title}</span>
        </button>

        <nav className="site-nav" aria-label="Main navigation">
          {content.navigation
            .filter((item) => !["Home", "Skills", "Education"].includes(item.label))
            .map((item) => {
              const active = activeSection === item.href.slice(1);
              return (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => goTo(item.href)}
                  className={`site-nav-link ${active ? "site-nav-link-active" : ""}`}
                >
                  {item.label}
                </button>
              );
            })}
        </nav>

        <div className="site-header-actions">
          <a
            href={content.personal.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="site-nav-resume"
          >
            Resume <span aria-hidden="true">↗</span>
          </a>
          <button
            type="button"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="theme-toggle"
            aria-label={themeLabel}
            title={themeLabel}
          >
            {mounted && resolvedTheme === "dark" ? (
              <Sun size={16} aria-hidden="true" />
            ) : (
              <Moon size={16} aria-hidden="true" />
            )}
          </button>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="site-menu-button"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="site-mobile-panel"
          >
            <nav className="page-container" aria-label="Mobile navigation">
              {content.navigation.map((item) => (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => goTo(item.href)}
                  className={`site-mobile-link ${activeSection === item.href.slice(1) ? "site-nav-link-active" : ""}`}
                >
                  {item.label}
                </button>
              ))}
              <a
                href={content.personal.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="editorial-button site-mobile-resume"
              >
                Download resume <span aria-hidden="true">↗</span>
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
