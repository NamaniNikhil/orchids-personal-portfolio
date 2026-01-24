"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import content from "@/data/content.json";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a
            href="#home"
            className="text-xl font-bold text-white hover:text-[#10b981] transition-colors"
          >
            {content.personal.name.split(" ")[0]}
            <span className="text-[#10b981]">.</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {content.navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-gray-300 hover:text-[#10b981] transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href={content.personal.resume}
              className="px-4 py-2 text-sm font-medium text-[#0a0a0a] bg-[#10b981] rounded-lg hover:bg-[#059669] transition-colors"
            >
              Resume
            </a>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/10">
          <div className="px-4 py-4 space-y-3">
            {content.navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-base font-medium text-gray-300 hover:text-[#10b981] transition-colors py-2"
              >
                {item.label}
              </a>
            ))}
            <a
              href={content.personal.resume}
              className="block w-full text-center px-4 py-2 text-sm font-medium text-[#0a0a0a] bg-[#10b981] rounded-lg hover:bg-[#059669] transition-colors mt-4"
            >
              Resume
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
