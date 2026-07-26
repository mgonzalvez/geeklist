# PnP Crafting Geeklist Generator

A single-page web application for guest hosts of the **Print & Play Crafting Geeklist** on BoardGameGeek.

## Overview

This tool helps monthly guest hosts generate the BGG-formatted header text for each month's crafting geeklist. It replaces the manual process of editing a text template by providing a structured form with validation and an on-demand formatted preview.

## Features

- **Header Generator** — Fill in a form with monthly variables and export ready-to-paste BGG code
- **Formatted Preview** — See how the header will render with clickable links
- **Copy to Clipboard** — One-click copy of the generated BGG code
- **Download .txt** — Export the header as a text file
- **How-To Instructions** — Step-by-step guide for creating and publishing a geeklist
- **Guest Host Roster** — Full 2026 lineup showing filled, pending, and empty slots
- **Header Readiness** — Live progress shows how many required details are complete
- **Dark/light themes** — Follows the system preference, persists across the related PnP sites, and can be toggled manually
- **Related Sites** — Shared navigation to the other PnP tools

## Files

| File | Description |
|---|---|
| `.gitignore` | Excludes local OS metadata |
| `favicon.svg` | Blue-violet app icon used by the browser tab |
| `index.html` | Main page structure with all three sections |
| `styles.css` | Dark/light theme styling and responsive layout |
| `app.js` | Form validation, header generation, preview rendering, guest host roster |
| `data/` | Reference documents (template, instructions, host list) |

## Form Fields (all required)

| Field | Description |
|---|---|
| Month | Current month |
| Theme | This month's theme title |
| Theme Description | 2-3 sentence italicized explanation of the theme |
| PnP Games On Your Table Geeklist ID | Geeklist ID for this month's playing geeklist |
| Last Month | Previous month |
| Entry Count | Number of entries last month contributed |
| Last Month's Crafting Geeklist ID | Geeklist ID of last month's crafting geeklist |

Note: Year and Last Year are auto-derived from `new Date().getFullYear()` — no user input needed.

## Static Content (hardcoded from template)

The following sections are generated from static content synchronized with the template:

- Contest forum links (`uforum=974620`, `uforum=1530033`)
- Subscription thread (`thread=482943`)
- Archive URL
- "Playing PnP games?" link
- "Places to discover" links (PnPFinder, Launchpad, Buttonshy, The Gamecrafter, PnPArcade, 6 geeklists)
- "PnP prototyping tools" links (9 tools + PnP Tools directory)
- "PnP Methods and Costs" links (blog post, two threads, and the Print and Play Games wiki)
- "Engage with the community" links (Reddit, Facebook)

## Tech Stack

- Vanilla HTML, CSS, JavaScript — no dependencies
- Shared PnP visual system with frosted surfaces and blue-violet accents
- Fully responsive (mobile-friendly)
- Client-side only — no server required

## Deployment

Serve the directory as a static site. For example with Python:

```bash
cd ~/websites/pnp_geeklist
python3 -m http.server 8080
```

Or with Node:

```bash
npx serve ~/websites/pnp_geeklist
```

## Template Reference

The source of truth for generated header structure and static content is:
`data/Crafting_Geeklist_Header_Text_Template_updated_2026.txt`

When the template changes, synchronize the static lines in `generateHeader()` and add preview conversion rules in `formatForPreview()` for any new BGG tag types.
