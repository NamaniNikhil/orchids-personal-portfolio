"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, ExternalLink, Github, Search } from "lucide-react";
import { motion } from "framer-motion";
import content from "@/data/content.json";

export function Projects() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string | null>(null);

  const tags = useMemo(
    () => [...new Set(content.projects.flatMap((project) => project.tags))].slice(0, 8),
    []
  );

  const projects = useMemo(() => {
    const normalized = query.toLowerCase();
    return content.projects.filter((project) => {
      const matchesQuery =
        !normalized ||
        project.title.toLowerCase().includes(normalized) ||
        project.description.toLowerCase().includes(normalized) ||
        project.tags.some((item) => item.toLowerCase().includes(normalized));
      const matchesTag = !tag || project.tags.includes(tag);
      return matchesQuery && matchesTag;
    });
  }, [query, tag]);

  const featured = projects.filter((project) => project.featured);
  const secondary = projects.filter((project) => !project.featured);

  return (
    <section id="projects" className="relative overflow-hidden bg-[#050505] py-28 sm:py-36">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.24em] text-cyan-300">
              01 / Selected work
            </p>
            <h2 className="font-display text-[clamp(3.2rem,7vw,7rem)] font-semibold leading-[0.86] tracking-[-0.065em] text-white">
              Systems
              <br />
              <span className="text-zinc-600">with purpose.</span>
            </h2>
          </div>
          <div className="max-w-xl lg:justify-self-end">
            <p className="text-lg leading-8 text-zinc-400">
              A selection of data platforms, AI products, and engineering systems
              built around real technical problems—not just technology demos.
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-y border-white/[0.08] py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-sm flex-1">
            <Search size={16} className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-600" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search projects"
              className="w-full bg-transparent py-2 pl-7 text-sm text-white placeholder:text-zinc-600 outline-none"
              aria-label="Search projects"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setTag(null)}
              className={`rounded-full px-3 py-1.5 text-xs transition-colors ${
                !tag ? "bg-white text-black" : "text-zinc-500 hover:text-white"
              }`}
            >
              All
            </button>
            {tags.map((item) => (
              <button
                key={item}
                onClick={() => setTag(tag === item ? null : item)}
                className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                  tag === item
                    ? "border-cyan-300/50 bg-cyan-300/10 text-cyan-200"
                    : "border-white/10 text-zinc-500 hover:border-white/20 hover:text-zinc-200"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {featured.length > 0 && (
          <div className="mt-14 space-y-6">
            {featured.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.65, delay: index * 0.08 }}
                className="group overflow-hidden rounded-[2rem] border border-white/[0.09] bg-[#090909]"
              >
                <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
                  <div className="relative min-h-[340px] overflow-hidden border-b border-white/[0.08] lg:min-h-[500px] lg:border-b-0 lg:border-r">
                    <img
                      src={project.image}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover opacity-55 grayscale transition duration-700 group-hover:scale-105 group-hover:opacity-75 group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/35 to-transparent" />
                    <div className="absolute inset-x-7 bottom-7 flex items-end justify-between gap-6">
                      <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                        Case study {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="hidden text-xs uppercase tracking-[0.2em] text-zinc-500 sm:block">
                        Featured
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between p-7 sm:p-10 lg:p-12">
                    <div>
                      <div className="mb-6 flex items-center justify-between">
                        <span className="text-xs uppercase tracking-[0.2em] text-cyan-300">
                          {project.tags[0]}
                        </span>
                        <span className="font-mono text-xs text-zinc-700">
                          0{index + 1}
                        </span>
                      </div>

                      <h3 className="max-w-xl font-display text-4xl font-semibold leading-[0.95] tracking-[-0.04em] text-white sm:text-5xl">
                        {project.title}
                      </h3>
                      <p className="mt-6 max-w-xl text-base leading-7 text-zinc-400">
                        {project.description}
                      </p>

                      <div className="mt-8 flex flex-wrap gap-2">
                        {project.tags.slice(0, 7).map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-white/[0.08] px-3 py-1.5 text-xs text-zinc-500"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-white/[0.08] pt-6">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-cyan-300"
                        >
                          <Github size={16} />
                          View source
                          <ArrowUpRight size={15} />
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white"
                        >
                          <ExternalLink size={16} />
                          Live project
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {secondary.length > 0 && (
          <div className="mt-24">
            <div className="mb-8 flex items-end justify-between border-b border-white/[0.08] pb-5">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">02 / More work</p>
                <h3 className="mt-2 font-display text-3xl font-semibold tracking-[-0.03em] text-white">
                  Experiments & infrastructure
                </h3>
              </div>
              <span className="font-mono text-xs text-zinc-700">{String(secondary.length).padStart(2, "0")} projects</span>
            </div>

            <div className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] md:grid-cols-2">
              {secondary.map((project) => (
                <article key={project.id} className="bg-[#090909] p-7 transition-colors hover:bg-[#0d0d0d] sm:p-8">
                  <div className="flex items-start justify-between gap-5">
                    <span className="font-mono text-xs text-zinc-700">#{String(project.id).padStart(2, "0")}</span>
                    <div className="flex gap-3">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`GitHub: ${project.title}`} className="text-zinc-600 hover:text-white">
                          <Github size={17} />
                        </a>
                      )}
                      {project.live && (
                        <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label={`Live project: ${project.title}`} className="text-zinc-600 hover:text-cyan-300">
                          <ExternalLink size={17} />
                        </a>
                      )}
                    </div>
                  </div>
                  <h4 className="mt-8 max-w-md font-display text-2xl font-semibold leading-tight tracking-[-0.03em] text-white">
                    {project.title}
                  </h4>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-500">{project.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tags.slice(0, 5).map((item) => (
                      <span key={item} className="text-xs text-zinc-600">
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {projects.length === 0 && (
          <div className="py-24 text-center text-sm text-zinc-600">
            No projects match your search.
          </div>
        )}
      </div>
    </section>
  );
}
