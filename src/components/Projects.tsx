"use client";

import { useState, useMemo } from "react";
import { ExternalLink, Github, ArrowRight, Star, Search, FolderGit2, Layers } from "lucide-react";
import content from "@/data/content.json";
import { motion } from "framer-motion";
import Image from "next/image";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";

export function Projects() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const tags = content.projects.flatMap((p) => p.tags);
    return [...new Set(tags)].sort();
  }, []);

  const filteredProjects = useMemo(() => {
    return content.projects.filter((project) => {
      const matchesSearch =
        searchQuery === "" ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTag = selectedTag === null || project.tags.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [searchQuery, selectedTag]);

  const featuredProjects = filteredProjects.filter((p) => p.featured);
  const otherProjects = filteredProjects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-28 bg-[#050505] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-gradient-to-br from-cyan-500/10 via-emerald-500/5 to-transparent rounded-full blur-[180px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-sky-500/10 via-cyan-500/5 to-transparent rounded-full blur-[150px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealOnScroll>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 rounded-full border border-cyan-500/20 mb-6">
              <FolderGit2 size={16} className="text-cyan-400" />
              <span className="text-sm bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent font-medium">Portfolio</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Featured <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">Projects</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              A selection of my recent work and side projects
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-12">
            <div className="relative w-full sm:w-72">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-white/5 rounded-xl border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.07] transition-all duration-300"
              />
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              <motion.button
                onClick={() => setSelectedTag(null)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-5 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 ${
                  selectedTag === null
                    ? "bg-gradient-to-r from-cyan-600 to-emerald-600 text-white shadow-lg shadow-cyan-500/25"
                    : "bg-white/5 text-gray-400 hover:text-white border border-white/10 hover:border-cyan-500/30"
                }`}
              >
                All
              </motion.button>
              {allTags.slice(0, 5).map((tag) => (
                <motion.button
                  key={tag}
                  onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-5 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 ${
                    selectedTag === tag
                      ? "bg-gradient-to-r from-cyan-600 to-emerald-600 text-white shadow-lg shadow-cyan-500/25"
                      : "bg-white/5 text-gray-400 hover:text-white border border-white/10 hover:border-cyan-500/30"
                  }`}
                >
                  {tag}
                </motion.button>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Layers size={48} className="mx-auto text-gray-700 mb-4" />
            <p className="text-gray-500">No projects found matching your criteria.</p>
          </motion.div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  className="group relative bg-[#0a0a0a]/80 rounded-2xl border border-white/10 overflow-hidden hover:border-cyan-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/10"
                >
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />

                    <div className="absolute top-4 left-4">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 backdrop-blur-sm rounded-full">
                        <Star size={12} className="text-white fill-current" />
                        <span className="text-xs font-semibold text-white">Featured</span>
                      </div>
                    </div>

                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      {project.github && (
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2.5 bg-black/60 backdrop-blur-sm rounded-xl text-white hover:text-cyan-400 transition-colors border border-white/10"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github size={18} />
                        </motion.a>
                      )}
                      {project.live && (
                        <motion.a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2.5 bg-black/60 backdrop-blur-sm rounded-xl text-white hover:text-cyan-400 transition-colors border border-white/10"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink size={18} />
                        </motion.a>
                      )}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-emerald-400 group-hover:bg-clip-text transition-all duration-300">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-5 line-clamp-2 leading-relaxed">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          onClick={() => setSelectedTag(tag)}
                          className="px-3 py-1.5 text-xs font-medium text-cyan-300 bg-cyan-500/10 rounded-lg border border-cyan-500/20 cursor-pointer hover:bg-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-5 border-t border-white/5">
                      <div className="flex items-center gap-2">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-gray-400 hover:text-white bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300"
                          >
                            <Github size={14} />
                            Code
                          </a>
                        )}
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-cyan-300 bg-cyan-500/10 rounded-lg border border-cyan-500/20 hover:bg-cyan-500/20 transition-all duration-300"
                          >
                            <ExternalLink size={14} />
                            Demo
                          </a>
                        )}
                      </div>
                      <a
                        href={project.live || project.github || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-gray-500 hover:text-cyan-400 transition-colors group/link"
                      >
                        View
                        <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {otherProjects.length > 0 && (
              <RevealOnScroll delay={0.2}>
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-8 text-center">Other Projects</h3>
                  <div className="grid sm:grid-cols-2 gap-5">
                    {otherProjects.map((project, index) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.02, y: -4 }}
                        className="p-6 bg-[#0a0a0a]/80 rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-all duration-500 group"
                      >
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <motion.div 
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="p-3 bg-gradient-to-br from-cyan-500/20 to-emerald-500/10 rounded-xl"
                          >
                            <FolderGit2 size={22} className="text-cyan-400" />
                          </motion.div>
                          <div className="flex items-center gap-2">
                            {project.github && (
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-white transition-colors"
                              >
                                <Github size={18} />
                              </a>
                            )}
                            {project.live && (
                              <a
                                href={project.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-cyan-400 transition-colors"
                              >
                                <ExternalLink size={18} />
                              </a>
                            )}
                          </div>
                        </div>
                        <h4 className="font-semibold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-emerald-400 group-hover:bg-clip-text transition-all duration-300 mb-2 text-lg">
                          {project.title}
                        </h4>
                        <p className="text-gray-400 text-sm mb-5 line-clamp-2 leading-relaxed">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.slice(0, 4).map((tag) => (
                            <span
                              key={tag}
                              onClick={() => setSelectedTag(tag)}
                              className="px-3 py-1.5 text-xs text-gray-400 bg-white/5 rounded-lg border border-white/10 cursor-pointer hover:border-cyan-500/30 hover:text-cyan-300 transition-all duration-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>
            )}
          </>
        )}
      </div>
    </section>
  );
}
