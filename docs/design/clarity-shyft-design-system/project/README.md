# Clarity — Shyft Solutions Design System

**Clarity** is the shared design language behind every Shyft Solutions internal tool — Stipend Tracker, TADS, Recruiting, and the rest. This repository packages Clarity as an agent-usable design system: foundation tokens, brand assets, voice rules, and high-fidelity UI kits so any agent can produce well-branded Shyft interfaces and assets.

> **Shyft Solutions** is a software engineering company. *"The Science of Software."* Clarity v0.2.

---

## Sources

Everything here is derived from the canonical Clarity documentation:

- **Clarity design system portal** — `https://portal.internal.shyftsolutions.io/clarity`
  Foundations (color, type, spacing, elevation), brand (logo, clearspace, do's/don'ts, voice), components (buttons, inputs, badges, stat tiles, tables, cards, modals, empty states), and patterns (app shell, page header, login).
- **Brand assets** hosted on the portal (referenced live — see *Caveats*):
  - `https://portal.internal.shyftsolutions.io/s2-mark.png` — primary S2 monogram (1250×1250)
  - `https://portal.internal.shyftsolutions.io/shyft-solutions-lockup.png` — full corporate lockup (1940×536)

> These are internal URLs. The portal **HTML** and the **logo bitmaps** both load in a browser on Shyft's network, so this kit references the **real marks live** via [`assets/Logo.jsx`](assets/Logo.jsx) (`S2_MARK_SRC` / `LOCKUP_SRC`). The host sends no CORS headers, so the bitmaps **can't be downloaded** into the repo — to make the system fully self-contained, drop the real files into `assets/` and repoint those two constants. See *Caveats*.

---

## Products in this system

### Existing internal apps (documented in Clarity)
- **Stipend Tracker** — quarterly stipend / reimbursement requests & approvals.
- **TADS** — referenced as an internal app.
- **Recruiting** — referenced as an internal app.

All share the same **app shell**: fixed left sidebar (S2 mark + app switcher + nav) and a sticky topbar.

