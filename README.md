# PnP Crafting Geeklist Generator

A single-page web application for guest hosts of the **Print & Play Crafting Geeklist** on BoardGameGeek.

## Overview

This tool helps monthly guest hosts generate the BGG-formatted header text for each month's crafting geeklist. It replaces the manual process of editing a text template by providing a structured form with validation and real-time preview.

## Features

- **Header Generator** — Fill in a form with monthly variables and export ready-to-paste BGG code
- **Formatted Preview** — See how the header will render with clickable links
- **Copy to Clipboard** — One-click copy of the generated BGG code
- **Download .txt** — Export the header as a text file
- **How-To Instructions** — Step-by-step guide for creating and publishing a geeklist
- **Guest Host Roster** — Full 2026 lineup showing filled, pending, and empty slots

## Files

| File | Description |
|---|---|
| `index.html` | Main page structure with all three sections |
| `styles.css` | Dark-themed styling, responsive layout |
| `app.js` | Form validation, header generation, preview rendering, guest host roster |
| `data/` | Reference documents (template, instructions, host list) |

## Form Fields (all required)

| Field | Description |
|---|---|
| Month | Current month |
| Theme | This month's theme title |
| Theme Description | 2-3 sentence italicized explanation of the theme |
| PnP Games On Your Table Geeklist ID | Geeklist ID for this month's playing geeklist (label auto-generated as "PnP Games on Your Table Month Year") |
| Last Month | Previous month |
| Entry Count | Number of entries last month contributed |
| Last Month's Crafting Geeklist ID | Geeklist ID of last month's crafting geeklist |

Note: Year and Last Year are auto-derived from `new Date().getFullYear()` — no user input needed.

## Static Content (hardcoded from template)

The following sections are included verbatim from the template and never change:

- Contest forum links (`uforum=974620`, `uforum=1530033`)
- Subscription thread (`thread=482943`)
- Archive URL
- "Places to discover" links (PnPFinder, Launchpad, Buttonshy, The Gamecrafter, PnPArcade, 5 geeklists)
- "PnP prototyping tools" links (9 tools + PnP Tools directory)
- "Engage with the community" links (Reddit, Facebook)

## Tech Stack

- Vanilla HTML, CSS, JavaScript — no dependencies
- Dark theme with gold accents matching BGG's color palette
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

The generated output matches the structure defined in:
`data/Crafting_Geeklist_Header_Text_Template_updated_2026.txt`
