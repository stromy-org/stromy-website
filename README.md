# Stromy Website

The official corporate website for **Stromy** — an AI-powered intelligence platform for government relations, crisis management, and strategic communications.

## Tech Stack

- **Framework**: [Astro 6](https://astro.build/) — Static site generator with island architecture
- **Content**: MDX with Zod-validated frontmatter schemas
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) + CSS custom properties
- **Interactivity**: [Preact](https://preactjs.com/) islands (lightweight, only where needed)
- **Build**: Vite (built into Astro)

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# → http://localhost:4321

# Build for production
npm run build
```

## Commands

| Command           | Description                                          |
|-------------------|------------------------------------------------------|
| `npm run dev`     | Start dev server at `localhost:4321`                 |
| `npm run build`   | Generate tokens + production build                   |
| `npm run preview` | Preview production build locally                     |
| `npm run tokens`  | Regenerate brand tokens from `charter.json`          |
| `npm run check`   | Astro check (TypeScript + template diagnostics)      |
| `npm test`        | Run tests with Vitest                                |

## Project Structure

```
stromy-website/
├── src/
│   ├── content/              ← MDX content collections
│   │   ├── blog/             ← Blog posts
│   │   ├── case-studies/     ← Case studies
│   │   └── capabilities/     ← Capability pages
│   ├── content.config.ts     ← Collection schemas (Zod validation)
│   ├── pages/                ← File-based routing
│   ├── layouts/              ← BaseLayout, PageLayout, ArticleLayout
│   ├── components/
│   │   ├── layout/           ← Header, Footer, Nav, RegionToggle
│   │   ├── ui/               ← Button, Card, Badge, Icon, ScoreLine
│   │   ├── sections/         ← Hero, CapabilityGrid, StatsRibbon, etc.
│   │   └── content/          ← BlogCard, CaseStudyCard, ArticleLayout
│   ├── data/                 ← Site config, stats, team (TypeScript)
│   ├── brand/                ← charter.json + logos + images
│   ├── styles/
│   │   ├── global.css        ← Base styles, utilities
│   │   └── brand-tokens.css  ← Generated (do not edit)
│   └── lib/
│       ├── region.ts         ← Region store (AU/NL)
│       └── tokens.ts         ← Generated (do not edit)
├── scripts/
│   └── generate-tokens.ts    ← charter.json → CSS + TS tokens
├── public/                   ← Static assets (favicon, fonts)
└── dist/                     ← Build output (gitignored)
```

## Content Management

All content lives in the repo as MDX files — there is no CMS or database.

### Adding a Blog Post

Create an MDX file in `src/content/blog/`:

```yaml
---
title: "Post Title"
description: "Short description"
date: 2026-03-25
author: "Author Name"
region: "au"  # au, nl, or global
tags: ["tag1", "tag2"]
image: ../../brand/images/07_geometric_bw.jpg
featured: false
---

Your content here...
```

### Adding a Case Study

Create an MDX file in `src/content/case-studies/`:

```yaml
---
title: "Study Title"
description: "Short description"
capability: "government-relations"  # must match a capability slug
region: "au"
client: "Client Name"
metrics:
  - label: "Metric"
    value: "42"
image: ../../brand/images/01_brutalist_concrete.jpg
---

Your content here...
```

### Adding a Capability

Create an MDX file in `src/content/capabilities/`:

```yaml
---
title: "Capability Name"
description: "Short description"
icon: "landmark"  # Lucide icon name
order: 1
---

Your content here...
```

## Brand Tokens

Brand data comes from `src/brand/charter.json`. Running `npm run tokens` generates:
- `src/styles/brand-tokens.css` — CSS custom properties
- `src/lib/tokens.ts` — TypeScript constants

**Never edit these generated files directly.**

### Design System

| Element | Value |
|---------|-------|
| **Primary** (Stromy Green) | `#1B3D33` |
| **Secondary** (Obsidian) | `#0B0B0B` |
| **Accent** (Signal Orange) | `#D4632A` |
| **Background** (Parchment) | `#F2F0EA` |
| **Heading Font** | Instrument Serif |
| **Body Font** | DM Sans |
| **Mono Font** | IBM Plex Mono |

## Region System

The site supports AU and NL regions — this is a content filter, not i18n:

- Region detected from domain (`stromy.com.au` → AU, `stromy.nl` → NL)
- Manual override stored in localStorage
- Content filtered by `region` field in frontmatter (`au`, `nl`, or `global`)

## Development

### Content Collections (Astro 6)

Collections use glob loaders defined in `src/content.config.ts`:

```typescript
import { getCollection, render } from 'astro:content';

const posts = await getCollection('blog');
const { Content } = await render(entry);
```

### Available Brand Images

| File | Description |
|------|-------------|
| `01_brutalist_concrete.jpg` | Parking spiral, industrial |
| `02_brutalist_geometric.jpg` | Concrete cantilever, bold |
| `03_dark_concrete_wall.jpg` | Raw concrete surface |
| `04_concrete_curves.jpg` | Industrial curved pipes |
| `05_woven_texture.jpg` | Dark woven fabric |
| `06_metal_surface.jpg` | Brushed steel texture |
| `07_geometric_bw.jpg` | Stark light/shadow facade |
| `08_arch_lines_shadow.jpg` | Chevron geometry shadows |
| `09_symmetrical_concrete.jpg` | Geometric mandala on black |
| `10_concrete_surface.jpg` | Dark asphalt surface |

## Deployment

The site is hosted as a static build. Production builds are generated with:

```bash
npm run build
```

Output goes to `dist/` and can be deployed to any static hosting provider.

## License

Proprietary. All rights reserved.
