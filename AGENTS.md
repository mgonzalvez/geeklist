# AGENTS.md

## Project: PnP Crafting Geeklist Generator

A single-page web app for generating BGG-formatted header text for the Print & Play Crafting Geeklist on BoardGameGeek.

## Directory Structure

```
pnp_geeklist/
├── index.html          # Main page (form, instructions, guest hosts)
├── styles.css          # Dark theme styling
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
  - BGG tag → HTML conversion for preview (`[b]`, `[i]`, `[size]`, `[color]`, `[url]`, `[geeklist]`, `[thread]`, `[uforum]`)
  - Copy to clipboard and download .txt functionality
  - Guest host roster rendering from `GUEST_HOSTS` array
- `styles.css` — dark theme, responsive grid, form validation states

## Key Functions in app.js

- `generateHeader(data)` — Builds the full BGG header text from form data
- `collectFormData()` — Reads all form fields
- `renderOutput(data)` — Displays raw code and formatted preview
- `formatForPreview(bggCode)` — Converts BGG tags to HTML for preview
- `validateForm()` — Checks all fields, enables/disables export button
- `renderGuestHosts()` — Renders the 2026 host roster with status badges

## Guest Host Data

The `GUEST_HOSTS` array in `app.js` contains all 12 months for 2026. Update it when hosts change.

## Static Content

The following are hardcoded in `generateHeader()` and match the template file:
- Contest forum IDs (974620, 1530033)
- Subscription thread (482943)
- Archive URL
- "Playing PnP games?" line — label auto-generated from `month` and `year` variables as "PnP Games on Your Table Month Year"
- All "PnP prototyping tools" links (10 items)
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

## Editing the Template

The source of truth is `data/Crafting_Geeklist_Header_Text_Template_updated_2026.txt`. When the template changes:

1. Update the static lines in `generateHeader()` in `app.js` to match
2. Update `formatForPreview()` if new tag types are introduced
3. Update the `GUEST_HOSTS` array in `app.js` if the host roster changes
