# Commons — decisions log

Decisions from the kickoff grilling session, 2026-06-05. The pipeline agents
(research/plan/implement) MUST read this before working on `commons-app`.

## Product

- **App:** Commons — the Shyft Solutions employee app. Source of truth is the
  design handoff bundle at `docs/design/clarity-shyft-design-system/`
  (read its README, `project/README.md`, `project/ui_kits/commons/README.md`,
  and the chat transcripts in `chats/` — intent lives there).
- **Design system:** Clarity. Tokens in `project/colors_and_type.css`.
  Blue `#329af0` + charcoal `#212529` anchors (Mantine scales), Sora/Inter/
  JetBrains Mono, 4pt grid, radii 8/10/14/20, flat surfaces + hairlines.
- **Prototype to match:** `project/ui_kits/commons/index.html` + its JSX
  modules. Recreate pixel-faithfully; do not copy prototype internals.

## Platform & stack

| Decision | Choice | Why |
|---|---|---|
| Platform | **React Native via Expo** (managed, Expo Go-compatible — no native modules) | Must run on iOS and Android; demo on a physical iPhone via Expo Go TODAY (same Wi-Fi as the Mac) |
| Navigation | expo-router | File-based, Expo default |
| State | Zustand stores (single source of truth) | Pipeline convention; also the seam for future API + plugins |
| Language | TypeScript, strict | Pipeline convention |
| Layout | pnpm workspace, app at `packages/mobile/` | Room for `packages/shared` (plugin SDK) and `packages/api` later |
| Module structure | `app/` routes only · `features/<tab>/` self-contained modules · `components/` shared primitives · `lib/` theme/stores/data | **Plugin ecosystem is THE selling point** (elevated 2026-06-05): internal plugin app store where Shyft engineers build plugins and employees add/update them. Feature modules registered into the shell from day one — no monolith. |

## Data & backend

- **No backend today.** Typed in-memory mock data ported from the prototype's
  `data.jsx`, owned by Zustand stores. No persistence (no AsyncStorage) yet.
- Later list: FastAPI backend + auth, persistence, push notifications,
  plugin SDK, Maestro E2E, EAS standalone builds.

## Plugin ecosystem roadmap (the selling point — agreed 2026-06-05)

1. **Phase 1 (now):** compile-time plugins. A plugin = one self-contained
   `features/<name>/` folder + one `lib/registry.ts` manifest entry, via PR.
2. **Phase 2 (the "plugin app store"):** all approved plugins ship in the
   bundle; the registry becomes dynamic (config/API-driven per-user
   enable/disable); in-app Plugin Store screen to browse/add/remove;
   updates delivered OTA via `expo-updates` — no App Store releases.
3. **Phase 3 (only if Phase 2 stops scaling):** true runtime JS bundle
   loading (Re.Pack / module federation) — needs sandboxing + security
   review pipeline. Deferred deliberately.

**Hard constraint:** plugins can only use JS + native modules already shipped
in the app. New native capabilities require a full release — the core app
should grow a curated native-capability set over time.

## Assets

- **S2 mark:** real 1250×1250 PNG bundled at
  `docs/design/clarity-shyft-design-system/project/assets/s2-mark.png`
  (copy into the app's assets). Never hot-link the internal portal URL —
  it only resolves on Shyft's network.
- **Fonts:** `@expo-google-fonts/sora`, `/inter`, `/jetbrains-mono`.
- **Icons:** `lucide-react-native` (same Lucide set as the prototype).

## Scope — demo today

All five tabs (Today · Events · You · People · More) with the prototype's
interactions, plus sheets and the notifications sheet. Three **demo-critical**
flows get tested first and polished hardest:

1. You → tap a stipend → StipendDetail (transactions, statuses, FAQ)
2. Events → RSVP toggle updates count + capacity bar live
3. More → "Your first day" → checkable onboarding list

## Testing

- jest-expo + React Native Testing Library. Unit tests on store logic
  (RSVP math, onboarding check-off, stipend balance calc) + a render smoke
  test per screen. No E2E today.

## Git

- Remote: https://github.com/sgupta604/SHYFT.git (main pushed).
- Branches `feat/<name>`; commits `feat(mobile):` etc. `/finalize` opens PRs.

## Definition of done (today)

App loads in Expo Go on the iPhone · all 5 tabs visually faithful (tokens,
fonts, Lucide, S2 mark) · 3 demo-critical flows work · sheets open ·
unit tests green · committed + PR.
