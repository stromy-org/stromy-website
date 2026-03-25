# AGENTS.md

Self-contained instructions for Codex and other AI agents working on stromy-website.

## Project

stromy-website is the Stromy corporate website — a static site built with Astro 6, MDX content collections, and Tailwind CSS 4. It serves as the public-facing web presence for Stromy's AI-powered intelligence platform.

## Tech Stack

- **Framework**: Astro 6 (static site generator)
- **Content**: MDX with Zod-validated frontmatter schemas
- **Styling**: Tailwind CSS 4 + CSS custom properties from charter.json
- **Interactivity**: Preact islands (lightweight, only where needed)
- **Build**: Vite (built into Astro)

## Commands

```bash
npm run dev           # Dev server at localhost:4321
npm run build         # Generate tokens + production build
npm run tokens        # Regenerate brand tokens from charter.json
npm run check         # Astro check (TypeScript + template diagnostics)
npm test              # Vitest
```

## Key Conventions

### Content Collections

Collections are defined in `src/content.config.ts` using Astro 5+ glob loaders:
- `blog` — Blog posts with title, description, date, author, region, tags, image, featured
- `case-studies` — Case studies with title, capability, region, client, metrics, image
- `capabilities` — Capability pages with title, description, icon, order

Access collections: `import { getCollection, render } from 'astro:content'`
Render MDX content: `const { Content } = await render(entry)`

### Brand Tokens

Brand data comes from `src/brand/charter.json` (synced from brand-tokens repo).
Running `npm run tokens` generates `src/styles/brand-tokens.css` and `src/lib/tokens.ts`.
Never edit these generated files directly.

### Commit Standards

All commits use Conventional Commits with gitmoji:
- Format: `<type>(<scope>): <gitmoji> <description>`
- Types: feat, fix, perf, refactor, build, ci, chore, docs, test, style
- Co-Authored-By trailer on AI-assisted commits

### File Organization

- Pages: `src/pages/` (file-based routing)
- Layouts: `src/layouts/` (BaseLayout, PageLayout, ArticleLayout)
- Components: `src/components/{layout,ui,sections,content}/`
- Content: `src/content/{blog,case-studies,capabilities}/` (MDX files)
- Data: `src/data/` (site config, stats, team)

### Adding Content

To add a blog post, create an MDX file in `src/content/blog/` with this frontmatter:
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
```

To add a case study, create an MDX file in `src/content/case-studies/` with:
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
```
