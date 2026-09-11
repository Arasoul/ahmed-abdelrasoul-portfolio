# Portfolio Analysis — Ahmed Abdelrasoul (`v3`)

**Date:** Sep 11, 2026 · **Version analyzed:** working tree on HEAD `90994f8` (all analysis-era changes uncommitted) · **Stack:** React 19 / TypeScript 6 / Vite 8 / Tailwind 4 / Framer Motion / React Router 7 / Vitest

> Verification performed at this revision: `npm run lint` (oxlint) ✅ clean · `npx tsc --noEmit` ✅ clean · `npx vitest run` ✅ **37/37 passing, 3 files** · `npm run build` ✅ production build (base `/`, 0.6 s) · `npm run preview` smoke ✅ (`/` 200, `/projects/auto-bi` 200, deep unknown route 200 via SPA fallback, `/favicon.svg` 200) · dist sweep ✅ no `sk-*` / `VITE_*_API_KEY` / `LLM_API_KEY` tokens.

---

## 1. What the folder is

A production-ready, single-page **engineering portfolio + case-study archive** for **Ahmed Abdelrasoul (Arasoul)**, an AI & Data Engineer from Cairo. It is not a simple "projects list" site — it is a **content-driven product** built around a seven-chapter narrative architecture and a custom retrieval assistant backed by a serverless LLM proxy.

- **Seven chapters (final narrative):** **Origin → Map → Systems → Experience → Engineering → Now → Connect** (`NN / 07` derived from `src/data/chapters.ts` via `chapterNumber()`; integrity tests assert `systems = 03/07`, `experience = 04/07`, `engineering = 05/07`). Experience sits at chapter 04 per the V4 brief.
- **Education + credentials** are a compact module inside the Experience chapter (driven from `personalInfo.education`; reuses existing `.exp-divider`/`.exp-history` styles, zero new CSS) — no standalone chapter.
- **Single source of truth for CTAs & index:** `projectCtaUrl()`, `indexPriorityIds`, `allIndexedProjectIds()` in `src/data/projects.ts` are consumed by both `SystemsProducts.tsx` and `ProjectCaseStudyPage.tsx`; `auto-analytics` is indexed (fix + regression test).
- **Two page templates:** the one-scroll **HomePage** and route-split lazy-loaded **`/projects/:id`** case-study pages.
- **Typed `src/data/` layer** (`projects` (24), `experience`, `certifications`, `skills` (4 capability groups), `personal`, `chapters`) drives the UI, the assistant, and the test suite. `Experience.current` is now a **required** field (compile-time enforced; `current: false` padded on past roles).
- **Portfolio Intelligence assistant:** the browser only calls **`api/portfolio-ai.ts`** (serverless proxy to an OpenAI-compatible endpoint). No key in the bundle (only `VITE_LLM_ENABLED` flag; server reads `LLM_API_KEY`/`LLM_ENDPOINT`/`LLM_MODEL`, model default `gpt-4o-mini`). Local deterministic `answer(text)` retrieval remains the offline/static-host fallback (45 s abort).
- **Deploys to Vercel** (`arasoul.dev`; `/api/portfolio-ai` runs there) and ships a **GitHub Pages** workflow (`.github/workflows/deploy.yml`: lint + test + typecheck + `VITE_GITHUB_PAGES=true` build, plus `404.html` SPA fallback). Base path derives from the repo name at build time (`vite.config.ts` `pagesBase` from `GITHUB_REPOSITORY`, set only in Actions). Favicon/touch-icon tags use `%BASE_URL%favicon.*` so they resolve under the Pages sub-path (simulated Pages build emitted `/portfolio/favicon.svg` correctly).

**Stack notes:** Vite 8 + `@vitejs/plugin-react`, Tailwind 4 via `@tailwindcss/vite` with a large custom design-token system in `src/index.css`, React 19, React Router 7, Framer Motion, react-icons (Feather), **self-hosted latin-subset variable fonts** (Inter / JetBrains Mono / Space Grotesk — 3 woff2, ≈ 108 KB total), oxlint, Vitest. Production build is code-split (`react-vendor` / `motion` / `icons` / route chunks); main entry 143.7 kB (≈ 41 kB gzip). `package.json` enforces `engines.node >= 20`.

