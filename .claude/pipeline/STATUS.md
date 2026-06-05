# Pipeline Status

**Updated:** 2026-06-05

## Active

| Field | Value |
|-------|-------|
| Feature | — |
| Phase | — |
| Next | — |

## Queue

| Feature | Priority | Notes |
|---------|----------|-------|
| backend-api | high | FastAPI in packages/api per Shyft standards (see memory + https://portal.internal.shyftsolutions.io/docs). Research must resolve FIRST: native-mobile auth precedent (portal JWT is web-BFF-only → likely OIDC PKCE vs Authentik) + internal-vs-public reachability (preboarding needs public). Roles user/developer/admin via /.well-known/app-roles → replaces dev-mode switch. Add root justfile (just-standard compliance). Supersede DECISIONS.md "Railway" deploy with podman/EC2 infra. |

## Completed

| Feature | Date | PR |
|---------|------|----|
| commons-app | 2026-06-05 | https://github.com/sgupta604/SHYFT/pull/1 (merged) |
| plugins | 2026-06-05 | https://github.com/sgupta604/SHYFT/pull/2 (merged) |

## Parked

| Feature | Phase | Reason |
|---------|-------|--------|
| - | - | - |

## Session Notes (2026-06-05)

- **Demo day:** user demos Commons on iPhone via Expo Go today. Metro runs from `packages/mobile` (`npx expo start`), same Wi-Fi. SDK 54 pinned (App Store Expo Go limit).
- lineHeight clipping bug class CLOSED: codebase-wide sweep committed + pushed to main (all 26 Sora display styles audited).
- **Both features merged to main:** summaries + retrospectives in `.claude/features/*/SUMMARY.md`; ADRs 0001 (registry) / 0002 (plugin slots) in `.claude/decisions/`.
- **Likely next (user-driven, not committed):** full plugin distribution/OTA (DECISIONS.md roadmap Phase 2), backend (`packages/api` FastAPI + auth), persistence, push notifications, EAS builds.
- **Process rule (binding, from retrospectives):** orchestrator conducts — one blocking frontend-agent per stream, commit per stream. execute-agent cannot spawn sub-agents in this harness.
