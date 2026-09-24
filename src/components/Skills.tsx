"use client";

import { useMemo, useState } from "react";
import {
  BrainCircuit,
  Cloud,
  Code2,
  Database,
  Layers3,
  Search,
} from "lucide-react";
import content from "@/data/content.json";
import { motion } from "framer-motion";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";

const capabilityConfig = [
  {
    id: "software",
    label: "Software Engineering",
    icon: Code2,
    eyebrow: "01 / Software",
    description: "Application code, automation, APIs, and developer workflows.",
    skills: ["Python", "TypeScript", "JavaScript", "Git", "Docker", "CI/CD"],
  },
  {
    id: "data",
    label: "Data Engineering",
    icon: Database,
    eyebrow: "02 / Data",
    description: "Reliable pipelines, analytical models, warehousing, and transformation.",
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
    label: "AI / ML Engineering",
    icon: BrainCircuit,
    eyebrow: "03 / AI",
    description: "Machine learning foundations and the engineering layer around AI products.",
    skills: ["Python", "Spark", "SQL"],
  },
  {
    id: "cloud",
    label: "Cloud & Platform",
    icon: Cloud,
    eyebrow: "04 / Platform",
    description: "Cloud infrastructure and systems designed for scale and delivery.",
    skills: ["Azure", "GCP", "AWS", "Docker", "Kubernetes", "CI/CD"],
  },
] as const;

const capabilitySkillSet = new Set(
  capabilityConfig.flatMap((capability) => capability.skills)
);

const sourceSkills = Object.values(content.skills).flat();

const allSkills = Array.from(
  new Set([...sourceSkills, ...capabilitySkillSet])
);

export function Skills() {
  const [query, setQuery] = useState("");
  const [activeCapability, setActiveCapability] = useState("all");

  const normalizedQuery = query.trim().toLowerCase();

  const filteredCapabilities = useMemo(() => {
    return capabilityConfig
      .filter(
        (capability) =>
          activeCapability === "all" || capability.id === activeCapability
      )
      .map((capability) => ({
        ...capability,
        skills: capability.skills.filter((skill) =>
          normalizedQuery ? skill.toLowerCase().includes(normalizedQuery) : true
        ),
        matches:
          capability.label.toLowerCase().includes(normalizedQuery) ||
          capability.description.toLowerCase().includes(normalizedQuery),
      }))
      .filter(
        (capability) =>
          !normalizedQuery || capability.matches || capability.skills.length > 0
      );
  }, [activeCapability, normalizedQuery]);

  const matchedSkillCount = normalizedQuery
    ? allSkills.filter((skill) => skill.toLowerCase().includes(normalizedQuery)).length
    : allSkills.length;

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative overflow-hidden border-t border-white/8 bg-[#030303] py-28 sm:py-36"
    >
      <div className="pointer-events-none absolute inset-0 opacity-60" aria-hidden="true">
        <div className="absolute left-0 top-1/4 h-[520px] w-[520px] rounded-full bg-cyan-500/5 blur-[160px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="grid gap-8 border-b border-white/10 pb-14 lg:grid-cols-[0.8fr_1.7fr] lg:gap-16">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-cyan-400">
                03 / Capabilities
              </p>
            </div>
            <div>
              <h2
                id="skills-heading"
                className="max-w-4xl text-5xl font-semibold tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl"
              >
                The tools matter.
                <span className="text-white/35"> The systems matter more.</span>
              </h2>
              <p className="mt-7 max-w-2xl text-base leading-7 text-white/50 sm:text-lg">
                A capability-focused view of the technologies I use to build
                data platforms, software systems, and AI-enabled products.
              </p>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.08}>
          <div className="mt-10 flex flex-col gap-5 border-b border-white/10 pb-6 lg:flex-row lg:items-center lg:justify-between">
            <label className="relative block w-full lg:max-w-sm">
              <span className="sr-only">Search capabilities and technologies</span>
              <Search
                size={16}
                aria-hidden="true"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
              />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search technologies..."
                className="w-full border-b border-white/15 bg-transparent py-3 pl-10 pr-4 text-sm text-white placeholder:text-zinc-600 focus:border-cyan-300 focus:outline-none"
              />
            </label>

            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Filter capabilities"
            >
              <button
                type="button"
                aria-pressed={activeCapability === "all"}
                onClick={() => setActiveCapability("all")}
                className={activeCapability === "all"
                  ? "rounded-full bg-white px-4 py-2 text-xs font-medium text-black"
                  : "rounded-full border border-white/10 px-4 py-2 text-xs text-zinc-500 transition-colors hover:border-white/20 hover:text-white"}
              >
                All
              </button>
              {capabilityConfig.map((capability) => (
                <button
                  type="button"
                  key={capability.id}
                  aria-pressed={activeCapability === capability.id}
                  onClick={() => setActiveCapability(capability.id)}
                  className={activeCapability === capability.id
                    ? "rounded-full border border-cyan-300/40 bg-cyan-300/10 px-4 py-2 text-xs font-medium text-cyan-200"
                    : "rounded-full border border-white/10 px-4 py-2 text-xs text-zinc-500 transition-colors hover:border-white/20 hover:text-white"}
                >
                  {capability.label}
                </button>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 lg:grid-cols-2">
          {filteredCapabilities.map((capability, index) => {
            const Icon = capability.icon;

            return (
              <motion.article
                key={capability.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.55, delay: index * 0.06 }}
                className="group bg-[#080808] p-7 sm:p-9"
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-700">
                      {capability.eyebrow}
                    </p>
                    <h3 className="mt-4 max-w-sm text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">
                      {capability.label}
                    </h3>
                  </div>
                  <Icon
                    size={22}
                    aria-hidden="true"
                    className="shrink-0 text-cyan-300/70 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </div>

                <p className="mt-4 max-w-md text-sm leading-6 text-zinc-500">
                  {capability.description}
                </p>

                <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 border-t border-white/8 pt-6">
                  {capability.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-sm text-zinc-300 transition-colors group-hover:text-white"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>

        {filteredCapabilities.length === 0 && (
          <div className="py-20 text-center text-sm text-zinc-600">
            No capabilities match “{query}”.
          </div>
        )}

        <div className="mt-8 flex items-center justify-between text-xs uppercase tracking-[0.16em] text-zinc-700">
          <span className="inline-flex items-center gap-2">
            <Layers3 size={13} aria-hidden="true" />
            Capability map
          </span>
          <span>{matchedSkillCount} technologies indexed</span>
        </div>
      </div>
    </section>
  );
}
