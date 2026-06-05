# Summary: commons-app

**Completed:** 2026-06-05 | **Branch:** feat/commons-app | **PR:** (set after push)

## What Was Built

Commons is the SHYFT employee app — a greenfield Expo SDK 54 (managed, Expo Go-compatible) React Native app scaffolded inside a new pnpm/Turborepo monorepo at `packages/mobile`. It delivers 5 tabs (Today, Events, You, People, More), 6 bottom sheets, 3 full-screen stack pushes (StipendDetail, Profile, Onboarding), and live Zustand state for RSVP toggling, cheer counts, and onboarding checklist — all pixel-faithful to the Clarity design system prototype. Verified on a physical iPhone via Expo Go before finalization.

## Files Changed

| Package | File | Change |
|---------|------|--------|
| root | `.npmrc`, `pnpm-workspace.yaml`, `turbo.json`, `package.json`, `.gitignore` | Monorepo scaffold (hoisted pnpm linker, turbo pipelines) |
| mobile | `app.json`, `package.json`, `tsconfig.json`, `babel.config.js`, `jest.config.js` | Expo SDK 54 config, expo-router entry, strict TS, jest-expo harness |
| mobile | `lib/theme/{colors,spacing,type}.ts` | Clarity design-system token port (scales + semantic, space/radii, TextStyles) |
| mobile | `lib/data/types.ts` + 10 data modules | Typed mock data ported 1:1 from prototype data.jsx |
| mobile | `lib/stores/{events,kudos,onboarding}.ts` | Zustand stores: RSVP math, cheer toggle, checklist toggle/count |
| mobile | `lib/utils/{stipend,avatar}.ts` | Pure-function math: remaining/pct/low-balance; deterministic avatar tone+initials |
| mobile | `lib/registry.ts` | Plugin-ready feature-manifest registry |
| mobile | `components/*.tsx` (14 files) | Shared primitives: Sheet, Card, Button, Pill, Avatar, AppHeader, NotificationsSheet, EventCard, etc. |
| mobile | `features/{today,events,you,people,more,onboarding}/**` (~30 files) | All feature screens, cards, and sheets |
| mobile | `app/(tabs)/*.tsx`, `app/stipend/[id].tsx`, `app/person/[id].tsx`, `app/onboarding.tsx` | Thin routing layer only |
| mobile | `lib/__tests__/harness.test.ts`, store/utils `__tests__/*.ts`, feature `__tests__/*.tsx` | 17 test suites, 90 tests |

## Tests

- Mobile: 90/90 passing (17 suites — stores, utils, all screens)
- Backend: skipped (`packages/api` dormant by design)
- Bundle (`npx expo export --platform ios`): pass — 2925 modules, 4.74 MB HBC bundle, 66 assets
- Lint (`pnpm lint`): clean — zero warnings or errors
- Typecheck (`pnpm typecheck`): clean — strict TS, zero errors, zero `any` in lib/data

## Key Decisions

- **Expo SDK 54 pinned** — App Store Expo Go supports SDK 54 only; on-device gate was a blocking checkpoint before any feature work.
- **Contract-first registry freeze** — `lib/registry.ts` manifests + placeholder screens frozen in Stream 2; parallel feature streams never touched shared files, eliminating all merge conflicts. See ADR-0001.
- **EventCard + NotificationsSheet in `components/`** — both used across feature boundaries; promotes them to the shared layer while upholding the no-cross-feature-imports rule.
- **Sheets = RN Modal + Animated (native driver)** — no external bottom-sheet lib; Expo Go-safe; matches prototype (no drag-to-dismiss).
- **Stipend math as pure functions** in `lib/utils/stipend.ts` — independently unit-testable, natural API seam for when a real backend arrives.
- **jest pinned ~29.7.0** — jest 30 incompatible with jest-expo SDK 54 (`clearMocksOnScope` error discovered during harness setup).

## Deferred Items

- Dark theme — token structure supports it; light-only for demo. (Non-goal for Phase 1.)
- Tab-bar blur — Clarity reserves blur for overlays; solid rgba(255,255,255,0.96) is intentional.
- Drag-to-dismiss sheets — scrim/X only, matches prototype; requires `@gorhom/bottom-sheet` if wanted later.
- E2E tests (Maestro/Playwright) — non-goal for this phase; unit + manual Expo Go accepted.
- EventSheet dedicated unit test — sheet open/close and card-sheet RSVP sync are manual-only.
- Turbo `test.outputs` misconfiguration — `coverage/**` declared but jest runs without `--coverage`; harmless warning.
- People search filtering — visual-only per design.
- Non-functional taps (Submit receipt, Message, Give kudos, Open in Slack, perks rows) — no-ops by design.
- Duplicate foundation commit (83f2da2 + ec7e027) — artifact of zombie execute-agent re-executing Stream 2; harmless.

## Retrospective

### Worked Well

- **Per-stream commits as ratchet checkpoints.** Every stream landed as a discrete `feat(mobile):` commit before the next stream started. When execution agents crashed, no completed work was ever lost — resume was always precise, not speculative.
- **Contract-first registry freeze.** Declaring all 5 manifests and placeholder screens before feature streams started meant 6 parallel feature agents could run with zero shared-file conflicts. The single most important structural decision for parallelism.
- **Short-lived synchronous frontend-agents per stream.** Once the orchestrator moved to one blocking agent per stream, six consecutive streams completed with zero failures. Smaller context window, smaller blast radius.
- **TDD on stores.** Writing failing tests for stores before implementing them caught the RSVP count edge case (count never below 0, null toggle) before any UI existed.
- **RNTL@14 async pattern established early.** Using `act`/`waitFor` around `fireEvent` — established in `features/you/__tests__` — carried through all 17 suites without flakiness.

### Went Wrong

- **Execute-agent conductor pattern failed twice.** Run #1: API 529 Overloaded. Run #2: premature exit with an orphaned background delegation plus a zombie that re-woke and double-committed Stream 2. Root cause: long-running multi-stream orchestration inside a single agent thread is fragile — context exhaustion, API transients, and background delegation compound each other. **Lesson: conductors are unreliable for multi-stream greenfield work. Stream-by-stream should be the default, not the fallback.**
- **Relaunch budget consumed before the right strategy.** Two full-conductor relaunches had to fail before reaching the stream-by-stream approach. For any feature with 4+ streams: start stream-by-stream from the orchestrator.
- **`.npmrc` ordering constraint not pre-documented.** `node-linker=hoisted` must exist before the first `pnpm install`. Non-obvious, impossible to retrofit without deleting `node_modules`. Should be in CLAUDE.md as a named "Expo monorepo trap."

### Process

- **Pipeline flow:** research → plan → implement (Stream 1 direct; Streams 2–8 via stream-by-stream recovery) → test → finalize. All phases in order, no skips.
- **Task granularity:** Right. Stream-level granularity (one commit per stream, one agent per stream) was the correct unit for both parallelism and recovery.
- **Estimate accuracy:** 9 planned streams; 8 executed + 3 fix commits for S2 mark sizing (30→34→44→52px iterated per live device feedback — design refinement, not a planning miss). No other estimate drift.
- **Agent delegation:** Short-lived synchronous frontend-agents 6/6 succeeded. Conductor (execute-agent) 0/2 succeeded before relaunch budget exhausted. Conductor pattern unsuitable for this scale of greenfield work.
