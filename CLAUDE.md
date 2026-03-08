# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static website prototype for **ECEC (Electrical & Computer Engineering Club)** at Toronto Metropolitan University. No build tools, no package manager, no backend — pure HTML/CSS/JS.

## Running the Site

Open any `.html` file directly in a browser, or serve locally:
```
python -m http.server 8000
```

No build, lint, or test commands exist.

## Architecture

### File Organization
- Each page is a self-contained `.html` file with a corresponding `<page>.css` file
- `style.css` contains global styles (navbar, loader, scroll progress, shared colors/fonts)
- `script.js` contains global JS loaded on every page
- `resources/` holds supplementary pages (constitution, roadmap, sponsorship)
- `assets/` holds images

### Global JavaScript (`script.js`)
Handles four things across all pages:
1. Mobile hamburger menu toggle
2. Full-page loading animation with progress bar
3. Scroll progress indicator bar
4. Canvas particle animation (100 cyan particles with proximity-based connecting lines)

### Design System
- Background: `#0A192F` (dark navy)
- Accent: `#64FFDA` (cyan/neon)
- Fonts: Orbitron (headings), Poppins/Space Grotesk (body)
- Aesthetic: cyberpunk/terminal — UI copy uses terms like "Initialize Uplink", "TRANSMISSION_FORM", "Authorization Required"

### Admin System
`admin-login.html` and `admin_uplink.html` implement a **client-side-only** password gate using `sessionStorage`. The password is hardcoded in the HTML. This is intentionally simple for a club prototype and not meant to be secure.

### Navigation
No router — file-based navigation. Every page includes the same navbar and footer HTML manually.
