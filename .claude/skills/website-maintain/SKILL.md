---
name: website-maintain
description: >
  Maintain and update the Stromy corporate website (stromy-website). Handles all
  routine content and configuration changes via natural language: adding blog posts,
  creating case studies, updating capabilities, editing team members, refreshing brand
  tokens, managing regions, updating stats/navigation, and SEO. Use this skill whenever
  the user wants to add, edit, or remove website content, update site data, refresh the
  brand, or make any structural change to stromy-website — even if they don't say
  "website" explicitly. Trigger on phrases like "add a blog post", "new case study",
  "update the team", "refresh brand tokens", "add a region", "update the homepage",
  "change the tagline", "add a nav item", "update SEO", or any request that implies
  modifying the Stromy website.
---

# Website Maintain

This skill guides you through every routine maintenance task on the Stromy website.
The website is an Astro 6 static site with MDX content collections, Tailwind CSS 4,
and a brand token pipeline. All content lives in the repo — there is no CMS, no
database, no external API. Adding content means creating or editing files.

## Quick Orientation

```
stromy-website/
├── src/
│   ├── content/              ← MDX content (blog, case-studies, capabilities)
│   ├── content.config.ts     ← Collection schemas (Zod validation)
│   ├── data/                 ← Site config, stats, team (TypeScript)
│   ├── brand/                ← Charter.json + logos + images (synced, don't edit charter)
│   ├── styles/               ← global.css + brand-tokens.css (generated)
│   ├── lib/                  ← tokens.ts (generated), region.ts
│   ├── components/           ← layout/, ui/, sections/, content/
│   ├── layouts/              ← BaseLayout, PageLayout, ArticleLayout
│   └── pages/                ← File-based routing
├── scripts/generate-tokens.ts
└── package.json
```

**Generated files (never edit directly):**
- `src/styles/brand-tokens.css` — regenerate with `npm run tokens`
- `src/lib/tokens.ts` — regenerate with `npm run tokens`

**Build command:** `npm run build` (runs token generation + Astro build)
**Dev server:** `npm run dev` (localhost:4321)

---

## Task Router

Match the user's request to the appropriate workflow below.

