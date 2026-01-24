"use client";

import { useState } from "react";
import { Code2, Database, Wrench, Cloud, Search, Sparkles } from "lucide-react";
import content from "@/data/content.json";
import { motion, AnimatePresence } from "framer-motion";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";

const categoryConfig = {
  languages: { 
    label: "Languages", 
    icon: Code2, 
    color: "#22d3ee",
    gradient: "from-cyan-500/20 to-cyan-500/5"
  },
  databases: { 
    label: "Databases", 
    icon: Database, 
    color: "#38bdf8",
    gradient: "from-sky-500/20 to-sky-500/5"
  },
  tools: { 
    label: "Tools & Frameworks", 
    icon: Wrench, 
    color: "#10b981",
    gradient: "from-emerald-500/20 to-emerald-500/5"
  },
  cloud: { 
    label: "Cloud Platforms", 
    icon: Cloud, 
    color: "#34d399",
    gradient: "from-teal-500/20 to-teal-500/5"
  },
};

type CategoryKey = keyof typeof categoryConfig;

export function Skills() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryKey | "all">("all");

  const allSkills = Object.entries(content.skills).flatMap(([category, skills]) =>
    skills.map((skill) => ({ skill, category: category as CategoryKey }))
  );

  const filteredSkills = allSkills.filter(({ skill, category }) => {
    const matchesSearch = skill.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const groupedFilteredSkills = Object.keys(categoryConfig).reduce((acc, key) => {
    const categoryKey = key as CategoryKey;
    acc[categoryKey] = filteredSkills
      .filter(({ category }) => category === categoryKey)
      .map(({ skill }) => skill);
    return acc;
  }, {} as Record<CategoryKey, string[]>);

  const totalSkills = allSkills.length;

  return (
    <section id="skills" className="py-28 bg-[#030303] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-gradient-to-br from-cyan-500/10 via-emerald-500/5 to-transparent rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-sky-500/10 via-cyan-500/5 to-transparent rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealOnScroll>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 rounded-full border border-cyan-500/20 mb-6">
              <Sparkles size={16} className="text-cyan-400" />
              <span className="text-sm bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent font-medium">Technical Arsenal</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Skills & <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">Technologies</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              {totalSkills}+ technologies I use to build scalable data solutions
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-12">
            <div className="relative w-full sm:w-72">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-white/5 rounded-xl border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.07] transition-all duration-300"
              />
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              <motion.button
                onClick={() => setActiveCategory("all")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-5 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 ${
                  activeCategory === "all"
                    ? "bg-gradient-to-r from-cyan-600 to-emerald-600 text-white shadow-lg shadow-cyan-500/25"
                    : "bg-white/5 text-gray-400 hover:text-white border border-white/10 hover:border-cyan-500/30"
                }`}
              >
                All
              </motion.button>
              {Object.entries(categoryConfig).map(([key, config]) => (
                <motion.button
                  key={key}
                  onClick={() => setActiveCategory(key as CategoryKey)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-5 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 ${
                    activeCategory === key
                      ? "text-white shadow-lg"
                      : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
                  }`}
                  style={{
                    backgroundColor: activeCategory === key ? config.color : undefined,
                    boxShadow: activeCategory === key ? `0 10px 30px -10px ${config.color}60` : undefined,
                  }}
                >
                  {config.label}
                </motion.button>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        <div className="grid sm:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {Object.entries(categoryConfig).map(([key, config], categoryIndex) => {
              const categoryKey = key as CategoryKey;
              const skills = groupedFilteredSkills[categoryKey];
              const Icon = config.icon;

              if (skills.length === 0) return null;

              return (
                <motion.div
                  key={key}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ duration: 0.4, delay: categoryIndex * 0.05 }}
                  className="relative p-6 bg-[#0a0a0a]/80 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-500 group overflow-hidden"
                >
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} 
                  />
                  <div 
                    className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                    style={{ backgroundColor: config.color }}
                  />

                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="p-3.5 rounded-xl transition-all duration-300"
                        style={{ backgroundColor: `${config.color}20` }}
                      >
                        <Icon size={24} style={{ color: config.color }} />
                      </motion.div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{config.label}</h3>
                        <p className="text-sm text-gray-500">{skills.length} skills</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <AnimatePresence mode="popLayout">
                        {skills.map((skill, index) => (
                          <motion.span
                            key={skill}
                            layout
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.2, delay: index * 0.03 }}
                            whileHover={{ scale: 1.08, y: -2 }}
                            className="px-4 py-2 text-sm font-medium text-gray-300 bg-white/5 rounded-xl border border-white/10 transition-all duration-300 cursor-default hover:text-white hover:bg-white/10"
                            style={{ 
                              borderColor: `${config.color}30`,
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = config.color;
                              e.currentTarget.style.boxShadow = `0 0 20px ${config.color}30`;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = `${config.color}30`;
                              e.currentTarget.style.boxShadow = 'none';
                            }}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {filteredSkills.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-gray-500">No skills found matching your search.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
