"use client";

import { Building2, MapPin, Calendar, ChevronDown, Sparkles } from "lucide-react";
import content from "@/data/content.json";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";

export function Experience() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="experience" className="py-28 bg-[#030303] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-cyan-500/10 via-emerald-500/5 to-transparent rounded-full blur-[180px]" />
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-sky-500/8 to-transparent rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 rounded-full border border-cyan-500/20 mb-6">
              <Building2 size={16} className="text-cyan-400" />
              <span className="text-sm bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent font-medium">Career Journey</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Work <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">Experience</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              My professional journey building data solutions across industries
            </p>
          </div>
        </RevealOnScroll>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500 via-emerald-500/50 to-transparent md:-translate-x-px" />

          <div className="space-y-14">
            {content.experience.map((job, index) => {
              const isEven = index % 2 === 0;
              const isExpanded = expandedId === job.id;
              const isPresentRole = job.period.toLowerCase().includes("present");

              return (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 -translate-x-1/2 z-10">
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      viewport={{ once: true }}
                      className={`w-4 h-4 rounded-full border-4 ${
                        isPresentRole 
                          ? "bg-gradient-to-r from-cyan-500 to-emerald-500 border-cyan-500/30 shadow-lg shadow-cyan-500/50" 
                          : "bg-[#0a0a0a] border-cyan-500"
                      }`}
                    />
                    {isPresentRole && (
                      <div className="absolute inset-0 w-4 h-4 bg-cyan-500 rounded-full animate-ping opacity-40" />
                    )}
                  </div>

                  <div className={`hidden md:block w-1/2 ${isEven ? "pr-14 text-right" : "pl-14 text-left"}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 20 : -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                      viewport={{ once: true }}
                    >
                      <div className={`flex items-center gap-2 text-gray-400 text-sm mb-2 ${isEven ? "justify-end" : "justify-start"}`}>
                        <Calendar size={14} className="text-cyan-400" />
                        <span className="font-medium">{job.period}</span>
                      </div>
                      <div className={`flex items-center gap-2 text-gray-500 text-sm ${isEven ? "justify-end" : "justify-start"}`}>
                        <MapPin size={14} />
                        <span>{job.location}</span>
                      </div>
                    </motion.div>
                  </div>

                  <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? "md:pl-14" : "md:pr-14"}`}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                      className="relative p-6 bg-[#0a0a0a]/80 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-all duration-500 group cursor-pointer overflow-hidden"
                      onClick={() => toggleExpand(job.id)}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-emerald-500/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <div className="relative z-10">
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div>
                            <div className="flex items-center gap-3 mb-3">
                              <motion.div 
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                className="p-2.5 bg-gradient-to-br from-cyan-500/20 to-emerald-500/10 rounded-xl"
                              >
                                <Building2 size={22} className="text-cyan-400" />
                              </motion.div>
                              <div>
                                <h3 className="text-lg font-semibold text-white">{job.company}</h3>
                                <p className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent font-medium">{job.role}</p>
                              </div>
                            </div>
                          </div>
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown size={20} className="text-gray-500" />
                          </motion.div>
                        </div>

                        <div className="md:hidden flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
                          <div className="flex items-center gap-1.5">
                            <Calendar size={14} className="text-cyan-400" />
                            <span>{job.period}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin size={14} />
                            <span>{job.location}</span>
                          </div>
                        </div>

                        <p className="text-gray-400 text-sm leading-relaxed mb-4">{job.description}</p>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="pt-4 border-t border-white/10">
                                <div className="flex items-center gap-2 mb-4">
                                  <Sparkles size={16} className="text-cyan-400" />
                                  <h4 className="text-sm font-semibold text-white">Key Achievements</h4>
                                </div>
                                <ul className="space-y-3 mb-5">
                                  {job.achievements.map((achievement, i) => (
                                    <motion.li 
                                      key={i} 
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ duration: 0.3, delay: i * 0.05 }}
                                      className="flex items-start gap-3 text-sm text-gray-300"
                                    >
                                      <span className="w-1.5 h-1.5 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full mt-2 flex-shrink-0" />
                                      {achievement}
                                    </motion.li>
                                  ))}
                                </ul>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <div className="flex flex-wrap gap-2 mt-4">
                          {job.technologies.slice(0, isExpanded ? undefined : 4).map((tech, i) => (
                            <motion.span
                              key={i}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.2, delay: i * 0.03 }}
                              className="px-3 py-1.5 text-xs font-medium text-cyan-300 bg-cyan-500/10 rounded-lg border border-cyan-500/20"
                            >
                              {tech}
                            </motion.span>
                          ))}
                          {!isExpanded && job.technologies.length > 4 && (
                            <span className="px-3 py-1.5 text-xs font-medium text-gray-500 bg-white/5 rounded-lg">
                              +{job.technologies.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