### Reusable description (for README / CV / socials)

> A Vite + React 19 + TypeScript engineering portfolio presenting seven chapters of work — identity, domain map, systems, experience, engineering method, current focus, and contact. Features a typed, data-driven case-study archive (24 projects), interactive pipeline visualizations (AutoBI, AI Pharaoh, Meridian Wings), a Ctrl+K command palette, dark/light theming with a floor-rail and sticky-context navigation, a contact form (Web3Forms with mailto fallback), and a built-in "Portfolio Intelligence" assistant whose browser code talks only to a key-free serverless proxy (local retrieval fallback, no secrets in the bundle). Verified with 37 Vitest data-integrity tests and a clean oxlint + `tsc -b` build; deployed to Vercel with a parallel GitHub Pages pipeline.

---

## 2. Important details & strengths

1. **Strong IA & narrative design.** The 7-chapter structure with sticky context labels, floor rail, and numbered section indices gives the site a deliberate "book" feel. Chapter labels derive from `StickyContext` (origin `IDENTITY/ORIGIN` → connect `CONNECT/BUILD TOGETHER`) and numbering derives from `chapters.ts`, so the model stays consistent.
2. **Genuinely typed data layer.** 24 projects, DEPI + ECU current roles (`currentExperienceOrder=['depi','ecu']`, past `['dolab','fuzetek','amit']` — all with required `current`), 4 capability groups, all typed in `src/types/index.ts` and guarded by `src/data/integrity.test.ts` (37 tests): duplicate IDs, broken related-links, HTTPS enforcement, gallery-image existence on disk, chapter-number formats, flagship/ecosystem cross-references, category validity, CTA integrity, education records, no-orphan discoverability, current/past partition.
3. **Content quality is high where it matters.** Flagships (AutoBI, AI Pharaoh, Meridian Wings, AutoEDA, DataPrepToolkit) have full problem/approach/solution/impact narratives with **verifiable metrics** and honest `limitations` lists. Case-study blocks are conditional (`ProjectCaseStudyPage` only renders ENGINEERING/EVIDENCE blocks when `challenges`/`technologies`/`features` exist), so thin projects degrade gracefully instead of showing empty sections.
4. **Modular, reusable engineering.** The systems chapter groups projects into a pipeline (AutoBI, AutoEDA, DataPrepToolkit, web-scraping toolkit as an ecosystem) and surfaces all 24 projects — flagships, ecosystem tools, then the secondary grid with a "View More Work" toggle and global ordering via `indexPriority` in `SystemsProducts.tsx`.
5. **Serverless LLM boundary done right.** `api/portfolio-ai.ts` guards: POST-only (405), origin allowlist + browser-key-less design (403), body/message/size caps (100 KB / 8 msgs / 8 KB), 503 without a key. A dist sweep confirmed zero `LLM_API_KEY`/`Bearer`/`sk-*` tokens in the shipped JS.
6. **Performance is genuinely tuned.** Self-hosted latin-only variable fonts (≈ 108 KB), everything code-split, `chunkSizeWarningLimit: 500` set honestly. All heavy raster images converted: 12 certificate/credential images PNG → JPEG q85 and the 3 heavy project gallery PNGs (`pharouh.png` 945 KB → 154 KB, `AutoEDA.png` 1.2 MB → 196 KB, `dataPrepToolkit.png` 1.4 MB → 204 KB, q88) — 84–86 % smaller each, refs updated in `projects.ts` + `PharaohPipeline.tsx`.
7. **Deploy strategy is thoughtful.** Vercel rewrite rules serve the SPA + `/api`; GH Pages workflow runs the full lint/test/typecheck gate with base-path derivation, `VITE_WEB3FORMS_ACCESS_KEY` now injected from the repo secret, plus `404.html` and `robots.txt` in `dist`.
8. **Accessibility basics present and hardened.** Skip link, `prefers-reduced-motion` as a live hook (`usePrefersReducedMotion`), `MotionConfig reducedMotion="user"`, aria labels, `useFocusTrap` on command palette, assistant panel, and certificate lightbox with return-focus; muted-text contrast raised to AA.
9. **Route-level SEO.** `RouteMeta` in `App.tsx` emits per-route `<title>` (`{project} — {category} | Ahmed Abdelrasoul`), description from `overview`, canonical `origin+pathname`, and og:title/twitter overrides; `robots.txt` ships; JSON-LD Person schema in `index.html`.
10. **Resilient deep-linking.** `ScrollToTop` retries the hash until the lazy case-study chunk mounts (25×/60 ms), fixing the old "hash won't scroll on `/projects/:id`" bug; theme flash prevented by the inline bootstrap; case-sensitive imports audited (passes — important for Linux CI).

