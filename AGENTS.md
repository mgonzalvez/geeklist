# AGENTS.md

## Project: PnP Crafting Geeklist Generator

A single-page web app for generating BGG-formatted header text for the Print & Play Crafting Geeklist on BoardGameGeek.

## Directory Structure

```
pnp_geeklist/
├── .gitignore          # Local OS metadata exclusions
├── index.html          # Main page (form, instructions, guest hosts)
├── styles.css          # Dark/light theme styling
├── app.js              # Form logic, header generation, preview, roster
├── README.md           # Project documentation
├── data/
│   ├── Crafting_Geeklist_Header_Text_Template_updated_2026.txt
│   ├── How_To_Create_Crafting_Geeklist_Aid.txt
│   └── 2026 guest hosts
```

## Architecture

- **No build tools, no dependencies** — pure HTML/CSS/JS
- `index.html` contains all three sections: generator form, instructions, guest host roster
- `app.js` handles:
  - Form validation (all fields required, button disabled until valid)
  - Header generation from form data + hardcoded static content
  - BGG tag → HTML conversion for preview (`[b]`, `[i]`, `[size]`, `[color]`, `[url]`, `[geeklist]`, `[thread]`, `[uforum]`, `[blogpost]`, `[geekurl]`)
  - Copy to clipboard and download .txt functionality
  - Guest host roster rendering from `GUEST_HOSTS` array
- `styles.css` — dark/light themes, responsive grid, form validation states

## Key Functions in app.js

- `generateHeader(data)` — Builds the full BGG header text from form data; year/lastYear derived from `new Date().getFullYear()`
- `collectFormData()` — Reads all form fields; year/lastYear auto-set from `new Date().getFullYear()`
- `renderOutput(data)` — Displays raw code and formatted preview
- `formatForPreview(bggCode)` — Converts BGG tags to HTML for preview
- `validateForm()` — Checks all fields, enables/disables export button
- `renderGuestHosts()` — Renders the 2026 host roster with status badges

## Guest Host Data

The `GUEST_HOSTS` array in `app.js` contains all 12 months for 2026. Update it when hosts change.

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

Note: Year and Last Year are auto-derived from `new Date().getFullYear()` — no user input needed.

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

- **Dark/light mode toggle** — persisted in `localStorage`, defaults to dark
- **Help tooltips** — ℹ icons on required field labels with hover explanations
- **Nav link tooltips** — hover explanations for Header Generator, How-To, Guest Hosts, and Guest Host Resources
- **Form validation** — export button disabled until all fields are filled; red highlighting on invalid fields

## Editing the Template

The source of truth is `data/Crafting_Geeklist_Header_Text_Template_updated_2026.txt`. When the template changes:

1. Update the static lines in `generateHeader()` in `app.js` to match
2. Update `formatForPreview()` if new tag types are introduced
3. Update the `GUEST_HOSTS` array in `app.js` if the host roster changes
