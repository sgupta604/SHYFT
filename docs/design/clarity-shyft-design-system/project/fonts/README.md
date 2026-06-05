# Fonts

Clarity uses three real, freely available faces — **delivered via Google Fonts**, not substituted:

| Role | Family | Weights used | Source |
|---|---|---|---|
| Display | **Sora** | 400 / 500 / 600 / 700 | Google Fonts |
| UI / body | **Inter** | 400 / 500 / 600 / 700 | Google Fonts |
| Mono / numbers | **JetBrains Mono** | 400 / 500 / 700 | Google Fonts |

They're loaded by the `@import` at the top of [`../colors_and_type.css`](../colors_and_type.css):

```css
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');
```

**Numbers** use Inter's tabular figures in UI and JetBrains Mono's tabular set for amounts / IDs / timestamps so columns align without fixed-width layout.

> No local `.ttf`/`.woff2` files are bundled — the CDN delivers the genuine faces. If you need a fully offline bundle, download the woff2 files from Google Fonts into this folder and replace the `@import` with `@font-face` rules.
