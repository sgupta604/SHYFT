# SHYFT — Commons

**Commons** is the Shyft Solutions employee mobile app (Expo / React Native): announcements + office status, events with RSVP, stipend tracker, PTO + perks, people directory with kudos, and the preboarding "Your first day" flow.

Built on the **Clarity** design system — the handoff bundle (tokens, brand, voice rules, and the interactive prototype) lives in `docs/design/clarity-shyft-design-system/`. Kickoff decisions in `docs/DECISIONS.md`.

## Quick start

```bash
pnpm install
cd packages/mobile && npx expo start   # scan the QR with Expo Go
```

## Repo layout

```
packages/mobile/   # Expo app (expo-router, Zustand, TypeScript)
packages/shared/   # (later) plugin SDK + shared types
docs/design/       # Clarity design system bundle — design source of truth
docs/DECISIONS.md  # kickoff decisions log
.claude/           # Claude Code dev pipeline (commands, agents, status)
```

## Dev pipeline

This repo uses a Claude Code orchestrator pipeline. The orchestrator dispatches; specialist agents code.

```
/research <feature> → /plan → /implement → /test → /finalize
```

See `CLAUDE.md` and `.claude/pipeline/WORKFLOW.md` for the full rules. Pipeline state: `.claude/pipeline/STATUS.md`.

## Later phases

Backend (`packages/api`, FastAPI + auth), persistence, push notifications, plugin SDK for employee-built features, Maestro E2E, EAS standalone builds.
