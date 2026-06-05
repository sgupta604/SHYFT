# ADR-0001: Plugin-Ready Feature Registry Architecture

**Status:** Accepted
**Date:** 2026-06-05

## Context

Commons needed 5 tabs built in parallel by multiple short-lived agents. Each tab is a self-contained feature module (`features/<tab>/`). The challenge: how to wire tabs into the expo-router layout without every feature agent touching shared routing files, and how to leave a seam for future plugins/third-party features to register themselves without modifying core app code.

Two forces in tension:
1. **Parallelism** — feature agents must not conflict on shared files (tab layout, router)
2. **Extensibility** — the architecture should not require touching `app/(tabs)/_layout.tsx` to add a new tab or feature entry point in the future

## Decision

Introduce `lib/registry.ts` — a typed manifest array where each feature self-describes as `{ id, title, icon, Screen }`. The tab layout (`app/(tabs)/_layout.tsx`) reads only from the registry; it never imports feature screens directly.

Each feature owns a `features/<tab>/manifest.ts` that registers into the array. The registry + all 5 manifests + placeholder screens are written in Stream 2 and then **frozen** — no subsequent feature stream is permitted to edit `lib/registry.ts` or `app/(tabs)/_layout.tsx`.

```
lib/registry.ts
  ← features/today/manifest.ts
  ← features/events/manifest.ts
  ← features/you/manifest.ts
  ← features/people/manifest.ts
  ← features/more/manifest.ts

app/(tabs)/_layout.tsx  →  reads registry  →  builds tab bar
```

Cross-feature navigation happens only via route paths (e.g., `router.push('/(tabs)/you')`), never via direct screen imports between features.

## Consequences

**Positive:**
- Zero shared-file conflicts during parallel implementation — 6 feature agents ran concurrently with no merge issues.
- Adding a new tab or screen in the future requires only: (a) create `features/<new>/manifest.ts`, (b) register in `lib/registry.ts`. No changes to routing files.
- The no-cross-feature-imports rule is structurally enforced: features can only reach each other through the router (path strings), never through module imports.
- Registry is the natural extension point if Commons ever adopts a real plugin SDK — third-party features register a manifest, the host app renders them.

**Negative:**
- Placeholder screens must be written before feature streams start (Stream 2 overhead ~10% of stream effort).
- The registry array is currently static (compile-time); a true runtime plugin system would need dynamic registration and sandboxing — not present here, just the structural seam.
- All tabs must be declared upfront; dynamically adding/removing tabs at runtime is not supported by this implementation.

## Alternatives Considered

- **Direct imports in `_layout.tsx`**: Each feature stream would need to edit the shared layout file — causes merge conflicts in parallel development and couples the host app to feature internals. Rejected.
- **File-system routing only (expo-router auto-discovery)**: Relies on file presence in `app/(tabs)/`, which is fine for simple cases but gives no place to attach metadata (icon, title, feature flags). Rejected in favor of explicit manifest with typed metadata.
- **Barrel index per feature**: A `features/index.ts` that re-exports all screens. Same merge-conflict problem as direct imports, plus it breaks the no-cross-feature-imports isolation. Rejected.
