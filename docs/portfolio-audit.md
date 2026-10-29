# Portfolio engineering audit

**Repository:** [NamaniNikhil/orchids-personal-portfolio](https://github.com/NamaniNikhil/orchids-personal-portfolio)  
**Target branch:** `main`  
**Audit checkpoint:** 2026-10-28  
**Scope:** source/configuration and GitHub workflow review through repository connector. Local checkout/browser automation is not available through this connection; checks are explicitly marked rather than inferred.

## 1. Executive summary

The repository already has a substantial technical-editorial redesign across the homepage, project case studies, work history, capabilities, about/education, and contact/footer. Preserve that work rather than re-redesigning it. The strongest verified release-quality defect is that the production Next.js configuration ignores TypeScript build errors and ESLint build checks. The lint script also uses `next lint`, which was removed in Next.js 16; the repository package manifest specifies Next.js 15.5.7 while its lockfile root specifies Next.js 16.0.1, React 19.2.0 and a different dependency set. That manifest/lockfile divergence can make installs and CI behaviour non-reproducible.

## 2. Architecture and baseline

- Next.js App Router with TypeScript and React; static export to `out/` for GitHub Pages.
- Tailwind CSS 4, Framer Motion/Motion, GSAP, Lenis, theme provider; content-driven sections live under `src/components` and `src/data/content.json`.
- Deployment workflow: `.github/workflows/deploy.yml`; runs `npm install --legacy-peer-deps`, `npm run build`, uploads `./out`, deploys only from `main`.
- Main latest observed commit: `8ad453a5609e2712f786a0543d4853483e9cfcd1` (Phase 12 contact/footer polish); Actions run #60 completed successfully on 2026-09-26.
- Existing work: PRs #1–#19 document a multi-stage redesign; do not duplicate it. Branches observed: `main`, `develop`, and this audit branch.
- Baseline source/config observations:
  - `next.config.ts`: `typescript.ignoreBuildErrors: true` and `eslint.ignoreDuringBuilds: true`.
  - `package.json`: `next: 15.5.7`, `eslint-config-next: ^16.0.1`, lint script `next lint`.
  - `package-lock.json` root describes `next: 16.0.1`, `react: 19.2.0`, `eslint-config-next: 16.0.1` and a materially different dependency graph than the manifest.
  - `src/app/layout.tsx` sets only basic title/description metadata; no Open Graph/Twitter metadata observed in this file.
  - Layout includes externally hosted Orchids browser logging and route messenger scripts, including a wildcard target origin on the route messenger. It also includes a debug/config custom data payload. Confirm whether these integration scripts are required in the public production site; do not remove without validating the integration dependency.
- Local baseline commands could not be run from the available GitHub connector; remote main Pages build succeeded on the latest observed run. This is not equivalent to local source lint/type-check, browser, accessibility, or runtime validation.

## 3. External benchmark references and applicable lessons

| Reference | URL | Transferable lesson | Applicability |
|---|---|---|---|
| Brittany Chiang portfolio | https://brittanychiang.com/ | Strong first-screen identity and role; projects and experience are easy to scan; project descriptions connect technology to purpose. | High; retain this repository's existing case-study hierarchy and ensure project evidence is credible. |
| Roshis Rai portfolio | https://www.roshis.dev/ | Clear headline, concise capability statement and two high-value calls to action. | High; keep recruiter paths short and obvious on mobile. |
| Ankit portfolio | https://ankitt.dev/ | Immediate role definition and differentiated typographic scale. | Medium; visual effects are optional, clear hierarchy is the useful principle. |
| Pravir Raghu portfolio | https://www.pravirraghu.co.za/ | Minimal hero, direct work/contact actions, restrained visual chrome. | High; consistent with this site's editorial design. |
| Chris Waitt portfolio case study | https://cwaitt.dev/projects/portfolio | Theme support and obvious project/tech navigation. | Medium; preserve theme controls, verify contrast in both themes. |
| W3C WCAG 2.2 | https://www.w3.org/TR/WCAG22/ | Use testable accessibility criteria, especially focus visibility, target size, keyboard operation, reflow, and contrast. | High; use as manual + automated baseline, not as an automated-certification claim. |
| web.dev | https://web.dev/ | Prioritize user-centric performance and Core Web Vitals measurement rather than assuming a successful build means a fast page. | High; production field/lab measurements remain to be run. |
| Next.js TypeScript build configuration | https://nextjs.org/docs/app/api-reference/config/next-config-js/typescript | Ignoring build-time TypeScript errors bypasses a critical safety gate; if disabled, an explicit type-check must run separately. | Very high; directly matches confirmed config. |
| Next.js ESLint configuration | https://nextjs.org/docs/app/api-reference/config/eslint | Run ESLint as a dedicated CI step; `next lint` is removed in Next.js 16. | Very high; lint script and lockfile indicate a version mismatch risk. |
| Anthropic engineering best practices | https://www.anthropic.com/engineering/claude-code-best-practices | Explore before editing, use a checklist, and iterate tests after focused changes. | High; used to structure this audit and its verification evidence. |

Research reviewed live on 2026-10-28. These references informed the prioritization below; no external design was copied.

## 4. Findings with evidence

### AUD-001 — P1: Production build bypasses TypeScript and ESLint gates
- **Evidence:** `next.config.ts` sets `typescript.ignoreBuildErrors: true` and `eslint.ignoreDuringBuilds: true`.
- **Risk:** a successful deployment build can ship type errors and lint defects.
- **Acceptance:** remove these blanket bypasses, or run explicit equivalent type-check and lint steps as required CI gates; deployment cannot be green if either fails.

### AUD-002 — P1: Manifest and lockfile disagree on framework/runtime dependencies
- **Evidence:** `package.json` lists Next.js 15.5.7 and React 19.0.0; the checked-in `package-lock.json` root lists Next.js 16.0.1 and React 19.2.0, along with a materially different dependency list.
- **Risk:** installs may resolve a different app than the manifest describes; lint command compatibility is uncertain.
- **Acceptance:** choose one known-good dependency graph based on actual source compatibility, regenerate the lockfile using the repo's configured package manager, and prove `npm ci` + build + lint/type-check work in CI.

### AUD-003 — P2: Lint command may not work with locked Next.js 16
- **Evidence:** `package.json` defines `lint: next lint`; Next.js official guidance says `next lint` is removed starting with Next.js 16 (https://nextjs.org/docs/app/api-reference/config/eslint).
- **Risk:** lint cannot be reliably invoked in the apparent lockfile environment.
- **Acceptance:** `npm run lint` runs ESLint CLI successfully and returns non-zero on a deliberate lint error; no suppressions to get a green build.

### AUD-004 — P2: SEO/share metadata incomplete in root layout
- **Evidence:** `src/app/layout.tsx` declares title and description only; no canonical/open-graph/Twitter settings observed there.
- **Risk:** social preview appearance and canonical/indexing configuration may be incomplete.
- **Acceptance:** add accurate base metadata and social-sharing metadata using the actual canonical deployment origin only when confirmed; do not invent a production URL. Ensure build exports metadata tags.

### AUD-005 — P2: Third-party instrumentation scripts need production-scope review
- **Evidence:** `src/app/layout.tsx` imports external scripts from a Supabase-hosted public bucket; route messenger is configured with `data-target-origin="*"`, debug enabled, and generic sample custom data.
- **Risk:** unnecessary third-party requests and broad message-origin configuration in public production pages; actual requirement/receiver is unknown.
- **Acceptance:** establish whether the integration is required for production; if not, gate it to the development/editor environment. If required, constrain message origin to the exact expected origin and remove debug/example data. Verify the editor integration remains functional.

### AUD-006 — P2: Public social/profile and project links need automated reachability validation
- **Evidence:** `src/data/content.json` contains multiple external project links; some later projects have no repository link while one links only to the profile root.
- **Risk:** reviewer paths may be less informative or stale.
- **Acceptance:** automated URL check for every non-null project/social URL; record status and explicitly retain any known-good profile/homepage links without fabricating per-project repositories.

### AUD-007 — P3: Local browser/accessibility/performance evidence missing from this execution environment
- **Evidence:** GitHub connector exposes repository contents and Actions metadata but not a runnable checkout or browser.
- **Risk:** layout, keyboard, console, network and real responsive behaviour cannot be asserted from source alone.
- **Acceptance:** CI or a local runner should execute automated accessibility/browser checks at representative desktop/mobile widths; manual keyboard and reduced-motion checks must be recorded separately.

## 5. Prioritized remediation checklist

| ID | Priority | Required acceptance criteria | Status |
|---|---|---|---|
| AUD-001 | P1 | Build cannot pass while TypeScript/lint defects exist; validate exact source in CI. | Identified; implementation requires source/build feedback. |
| AUD-002 | P1 | `npm ci` uses lockfile consistent with manifest; full production build passes. | Identified; lockfile needs regeneration and CI confirmation. |
| AUD-003 | P2 | `npm run lint` runs current ESLint CLI; no broad suppressions. | Identified; validate through CI. |
| AUD-004 | P2 | Correct title/description + share metadata; canonical only with verified deployment URL. | Identified; safe metadata can be added after origin confirmation. |
| AUD-005 | P2 | Third-party scripts justified, origin constrained, debug/sample settings removed or safely gated. | Requires confirming actual Orchids integration requirements. |
| AUD-006 | P2 | Script checks all actual non-null outbound URLs and provides reproducible failure output. | Add only in an environment with outbound access. |
| AUD-007 | P3 | Desktop/mobile browser, keyboard, accessibility and performance checks have recorded evidence. | Blocked by no browser/local runtime in GitHub connector. |

## 6. Implementation and verification strategy

1. Work only on a feature branch. Keep audit evidence separate from speculative changes.
2. Fix dependency reproducibility first; do not guess between Next.js 15 and 16 while the manifest/lockfile disagree.
3. Re-enable type and lint gates only after any real baseline failures have been fixed. Add dedicated `typecheck`/lint commands to CI as needed.
4. Run `npm ci`, type checking, linting, production build, URL checks, responsive browser checks, automated accessibility scans and keyboard/reduced-motion review.
5. Review exact diff, keep project identity/content factual, and verify Pages deploy after merge.

## 7. Baseline failures versus regressions

- **Pre-existing confirmed defects:** manifest/lockfile mismatch; disabled TypeScript and ESLint build validation; potentially incompatible `next lint` command; limited metadata; wildcard target-origin/debug instrumentation.
- **Remote baseline:** latest observed main Actions run #60 succeeded on 2026-09-26. This validates that run only, not local lint/type-check or browser/accessibility.
- **Regressions introduced by this audit branch:** none from application source. This checkpoint documents findings only.
- **Not executed:** local install/build/lint/type-check, web browser E2E, mobile/tablet visual tests, axe/WCAG scan, route/link reachability, runtime console/network capture, Lighthouse/Core Web Vitals. The connected GitHub operations do not provide a local runtime/browser or npm execution.

## 8. Final results

- Research documented with direct source links above.
- Main baseline identified from repository/Actions APIs.
- A feature branch checkpoint is prepared for this audit.
- Full remediation and merge are **not certified by this document alone**. Do not merge until the in-scope quality gates have real, current results and the external instrumentation's purpose is known.
- PR URL and merge SHA: pending successful implementation, checks, and merge.
