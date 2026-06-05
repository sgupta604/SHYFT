# First Day Feature

_Started 2026-06-04 00:03 UTC_

---

## User

keep the your first day thing i like that in the more section. it looked good.

## Assistant

_[tool: list_files]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

This is a big restructure. Let me read all the relevant files before planning.

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: grep]_

_[tool: read_file]_

Let me check the CSS and find all Austin references and the brand mark definition.

_[tool: update_todos]_

I now have the full picture. This is a comprehensive restructure with one user override (keep "Your first day" in More, not the You tab). Let me lay out the plan.Starting with the data layer.

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

Now remove PHOTOS, add STIPENDS/PTO/PEOPLE, and update exports.

_[tool: str_replace_edit]_

Todo 1 done. Now Chrome tabs.

_[tool: str_replace_edit]_

Todo 2 done. Now Cards: ChannelRow → "Open in Slack", PerkTile chevron, extend value tones.

_[tool: str_replace_edit]_

Remove the now-unused PhotoTile and export VALUE_TONE for profiles.

_[tool: str_replace_edit]_

_[tool: write_file]_

Todo 8 done. Now the new YouScreen — the heart of the app.

_[tool: write_file]_

Todo 3 done. Now the stipend detail overlay screen.

_[tool: write_file]_

Todo 4 done. Now People tab: add a Directory and the profile overlay with "Kudos received".

_[tool: write_file]_

Todo 5 done. Now rewrite More — keep "Your first day", reframe Slack channels, add swag/settings/help.

_[tool: str_replace_edit]_

Todo 6 done. Now wire the tappable Q3 stipend announcement. First mark it in data.Now add the deep-link CTA to AnnouncementCard and route it in Today.

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

Now update TodayScreen — pass deep-link handler and make Recent kudos "See all" open a sheet.

_[tool: str_replace_edit]_

## Assistant

_[tool: write_file]_

Todo 7 wiring continues in App.jsx. Let me rewrite the app root.

_[tool: str_replace_edit]_

Now update index.html — swap script tags and the hint text.

_[tool: delete_file]_

_[tool: str_replace_edit]_

Now update the README to reflect the new structure.

_[tool: read_file]_

_[tool: str_replace_edit]_

_[tool: update_todos]_

All edits complete. Let me verify it loads cleanly.

_[tool: show_html]_

_[tool: show_html]_

Today screen renders cleanly with Omaha swaps. Let me check the new You tab and a stipend detail.

_[tool: save_screenshot]_

_[tool: save_screenshot]_

_[tool: save_screenshot]_

Excellent — You tab and stipend detail look great. Let me check People profile and More, then clean up.

_[tool: save_screenshot]_

Profile with "Kudos received" looks great. Let me verify the More tab (the profile overlay covered the last shot), then clean up.

_[tool: save_screenshot]_

The overlay persists across captures. Let me close it first, then open More.

_[tool: show_html]_

Let me reload fresh and go straight to More to confirm it renders.

_[tool: save_screenshot]_

The More tab is exactly right: "Your first day" kept (as requested), Slack channels directory with "Open in Slack" deep-links and the subtitle, and the rest scrolls to For Sale / swag / settings / help. Everything renders cleanly. Let me clean up temp screenshots and hand off.

_[tool: delete_file]_

_[tool: done]_

_[tool: fork_verifier_agent]_

Done. The Commons app is restructured per the spec, with your override applied.

**Navigation** — tabs are now Today · Events · **You** · People · More; Feed is gone.

**You tab** (the new heart) — Stipend Tracker with three budgets (Learning/Wellness/Home office), each with a used-vs-remaining bar and reset countdown; tapping opens a detail screen with transaction history, Submit receipt, Pending/Approved/Reimbursed statuses, and an eligibility FAQ. Below it: PTO snapshot, the Perks grid (now chevron deep-links), and My Events.

**Your override** — "Your first day" stays in the **More** tab exactly as it looked. More now holds only: Your first day, the Slack channels directory ("Open in Slack" + "Find your people…" subtitle), For Sale, swag store, notification settings, and help/FAQ.

