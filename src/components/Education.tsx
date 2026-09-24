"use client";

import { GraduationCap, MapPin, Calendar, Award, Sparkles } from "lucide-react";
import content from "@/data/content.json";
import { motion } from "framer-motion";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";

type Certification = { name: string; issuer: string; year: string };

export function Education() {
  const certifications = content.certifications as Certification[];

  return (
    <section id="education" className="py-28 bg-[#050505] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-to-br from-cyan-500/10 via-emerald-500/5 to-transparent rounded-full blur-[200px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealOnScroll>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 rounded-full border border-cyan-500/20 mb-6">
              <GraduationCap size={16} className="text-cyan-400" />
              <span className="text-sm bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent font-medium">Education</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Academic <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">Background</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              My educational journey and qualifications
            </p>
          </div>
        </RevealOnScroll>

        <div className="space-y-6">
          {content.education.map((edu, index) => (
            <RevealOnScroll key={index} delay={index * 0.1}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative group"
              >
                <div className="p-8 bg-[#0a0a0a]/80 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/10 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-emerald-500/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10 flex flex-col md:flex-row md:items-start gap-6">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="flex-shrink-0"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-cyan-600 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/30">
                        <GraduationCap size={32} className="text-white" />
                      </div>
                    </motion.div>

                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                        <h3 className="text-xl font-semibold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-emerald-400 group-hover:bg-clip-text transition-all duration-300">
                          {edu.degree} in {edu.field}
                        </h3>
                        <div className="flex items-center gap-2 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 px-4 py-1.5 rounded-full border border-cyan-500/20 w-fit">
                          <Calendar size={14} className="text-cyan-400" />
                          <span className="text-sm font-medium bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">{edu.year}</span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
                        <p className="text-lg text-gray-300 font-medium">{edu.school}</p>
                        <div className="flex items-center gap-1.5 text-gray-500">
                          <MapPin size={14} />
                          <span className="text-sm">{edu.location}</span>
                        </div>
                      </div>

                      {edu.highlights && edu.highlights.length > 0 && (
                        <div className="mt-5 pt-5 border-t border-white/5">
                          <div className="flex items-center gap-2 mb-4">
                            <Sparkles size={16} className="text-cyan-400" />
                            <span className="text-sm font-medium text-gray-400">Relevant Coursework</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {edu.highlights.map((highlight, i) => (
                              <motion.span
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: i * 0.05 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.05, y: -2 }}
                                className="px-4 py-2 text-sm text-gray-300 bg-white/5 rounded-xl border border-white/10 hover:border-cyan-500/30 hover:text-white transition-all duration-300"
                              >
                                {highlight}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>

        {certifications.length > 0 && (
          <RevealOnScroll delay={0.3}>
            <div className="mt-14">
              <h3 className="text-2xl font-semibold text-white mb-8 text-center">Certifications</h3>
              <div className="grid sm:grid-cols-2 gap-5">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02, y: -4 }}
                    className="p-6 bg-[#0a0a0a]/80 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-all duration-500 group"
                  >
                    <div className="flex items-start gap-4">
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="p-3 bg-gradient-to-br from-cyan-500/20 to-emerald-500/10 rounded-xl"
                      >
                        <Award size={22} className="text-cyan-400" />
                      </motion.div>
                      <div>
                        <h4 className="font-semibold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-emerald-400 group-hover:bg-clip-text transition-all duration-300">{cert.name}</h4>
                        <p className="text-sm text-gray-500">{cert.issuer} • {cert.year}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        )}
      </div>
    </section>
  );
}
