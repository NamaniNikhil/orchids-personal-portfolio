"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import content from "@/data/content.json";

const capabilityConfig = [
  {
    id: "software",
    label: "Software engineering",
    scope: "Application code, APIs, automation, and delivery workflows.",
    skills: ["Python", "TypeScript", "JavaScript", "Git", "Docker", "CI/CD"],
  },
  {
    id: "data",
    label: "Data engineering",
    scope: "Pipelines, analytical models, warehousing, and transformation.",
    skills: [
      "SQL",
      "Snowflake",
      "BigQuery",
      "Redshift",
      "Azure Synapse",
      "PostgreSQL",
      "Airflow",
      "dbt",
      "Kafka",
      "Spark",
    ],
  },
  {
    id: "ai",
    label: "AI / ML engineering",
    scope: "Data and software foundations for practical AI-enabled systems.",
    skills: ["Python", "Spark", "SQL"],
  },
  {
    id: "cloud",
    label: "Cloud & platform",
    scope: "Cloud environments and infrastructure for reliable delivery.",
    skills: ["Azure", "GCP", "AWS", "Docker", "Kubernetes", "CI/CD"],
  },
] as const;

const sourceSkills = Object.values(content.skills).flat();
const allSkills = Array.from(new Set(sourceSkills));

export function Skills() {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();

  const filteredCapabilities = useMemo(
    () =>
      capabilityConfig
        .map((capability) => ({
          ...capability,
          skills: capability.skills.filter((skill) =>
            normalizedQuery ? skill.toLowerCase().includes(normalizedQuery) : true
          ),
          matchesScope:
            capability.label.toLowerCase().includes(normalizedQuery) ||
            capability.scope.toLowerCase().includes(normalizedQuery),
        }))
        .filter(
          (capability) =>
            !normalizedQuery || capability.matchesScope || capability.skills.length > 0
        ),
    [normalizedQuery]
  );

  const matchedSkillCount = normalizedQuery
    ? allSkills.filter((skill) => skill.toLowerCase().includes(normalizedQuery)).length
    : allSkills.length;

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative overflow-hidden bg-[var(--background)] section-space"
    >
      <div className="page-container">
        <div className="grid gap-10 border-b border-[var(--border)] pb-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-16">
          <div>
            <p className="editorial-kicker mb-4">Capabilities</p>
            <h2 id="skills-heading" className="editorial-heading text-[var(--ink)]">
              The tools matter.
              <br />
              <span className="text-[var(--ink-muted)]">The systems matter more.</span>
            </h2>
          </div>
          <p className="editorial-copy max-w-2xl text-[var(--ink-soft)] lg:justify-self-end">
            The technical range behind the work: software, data, cloud platforms,
            and the engineering foundations around practical AI.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-b border-[var(--border)] pb-5 sm:flex-row sm:items-center sm:justify-between">
          <label className="relative block w-full max-w-sm">
            <span className="sr-only">Search capabilities and technologies</span>
            <Search size={16} aria-hidden="true" className="absolute left-0 top-1/2 -translate-y-1/2 text-[var(--ink-muted)]" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search technologies"
              className="w-full border-b border-[var(--input)] bg-transparent py-3 pl-7 pr-2 text-sm text-[var(--ink)] placeholder:text-[var(--ink-muted)] outline-none focus:border-[var(--accent)]"
            />
          </label>
          <p className="text-sm text-[var(--ink-muted)]">{matchedSkillCount} technologies indexed</p>
        </div>

        <div className="mt-12 border-y border-[var(--border)]">
          {filteredCapabilities.map((capability, index) => (
            <motion.article
              key={capability.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-64px" }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
              className="grid gap-7 border-b border-[var(--border)] py-9 last:border-b-0 lg:grid-cols-[0.72fr_1fr] lg:gap-16 lg:py-10"
            >
              <div>
                <h3 className="font-display text-3xl font-semibold leading-none tracking-[-0.04em] text-[var(--ink)] sm:text-4xl">
                  {capability.label}
                </h3>
                <p className="mt-4 max-w-md text-sm leading-6 text-[var(--ink-soft)]">{capability.scope}</p>
              </div>
              <div className="grid gap-5 sm:grid-cols-[auto_1fr] sm:gap-8">
                <p className="editorial-meta text-[var(--ink-muted)]">Technologies</p>
                <div className="flex flex-wrap content-start gap-x-5 gap-y-3">
                  {capability.skills.map((skill) => <span key={skill} className="text-sm text-[var(--ink-soft)]">{skill}</span>)}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {filteredCapabilities.length === 0 && (
          <div className="border-y border-[var(--border)] py-20 text-center text-sm text-[var(--ink-muted)]">
            No capabilities match “{query}”.
          </div>
        )}
      </div>
    </section>
  );
}
