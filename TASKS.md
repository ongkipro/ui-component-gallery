# Tasks: UI Component Gallery (Edisi Pembelajaran Bahasa Indonesia)

## Rules for the AI
- One task per request. Mark `[x]` before moving on.
- Do ONLY the task's scope. Need something outside it → ask, don't assume.
- Respect `AGENTS.md`: YAGNI, native-first, no unrequested abstractions.
- 1 task ≈ 1 commit that passes its own check.

## Phase 1: Project Scaffold & Infrastructure
- [x] **T1** — Initialize local Astro project with Tailwind CSS and base layout.
      Primary requirement: REQ-3
      Constraints: REQ-4
      Dependencies: None
      Done when: Run `pnpm install` and `pnpm build`; verify the project compiles without errors and serves a base layout with dark/light mode toggle.

## Phase 2: Data Modeling & Component Dataset
- [x] **T2** — Build structured TypeScript dataset `src/data/components.ts` covering key components across all 5 categories.
      Primary requirement: REQ-2
      Constraints: None
      Dependencies: T1
      Done when: Validate `components.ts` exports fully typed component records with definitions in Indonesian, aliases, anatomy diagrams, usage guidelines, accessibility specs, AI prompts, and code snippets.

## Phase 3: Catalog Grid, Search & Filter
- [x] **T3** — Implement homepage catalog with architectural grid, category filters, and instant client-side search.
      Primary requirement: REQ-1
      Constraints: REQ-3
      Dependencies: T2
      Done when: Open homepage in local browser; test filtering by category buttons and typing in the search box; verify results filter dynamically within < 50ms.

## Phase 4: Component Deep-Dive Detail View & Live Sandboxes
- [x] **T4** — Create dynamic component detail page (`/komponen/[slug]`) with full anatomy breakdown, accessibility table, AI prompt copy button, and interactive live demo sandbox.
      Primary requirement: REQ-2
      Constraints: REQ-3
      Dependencies: T3
      Done when: Navigate to `/komponen/accordion`, `/komponen/modal`, `/komponen/tabs`, `/komponen/combobox`, and `/komponen/badge`; verify interactive state changes on click, code tabs switch properly, and prompt copy button copies clean text.

## Phase 5: Polish & Build Verification
- [x] **T5** — Final styling audit, responsive testing (mobile & desktop), and production build test.
      Primary requirement: REQ-4
      Constraints: None
      Dependencies: T4
      Done when: Execute `pnpm build` and verify 100% clean build, zero broken links, and full static output ready in `dist/`.