**Other changes** — Photos and Recruiting/Referrals deleted entirely; Kudos is a single card on Today ("See all" → sheet) plus a "Kudos received" section on People profiles; the Q3 stipend announcement now has a tappable "Open Stipend Tracker" link; and all Austin → Omaha swaps are done.

A verifier is doing a background pass — I'll flag anything it catches.

## User

so for this app, there will be a feature for devs in the company to develop plugins and publish them. these plugins will allow the app to do custom things that they would like. how do we add this without cluttering the app too much.

## Assistant

Good question — and the instinct to worry about clutter is the right one. The trap with plugin systems is that they leak chrome everywhere: a new tab, a settings forest, dev tools sitting in front of employees who'll never build anything. Here's how I'd keep it clean.

## The core principle: separate the two audiences hard

You actually have two completely different features wearing one name:

1. **Consuming plugins** — every employee browses, installs, and uses them.
2. **Building & publishing plugins** — a tiny slice of devs.

If you design these as one surface, the 99% pay for the 1%. Split them.

## Where each piece lives

**Don't add a bottom tab.** Five is already the ceiling, and a plugin store doesn't deserve permanent real estate next to Today and People.

| Surface | Home | Why |
|---|---|---|
| **Plugin directory** (browse/install) | A single **"Apps" entry under More** — an app-store-style list with categories, screenshots, install button | Discovery is occasional; More is exactly where occasional-but-real features belong (it's already holding swag, channels, settings) |
| **Installed plugins** | Render into **slots** on surfaces that already exist — a module on Today, a row on You, an action in a sheet | Plugins should *extend the app you have*, not bolt on a parallel one. This is the anti-clutter move that matters most |
| **Developer console** (build, submit, version, analytics) | **Role-gated "Developer" entry in More**, ideally deep-linking to a real web console | Hidden entirely unless you have the dev role. Employees never see it. The heavy lifting (code, review status, metrics) doesn't belong on a phone anyway |

## The two ideas that prevent clutter

**1. Slots, not free-for-all.** Define a handful of named insertion points — e.g. a card on Today, a tile in the You tab's perks grid, an item in a teammate's profile, an action in the quick-add sheet. A plugin declares *which slot* it targets and renders inside it. Users see a richer version of screens they already know, not new screens. You stay in control of layout and density; a plugin can't drop a neon banner on your home screen.

**2. Role-gating + progressive disclosure.** Everything dev-facing keys off a `developer` flag. No flag, no console, no "publish" buttons — More looks exactly like it does today. With the flag, a single "Developer" row appears. One entry point, not a scattered toolset.

## So the whole thing is really three small additions

- **More → Apps** (one row → a directory screen) — for everyone
- **A slot system** so installed plugins surface *inside* existing screens — invisible infrastructure
- **More → Developer** (one role-gated row → console) — for the few

That's two new rows in an already-list-based tab, plus a rendering convention. Nothing new in the bottom bar, nothing new for employees who don't care.

---

Want me to prototype this? I'd mock the **Apps directory** (browse + an install flow), show a couple of **installed plugins rendering into Today/You slots**, and the **role-gated Developer console** entry — and wire a Tweak to flip the `developer` flag on/off so you can see the app with and without dev surfaces. Say the word and I'll build it into the existing Commons app.

## User

ok well, lets have you try to add it and it still look good

## Assistant

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

Let me re-read the current state of the key files before building.

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

Now let me check index.html structure before wiring everything in.

_[tool: read_file]_

_[tool: update_todos]_

_[tool: copy_starter_component]_

This is a meaty feature. Let me lay out the plan and build it cleanly into the existing architecture.Now let me add the data. Appending PLUGINS and DEV_PLUGINS, and updating the export.

_[tool: str_replace_edit]_

Let me read the end of data.jsx to place the insertion correctly.

_[tool: read_file]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

That second edit was a mistake — it deleted ONBOARDING fields. Let me fix and insert the PLUGINS data block before the final export.

_[tool: read_file]_

Let me verify the data file end is intact.There's a duplicate closing `});`. Let me fix that.

_[tool: str_replace_edit]_

_[tool: grep]_

Data is intact. Now the big piece — Plugins.jsx with all the components.

_[tool: write_file]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

Now wire the `pluginSlot` prop into Today and You.Now MoreScreen — add the "Apps" row (everyone) and role-gated "Developer" row.

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

Now the main wiring in App.jsx — install state, developer flag from tweaks, overlays, and slots.

_[tool: str_replace_edit]_

Now update index.html — load the new scripts and wire tweaks at the Root (outside the device frame, so the fixed panel isn't clipped by transforms).

_[tool: show_html]_

I'll proceed with self-inspection since this is mid-build and I need to verify the slot rendering and overlays before handoff.

_[tool: show_html]_

Today renders cleanly. Let me scroll to the "Your apps" slot, then check the Apps directory, plugin sheet, and Developer console.

_[tool: save_screenshot]_

_[tool: get_webview_logs]_

_[tool: eval_js]_

Scroll didn't take (the frame likely intercepts). Let me drive navigation programmatically to verify the new surfaces — open Apps directory via More.

_[tool: eval_js]_

Scrolled to bottom of Today. Let me capture the "Your apps" slot.

_[tool: save_screenshot]_

_[tool: eval_js]_

The screenshot tool clones the DOM and resets scroll, so scrolled content won't capture. Let me verify the slot via DOM and drive the overlays open instead.The slot renders. Now let me open the More tab and the Apps directory to capture those surfaces.

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: save_screenshot]_

The "Apps & extensions" section sits cleanly under "Your first day": **Apps** for everyone and the role-gated **Developer** row with a "Dev" badge. Now open the Apps directory.

_[tool: eval_js]_

_[tool: save_screenshot]_

The Apps directory looks excellent — category chips, ratings, install counts, "4 installed" counter, and Add/Added toggle buttons. Now let me open a plugin detail sheet and the Developer console.

_[tool: eval_js]_

_[tool: save_screenshot]_

_[tool: eval_js]_

_[tool: eval_js]_

Sheet content is correct (html-to-image just can't capture fixed-position scrims). The Developer screen uses absolute positioning like Apps, so it'll capture. Let me open it.

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: save_screenshot]_

_[tool: str_replace_edit]_

Developer console looks strong. One layout bug: in the plugin rows the name "Shuttle Tracker" wraps and collides with the status note. Let me fix that — constrain the middle column and stop the name wrapping.

_[tool: show_html]_

Let me reload to apply the fix, then verify the widget content in both slots and confirm role-gating logic.

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: eval_js]_

