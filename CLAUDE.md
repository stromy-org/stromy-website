# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Project Overview

stromy-website is the **Stromy corporate website** — a static site built with Astro, MDX, and Tailwind CSS. It communicates Stromy's capabilities in AI-powered intelligence for government relations, crisis management, and strategic communications.

## Repository Structure

```
stromy-website/
├── client-data/                   ← Brand data slice (charter.json, logos, images), committed
├── src/
│   ├── styles/
│   │   ├── client-data.css      ← Generated from charter.json (do not edit)
│   │   └── global.css            ← Base styles, score lines, utilities
│   ├── lib/
│   │   ├── tokens.ts             ← Generated TS module (do not edit)
│   │   └── region.ts             ← Region store (AU/NL)
│   ├── components/
│   │   ├── layout/               ← Header, Footer, Nav, RegionToggle
│   │   ├── ui/                   ← ScoreLine, Button, Card, StatBlock, Badge, Icon
│   │   ├── sections/             ← Hero, CapabilityGrid, StatsRibbon, CTABand, etc.
│   │   └── content/              ← BlogCard, CaseStudyCard, ArticleLayout
│   ├── content/                  ← MDX content collections
│   │   ├── blog/                 ← Blog posts (MDX with frontmatter)
│   │   ├── case-studies/         ← Case studies (MDX with frontmatter)
│   │   └── capabilities/        ← Capability pages (MDX, single source of truth)
│   ├── content.config.ts         ← Content collection schemas (Zod)
│   ├── pages/                    ← Astro file-based routing
│   ├── layouts/                  ← BaseLayout, PageLayout, ArticleLayout
│   └── data/                     ← site.ts, stats.ts, team.ts
├── scripts/
│   └── generate-tokens.ts        ← charter.json → client-data.css + tokens.ts
├── public/                       ← Static assets (favicon, fonts)
└── dist/                         ← Build output (gitignored)
```

## Commands

```bash
npm run dev           # Astro dev server (localhost:4321)
npm run build         # Generate tokens + production build → dist/
npm run preview       # Preview production build locally
npm run tokens        # Regenerate brand tokens from charter.json
npm run check         # Astro check (TypeScript + template diagnostics)
npm test              # Vitest
```

## Key Patterns

### Content Collections (Astro 5+/6)

- Collections use glob loaders defined in `src/content.config.ts`
- Access: `import { getCollection, render } from 'astro:content'`
- Render MDX: `const { Content } = await render(entry)` (NOT `entry.render()`)
- Entry ID is the filename slug (e.g., `ai-parliamentary-analysis`)

### Brand Token Pipeline

1. Brand assets live in `client-data/clients/stromy/` (charter.json, logos, images) — committed slice, updated via `dispatch-client-data.sh`
2. `npm run tokens` reads `client-data/clients/stromy/charter.json` → generates `client-data.css` + `tokens.ts`
3. **Never edit** `client-data.css` or `tokens.ts` directly — they are generated files

### Region System

- Not i18n — a content filter. AU/NL toggle filters content by frontmatter `region` field
- Region detected from domain (`stromy.com.au` → AU, `stromy.nl` → NL)
- Manual override stored in localStorage

### Adding Content

- **Blog post**: Create MDX file in `src/content/blog/` with required frontmatter
- **Case study**: Create MDX file in `src/content/case-studies/` with required frontmatter
- **Capability**: Create MDX file in `src/content/capabilities/` — this is the single source of truth

### MCP Servers

- **`astro-docs`** — Official Astro documentation MCP (remote, `https://mcp.docs.astro.build/mcp`)
  - Tool: `search_astro_docs` — semantic search across current Astro docs
  - **When to use**: Before writing Astro-specific code where the API may have changed (content collections, config options, integrations, rendering patterns, middleware, routing). Especially useful when upgrading Astro versions, using newer APIs, or when unsure about current best practices.
  - **When NOT to use**: For project-specific questions (file paths, brand tokens, content structure) — those are answered by this file and the codebase itself.

- **`playwright`** — Browser automation via Playwright (`@playwright/mcp`)
  - **When to use**: Visual testing, screenshot comparisons, verifying rendered pages, checking responsive layouts, testing navigation flows.
  - **When NOT to use**: For content or code changes — edit files directly.

### Design System

- Colors: Obsidian (#0B0B0B), Parchment (#F2F0EA), Stromy Green (#1B3D33), Signal Orange (#D4632A)
- Fonts: Instrument Serif (headings), DM Sans (body), IBM Plex Mono (mono/metrics)
- Score lines: thin line + dot dividers between sections
- Images: brutalist photography with 15-20% green overlay
