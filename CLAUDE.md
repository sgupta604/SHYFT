# CLAUDE.md

## Orchestrator Role (NON-NEGOTIABLE)

You are a **dispatcher**. You read state, invoke commands, and report results.

**You MUST NOT:**
- Write, edit, or delete source code or test files
- Run build, test, or lint commands directly
- Make "quick fixes" yourself — use `/quickfix` instead
- Attempt to "help" by doing work that belongs to a sub-agent

**Exceptions (orchestrator MAY handle directly):**
- Pipeline state files (STATUS.md, plan checkboxes)
- Non-source config (`.env` additions, `package.json` scripts, `.gitignore` entries)
- `/hotfix` abbreviated plans (5-10 lines)
- `/park`, `/resume`, `/rework`, `/status` commands

**For anything that touches `packages/` source code: STOP. Delegate.**

---

## On Every Session Start

1. Read `.claude/pipeline/STATUS.md`
2. Report: "Feature: X | Phase: Y | Next: /command"
3. Wait for user instruction (or auto-invoke if clear)

---

## Pipeline

```
/research → /plan → /implement → /test → /finalize
                ^       ↑ /abort     ↓ (fail)
                +— /diagnose ←———————+
```

| Command | What It Does |
|---------|-------------|
| `/research <feature>` | Gather requirements, analyze code |
| `/plan <feature>` | Architecture + task breakdown |
| `/implement <feature>` | Build it (TDD), delegates to specialist agents |
| `/test <feature>` | Full test suite |
| `/finalize <feature>` | Commit, PR, summary with retrospective |
| `/diagnose <feature>` | Root cause analysis |
| `/quickfix <desc>` | Small fix (< 3 files), test, done |
| `/hotfix <desc>` | Urgent fix, skip research, abbreviated plan |
| `/abort <feature>` | Revert broken implementation, stash changes |
| `/park` | Pause current feature |
| `/resume <feature>` | Resume a parked feature |
| `/status` | Show pipeline state |

### Auto-Invoke

| When | Do |
|------|----|
| "start working on X" | `/research X` |
| "continue" / "next" | Whatever STATUS.md says |
| Command completes | Update STATUS.md, suggest next |
| "different approach" | `/rework` |

---

## Rules

1. **One active feature at a time.** Park the current one first.
2. **No skipping steps.** Every feature goes through the full pipeline.
3. **Agents run in isolated contexts.** They return concise summaries (< 500 words).
4. **After every /command, re-read STATUS.md** before responding.
5. **Never paste full file contents.** Summarize and reference by path.
6. **If conversation exceeds ~50 exchanges**, write a session log to `.claude/active-work/<feature>/session-log.md` (what's done, what's in progress, any blockers), then suggest a new session.
7. **Screenshots by path**, never embedded.
8. **Feature names:** kebab-case, e.g. `commons-app`, `stipend-tracker`.
9. **Branch names:** `feat/<name>`, `fix/<name>`, `refactor/<name>`.
10. **If `.claude/ARCHITECTURE.md` exists**, agents MUST read it alongside CLAUDE.md. (Created when CLAUDE.md exceeds 150 lines.)

---

## Project: Commons

**Commons** — the Shyft Solutions employee **mobile app** (iOS + Android). Announcements + office status, events with RSVP, stipend tracker, PTO + perks, people directory with kudos, Slack-channel discovery, and the preboarding/onboarding "Your first day" flow.

**Design source of truth:** `docs/design/clarity-shyft-design-system/` — the Clarity design system handoff bundle. Agents MUST read its READMEs (root, `project/`, `project/ui_kits/commons/`) and chat transcripts before designing UI. Recreate the prototype faithfully; don't copy its internals.

**Decisions log:** `docs/DECISIONS.md` — kickoff decisions (stack, scope, definition of done). Agents MUST read it.

### Tech Stack
- **Mobile:** Expo (React Native, managed workflow — **Expo Go compatible, no native modules**), expo-router, Zustand, TypeScript strict
- **Design tokens:** Clarity → `lib/theme/` (from `colors_and_type.css`). Fonts via `@expo-google-fonts` (Sora, Inter, JetBrains Mono). Icons via `lucide-react-native`.
- **Testing:** jest-expo + React Native Testing Library (unit/component). Maestro E2E = later phase.
- **Data:** in-memory typed mock data via Zustand stores. No backend yet (FastAPI in `packages/api` is a later phase; keep the store seam clean for it).
- **Monorepo:** pnpm workspaces + Turborepo
- **Plugin ambition (architecture-shaping):** Shyft engineers will eventually build plugins. Every tab/screen/card is a self-contained feature module registered into the app shell. No monoliths.

### Commands
```bash
pnpm install                      # Install all packages
cd packages/mobile && npx expo start   # Dev server (scan QR with Expo Go)
pnpm test                         # All tests (turbo)
pnpm lint                         # All linting (turbo)
pnpm typecheck                    # TypeScript checks (turbo)
cd packages/mobile && pnpm test   # Mobile unit tests (jest-expo)
```

### Monorepo Structure
```
SHYFT/
├── packages/
│   ├── mobile/       # Expo app
│   │   ├── app/      # expo-router routes ONLY, no business logic
│   │   ├── features/ # Self-contained modules: today/ events/ you/ people/ more/ onboarding/
│   │   ├── components/  # Shared UI primitives (Pill, Tag, Avatar, cards, sheets)
│   │   ├── lib/      # theme/ (Clarity tokens), stores/ (Zustand), data/ (mocks)
│   │   └── assets/   # s2-mark.png, images
│   └── shared/       # (later) plugin SDK + shared types
├── docs/design/      # Clarity design system handoff bundle
├── docs/DECISIONS.md
├── turbo.json
└── pnpm-workspace.yaml
```

### Key Conventions
- **No barrel files. One component per file.** `@/` alias to `packages/mobile/`.
- **`app/` routes only, `features/` own their screens/cards/logic, `components/` shared UI only, `lib/` cross-cutting logic.** A feature module never imports from another feature module — shared things move to `components/` or `lib/`.
- **Zustand stores = single source of truth.** No prop drilling beyond 2 levels. Stores are the future API + plugin seam.
- **Styling:** RN `StyleSheet` with Clarity tokens from `lib/theme/`. No inline hex values — tokens only. Light theme (matches prototype).
- **Clarity voice:** sentence case everywhere, "you", no hype-emoji (emoji ONLY as category-tag glyphs), dates like `Apr 1, 2027`, amounts/IDs in JetBrains Mono.
- **Commits:** `feat(mobile):`, `fix(mobile):`, `test(mobile):`, `docs:` — prefixed with package.
- **Git remote:** https://github.com/sgupta604/SHYFT.git

### Demo-Critical Flows (test first, polish hardest)
1. You → tap a stipend → StipendDetail (transactions, statuses, FAQ)
2. Events → RSVP toggle updates count + capacity bar live
3. More → "Your first day" → checkable onboarding list