All four widget kinds render. Let me confirm the Developer row fix visually.

_[tool: save_screenshot]_

_[tool: read_file]_

Clean now. Let me update the README, clean up temp files, and hand off.

_[tool: str_replace_edit]_

_[tool: delete_file]_

_[tool: update_todos]_

_[tool: done]_

_[tool: fork_verifier_agent]_

Done — the plugin system is built into Commons, and it stays clean because the two audiences are kept separate.

**For everyone**
- **More → Apps** opens a directory: category chips, ratings, install counts, Add/Remove. Tap any plugin for a detail sheet with its permissions.
- Installed plugins don't create new chrome — they render *inside* existing screens under a **"Your apps"** section (Today and You), as native-feeling widgets. I built four widget styles so they don't look templated: a live countdown (Shuttle Tracker), a list (Lunch Today), a stat with delta (401k), and a progress bar (Volunteer Hours).

**For the few**
- **More → Developer** is **role-gated** — it only appears when you have dev access, so employees never see it. Inside: install metrics, your plugins with Published / In review / Draft statuses, a New-plugin CTA, and SDK resources.

**Net additions to the app:** two rows in an already list-based More tab, plus a "Your apps" slot that's invisible when you have nothing installed. No new bottom tab, nothing added for people who don't care.

Toggle **Tweaks** to flip `Developer mode` (proves the role-gating) and `Show app widgets` (the slot system) on and off.

A verifier is doing a background pass — I'll flag anything it catches.

## User

can you make a slide presentation for this app and stuf that i can demo?

## Assistant

_[tool: questions_v2]_

Happy to build a demo deck. I know the app cold at this point, so just a few quick things to aim it right:

## User

Questions answered:
- audience: All-hands / company intro
- goal: Show off the product & features
- screens: Live app in phone mockups (recommended)
- length: 14
- emphasis: Today / home, You tab (stipends, PTO), Plugins & Apps directory
- tone: Match the app's look
- closing: Roadmap / what's next

