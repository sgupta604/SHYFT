---
name: shyft-design
description: Use this skill to generate well-branded interfaces and assets for Shyft Solutions (the "Clarity" design system), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, brand marks, and the Commons employee-app UI kit for prototyping.
user-invocable: true
---

Read the [`README.md`](README.md) in this skill first — it covers the company context, content/voice rules, visual foundations, and iconography. Then explore the other files:

- [`colors_and_type.css`](colors_and_type.css) — all foundation tokens (color scales, semantic tokens, type classes, spacing, radii, elevation). Link or copy this into any artifact.
- [`assets/Logo.jsx`](assets/Logo.jsx) — S2 mark + corporate lockup (real artwork referenced live; see README *Caveats*).
- [`preview/`](preview/) — visual specimens of every token group and component.
- [`ui_kits/commons/`](ui_kits/commons/) — interactive Shyft employee-app UI kit with modular, reusable JSX components.

When creating visual artifacts (slides, mocks, throwaway prototypes), copy the assets you need out and produce static HTML files for the user to view — link `colors_and_type.css`, reuse the kit components, and bring in the S2 mark. When working on production code, read the rules here and apply the tokens directly to become an expert in designing with this brand.

Core rules to honor every time:
- **Anchor on** Shyft blue `#329af0` and charcoal `#212529`. Brights are for data viz / category tags / per-app accents only — never primary chrome.
- **Type:** Sora for display, Inter for UI/body, JetBrains Mono for numbers (tabular).
- **Voice:** useful before friendly. Sentence case, "you", concrete dates/numbers, no hype-emoji (emoji only as category-tag glyphs).
- **Surfaces:** flat — white cards, 1px hairlines, shadows sparingly. Radii 8/10/14/20. Focus = 3px ring at accent/22%.
- **Never** place the two-tone S2 mark on a blue or charcoal-matching background where one tone disappears; use it on light, or on charcoal-900 where it's documented to survive.

If the user invokes this skill without other guidance, ask what they want to build or design, ask a few focused questions, then act as an expert Shyft designer — outputting HTML artifacts *or* production code depending on the need.
