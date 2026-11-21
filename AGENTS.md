# AGENTS.md

## Project: PnP Crafting Geeklist Generator

A single-page web app for generating BGG-formatted header text for the Print & Play Crafting Geeklist on BoardGameGeek.

## Directory Structure

```
pnp_geeklist/
├── .gitignore          # Local OS metadata exclusions
├── favicon.svg         # Shared blue-violet app icon
├── index.html          # Main page (form, instructions, guest hosts)
├── styles.css          # Dark/light theme styling
├── app.js              # Form logic, header generation, preview, roster
├── README.md           # Project documentation
├── data/
│   ├── Crafting_Geeklist_Header_Text_Template_updated_2026.txt
│   ├── How_To_Create_Crafting_Geeklist_Aid.txt
│   ├── hosts.json                # Guest host roster (single source of truth)
│   └── guest_hosts_post_draft.txt # BGG-formatted post draft for publishing the lineup
└── tests/
    └── header.test.mjs           # Smoke test: static links match template + dynamic fields work
```

## Architecture

- **No build tools, no dependencies** — pure HTML/CSS/JS
- `index.html` contains all three sections: generator form, instructions, guest host roster
- `app.js` handles:
  - Form validation (all fields required, button disabled until valid)
  - Header generation from form data + hardcoded static content
  - BGG tag → HTML conversion for preview (`[b]`, `[i]`, `[size]`, `[color]`, `[url]`, `[geeklist]`, `[thread]`, `[uforum]`, `[blogpost]`, `[geekurl]`)
  - Copy to clipboard (with execCommand fallback and manual-select last resort) and download .txt functionality
  - Guest host roster loaded from `data/hosts.json` and rendered (split into 2027 slate / 2026 wrap-up); the form pre-fills Month, Previous Month, and known Themes from the roster
- `styles.css` — dark/light themes, responsive grid, form validation states

## Key Functions in app.js

- `generateHeader(data)` — Builds the full BGG header text from form data; year comes from the optional Year field (defaults to current year), lastYear rolls back a year when the recap crosses a year boundary
- `collectFormData()` — Reads all form fields; resolves year (manual override or current year) and computes lastYear
- `renderOutput(data)` — Displays raw code and formatted preview
- `formatForPreview(bggCode)` — Converts BGG tags to HTML for preview
- `validateForm()` — Checks all fields, enables/disables export button
- `renderGuestHosts()` — Renders the 2026 host roster with status badges

## Guest Host Data

The roster lives in `data/hosts.json` — the single source of truth. `app.js` fetches it at load time into the `GUEST_HOSTS` array (`month`, `year`, `user`, `theme` per entry). `data/guest_hosts_post_draft.txt` is a BGG-formatted draft for publishing the lineup on BGG; keep it in sync manually when the roster changes. Update `hosts.json` when hosts change.

## Form Fields (all required)

| Field | Description |
|---|---|
| Month | Select the current month |
| Theme | This month's theme title |
| Theme Description | 2-3 sentence italicized explanation of the theme |
| PnP Games On Your Table Geeklist ID | Geeklist ID for this month's playing geeklist |
| Last Month | Previous month |
| Entry Count | Number of entries last month contributed |
| Last Month's Crafting Geeklist ID | Geeklist ID of last month's crafting geeklist |

Note: Year defaults to `new Date().getFullYear()` but can be overridden with an optional Year field (useful for preparing January's header in December). Last Year automatically rolls back to the previous year when the recap crosses a year boundary (e.g. January header recapping December).

## Static Content

The following are hardcoded in `generateHeader()` and match the template file:
- Contest forum IDs (974620, 1530033)
- Subscription thread (482943)
- Archive URL
- "Playing PnP games?" link
- "Places to discover" links (5 external sites and 6 geeklists)
- All "PnP prototyping tools" links (9 tools plus the PnP Tools directory)
- "PnP Methods and Costs" links (`blogpost=133228`, `thread=3155948`, Print and Play Games wiki, `thread=848512`)
- Community links (Reddit, Facebook)

To update static content, edit the `lines` array in `generateHeader()` in `app.js`.

## BGG Tag Format Reference

| Tag | Format | Example |
|---|---|---|
| Bold | `[b]text[/b]` | `[b]Title[/b]` |
| Italic | `[i]text[/i]` | `[i]Description[/i]` |
| Size | `[size=XX]text[/size]` | `[size=24]Header[/size]` |
| Color | `[color=HEX]text[/color]` | `[color=#ffdd00]Gold[/color]` |
| URL | `[url=URL]Label[/url]` | `[url=https://...]Link[/url]` |
| Geeklist | `[geeklist=ID]Label[/geeklist]` | `[geeklist=123456]PnP Games on Your Table June 2026[/geeklist]` |
| Thread | `[thread=ID]Label[/thread]` | `[thread=482943]Thread[/thread]` |
| Forum | `[uforum=ID]Label[/uforum]` | `[uforum=974620]Forum[/uforum]` |
| Blog post | `[blogpost=ID]Label[/blogpost]` | `[blogpost=133228][/blogpost]` |
| BGG-relative URL | `[geekurl=/path]Label[/geekurl]` | `[geekurl=/wiki/page/Print_and_Play_Games][/geekurl]` |

## UI Features

- **Dark/light mode toggle** — uses the shared `pnpfinder-theme` key and otherwise follows the operating system
- **Related Sites menu** — links to the broader PnP tool family
- **Header readiness panel** — shows live completion progress for the seven required fields
- **Help tooltips** — keyboard-accessible info icons explain required fields
- **Section navigation** — highlights Header Generator, How-To, or Guest Hosts as the user moves through the page
- **Form validation** — export button disabled until all fields are filled; red highlighting on invalid fields

## Editing the Template

The source of truth is `data/Crafting_Geeklist_Header_Text_Template_updated_2026.txt`. When the template changes:

1. Update the static lines in `generateHeader()` in `app.js` to match
2. Update `formatForPreview()` if new tag types are introduced
3. Update `data/hosts.json` if the host roster changes (and refresh `guest_hosts_post_draft.txt` if publishing the lineup on BGG)

## Testing

```bash
node tests/header.test.mjs
```

The smoke test runs `app.js` in a sandboxed VM with a stub DOM and checks that (1) every static link token in the template file also appears in the generated header, (2) dynamic fields interpolate correctly, and (3) the preview converter handles core BGG tags. It also runs in the GitHub Actions deploy workflow before the Pages upload.

## Registry & provenance rule (portfolio-wide)

Personal project — completely separate from Apple work.

- `.npmrc` pins `registry=https://registry.npmjs.org`. Never let Apple's internal npm mirror (`npm.apple.com`, `artifacts.apple.com/artifactory/...`) end up in `package-lock.json`; GitHub Actions can't reach it and CI fails with `ENOTFOUND`.
- Audit before pushing: `../scripts/check-registry.sh` (add `--fix` to normalize).
- No work credentials, internal hostnames, proprietary assets, or confidential material in this repo.