---

## 3. What changed since the last analysis (same date, HEAD `90994f8`)

| Old issue / required change | Status now |
| --- | --- |
| **Experience chapter position (V4 brief)** | **Done** — data order is origin, map, systems, **experience**, engineering, now, connect; `chapterNumber()` yields `04 / 07` for Experience; integrity tests assert it. |
| **Education + credentials representation** | **Done** — compact module inside Experience driven by `personalInfo.education`; no invented standalone chapter; design/system reuse only. |
| **`LLM API key shipped in client bundle`** (`VITE_LLM_API_KEY`) | **Fixed** — key-free serverless proxy `api/portfolio-ai.ts`; only `VITE_LLM_ENABLED` flag in the client. Dist sweep clean. |
| **`Coming Soon` wrong for AutoEDA / DataPrepToolkit** | **Fixed** — single source `projectCtaUrl()` = `productUrl \|\| demo`; consumed by Systems card + case-study CTA (regression-tested). |
| **Section numbering inconsistent** (Systems printed `05 /`, hardcoded) | **Fixed** — all sections emit `chapterNumber(...)` from `chapters.ts`. |
| **VoidSpark current-flag conflict / drift class** | **Fixed** — VoidSpark dropped; `Experience.current` now required so a missing flag is a compile error; `current: false` padded on `dolab`/`fuzetek`/`amit`. |
| **~11 of 24 projects unreachable** | **Fixed** — full secondary grid (3 + "View More Work"); every project reachable via Ctrl+K, assistant, and now the shared `allIndexedProjectIds()`; `auto-analytics` was missing from the plain-text index row — added + tested. |
| **Thin case studies render empty blocks** | **Fixed** — blocks 01–07 are built conditionally from available fields. |
| **Hash deep-link not scrolling on case-study pages** | **Fixed** — `ScrollToTop` retries until the lazy chunk mounts. |
| **Cert lightbox + palette had no focus management** | **Fixed** — `useFocusTrap` on all three overlays with Escape/return-focus. |
| **Light-theme flash on first paint** | **Fixed** — inline theme bootstrap script in `index.html`. |
| **Hero `prefersReducedMotion` read once at module load** | **Fixed** — live hook now. |
| **Multi-MB PNG certificates** | **Fixed** — 12 converted to JPEG q85; refs updated. |
| **Heavy project PNGs** | **Fixed** — `pharouh`/`AutoEDA`/`dataPrepToolkit` converted PNG → JPEG q88 (3.5 MB → 554 KB), refs updated in `projects.ts` + `PharaohPipeline.tsx`. |
| **Single 521 KB JS chunk (warning suppressed at 600)** | **Fixed** — manual chunks + honest 500 KB limit; main entry ≈ 41 kB gzip. |
| **Assistant experience/current answers hardcoded** | **Fixed** — assistant is fully data-driven (`chapters.ts` order + live data), retired `flagOr`. |
| **Dead `web-applications` category** | **Fixed** — removed. |
| **README said "Google Fonts" while fonts are self-hosted / wrong `LLM_MODEL` default** | **Fixed** — documents self-hosted latin fonts, server-side LLM env (only `LLM_API_KEY` required; `LLM_MODEL` default now `gpt-4o-mini`), Vercel-recommended deployment. |
| **GH Pages favicon paths absolute** | **Fixed** — `%BASE_URL%favicon.*` in `index.html`; simulated Pages build emitted `/portfolio/favicon.svg` + `/portfolio/assets/...`. Verified. |
| **GH Pages workflow lacks form key** | **Fixed** — `VITE_WEB3FORMS_ACCESS_KEY: ${{ secrets.WEB3FORMS_ACCESS_KEY }}` added to the Build step; `.env.example` documents the var; mailto fallback remains. |
| **`og:image` reuses `favicon.png`** | **Accepted** — favicon reuses the brand square (OG-safe absolute `https://arasoul.dev/favicon.png`); per-project OG cards are the one remaining P2 suggestion, not a defect. |

