# Portfolio engineering audit

**Repository:** [NamaniNikhil/orchids-personal-portfolio](https://github.com/NamaniNikhil/orchids-personal-portfolio)  
**Target:** `main`  
**Updated:** 2026-10-28  
**Evidence scope:** GitHub repository files, pull requests, Actions metadata and run logs; live external benchmark research.

## Executive summary

This is a Next.js App Router / TypeScript portfolio, styled with Tailwind CSS 4 and supporting animation/theme libraries. The established editorial redesign and factual project content should be preserved. The main release risks verified from repository files and CI are reproducibility (the package manifest and lockfile describe different dependency graphs), and a failing ESLint flat/legacy configuration conversion. Pull request [#20](https://github.com/NamaniNikhil/orchids-personal-portfolio/pull/20) already contains the broad audit, metadata and quality-gate changes; this follow-up fixes the specific lint configuration error on that branch rather than opening a duplicate audit PR.

**Do not merge until the latest CI run is green.** The execution surface can read/write GitHub but cannot run npm locally or operate a browser, so local build, browser, accessibility and performance results cannot be honestly claimed.

## Repository architecture and baseline

- Default/target branch: `main`; GitHub confirms this is `NamaniNikhil/orchids-personal-portfolio`, public, TypeScript, and writable by the connected account.
- Framework: Next.js App Router, TypeScript, React, Tailwind CSS 4; static export to `out/` and GitHub Pages deployment through `.github/workflows/deploy.yml`.
- Content is driven partly by `src/data/content.json`; assets/public files and root app components live under `src/` and `public/`.
- Recent feature work: PRs #1–#19 include a multi-phase editorial portfolio redesign; retain it rather than gratuitously reworking the site.
- PR #20, `fix: restore portfolio quality gates and metadata`, already existed as an open PR targeting `main` at the start of this follow-up. It has no submitted reviews or inline threads at the latest inspection.
- Main baseline commit recorded by PR #20: `8ad453a5609e2712f786a0543d4853483e9cfcd1`; prior successful Pages build run #60 is dated 2026-09-26. This only proves that historical run succeeded, not that newly enforced checks pass.

## External benchmark references and actionable lessons

Live search and original documentation reviewed 2026-10-28. Examples are design references, not designs to copy.

| Reference | URL | Lesson applied / relevance |
|---|---|---|
| Brittany Chiang | https://brittanychiang.com/ | Clear role and concise opening, strong typographic hierarchy, easy project/experience scan. High relevance; preserve identity and improve scanning, not copy styling. |
| Roshis Rai | https://www.roshis.dev/ | Concise headline and direct work/contact paths. High relevance for recruiter usability and mobile navigation. |
| Ankit portfolio | https://ankitt.dev/ | Role definition and deliberate type scale should precede decorative effects. Medium relevance. |
| Pravir Raghu | https://www.pravirraghu.co.za/ | Restrained chrome and direct calls to action. High relevance to existing editorial design. |
| Chris Waitt portfolio case study | https://cwaitt.dev/projects/portfolio | Theme-aware presentation and straightforward navigation to work/technologies. Medium relevance; retain theme support and verify contrast. |
| W3C WCAG 2.2 | https://www.w3.org/TR/WCAG22/ | Check keyboard usability, focus visibility/not obscured, contrast, target size and 320 CSS-pixel reflow; automated scans alone cannot certify conformance. High relevance. |
| web.dev | https://web.dev/ | Use actual Core Web Vitals and production/lab measurements rather than treating a successful build as performance proof. High relevance; measurements remain unavailable in this environment. |
| Next.js ESLint docs | https://nextjs.org/docs/app/api-reference/config/eslint | Run ESLint CLI directly; Next.js 16 removed `next lint`. The current config failure is addressed with a compatibility config that avoids the circular legacy plugin schema serialization error. High relevance. |
| Next.js v16 upgrade guide | https://nextjs.org/docs/app/guides/upgrading/version-16 | Next 16 removes `next lint` and the `eslint` Next config option; configure lint as its own CI command. High relevance. |
| ESLint configuration guide | https://eslint.org/docs/latest/use/configure/configuration-files | Flat config should be an explicit array and should have intentional ignore paths. High relevance for the fix and CI coverage. |
| Anthropic engineering best practices | https://www.anthropic.com/engineering/claude-code-best-practices | Explore first, make incremental changes, and repeat tests after focused repairs. Relevant to the documented review/repair loop. |

## Findings and prioritized checklist

### AUD-001 — P1 — Production validation gates had been disabled
**Evidence:** baseline `next.config.ts` contained `typescript.ignoreBuildErrors: true` and `eslint.ignoreDuringBuilds: true`. PR #20 removes these settings and adds explicit typecheck/lint CI steps.  
**Acceptance:** TypeScript check and lint run before production build; no broad bypass remains; actual latest PR workflow passes.  
**Status:** Code changes present on PR #20's base work; workflow still failing at lint at last observed run.

### AUD-002 — P1 — Manifest and lockfile dependency graph diverge
**Evidence:** `package.json` describes Next.js 15.5.7 / React 19.0.0; `package-lock.json` root is named `app`, version `0.1.0`, and describes Next.js 16.0.1 / React 19.2.0 plus a materially different dependency list. CI `npm install --legacy-peer-deps` installs 837 packages and reports 27 advisories (1 low, 12 moderate, 12 high, 2 critical), plus a warning for the declared Next.js 15.5.7 version.  
**Acceptance:** run the chosen package manager in a real Node environment to regenerate and reconcile the lockfile; prove clean lockfile install + build + lint + typecheck; inspect full advisory paths and resolve applicable direct/transitive vulnerabilities.  
**Status:** Open; do not guess-regenerate a 300 KB lockfile using repository-contents APIs.

### AUD-003 — P1 — CI lint configuration crashes
**Evidence:** PR workflow run #67 (head `26abf98821c7130bd54bde9c17cff03bcb76c69e`) completed with failure: installation succeeded; `npm run typecheck` succeeded; `npm run lint` exited 2. Log shows ESLint 9.38.0 / `@eslint/eslintrc` `ConfigValidator.formatErrors` serializing a circular `react` plugin configuration, and production build/upload were skipped.  
**Implementation on follow-up branch:** replaced the combined `FlatCompat.config({ extends: ["next/core-web-vitals", "next/typescript"], plugins: ["import"] })` conversion with `compat.extends("next/core-web-vitals")`, added explicit ignore entries, and retained existing rule values. This follows the legacy compatibility approach documented by ESLint/Next and removes the extra TypeScript preset/plugin validation path that triggers the circular serialization.  
**Acceptance:** latest PR workflow must show the lint step completed successfully, then production build and artifact upload pass.  
**Status:** Implemented on `fix/portfolio-eslint-quality-gate`; a new run is not yet observed.

### AUD-004 — P2 — Share/SEO metadata was limited
**Evidence:** baseline `src/app/layout.tsx` had title and description only. PR #20 adds descriptive title/description, Open Graph, Twitter large-image card metadata, and robots; canonical intentionally omitted rather than inventing the production URL.  
**Acceptance:** output includes accurate title, description, Open Graph/Twitter/robots metadata and no fictional canonical URL.  
**Status:** Implemented on PR #20; build/rendered HTML not yet reverified after lint fix.

### AUD-005 — P2 — Third-party Orchids instrumentation requires production-scope review
**Evidence:** `src/app/layout.tsx` includes external Orchids browser-log and route messenger scripts; the messenger uses `data-target-origin="*"`, debug mode, and generic custom data.  
**Acceptance:** confirm integration purpose and actual receiver origin before changing it; if used in public production, constrain target origin and remove sample/debug data only after proving editor compatibility.  
**Status:** Documented, intentionally unchanged due to missing integration/runtime evidence.

### AUD-006 — P2 — External portfolio links need reachability validation
**Evidence:** `src/data/content.json` contains external project/social URLs and some project records intentionally have no specific repository link.  
**Acceptance:** check every populated URL from a network-capable runner and document broken ones without inventing project links.  
**Status:** Not executed; no network-capable repository runtime available here.

### AUD-007 — P2 — Responsive/accessibility/runtime evidence is absent
**Evidence:** GitHub repository/Actions connector does not provide a runnable app or browser UI for this task.  
**Acceptance:** browser-based checks at mobile (320/375/390 CSS px), tablet and desktop; keyboard navigation/focus, reduced motion, 200–400% zoom/reflow; automated WCAG scan plus manual review; inspect console/network and record Lighthouse/Core Web Vitals where available.  
**Status:** Not executed; explicitly not reported as passed.

## Implementation and verification strategy

1. Continue the existing audit PR's branch instead of duplicating it; this follow-up uses a new branch from the PR's current base work.
2. Fix lint configuration narrowly and keep the existing rules. Do not weaken assertions or remove check steps.
3. Treat remote GitHub Actions as the truth source for typecheck/lint/build. Inspect each failing step's job log and rerun after fixes.
4. Reconcile package manifest + lockfile in a real npm runtime before merge; avoid mass-lockfile edits without a deterministic package-manager result.
5. Validate third-party scripts only with runtime context; do not change the Orchids/editor integration speculatively.
6. On a network-capable runner, verify links, browser flows, responsive views, accessibility and performance.

## Baseline failures vs. changes in this follow-up

**Pre-existing/confirmed:** package/lockfile mismatch; CI lint circular-config exception; reported dependency advisories; prior build bypasses (addressed in PR #20); root metadata limitation (addressed in PR #20); third-party instrumentation scope is unverified.  
**Follow-up change:** ESLint config adjustment only. No portfolio content or visual redesign is included in this follow-up.  
**Not run here:** local npm install/clean install, build, browser E2E, visual snapshots, link checks, axe/WCAG scan, manual keyboard/reduced-motion checks, console/network capture, Lighthouse or Core Web Vitals.

## Current verification results

| Check | Latest evidence | Result |
|---|---|---|
| Repository identity and default branch | GitHub repo metadata | Pass |
| TypeScript check | PR run #67, `npm run typecheck` | Pass for commit `26abf98` |
| ESLint | PR run #67, `npm run lint` | Fail for `26abf98`; targeted config repair is newer and needs a fresh run |
| Production build / upload | PR run #67 | Skipped after lint failure |
| Install | PR run #67 | Succeeded using `npm install --legacy-peer-deps`; dependency warnings/advisories emitted |
| Lockfile reproducibility | Manifest and lockfile inspection | Fail/unresolved mismatch |
| Browser/accessibility/performance | No browser/runtime available through connector | Not run |
| PR reviews and inline threads | GitHub review/thread APIs | None present at last inspection |
| Merge | GitHub PR state | Not merged; release gates not green |

## PR / merge record

- Existing PR: https://github.com/NamaniNikhil/orchids-personal-portfolio/pull/20 — open, targets `main`; latest verified status remains failing until a newer run proves otherwise.
- Follow-up branch: `fix/portfolio-eslint-quality-gate`, based on `audit/portfolio-quality-gates`.
- Follow-up commit: `c1ac465b32b317a1010e0ef6df5bee95555d3e28` — `fix: avoid circular legacy ESLint plugin config`.
- Merge SHA: none.
- Do not merge while the latest PR run is not green, the dependency graph is inconsistent, and critical validation remains unexecuted.
