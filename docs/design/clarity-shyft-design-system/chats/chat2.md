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

