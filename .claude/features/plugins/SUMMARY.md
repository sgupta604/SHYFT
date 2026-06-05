# Summary: plugins

**Completed:** 2026-06-05 | **Branch:** feat/plugins | **PR:** TBD

## What Was Built

Plugins extensibility layer for the Shyft Commons mobile app: an Apps directory (full-screen push from More) where users browse and install plugins; a shared slot system (PluginWidget + PluginSlot) that injects installed plugin widgets into Today and You without cross-feature imports; a role-gated Developer console with a publish pipeline view; and wiring across the three host screens. Ten mock plugins across six categories, four widget kinds (next/list/stat/progress), and demo-on defaults seed the install list so every slot shows populated on first launch.

## Files Changed

| Package | File | Change |
|---------|------|--------|
| mobile | `lib/data/plugins.ts` | 10 marketplace plugins + 3 dev-console plugins, categories, mock data |
| mobile | `lib/data/types.ts` | Plugin, DevPlugin, PluginSlotId, PluginWidgetSpec types |
| mobile | `lib/stores/plugins.ts` | Install list, developer flag, showWidgets flag — single source of truth |
| mobile | `components/PluginWidget.tsx` | Inline card: 4 widget kinds (next/list/stat/progress) |
| mobile | `components/PluginSlot.tsx` | Null-when-empty slot renderer; reads store, injects "Your apps" section |
| mobile | `features/plugins/AppsScreen.tsx` | Directory: category chips, plugin rows, install toggle |
| mobile | `features/plugins/PluginSheet.tsx` | Bottom sheet: stat strip, blurb, permissions, Add/Remove |
| mobile | `features/plugins/DeveloperScreen.tsx` | Role-gated publish console: dark metrics card, plugin list, resources |
| mobile | `app/apps.tsx` | /apps route (thin, routing only) |
| mobile | `app/developer.tsx` | /developer route — redirects to /(tabs)/more when developer flag is false |
| mobile | `features/more/MoreScreen.tsx` | "Apps & extensions" card (Apps row + Developer row + developer-mode switch) |
| mobile | `features/today/TodayScreen.tsx` | PluginSlot slot="today" injected between Coming Up and Recent Kudos |
| mobile | `features/you/YouScreen.tsx` | PluginSlot slot="you" injected after My Events |

## Tests

- Mobile (jest-expo): 130/130 passing — 23 suites (90 prior + 40 new plugin suites)
- Backend: N/A
- Bundle (npx expo export --platform ios): pass — 2934 modules, 4.8 MB .hbc
- Lint (expo lint): clean
- TypeCheck (pnpm typecheck): clean
- Manual on-device: all plugin flows + regressions (stipend/RSVP/onboarding) + lineHeight fix verified by user

## Key Decisions

- **PluginSlot in components/ not features/plugins/**: Shared components so Today and You import it without violating the no-cross-feature-imports rule (ADR-0001). Slot only imports from lib/ and components/.
- **/developer redirects to /(tabs)/more (not /apps)**: Better UX — puts user back at the Developer row/switch. Minor plan deviation; unit test verifies the redirect target.
- **Store flags default true**: developer: true and showWidgets: true on init ensures demo shows the full console and populated slots without an explicit setup step.
- **Pull model for slot injection (not push/event)**: PluginSlot reads the store and renders installed widgets for its named slot — no plugin needs to register a render callback. See ADR-0002.

## Deferred Items

- No E2E (Playwright/Maestro) coverage for plugin flows — all plugin surfaces are manual-only. Playwright is web-only; Maestro not in scope.
- Widget tap routes to /apps (Manage), not the individual plugin's PluginSheet. Per plan spec; direct tap-to-sheet would require router state not needed for mock-install phase.
- Static avg rating (4.8) in Developer console metrics card is hardcoded. Acceptable per Non-Goals (static mock data).

## Retrospective

### Worked Well

- **Orchestrator-as-conductor pattern confirmed**: Five sequential frontend-agent streams dispatched directly by the orchestrator, each self-contained, blocking on the prior commit. Zero retries, zero conflicts. Pattern transferred from commons-app perfectly.
- **PluginSlot null-return keeps host screens clean**: The `if (!showWidgets || mine.length === 0) return null` pattern eliminated conditional rendering boilerplate in Today/You.
- **Store-first install model**: `installed[]` as the single gate meant directory, sheet, and slots all reflected installs instantly — no secondary state sync.
- **Component isolation held throughout**: No feature-to-feature imports. Today/You/More only import from components/ and lib/. ADR-0001 respected across all 5 streams.

### Went Wrong

- **execute-agent cannot spawn sub-agents in this harness**: Reported honestly by execute-agent (matching commons-app pattern). Orchestrator had to act as conductor again. Pipeline docs still describe execute-agent as delegating to frontend/backend agents — aspirational, not current behavior. Until sub-agent spawning is supported, orchestrator must plan for direct stream dispatch.
- **lineHeight 1.0x missed in DeveloperScreen by the d7330ba fix**: The fix was applied per-file from a bug report, catching PluginWidget/StipendCard/StipendDetail/YouScreen but missing DeveloperScreen.metricValue (fontSize 26, lineHeight 26). Caught by finalize security sweep. Root cause: no codebase-wide grep audit for the pattern. Future RN type ports must run a grep for `lineHeight == fontSize` on all Sora/display font usages at port time.
- **Web prototype masks RN text clipping**: Browsers default to line-height: normal (~1.2x), preventing glyph clipping silently. Any explicit `lineHeight: <fontSize>` in RN honors it literally and clips ascenders/descenders on Sora's curved letterforms. Lesson: explicit `lineHeight >= 1.2x` audit is required at port time, not left to device verification.

### Process

- **Pipeline flow**: Smooth. 5 streams, 5 commits, no conflicts. Orchestrator-as-conductor is the established pattern.
- **Task granularity**: Right. Each stream was one coherent surface per commit. No stream was too large or too small.
- **Estimate accuracy**: Plan: 5 streams → 5 commits. Actual: 5 streams + 1 post-test fix + 1 docs commit. Slight undercount (fix was post-test); stream plan was accurate.
- **Agent delegation**: frontend-agent performed cleanly on all 5 streams. test-agent caught the lineHeight issue at on-device stage. Finalize sweep caught the DeveloperScreen miss. Key finding: automated test suites do not catch visual text-clipping — device or screenshot verification is required.