### New product built in this repo
- **Commons** — the Shyft employee **mobile app**. The culture & comms backbone for everyone in the company. UI kit at `ui_kits/commons/`. Surfaces:
  - **Today / Announcements** + emergency / office-status notifications (the backbone)
  - **Who's out** & holiday calendar (HR-flavored)
  - **Preboarding & onboarding** — installable between offer and day one, before work accounts exist (handbook, who's-who, what to expect, where to park)
  - **Events** with RSVP (outings, lunch & learns, intramurals, holiday party)
  - **Kudos** feed + event **photo** feed
  - **Recruiting & referrals** — open roles, referral bonus tracker, career-fair callouts
  - **Weather** card (public data, zero CUI concerns)
  - **Lightweight social** — lunch crews, carpools, interest channels, for-sale board
  - **Perks / benefits** quick-links

---

## Foundation at a glance

| | |
|---|---|
| **Anchor color** | Shyft blue `#329af0` |
| **Neutral anchor** | Shyft charcoal `#212529` (the original "Shyft black") |
| **Palette basis** | Mantine scales (the two anchors are Mantine `blue` / `gray`) |
| **Display type** | **Sora** 600 — geometric, slightly rounded; echoes the S2 mark |
| **UI type** | **Inter** — tabular numerics on |
| **Mono** | **JetBrains Mono** — tabular figures for amounts, IDs, timestamps |
| **Grid** | 4 pt base · radii 8 / 10 / 14 / 20 |
| **Themes** | Light + Dark · WCAG AA across |

Brights (green/orange/pink/purple/yellow) are **reserved** for data viz, category tags, and per-app accents in the app switcher — **never** primary UI chrome.

Tokens live in [`colors_and_type.css`](colors_and_type.css).

---

## CONTENT FUNDAMENTALS

Clarity's voice is **internal-tools plain**: *be useful before being friendly.* These are tools people use to get work done, so copy gets out of the way.

**Tone & person.** Direct, declarative, neutral-warm. Address the user as **"you"**; the product never refers to itself as "I/we" except the corporate lockup tagline. Never hype, never apologize for behavior the user didn't cause.

**Casing.** **Sentence case** everywhere — titles, buttons, labels, nav. Not Title Case, not ALL CAPS (the one exception: table column headers render in all-caps via CSS at 11.5px, but the *source copy* is still sentence case). Button labels are imperative verbs: "Submit request", "Export", "Approve", "Deny".

**Numbers & dates.** Concrete and abbreviated. Dates read `Apr 1, 2027`, not "April 1st, 2027 at 12:00 AM UTC". Amounts and IDs sit in mono: `$4,180.00 · REQ-5031 · 2026-05-08T10:14`. Lead with the number when it's the point: "9 awaiting decision".

**Emoji.** **Not** in body copy, titles, or buttons — that reads as hype. The **only** sanctioned use is **category tags**, where a single leading emoji acts as the category glyph: `📚 Learning · 🏋️ Wellness · 🖥️ Equipment · 📡 Internet · 🧠 Mental Health · 🤝 Team`.

**Empty states.** Icon → title → one plain sentence → action. State the situation, hint the next step, don't apologize. *"Nothing here yet — when someone submits a request, it'll show up here."*

**Examples.**

| ✅ Clarity says | ❌ Not this |
|---|---|
| "Submit request" | "Submit Your Awesome Request! ✨" |
| "9 awaiting decision" | "You have 9 pending items that need your attention" |
| "Over your remaining budget" | "Oops! That's over budget 😬" |
| "Reset Apr 1, 2027" | "Resets on April 1st, 2027 at 12:00 AM UTC" |
| "Nothing matches — try clearing the filter." | "No requests found. Please try a different filter." |

For **Commons** (the culture app), the voice warms up a notch — it's people, not approvals — but the rules hold: sentence case, "you", no hype-emoji, concrete details. "3 people out today", "RSVP by Fri", "Maya gave you kudos".

---

## VISUAL FOUNDATIONS

**Overall vibe.** Calm, flat, information-dense but breathable. A product surface is mostly **white cards on a cool off-white page** (`--bg` charcoal-25 `#f8f9fa`), separated by **1px hairlines** (`--border` charcoal-100) rather than heavy shadows. The system is *deliberately flat* — color and border do the work; shadows are a last resort.

**Color usage.** Charcoal is the chrome; blue is the single accent (links, primary buttons, active nav, focus). Everything bright is quarantined to data viz / category tags / per-app app-switcher accents. There are **no gradients** in UI chrome — surfaces are solid. (The login brand panel is solid charcoal-900, not a gradient.)

**Type.** Sora for display moments (page titles, stat hero numbers, headlines) — tight negative tracking on the big sizes (`-0.02em` at 40px). Inter for all working text. JetBrains Mono for any aligned number column, amount, ID, or timestamp, with tabular figures so columns line up without fixed-width layout.

**Spacing.** Strict 4 pt grid; eight named steps. Card padding is 20px (`--s-5`); page padding 32px (`--s-8`); section spacing 48px (`--s-12`). Fields are separated by 16px (`--s-4`).

**Corner radii.** Parallel scale so things nest cleanly: tags/kbd **8px**, buttons/inputs/nav **10px**, category icon tiles **14px**, cards/tables **20px**, modals **28px**, pills/avatars **full**. Nothing is sharp-cornered; nothing is over-rounded except true pills.

**Cards.** White (`--bg-elev`) · 1px `--border` hairline · `--r-xl` (20px) corners · `--shadow-1` (barely-there). On hover, interactive cards lift to `--shadow-2`. No colored left-border accents, no tinted card bodies.

**Elevation.** Four steps but used sparingly: `shadow-1` resting cards, `shadow-2` hover & dropdowns, `shadow-3` app switcher & command palette, `shadow-pop` modals & drag preview. Anything above shadow-2 must be temporary.

**Borders & focus.** Hairlines are charcoal-100; inputs/buttons get the slightly stronger charcoal-200. Focus is a **3px ring at the accent hue / 22% opacity** — never thicker, never a solid outline.

**Backgrounds.** No imagery, textures, or patterns in product chrome. Page is a flat cool off-white; recessed wells/dropzones use `--bg-sunken` (charcoal-100). The login screen is the one place with a large solid-charcoal brand panel.

**Buttons.** Heights **36 / 28 / 24** (default / small / xs). Primary = solid blue-500, hover blue-600. Secondary = white with charcoal-200 border. Ghost = transparent, tinted on hover. Danger = pink-700. One primary per surface.

**Hover / press.** Hover = a step darker for fills (500→600) or a subtle tint fill for ghost/nav (`--accent-soft`); cards lift one shadow step. Press = no bounce — these are tools; a slight darken/settle, not a scale animation.

**Animation.** Minimal and quick. Functional transitions only (~120–180ms, ease-out): hover tints, dropdown/modal fades + small translate, focus-ring appearance. No decorative loops, no bounces, no parallax. Commons (mobile) may use slightly more motion for sheet/tab transitions but stays in the same restrained register.

**Transparency & blur.** Used only for overlays — modal scrims (charcoal at low alpha) and the focus ring's translucency. No frosted-glass chrome.

**Imagery (Commons).** Where the culture app shows photos (event feed, who's-who), they're real warm photos in rounded containers (`--r-lg`/`--r-xl`) — never duotone or heavily filtered. Avatars are `--r-full`.

---

## ICONOGRAPHY

**System.** Clarity does not ship a bespoke icon font in the documentation. UI icons should be a **single consistent line-icon set at a ~1.5–2px stroke**, charcoal-600 by default, accent-blue when active. This kit uses **[Lucide](https://lucide.dev)** (linked from CDN) as the closest match to the documented flat, geometric, even-stroke style — *flagged as a substitution* until Shyft confirms a house set. Use Lucide consistently; do not mix icon families.

**Emoji as category glyphs.** The one documented, sanctioned non-line-icon usage: **category tags carry a single leading emoji** as their glyph — `📚 🏋️ 🖥️ 📡 🧠 🤝`. These are *content*, not chrome, and only appear inside category tags / tiles. Do not scatter emoji into buttons, titles, or body.

**The S2 mark.** The brand's only "logo icon." Two-tone monogram — Shyft charcoal `#212529` + Shyft blue `#329af0`, square aspect, used in app chrome at 22–44px. (Referenced live from the portal — see *Caveats*.)

**Rules.** Line icons for UI affordances; emoji only inside category tags; the S2 mark only for brand/app identity. Never hand-draw decorative illustration; never recolor the S2 mark to fit a context.

---

## Index / manifest

Root files:
- [`README.md`](README.md) — this file.
- [`colors_and_type.css`](colors_and_type.css) — all foundation tokens (color scales, semantic tokens, type classes, spacing, radii, elevation).
- [`SKILL.md`](SKILL.md) — Agent-Skills entrypoint.
- `assets/` — brand assets (S2 mark recreation, lockup recreation, logo CSS/SVG helpers).
- `fonts/` — note on font delivery (Sora / Inter / JetBrains Mono via Google Fonts).
- `preview/` — Design System tab cards (color, type, spacing, components, brand specimens).
- `ui_kits/commons/` — **Commons** mobile app UI kit (see its own README).

UI kits:
- [`ui_kits/commons/`](ui_kits/commons/) — Shyft **Commons** employee mobile app. `index.html` is an interactive click-through; JSX components are modular and reusable.

---

## Caveats

- **Logo bitmaps load live, can't be self-hosted.** `s2-mark.png` and `shyft-solutions-lockup.png` render correctly in a browser on Shyft's network but the host sends **no CORS headers**, so they can't be fetched into the repo or drawn to a canvas. The kit references the **real artwork** by URL. For a self-contained system, save the real files into `assets/` and repoint `S2_MARK_SRC` / `LOCKUP_SRC` in [`assets/Logo.jsx`](assets/Logo.jsx).
- **Icon set is a substitution.** Lucide stands in for an unconfirmed house icon set. Swap if Shyft has its own.
- **Color ramps inferred from Mantine.** Only the two anchors (`#329af0`, `#212529`) were given as hex; the rest of each scale uses the matching Mantine values (Clarity's anchors *are* Mantine's). Confirm exact mid-stops if Shyft has them documented.
