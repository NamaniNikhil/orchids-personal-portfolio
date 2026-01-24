"use client";

import { MapPin, Briefcase, Download, ArrowRight, Sparkles } from "lucide-react";
import content from "@/data/content.json";
import { motion } from "framer-motion";
import Image from "next/image";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";

export function About() {
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="about" className="py-28 bg-[#050505] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-cyan-500/10 via-emerald-500/5 to-transparent rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-sky-500/8 to-transparent rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 rounded-full border border-cyan-500/20 mb-6">
              <Sparkles size={16} className="text-cyan-400" />
              <span className="text-sm bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent font-medium">Get to know me</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              About <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">Me</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              My journey and experience in building data solutions
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <RevealOnScroll x={-50} y={0} delay={0.2}>
            <div className="relative order-2 lg:order-1">
              <div className="relative w-full max-w-sm mx-auto lg:max-w-md">
                <div className="absolute -inset-4 bg-gradient-to-br from-cyan-500/30 via-emerald-500/20 to-sky-500/10 rounded-3xl transform rotate-3 blur-2xl opacity-50" />
                <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-500/20 to-transparent rounded-3xl transform -rotate-2 blur-xl" />
                
                <motion.div 
                  whileHover={{ scale: 1.02, rotate: 1 }}
                  transition={{ duration: 0.3 }}
                  className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-cyan-500/10"
                >
                  <Image
                    src={content.personal.avatar}
                    alt={content.personal.name}
                    width={400}
                    height={400}
                    className="w-full aspect-square object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="absolute -bottom-6 -right-6 px-5 py-3 bg-[#0a0a0a]/90 backdrop-blur-xl rounded-2xl border border-cyan-500/30 shadow-lg shadow-cyan-500/10"
                >
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                    <span className="text-sm font-medium text-white">Available for work</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll x={50} y={0} delay={0.3}>
            <div className="order-1 lg:order-2">
              <div className="space-y-8">
                <p className="text-gray-300 text-lg leading-relaxed">
                  {content.personal.bio}
                </p>

                <div className="flex flex-wrap gap-3">
                  <motion.div 
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white/5 rounded-xl border border-white/10 hover:border-cyan-500/30 transition-all duration-300"
                  >
                    <MapPin size={18} className="text-cyan-400" />
                    <span className="text-gray-300 text-sm font-medium">{content.personal.location}</span>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white/5 rounded-xl border border-white/10 hover:border-emerald-500/30 transition-all duration-300"
                  >
                    <Briefcase size={18} className="text-emerald-400" />
                    <span className="text-gray-300 text-sm font-medium">{content.personal.title}</span>
                  </motion.div>
                </div>

                <div className="pt-4">
                  <div className="flex items-center gap-2 mb-5">
                    <Sparkles size={18} className="text-cyan-400" />
                    <h3 className="text-lg font-semibold text-white">Key Highlights</h3>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {content.personal.highlights.map((highlight, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ x: 4 }}
                        className="flex items-center gap-3 p-4 bg-gradient-to-r from-cyan-500/10 via-emerald-500/5 to-transparent rounded-xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300"
                      >
                        <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{highlight}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-6">
                  <motion.a
                    href={content.personal.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-cyan-600 to-emerald-600 rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                  >
                    <Download size={18} />
                    Download Resume
                  </motion.a>
                  <motion.a
                    href="#projects"
                    onClick={(e) => handleSmoothScroll(e, "#projects")}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="group inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-white/5 rounded-xl border border-white/10 hover:border-cyan-500/50 transition-all duration-300"
                  >
                    View Projects
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </motion.a>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
