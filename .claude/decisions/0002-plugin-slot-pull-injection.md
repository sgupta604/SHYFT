# ADR-0002: Plugin Slot Injection via Pull Model (Shared Dumb Component)

**Status:** Accepted
**Date:** 2026-06-05

## Context

The plugins feature needed a way for installed plugins to render widgets inside existing screens (Today, You) without:
1. Those screens knowing anything about individual plugin internals
2. Plugins being able to arbitrarily push UI into any screen (security / predictability)
3. Creating cross-feature imports that would violate ADR-0001's isolation rule

Three models were on the table: push (plugins register a render callback), pub/sub (screens subscribe to a plugin event bus), or pull (a shared dumb component reads the store and renders the right widgets for a named slot).

## Decision

Pull model via a single shared component `PluginSlot` in `components/` (not `features/plugins/`).

- Each host screen declares a named slot: `<PluginSlot slot="today" />` or `<PluginSlot slot="you" />`.
- `PluginSlot` subscribes to the plugins store, filters installed plugins to those whose `slot` field matches, and renders one `PluginWidget` per match.
- If `showWidgets` is off or no installed plugins target the slot, `PluginSlot` returns `null` — the host screen sees no diff.
- Plugins are data (entries in `lib/data/plugins.ts`); they do not own React components or render callbacks.

```
PluginSlot (components/)
  reads: usePluginsStore → installed[], plugins[], showWidgets
  renders: PluginWidget[] for plugins where p.slot === slot && installed.includes(p.id)
```

## Consequences

**Positive:**
- Host screens (Today, You) have zero knowledge of plugin details — one import, one JSX line.
- No cross-feature imports; PluginSlot lives in components/ and only imports from lib/.
- Adding a new slot to a new screen costs one line of JSX. Adding a new plugin that targets an existing slot costs one data entry — no code changes to the host screen.
- The pull model is statically analyzable: slots are known at build time (PluginSlotId type), no dynamic registration or runtime surprises.
- Null-return behavior keeps host screens clean; no conditional rendering boilerplate.

**Negative:**
- Plugins cannot vary their widget layout beyond the four pre-defined widget kinds (next/list/stat/progress). Extensibility requires adding new kinds to PluginWidgetSpec, not adding new components per plugin.
- The slot assignment (which screen a plugin appears in) is declared in plugin data, not by the user — users install plugins but cannot choose which slot they appear in. Acceptable for mock-install phase; a real system would need user-slot assignment UI.
- A true runtime plugin SDK (third-party code) would need sandboxing and dynamic registration that this pull model does not provide. This is the structural seam, not the final architecture.

## Alternatives Considered

- **Push model (plugin registers render callback)**: Plugins would call `PluginRegistry.register(id, slotId, Component)` at module load. Rejected — requires dynamic module loading, makes bundle analysis harder, and gives plugins unbounded UI surface area. Premature complexity for a mock-install phase.
- **Pub/sub / event bus**: Screens subscribe to a plugin bus; plugins publish slot events. Rejected — adds a pub/sub abstraction for what is ultimately a synchronous store read. React + Zustand already provides the reactive primitive; wrapping it in an event bus is indirection without benefit.
- **Direct imports in host screens**: `TodayScreen` imports each plugin's widget component directly. Rejected — creates cross-feature coupling, would require Today/You to be updated every time a plugin is added, and violates ADR-0001's isolation rule.