---

## 4. Potential errors & issues (current)

### Open / minor (accepted, none blocking)

- **LLM assistant requires a host with `/api`.** GH Pages has no `/api`, so visitors on the mirror get silent local answers. Known and documented ("Vercel recommended"); a runtime hint is P2 polish, not a defect.
- **`api/portfolio-ai.ts` origin allowlist includes `http://localhost:5173`** — intended dev-only entry so the assistant works locally; harmless in production (never matches a live origin).
- **`og:image` is still the favicon.** Per-project OG images would improve shares (flagged P2 in §5).
- **CV updated but not visually rendered.** `public/Ahmed-CV.pdf` replaced and all `resumeUrl` links point to it; PDF content/layout not rendered for verification — leave to a human QA pass.
- **Working tree is uncommitted.** `git status` shows the whole batch (V4 chapter reorder, data-layer helpers, image conversions, `api/`, fonts, robots.txt, workflow/README updates) on top of HEAD `90994f8`. Nothing has been committed, pushed, or deployed as part of this analysis.
- **Hardcoded current-role ordering.** `currentExperienceOrder`/`pastExperienceOrder` are hand-written arrays (fine, but a new role needs three edits to stay consistent).
- **Sliver of duplicated logic remains.** Navbar uses the consolidated `useActiveChapter` hook while StickyContext and FloorRail keep their own scroll-spy implementations.

### Security notes (verified, not issues)

- The **Web3Forms access key** (`c3a325a1-…`) appears in the built bundle **by design** — Web3Forms keys are client-safe by definition and not secrets; the contact form requires them in the browser. A future dist sweep must not flag it. `VITE_LLM_API_KEY`/`sk-*`/`Bearer` tokens: **absent everywhere** (tracked text and dist).
- `.env` is **gitignored and untracked** (`git ls-files` shows only `.env.example`). No rotation needed; the key must never be committed.

---

## 5. Suggested fixes & enhancements (remaining, non-blocking)

**Priority order (P0 = do first):**

- **P0 — Commit the working tree.** This analysis validates a large finished batch; a commit (e.g. `chore: v4 brief — chapter narrative, LLM proxy, image/perf/CI hardening`) protects it.
- **P0 — Visual QA on the new CV / fonts.** Human check of `Ahmed-CV.pdf` rendering and of the latin-subset fonts at live edges (Emoji, arrows, box-drawing chars in the terminal panels).
- **P1 — Runtime LLM-mode notice.** When `VITE_LLM_ENABLED=true` on a host without `/api`, surface a "chat is limited to built-in answers" hint (a `fetch('/api/portfolio-ai')` 503 probe is enough).
- **P2 — Per-project OG images.** Emit `og:image`/`twitter:image` per route (favor an existing gallery image) — flagship case studies deserve better than a favicon in shares.
- **P3 — Consistency.** Fold StickyContext/FloorRail scroll-spy into the shared `useActiveChapter` hook; document that role ordering lives in one place.

---

## 6. Scoring

Weights reflect what matters most for a hiring-oriented engineering portfolio. Each criterion is scored 1–10 (10 = best).

