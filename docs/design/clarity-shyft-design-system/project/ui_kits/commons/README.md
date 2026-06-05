# Commons — Shyft employee app · UI kit

A high-fidelity, interactive recreation of **Commons**, the Shyft Solutions employee mobile app. Built entirely on Clarity tokens ([`../../colors_and_type.css`](../../colors_and_type.css)) so it reads as a native Shyft surface.

Open [`index.html`](index.html) and tap around — it's a working click-through, not a storybook.

## What's interactive
- **Bottom tabs** — Today · Events · You · People · More.
- **Today** — office-status banner, weather, announcements (tap → detail sheet; the Q3 stipend notice deep-links to the You tab), who's-out, next event, latest kudos (tap “See all” → recent-kudos sheet).
- **Events** — RSVP toggles (count + capacity bar update live); tap an event → detail sheet with attendees.
- **You** *(the heart of the app)* — **Stipend Tracker** (Learning / Wellness / Home office, each with a used-vs-remaining bar + reset countdown; tap → detail screen with transaction history, Submit receipt, receipt statuses, eligibility FAQ), **PTO snapshot**, **Perks & benefits** grid (deep-links to provider portals), and **My events** (your RSVPs).
- **People** — searchable directory; tap a teammate → profile with **Kudos received** (values tags). Plus who's-out and company holidays.
- **More** — **Your first day** preboarding entry, **Apps & extensions** (plugin directory + role-gated Developer console), **Slack channels** discovery directory (“Open in Slack”), For Sale board, swag store, notification settings, help & FAQ.
- **Plugins** *(extensibility layer)* — devs build & publish extensions that plug into the app:
  - **Apps directory** (More → Apps) — browse by category, ratings & install counts, add/remove. Tap → detail sheet with permissions.
  - **Slots** — installed plugins render *inside existing screens* under “Your apps” (Today & You) as native widgets, not new chrome.
  - **Developer console** (More → Developer, **role-gated**) — install metrics, your plugins with Published / In review / Draft statuses, New-plugin CTA, SDK resources.
  - **Tweaks** flip `Developer mode` (role gate) and `Show app widgets` (slots) on/off.
- **Onboarding** (from More → "Your first day") — full preboarding sheet: countdown, checkable onboarding list, culture handbook, who-you'll-meet, day-one details. This is the *installable-before-day-one* experience.
- **Notifications** — bell opens a notifications sheet.

## Files
| File | Role |
|---|---|
| `index.html` | Mounts the app inside the iOS frame; loads everything in order. |
| `commons.css` | App-level styles, all layered on Clarity tokens. |
| `ios-frame.jsx` | Device bezel / status bar / home indicator (starter component). |
| `Primitives.jsx` | `Icon` (Lucide), `Avatar`, `Pill`, `Tag`, `IconTile`, `Button`, `Segmented`, `StatusBanner`. |
| `Cards.jsx` | `WeatherCard`, `AnnouncementCard`, `EventCard`, `KudosCard`, `OutRow`, `ChannelRow`, `PerkTile`. |
| `Chrome.jsx` | `AppHeader`, `TabBar`. |
| `Sheets.jsx` | `Sheet` shell + announcement / event / notifications sheets. |
| `Plugins.jsx` | `PluginWidget`, `PluginSlot`, `AppsScreen`, `PluginSheet`, `DeveloperScreen` — the extensibility layer. |
| `tweaks-panel.jsx` | Tweaks shell (developer mode / widget toggles). |
| `*Screen.jsx` | `Today`, `Events`, `You`, `StipendDetail`, `People` (+`Profile`), `More`, `Onboarding`. |
| `App.jsx` | State, routing, sheet orchestration. |
| `data.jsx` | Fictional Shyft employees & content. |

## How it's wired
- React 18 + in-browser Babel (pinned). Each `.jsx` is a separate `text/babel` script that publishes its components to `window` via `Object.assign`.
- Hooks are exposed globally (`window.useState`, etc.) in `index.html` so every module can use them.
- Icons: **Lucide** via CDN (`<i data-lucide>` → `createIcons()`), a documented substitution for an unconfirmed house icon set.
- Brand mark: the real S2 PNG, referenced live (see root README *Caveats*).

## Coverage, not completeness
This kit prioritizes broad, reusable component coverage over reproducing every screen exhaustively. Components are small and modular so they can be recomposed into real designs. Content is fictional placeholder data.
