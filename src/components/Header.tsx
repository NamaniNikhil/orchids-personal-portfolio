"use client";

import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
import content from "@/data/content.json";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);

    const sections = content.navigation.map((item) => item.href.replace("#", ""));
    const scrollPosition = window.scrollY + 100;

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = document.getElementById(sections[i]);
      if (section && section.offsetTop <= scrollPosition) {
        setActiveSection(sections[i]);
        break;
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent, href: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#050505]/60 backdrop-blur-2xl border-b border-white/5"
          : "bg-transparent"
      }`}
      role="banner"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <motion.a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="flex flex-col group"
            aria-label="Go to home section"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-lg md:text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-emerald-400 group-hover:bg-clip-text transition-all duration-300">
              {content.personal.name}
            </span>
            <span className="text-xs bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent font-medium -mt-0.5">
              {content.personal.title}
            </span>
          </motion.a>

          <nav
            className="hidden md:flex items-center gap-1"
            role="navigation"
            aria-label="Main navigation"
          >
            {content.navigation.map((item, index) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  onKeyDown={(e) => handleKeyDown(e, item.href)}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-xl ${
                    isActive
                      ? "text-white"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 rounded-xl border border-cyan-500/30"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.a>
              );
            })}
            <motion.a
              href={content.personal.resume}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-3 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-cyan-600 to-emerald-600 rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
              aria-label="Download resume (opens in new tab)"
            >
              Resume
            </motion.a>
          </nav>

          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2.5 text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all duration-300"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 top-16 bg-black/80 backdrop-blur-xl md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />

            <motion.nav
              id="mobile-menu"
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-16 right-0 h-[calc(100vh-4rem)] w-80 bg-[#0a0a0a]/95 border-l border-white/10 md:hidden backdrop-blur-2xl"
              role="navigation"
              aria-label="Mobile navigation"
            >
              <div className="p-6 space-y-2">
                {content.navigation.map((item, index) => {
                  const isActive = activeSection === item.href.replace("#", "");
                  return (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      onKeyDown={(e) => handleKeyDown(e, item.href)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={`block px-5 py-4 text-base font-medium rounded-2xl transition-all duration-300 ${
                        isActive
                          ? "text-white bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 border border-cyan-500/30"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                      aria-current={isActive ? "page" : undefined}
                      tabIndex={0}
                    >
                      {item.label}
                    </motion.a>
                  );
                })}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="pt-4 mt-4 border-t border-white/10"
                >
                  <a
                    href={content.personal.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center px-5 py-4 text-base font-semibold text-white bg-gradient-to-r from-cyan-600 to-emerald-600 rounded-2xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                    tabIndex={0}
                    aria-label="Download resume (opens in new tab)"
                  >
                    Download Resume
                  </a>
                </motion.div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