| Criterion | Weight | Score | Notes |
| --- | --- | --- | --- |
| Content & storytelling | 1.3 | 9.2 | Flagships read like engineering narratives with metrics + honest limitations; all 24 projects reachable; education module integrated; thin entries degrade gracefully |
| Design & visual experience | 1.1 | 9.2 | Cohesive token system, dark/light, hero system-map, polished pipeline visuals |
| UX & navigation | 1.1 | 9.3 | Chapter rail, sticky context, Ctrl+K palette, assistant — numbering derived and consistent |
| Technical quality | 1.0 | 9.2 | Clean typed architecture; required `current` flag; single-source CTAs; clean lint/typecheck/build; 37 meaningful integrity tests |
| Performance | 1.0 | 9.1 | Split chunks (~185 KB gzip initial), latin fonts, all raster images now JPEG ≤ 204 KB |
| Accessibility | 1.0 | 8.5 | Skip link, aria, live reduced-motion, focus traps, AA muted text; manual screen-reader pass still warranted |
| SEO & metadata | 0.7 | 8.8 | Per-route title/description/canonical/OG, robots.txt, JSON-LD; `og:image` still the favicon |
| Security | 0.8 | 9.3 | Key-free server proxy, origin allowlist, size caps, clean dist sweep; Web3Forms key is client-safe by design |
| Maintainability | 0.8 | 8.6 | Data-driven with derived chapters; shared hooks; some scroll-spy duplication + hand-ordered role arrays |
| Deployment & ops | 0.7 | 8.6 | Vercel rewrites + GH Pages workflow (lint/test/tsc gate + form key + base handling) + 404 fallback; LLM Vercel-only is documented |

**Weighted score ≈ 9.0 / 10 — "Excellent."**

### Criteria explained

- **Content/storytelling:** is the work shown as *evidence* (problem → method → result) and is it credible?
- **Design:** visual polish, theme system, typography, motion.
- **UX/navigation:** how fast a visitor can find a project, a skill, or a contact route.
- **Technical quality:** architecture, type safety, tooling hygiene, test coverage of critical logic.
- **Performance:** bundle, image weight, font strategy, perceived load.
- **Accessibility:** semantics, keyboard, focus management, contrast, reduced-motion.
- **SEO:** meta/OG/Twitter tags, structured data, canonical/deep-route handling.
- **Security:** what runs in the client, what keys are exposed, external-input handling.
- **Maintainability:** how easy a content or section change is, docs accuracy.
- **Deployment/ops:** CI/CD, SPA routing, environment configuration across targets.

### Bottom line

This is a **distinctive, production-grade portfolio that markets the author's core differentiator — validated, deterministic, productized intelligent systems — extremely well.** The V4 brief is fully applied (7-chapter narrative with Experience at 04, education module, single-source CTA/index logic), and every high-impact issue from prior analysis is resolved and re-verified: client-exposed LLM key, inconsistent numbering, hidden projects, empty case-study blocks, single big chunk, missing focus management, multi-MB images (certs *and* project PNGs), GH Pages favicon/404 path gaps, and workflow env. The remaining work is purely polish: commit the batch, human visual-QA on the CV/fonts, and optionally per-project OG cards. Score **≈ 9.0 / 10**.

### Final QA checklist (this revision)

- **Chapters/numbering:** `chapterNumber()` derived; tests assert `origin 01` … `connect 07` (`experience = 04/07`).
- **Project discoverability:** all 24 indexed (`allIndexedProjectIds()`), `auto-analytics` included, no orphans; Ctrl+K + assistant + secondary grid all covered.
- **Case-study classification:** 24 projects; conditional blocks only for real fields.
- **Image policy:** no remaining raster in `public/images` above 204 KB (JPEG q85/q88); fonts self-hosted latin-only.
- **Console hygiene:** zero `console.*` in `src`.
- **A11y:** skip link, focus traps, live reduced-motion, AA contrast documented.
- **Security:** dist sweep clean of `sk-*`/`VITE_*_API_KEY`/`LLM_API_KEY`; `.env` untracked; developer-origin allowlist justified.
- **Root cleanup:** `robots.txt` and `dist/404.html` kept; `.env` ignored; no stray files.
- **CI gating:** GH Actions runs lint + tests + `tsc` + `VITE_GITHUB_PAGES=true` build.
- **Manual QA:** local preview smoke — `/` 200, `/projects/auto-bi` 200, deep-route SPA fallback 200, favicon 200; direct project URLs / case studies / palette / assistant / contact intended for a final human pass before release.

---

*Generated with `big-pickle` via opencode. Verified by running `npm run lint`, `npx tsc --noEmit`, `npx vitest run` (37/37, 3 files), `npm run build`, and a local `preview` smoke test on the current working tree (HEAD `90994f8` uncommitted) — all passing.*