| User says something like... | Go to |
|---|---|
| "add a blog post", "write an article", "new insight" | [Add Blog Post](#add-blog-post) |
| "add a case study", "new case study for [client]" | [Add Case Study](#add-case-study) |
| "add a capability", "update [capability name]" | [Update Capability](#update-capability) |
| "update the team", "add a team member", "change bio" | [Update Team](#update-team) |
| "update stats", "change the metrics" | [Update Stats](#update-stats) |
| "refresh brand", "sync brand tokens", "colors changed" | [Refresh Brand Tokens](#refresh-brand-tokens) |
| "add a region", "add Belgium", "new country" | [Add Region](#add-region) |
| "update navigation", "add a nav link" | [Update Navigation](#update-navigation) |
| "update SEO", "meta tags", "OG image" | [Update SEO](#update-seo) |
| "update the homepage", "change the tagline" | [Update Homepage](#update-homepage) |
| "deploy", "build the site" | [Build & Deploy](#build--deploy) |

---

## Add Blog Post

Create a new MDX file in `src/content/blog/`.

### 1. Gather information

You need these fields (ask the user for anything missing):

| Field | Required | Format | Example |
|-------|----------|--------|---------|
| title | Yes | String | "AI-Powered Parliamentary Analysis" |
| description | Yes | String (1-2 sentences) | "How we built a real-time intelligence layer" |
| date | Yes | YYYY-MM-DD | 2026-03-25 |
| author | Yes | String | "William Masquelier" |
| region | Yes | `au`, `nl`, or `global` | "au" |
| tags | Yes | Array of strings | ["ai", "government"] |
| image | Yes | Relative path to brand image | ../../brand/images/07_geometric_bw.jpg |
| featured | No | Boolean (default: false) | true |
| body | Yes | MDX content | The article text |

### 2. Choose an image

Available brand images (in `src/brand/images/`):

| File | Description | Best for |
|------|-------------|----------|
| 01_brutalist_concrete.jpg | Parking spiral, industrial | Divider, background |
| 02_brutalist_geometric.jpg | Concrete cantilever, bold | Cover, hero |
| 03_dark_concrete_wall.jpg | Raw concrete surface | Background |
| 04_concrete_curves.jpg | Industrial curved pipes | Divider |
| 05_woven_texture.jpg | Dark woven fabric | Background |
| 06_metal_surface.jpg | Brushed steel texture | Background |
| 07_geometric_bw.jpg | Stark light/shadow facade | Cover, featured |
| 08_arch_lines_shadow.jpg | Chevron geometry shadows | Divider, closing |
| 09_symmetrical_concrete.jpg | Geometric mandala on black | Cover, closing |
| 10_concrete_surface.jpg | Dark asphalt surface | Background |

Pick one that hasn't been used by another post with the same tags, if possible.

### 3. Create the file

**Filename convention:** kebab-case slug, e.g., `ai-parliamentary-analysis.mdx`
The filename (without `.mdx`) becomes the URL slug: `/blog/ai-parliamentary-analysis`

```mdx
---
title: "[title]"
description: "[description]"
date: [YYYY-MM-DD]
author: "[author]"
region: "[au|nl|global]"
tags: ["tag1", "tag2"]
image: ../../brand/images/[filename].jpg
featured: [true|false]
---

[MDX body content here]
```

### 4. Writing guidelines

- Use Instrument Serif headings (rendered automatically via ArticleLayout)
- Keep paragraphs concise — the reading width is 72ch
- Use `##` for major sections, `###` for subsections
- You can use `---` for horizontal rules (rendered as score line dividers)
- Outcome-focused language: "We delivered X" not "We offer X"
- No need to import components — MDX renders through the ArticleLayout wrapper

### 5. Verify

Run `npm run build` to validate. Astro will catch:
- Missing required frontmatter fields
- Invalid region values
- Broken image paths
- Date format errors

---

## Add Case Study

Create a new MDX file in `src/content/case-studies/`.

### 1. Gather information

| Field | Required | Format | Example |
|-------|----------|--------|---------|
| title | Yes | String | "Victorian Council Media Intelligence" |
| description | Yes | String | "Real-time media monitoring for 79 councils" |
| capability | Yes | Capability slug | "government-relations" |
| region | Yes | `au`, `nl`, or `global` | "au" |
| client | Yes | String | "Victorian Local Councils" |
| metrics | Yes | Array of {label, value} | See below |
| image | Yes | Relative path | ../../brand/images/01_brutalist_concrete.jpg |

**Valid capability slugs** (must match a filename in `src/content/capabilities/`):
- `government-relations`
- `crisis-management`
- `media-relations`
- `public-relations`
- `social-media-strategy`
- `research-insights`
- `esg-sustainability`

**Metrics format** (2-4 metrics recommended):
```yaml
metrics:
  - label: "Councils covered"
    value: "79"
  - label: "Data points processed"
    value: "2.4M"
```

### 2. Create the file

**Filename convention:** `[region]-[client-slug].mdx`, e.g., `au-victorian-councils.mdx`

```mdx
---
title: "[title]"
description: "[description]"
capability: "[capability-slug]"
region: "[au|nl|global]"
client: "[client name]"
metrics:
  - label: "[metric 1 label]"
    value: "[metric 1 value]"
  - label: "[metric 2 label]"
    value: "[metric 2 value]"
image: ../../brand/images/[filename].jpg
---

## The Challenge

[What problem the client faced — 1-2 paragraphs]

## Our Approach

[How Stromy addressed it — 1-2 paragraphs, mention specific technologies/methods]

## The Outcome

[Results and impact — 1-2 paragraphs, tie back to metrics]
```

### 3. Cross-references

After creating a case study, it will automatically appear:
- On the case studies index page (`/case-studies/`)
- As a "Related Case Study" on the linked capability page
- In related case studies on other case studies with the same capability

No code changes needed — the pages query the collection dynamically.

### 4. Verify

Run `npm run build`. Check that the capability slug matches an existing capability file.

---

## Update Capability

Capabilities are MDX files in `src/content/capabilities/`. They are the **single source
of truth** for capability metadata — there is no separate data file.

### Edit existing capability

Read the file, update frontmatter or body content:

```
src/content/capabilities/government-relations.mdx
src/content/capabilities/crisis-management.mdx
src/content/capabilities/media-relations.mdx
src/content/capabilities/public-relations.mdx
src/content/capabilities/social-media-strategy.mdx
src/content/capabilities/research-insights.mdx
src/content/capabilities/esg-sustainability.mdx
```

Frontmatter fields:
```yaml
---
title: "Government Relations"
description: "Short description for cards and previews"
icon: "landmark"     # Emoji or icon identifier
order: 1             # Display order on capabilities index (1 = first)
---
```

### Add new capability

1. Create `src/content/capabilities/[slug].mdx` with the frontmatter above
2. Set `order` to the next available number (check existing files)
3. The new capability auto-appears on the capabilities index
4. Update `src/components/sections/CapabilityGrid.astro` — this component has
   **hardcoded** capability data for the homepage. Add the new capability to the
   `capabilities` array in the frontmatter section

**Important:** The CapabilityGrid section component on the homepage uses hardcoded
data, not the content collection. If you add a capability, you must also update
the hardcoded array in `src/components/sections/CapabilityGrid.astro`.

Similarly, `src/components/sections/CaseStudyCards.astro` has hardcoded case study
data — update it if adding featured case studies for the homepage.

---

## Update Team

Team data lives in `src/data/team.ts`.

```typescript
export const team = [
  {
    name: 'William Masquelier',
    role: 'Co-founder',
    bio: 'Strategic communications and AI technology leader...',
  },
  // Add new members here
] as const;
```

### To add a member

Add a new object to the array. Fields: `name` (string), `role` (string), `bio` (string).

### To update a member

Edit the relevant object in the array.

### To remove a member

Remove the object from the array.

The About page (`src/pages/about.astro`) reads this array and renders cards
automatically. No other changes needed.

---

## Update Stats

Stats are displayed on the homepage in the StatsRibbon. Edit `src/data/stats.ts`:

```typescript
export const stats = [
  { value: '9', label: 'Jurisdictions Covered', suffix: '' },
  { value: '2.4', label: 'Data Points Processed', suffix: 'M+' },
  { value: '< 4', label: 'Hours to Insight', suffix: 'hrs' },
  { value: '79', label: 'Councils Monitored', suffix: '' },
] as const;
```

Each stat has:
- `value` — the number (string, displayed in IBM Plex Mono)
- `label` — descriptor
- `suffix` — appended after value (e.g., "M+", "hrs", "%")

The display renders as: **value** + **suffix** (large, orange), **label** (small, grey).
Keep to 3-5 stats for visual balance.

---

## Refresh Brand Tokens

When brand data changes upstream (colors, fonts, logos, images in `brand-tokens` repo):

### 1. Sync brand assets

From the stromy-org root:
```bash
bash scripts/sync-brand-data.sh
```

This copies `charter.json`, logos, and images into `stromy-website/src/brand/`.

### 2. Regenerate tokens

From the stromy-website directory:
```bash
npm run tokens
```

This reads `src/brand/charter.json` and regenerates:
- `src/styles/brand-tokens.css` — CSS custom properties
- `src/lib/tokens.ts` — TypeScript module

### 3. Rebuild and verify

```bash
npm run build
```

Check that the site builds without errors. If colors or fonts changed, visually
inspect with `npm run dev`.

### What changes propagate automatically

- Color changes → CSS custom properties → all components
- Font changes → font family variables → all text
- New images → available in `src/brand/images/` for content frontmatter

### What requires manual updates

- If a brand image is **removed**, check all MDX frontmatter `image` fields
- If logo filenames change, update `src/components/layout/Header.astro` and
  `src/components/sections/Hero.astro` (they import specific logo SVGs)

---

## Add Region

The region system is a content filter, not i18n. Adding a region means:

### 1. Update region type

In `src/content.config.ts`, add the new region to the enum:
```typescript
region: z.enum(['au', 'nl', 'be', 'global']),  // Added 'be'
```
This appears in **both** the `blog` and `caseStudies` collection schemas.

### 2. Update region config

In `src/lib/region.ts`:
- Add the region to the `Region` type: `export type Region = 'au' | 'nl' | 'be';`
- Add detection logic in `detectRegion()` (e.g., hostname check for `.be`)
- Add config entry in `regionConfig`:
  ```typescript
  be: {
    label: 'Belgium',
    flag: '🇧🇪',
    domain: 'stromy.be',
    address: 'Brussels, Belgium',
    email: 'hello@stromy.be',
  },
  ```

### 3. Update RegionToggle

In `src/components/layout/RegionToggle.astro`, add a button for the new region.

### 4. Update contact page

In `src/pages/contact.astro`, add an office card for the new region.

### 5. Tag existing content

Review existing blog posts and case studies — any relevant to the new region
should have their `region` field updated, or create new region-specific content.

---

## Update Navigation

### Main navigation

Edit `src/data/site.ts`:

```typescript
export const site = {
  // ...
  nav: [
    { label: 'Capabilities', href: '/capabilities' },
    { label: 'Technology', href: '/technology' },
    // Add, remove, or reorder items here
  ],
} as const;
```

The `mainNav` export mirrors `site.nav`. The Header and mobile menu read from this.

### Footer navigation

Also in `src/data/site.ts`, the `footerNav` export has three groups:
- `company` — About, Team, Partners links
- `services` — Capability links
- `legal` — Privacy, Terms links

Update the relevant group.

### Adding a new page

If the nav points to a page that doesn't exist yet:
1. Create the page file in `src/pages/[name].astro`
2. Use `PageLayout` as the wrapper
3. Add the nav item to `site.ts`

---

## Update SEO

### Per-page meta tags

Every page passes `title` and `description` to its layout. To update:
- Find the page in `src/pages/`
- Edit the `title` and `description` props passed to `PageLayout` or `ArticleLayout`

### For content pages (blog, case studies)

SEO data comes from frontmatter. Update `title` and `description` in the MDX file.

### OG images

The `image` prop on layouts sets the Open Graph image. For content pages, this
comes from the frontmatter `image` field automatically.

### Sitemap

Generated automatically by `@astrojs/sitemap` on build. No manual updates needed.
The site URL is set in `astro.config.mjs` (`site: 'https://stromy.com.au'`).

### RSS feed

`src/pages/rss.xml.ts` generates the RSS feed from the blog collection. It updates
automatically when blog posts are added.

---

## Update Homepage

The homepage (`src/pages/index.astro`) assembles section components:

```
Hero → CapabilityGrid → StatsRibbon → CaseStudyCards → TechTeaser → CTABand
```

### Change the tagline

The tagline "Intelligence, Orchestrated." appears in:
- `src/components/sections/Hero.astro` — hero section
- `src/components/layout/Footer.astro` — footer
- `src/data/site.ts` — `site.tagline`

Update all three locations for consistency.

### Change featured case studies

Edit `src/components/sections/CaseStudyCards.astro` — the case studies on the
homepage are hardcoded in the component. Update the array.

### Change capability preview

Edit `src/components/sections/CapabilityGrid.astro` — capabilities on the homepage
are hardcoded. Update the array.

### Change stats

Edit `src/data/stats.ts` (see [Update Stats](#update-stats)).

### Change hero image

Edit `src/components/sections/Hero.astro` — change the image import at the top.

---

## Build & Deploy

### Local build

```bash
npm run build    # Generates tokens + builds to dist/
npm run preview  # Serves dist/ locally for inspection
```

### CI/CD

The site deploys via GitHub Actions on push to `main`:
1. `ci.yml` — Lint, astro check, build smoke test
2. `deploy.yml` — Builds and deploys to GitHub Pages (gated on CI)

### Pre-deploy checklist

Before pushing changes that will trigger deployment:
1. Run `npm run build` locally — verify no errors
2. Run `npm run preview` — spot-check changed pages
3. Check that new content has correct region tags
4. Verify image paths resolve (build will catch broken paths)
5. If brand was refreshed, confirm `npm run tokens` was run

---

## Common Patterns Reference

### Image paths in MDX frontmatter

Always use relative paths from the MDX file's location:
- From `src/content/blog/`: `../../brand/images/[file].jpg`
- From `src/content/case-studies/`: `../../brand/images/[file].jpg`
- From `src/content/capabilities/`: `../../brand/images/[file].jpg`

### Content collection access in pages

```typescript
import { getCollection, render } from 'astro:content';

// Fetch all entries
const posts = await getCollection('blog');

// Render MDX to component
const { Content } = await render(entry);
```

Use `render(entry)` — NOT `entry.render()` (that's the old Astro 4 API).

### Region filtering pattern

```typescript
// Filter content by region
const filtered = posts.filter(
  (p) => p.data.region === region || p.data.region === 'global'
);
```

### Typography classes

| Class | Size | Font | Use |
|-------|------|------|-----|
| `display-xl` | ~48-88px responsive | Instrument Serif | Page titles |
| `display-lg` | ~36-64px responsive | Instrument Serif | Section headings |
| `display-md` | ~28-44px responsive | Instrument Serif | Card titles |
| `display-sm` | ~20-28px responsive | Instrument Serif | Subsection titles |
| `body-lg` | 18px | DM Sans | Lead text |
| `body-md` | 16px | DM Sans | Body text |
| `body-sm` | 14px | DM Sans | Captions |
| `mono` | — | IBM Plex Mono | Metrics, code |
