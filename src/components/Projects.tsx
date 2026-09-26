"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, ExternalLink, Github, Search } from "lucide-react";
import { motion } from "framer-motion";
import content from "@/data/content.json";

export function Projects() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string | null>(null);

  const tags = useMemo(
    () => [...new Set(content.projects.flatMap((project) => project.tags))].slice(0, 6),
    []
  );

  const projects = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return content.projects.filter((project) => {
      const matchesQuery =
        !normalized ||
        project.title.toLowerCase().includes(normalized) ||
        project.description.toLowerCase().includes(normalized) ||
        project.tags.some((item) => item.toLowerCase().includes(normalized));

      return matchesQuery && (!tag || project.tags.includes(tag));
    });
  }, [query, tag]);

  const featured = projects.filter((project) => project.featured);
  const secondary = projects.filter((project) => !project.featured);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative overflow-hidden bg-[var(--background)] section-space"
    >
      <div className="page-container">
        <div className="grid gap-10 border-b border-[var(--border)] pb-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-16">
          <div>
            <p className="editorial-kicker mb-4">Selected work</p>
            <h2 id="projects-heading" className="editorial-heading text-[var(--ink)]">
              Systems
              <br />
              <span className="text-[var(--ink-muted)]">with purpose.</span>
            </h2>
          </div>

          <p className="editorial-copy max-w-2xl text-[var(--ink-soft)] lg:justify-self-end">
            A small set of projects that show how I approach data, software,
            infrastructure, and AI as connected engineering problems.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-5 border-b border-[var(--border)] pb-5 lg:flex-row lg:items-center lg:justify-between">
          <label className="relative block w-full max-w-sm">
            <span className="sr-only">Search projects</span>
            <Search size={16} aria-hidden="true" className="absolute left-0 top-1/2 -translate-y-1/2 text-[var(--ink-muted)]" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search projects"
              className="w-full border-b border-[var(--input)] bg-transparent py-3 pl-7 pr-2 text-sm text-[var(--ink)] placeholder:text-[var(--ink-muted)] outline-none transition-colors focus:border-[var(--accent)]"
            />
          </label>

          <div className="flex flex-wrap gap-x-5 gap-y-2" role="group" aria-label="Filter projects by technology">
            <button
              type="button"
              onClick={() => setTag(null)}
              aria-pressed={tag === null}
              className={tag === null ? "border-b border-[var(--ink)] pb-1 text-sm text-[var(--ink)]" : "pb-1 text-sm text-[var(--ink-muted)] transition-colors hover:text-[var(--ink)]"}
            >
              All
            </button>
            {tags.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setTag(tag === item ? null : item)}
                aria-pressed={tag === item}
                className={tag === item ? "border-b border-[var(--accent)] pb-1 text-sm text-[var(--accent)]" : "pb-1 text-sm text-[var(--ink-muted)] transition-colors hover:text-[var(--ink)]"}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {featured.length > 0 && (
          <div className="mt-14 space-y-14">
            {featured.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-64px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="project-case grid border-y border-[var(--border)] bg-[var(--surface)] lg:grid-cols-[0.9fr_1.1fr]"
              >
                <div className="project-media relative min-h-[340px] overflow-hidden border-b border-[var(--border)] lg:min-h-[620px] lg:border-b-0 lg:border-r">
                  <img
                    src={project.image}
                    alt={project.title + " project visual"}
                    loading={index === 0 ? "eager" : "lazy"}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="project-media-tint absolute inset-0" aria-hidden="true" />
                  <div className="absolute inset-x-7 top-7 flex items-start justify-between gap-6 sm:inset-x-9 sm:top-9">
                    <span className="editorial-meta">{String(index + 1).padStart(2, "0")} / Featured</span>
                    <span className="editorial-meta text-[var(--accent)]">{project.tags[0]}</span>
                  </div>
                  <div className="absolute inset-x-7 bottom-7 max-w-lg sm:inset-x-9 sm:bottom-9">
                    <p className="editorial-meta">{project.tags.slice(0, 2).join(" / ")}</p>
                    <p className="mt-3 font-display text-3xl font-semibold leading-none tracking-[-0.04em] text-[var(--ink)] sm:text-5xl">
                      {project.title}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col p-7 sm:p-10 lg:p-12">
                  <div className="border-b border-[var(--border)] pb-8">
                    <p className="editorial-meta">Challenge</p>
                    <p className="mt-3 max-w-2xl text-lg leading-7 text-[var(--ink)] sm:text-xl">
                      {project.challenge ?? project.description}
                    </p>
                  </div>

                  <div className="border-b border-[var(--border)] py-8">
                    <p className="editorial-meta">System</p>
                    <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--ink-soft)]">
                      {project.system ?? project.description}
                    </p>
                  </div>

                  <div className="grid gap-8 pt-8 sm:grid-cols-[1fr_auto] sm:items-end">
                    <div>
                      <p className="editorial-meta">Result</p>
                      <p className="mt-3 max-w-xl text-base leading-7 text-[var(--ink-soft)]">
                        {project.result ?? "See the project source for implementation details."}
                      </p>

                      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[var(--ink-muted)]">
                        {project.tags.slice(0, 6).map((item) => <span key={item}>{item}</span>)}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-5 sm:justify-end">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="editorial-link inline-flex items-center gap-2 text-sm font-medium" aria-label={"View source for " + project.title + " (opens in a new tab)"}>
                          <Github size={16} aria-hidden="true" /> View source <ArrowUpRight size={15} aria-hidden="true" />
                        </a>
                      )}
                      {project.live && (
                        <a href={project.live} target="_blank" rel="noopener noreferrer" className="editorial-link inline-flex items-center gap-2 text-sm" aria-label={"View live project for " + project.title + " (opens in a new tab)"}>
                          <ExternalLink size={16} aria-hidden="true" /> Live project
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
            <div className="mb-8 grid gap-3 border-b border-[var(--border)] pb-5 sm:grid-cols-[1fr_auto] sm:items-end">
              <div>
                <p className="editorial-meta">More work</p>
                <h3 className="mt-2 editorial-subheading text-[var(--ink)]">Supporting systems & experiments</h3>
              </div>
              <span className="editorial-meta">{String(secondary.length).padStart(2, "0")} projects</span>
            </div>

            <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
              {secondary.map((project) => (
                <article key={project.id} className="grid gap-5 py-7 sm:grid-cols-[auto_1fr_auto] sm:items-start sm:gap-8">
                  <span className="editorial-meta pt-1">{String(project.id).padStart(2, "0")}</span>
                  <div>
                    <h4 className="font-display text-2xl font-semibold leading-tight tracking-[-0.03em] text-[var(--ink)]">{project.title}</h4>
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--ink-soft)]">{project.description}</p>
                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-[var(--ink-muted)]">
                      {project.tags.slice(0, 5).map((item) => <span key={item}>{item}</span>)}
                    </div>
                  </div>
                  <div className="flex gap-5 sm:pt-1">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="editorial-link" aria-label={"GitHub: " + project.title + " (opens in a new tab)"}>
                        <Github size={17} aria-hidden="true" />
                      </a>
                    )}
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noopener noreferrer" className="editorial-link" aria-label={"Live project: " + project.title + " (opens in a new tab)"}>
                        <ExternalLink size={17} aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {projects.length === 0 && (
          <div className="border-y border-[var(--border)] py-24 text-center text-sm text-[var(--ink-muted)]">
            No projects match “{query}”.
          </div>
        )}
      </div>
    </section>
  );
}
