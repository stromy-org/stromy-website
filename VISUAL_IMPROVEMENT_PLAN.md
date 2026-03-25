# Stromy Visual Improvement Plan

Date: 2026-03-25

## Scope

This plan is based on:

- A local visual audit of all 19 built routes
- Desktop and mobile screenshot passes against the running site
- A code review of the shared layout, global CSS, page templates, and content-driven page types
- A brand review of [`src/brand/charter.json`](src/brand/charter.json)
- A validation build with `npm run build`
- Current guidance from W3C, USWDS, and web.dev

This pass is intentionally visual-first. Content quality is not the focus here.

## Executive Summary

The underlying Stromy brand is strong. The palette, typography, and architectural imagery point toward a premium, editorial, high-trust identity with a slightly brutalist edge. The site should feel sharp, deliberate, and sparse in a controlled way.

Right now, the implementation weakens that brand in a few consistent ways:

- Shared CSS rules are overriding component-level color choices, which is why the header, hero, footer, and other UI areas look low-contrast or visually wrong.
- The header and footer logos are broken because they use a URL path that is not emitted by Astro.
- Several homepage and footer links point to routes that do not exist.
- Capability icons are placeholders rendered as raw text (`landmark`, `shield-alert`, `share-2`) instead of real iconography.
- The visual rhythm is too repetitive on many pages: centered heading, short divider, pale card grid, repeat.
- Dark surfaces are not robust. Small text, nav links, and footer links fail contrast badly.
- Several pages are structurally sound but still feel like early wireframes rather than a finished brand system.

The right move is not a wholesale rebrand. The right move is to keep the core Stromy ingredients and apply them with much more discipline.

## Brand Direction To Keep

Keep these brand foundations:

- Instrument Serif for display and editorial authority
- DM Sans for body/UI text
- The charcoal, forest, cream, and orange palette
- Architectural and brutalist imagery
- The score-line motif as a restrained signature detail

Adjust how they are applied:

- Use cream and charcoal as the primary surface anchors
- Use forest green for structure, headings on light backgrounds, and large-brand moments
- Use orange as punctuation and CTA emphasis, not as a default text color on light surfaces
- Keep the visual language sparse, but do not let it drift into empty or unfinished

## Best-Practice Anchors

- W3C contrast minimum: normal text should reach 4.5:1, large text 3:1
- W3C non-text contrast: controls and other visual boundaries should reach 3:1
- W3C use of color: active states and filters should not rely on color alone
- USWDS typography: body text should generally be at least 16px, mostly left-aligned, with readable line lengths
- web.dev navigation guidance: deep pages benefit from breadcrumb-style orientation

Source links:

- https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
- https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html
- https://w3c.github.io/wcag/understanding/use-of-color.html
- https://designsystem.digital.gov/components/typography/
- https://web.dev/learn/html/navigation

## High-Confidence Systemic Problems

### 1. Global CSS Is Overriding Local Component Styling

This is the biggest visual root cause.

In [`src/styles/global.css`](src/styles/global.css), the global `h1, h2, h3, h4, h5, h6` and `a` rules are overriding Tailwind utility classes used elsewhere. That means components asking for light hero text or light header/footer links still inherit dark green text from the base stylesheet.

This explains a large share of the visible issues:

- Header nav becomes too dark on the black header
- Footer links become too dark on the black footer
- Hero headline styling does not match the intended utility classes
- Accent and contrast decisions become unpredictable across pages

Recommendation:

- Remove global heading/link color declarations from the base layer
- Scope typography defaults to article/prose contexts only
- Let components own their color through utilities or component-level class maps

Primary implementation targets:

- [`src/styles/global.css`](src/styles/global.css)
- [`src/layouts/ArticleLayout.astro`](src/layouts/ArticleLayout.astro)
- [`src/components/content/ArticleLayout.astro`](src/components/content/ArticleLayout.astro)

### 2. Logo Asset Paths Are Broken

The header and footer use `/brand/logos/logo_white.svg`, but Astro is not emitting that path. The generated asset exists under `dist/_astro/...`, not `/brand/logos/...`, so the top-left logo is broken on live pages.

Recommendation:

- Import the logo the same way the hero does, or move static logo files into `public/`
- Standardize logo usage so header, hero, and footer all follow the same asset strategy

Primary implementation targets:

- [`src/components/layout/Header.astro`](src/components/layout/Header.astro)
- [`src/components/layout/Footer.astro`](src/components/layout/Footer.astro)
- [`src/components/sections/Hero.astro`](src/components/sections/Hero.astro)

### 3. Broken Internal Route Targets

The site builds, but several visible links lead nowhere:

- Homepage case-study cards link to `/work/...`
- Homepage "View all case studies" links to `/work`
- Footer links point to `/careers`, `/privacy`, and `/terms`

Those routes currently return 404s.

Recommendation:

- Replace `/work` references with `/case-studies`
- Either create the legal and careers pages immediately or remove those nav items until the pages exist
- Add a designed 404 page before launch

Primary implementation targets:

- [`src/components/sections/CaseStudyCards.astro`](src/components/sections/CaseStudyCards.astro)
- [`src/data/site.ts`](src/data/site.ts)
- [`src/pages/404.astro`](src/pages/404.astro) once added

### 4. Icon System Is Placeholder-Only

The capability pages and grids are rendering raw icon names as visible text because the current icon component is only a placeholder.

Visible examples:

- `landmark`
- `shield-alert`
- `share-2`
- `leaf`

This makes the site feel unfinished immediately.

Recommendation:

- Wire `lucide-preact` properly and map the frontmatter icon names to real components
- If that is not ready, remove the icon blocks entirely until the final icon set exists

Primary implementation targets:

- [`src/components/ui/Icon.astro`](src/components/ui/Icon.astro)
- [`src/pages/capabilities/index.astro`](src/pages/capabilities/index.astro)
- [`src/pages/capabilities/[slug].astro`](src/pages/capabilities/[slug].astro)
- [`src/components/sections/CapabilityGrid.astro`](src/components/sections/CapabilityGrid.astro)

### 5. Current Contrast Usage Is Not Production-Safe

Measured brand/token combinations:

- `primary` on `secondary`: 1.65:1
- `textLight` on `secondary`: 2.84:1
- `accent` on `background`: 3.28:1
- `verdant` on `secondary`: 4.03:1

Implications:

- Dark green text on black is not viable for navigation, footer links, hero copy, or small UI text
- The muted gray used on dark surfaces is too faint for body copy and utility links
- Orange works well as a filled button on dark surfaces, but not as regular small text on cream backgrounds

Recommendation:

- Reserve orange mostly for buttons, dividers, active chips, metrics, and key emphasis
- Use cream or a much lighter neutral for text on charcoal
- Keep dark green for headings on light surfaces, not for small text on dark surfaces
- Add explicit contrast checks to the design system before changing token usage again

Primary implementation targets:

- [`src/styles/global.css`](src/styles/global.css)
- [`src/components/layout/Nav.astro`](src/components/layout/Nav.astro)
- [`src/components/layout/Footer.astro`](src/components/layout/Footer.astro)
- [`src/components/ui/Badge.astro`](src/components/ui/Badge.astro)
- [`src/components/ui/Button.astro`](src/components/ui/Button.astro)
- [`src/components/ui/StatBlock.astro`](src/components/ui/StatBlock.astro)

### 6. Dark Mode Is Not Ready

Even if the light mode is fixed, the current dark-mode approach is still risky. Semantic tokens are remapped globally, but many components are authored as if `background` always means the cream brand color. That makes dark-mode styling fragile.

Recommendation:

- Either ship light-only for now and remove the toggle
- Or do a real dark-theme pass where every shared component is checked against dark surfaces intentionally

Primary implementation targets:

- [`src/layouts/BaseLayout.astro`](src/layouts/BaseLayout.astro)
- [`src/styles/global.css`](src/styles/global.css)
- [`src/components/layout/Header.astro`](src/components/layout/Header.astro)

### 7. Scroll-Reveal Should Be Progressive Enhancement

The current `.fade-up` pattern hides content by default and reveals it via JavaScript. This can make pages feel empty until JS kicks in and can also produce misleading blank states.

Recommendation:

- Make content visible by default
- Add animation only when a JS-applied class confirms enhancement is available
- Keep motion restrained and purposeful

Primary implementation targets:

- [`src/styles/global.css`](src/styles/global.css)
- [`src/layouts/BaseLayout.astro`](src/layouts/BaseLayout.astro)

## Page-By-Page Visual Improvement Plan

### `/`

Current read:

- Strong imagery, but the hero headline does not land clearly enough
- Broken top-left logo damages trust immediately
- Header nav is too faint on the black bar
- Homepage section rhythm is repetitive and under-designed
- The case-study section links are broken
- Placeholder iconography weakens both capability and technology sections

Recommended improvements:

- Fix the logo and restore high-contrast nav/header states first
- Keep one dominant brand mark in the hero and reduce competition between the centered wordmark and the top-left logo
- Increase hero text contrast decisively
- Treat the hero subtitle as one step brighter and one step tighter
- Make the homepage sections less repetitive by mixing left-aligned and centered compositions
- Use one more asymmetrical image-led block on the homepage so the scroll does not feel like repeated pale rectangles
- Replace homepage case-study links with real `/case-studies/...` destinations
- Use real icons or no icons in the capability and technology sections
- Tighten the handoff from the final CTA band into the footer so the bottom of the page feels designed rather than simply stacked

### `/about`

Current read:

- Clear and orderly, but too uniform
- Values, team, partner, and sectors all use a similar pale-card treatment, which flattens hierarchy
- Team cards feel placeholder-like because they rely on initials only

Recommended improvements:

- Keep the opening statement, but make the rest of the page less card-repetitive
- Convert the values section into a more editorial layout with a stronger lead block and fewer identical tiles
- Replace initials-only team circles with real headshots, monochrome portraits, or a more intentional monogram system
- Compress the partners section or make it more visually substantive
- Turn client sectors into a more dynamic typographic grid or icon-list treatment instead of another card wall

### `/blog`

Current read:

- The featured story works, but the page top still feels visually light for an editorial hub
- The archive/grid treatment is safe, not distinctive
- The newsletter section feels bolted on rather than integrated into the page rhythm

Recommended improvements:

- Give the featured article more editorial weight with a more dramatic crop, stronger meta row, and clearer hierarchy shift from the archive cards
- Label the archive section explicitly instead of letting it read as "more of the same"
- Tighten the featured card padding and typography so it feels like a magazine feature rather than a generic card
- Rework the newsletter band so it looks like part of the Stromy brand system, not a placeholder subscription block

### `/blog/ai-parliamentary-analysis`
### `/blog/council-data-intelligence`
### `/blog/crisis-comms-ai-age`

Current read:

- This is the strongest template in the site today
- Typography, spacing, and reading measure are mostly sound
- The pages still feel a little too utilitarian at the top

Recommended improvements:

- Add a breadcrumb or "Back to Insights" treatment above the article title
- Add a hero image, cover image, or opening visual band before the article body
- Strengthen the metadata row and tag styling so the top of the page feels designed, not just assembled
- Give related posts a stronger section break and more editorial framing
- Consider a subtle sticky progress indicator or reading-position cue for longer posts

### `/capabilities`

Current read:

- Clear overview page structure
- The raw icon-name rendering is the biggest visible problem
- The card system looks competent but generic

Recommended improvements:

- Replace the fake icon text immediately
- Add one more layer of hierarchy inside each card: proof point, use case, or short outcome line
- Introduce stronger hover, press, and active states so the grid feels more premium
- Consider grouping capabilities by business outcome or client problem instead of a flat list

### `/capabilities/government-relations`
### `/capabilities/crisis-management`
### `/capabilities/media-relations`
### `/capabilities/public-relations`
### `/capabilities/social-media-strategy`
### `/capabilities/research-insights`
### `/capabilities/esg-sustainability`

Current read:

- These pages read too much like plain articles and not enough like premium service pages
- The icon placeholder issue shows up again
- There is not enough visual scaffolding around the long text blocks

Recommended improvements:

- Replace the raw icon text with a real icon or remove the icon panel
- Keep the longform copy, but break it with structured modules
- Add an "outcomes" strip near the top
- Add a "how it works" or "where this helps" band using short visual blocks
- Pull a related case study higher on the page rather than leaving proof entirely at the bottom
- Add breadcrumb navigation because these are deep pages in a hierarchy
- Move from mostly centered intros to left-aligned body framing once the user enters the detailed section

### `/case-studies`

Current read:

- The cards themselves are one of the better visual components
- The filter controls are too subtle and rely too heavily on color and opacity
- With only two visible cards, the page feels visually under-filled

Recommended improvements:

- Give the filters clearer active states through shape, border, or check treatment instead of opacity alone
- Consider a featured case-study layout above the grid
- If the page remains sparse, use a 2-column editorial composition rather than a standard 3-card grid pattern
- Add stronger framing around the case-study value proposition so the page feels more premium than a simple archive

### `/case-studies/au-victorian-councils`
### `/case-studies/nl-asml-media-analysis`

Current read:

- The metrics ribbon is strong and should stay
- The page title and opening rhythm are solid
- The pages still need more visual storytelling beyond the black metrics block

Recommended improvements:

- Add a hero image or a client/capability metadata band above the metrics ribbon
- Turn the challenge, approach, and outcome sections into more intentional visual modules
- Add one pullquote, timeline, or highlighted result block to increase narrative texture
- Make related case studies more prominent as a continuation, not an afterthought

### `/contact`

Current read:

- Cleaner than many other pages
- Conversion intent is clear
- Still feels sparse and slightly placeholder-like

Recommended improvements:

- Add one supporting trust band: response expectations, office availability, or engagement types
- Upgrade the office cards so they feel less like generic tiles and more like region presences
- Add a simple contact form or inquiry options if that matches business intent
- Fix footer contrast and missing-route links so the page does not end on a broken brand experience

### `/technology`

Current read:

- Good information architecture
- Hero contrast is too weak
- The process diagram has the right idea but still feels lightweight
- The page needs one stronger visual artifact that signals "platform" rather than "marketing copy"

Recommended improvements:

- Increase hero contrast and reduce the amount of dark-green-on-black text
- Replace placeholder diamond icons with real iconography or simple geometric system marks
- Make the pipeline more diagrammatic and less card-like
- Add one branded schematic, architectural render, or product-style systems visualization
- Give the platform pillars and deployment models more visual differentiation so they do not read as two similar card blocks

## Missing Or Broken Destinations

These need a decision before visual polish is considered complete:

- `/work`
- `/work/asml-stakeholder-mapping`
- `/work/crisis-response-framework`
- `/work/victorian-councils`
- `/careers`
- `/privacy`
- `/terms`

Recommendation:

- Either create these pages with a designed template
- Or remove all links to them until the pages are real
- Add a proper 404 page regardless

## Visual System Recommendations

These are not tied to a single route, but they will make the whole site feel more finished.

### Typography

- Keep Instrument Serif, but reserve it for moments that deserve drama
- Use left-aligned layouts more often after the initial hero/introduction block
- Avoid letting every page begin with the same centered-heading pattern
- Keep longform text close to the current reading measure because it is already in a good range

### Color

- Use dark green as a structural brand color, not as small text on dark surfaces
- Use orange more intentionally as a punctuation color
- Keep cream as the main reading background
- Add one or two stronger neutral steps for dark-mode and dark-surface text states

### Imagery

- The image set is good and on-brand
- Use it more decisively, with bolder cropping and fewer placeholder-feeling empty sections
- Pair imagery with content asymmetrically on key landing pages

### Components

- Simplify the score-line motif and use it more selectively
- Replace generic cards with 2-3 card variants that have clear roles
- Tighten chip/badge styling so they feel like a designed system, not default pills
- Improve interactive states for filters, toggles, cards, and CTAs

## Recommended Implementation Sequence

### Phase 1. Foundation Fixes

- Fix logo asset imports
- Fix broken `/work` links
- Remove or build missing footer destinations
- Fix global CSS specificity collisions
- Decide whether dark mode ships now or later

### Phase 2. Shared Component Pass

- Header
- Footer
- Nav
- Button
- Badge
- Card
- Icon system
- Score-line treatment

### Phase 3. Template Pass

- Homepage section system
- Capability detail template
- Case-study detail template
- Blog article top-of-page treatment
- Contact conversion template

### Phase 4. Page-Specific Polish

- Home
- About
- Blog index
- Capabilities index
- Case studies index
- Technology
- Contact

### Phase 5. Final QA

- Desktop audit
- Mobile audit
- Light-theme audit
- Dark-theme audit if dark mode remains
- Broken-link crawl
- Contrast pass on all dark surfaces and interactive controls

## Priority Order

If the goal is maximum visual improvement with minimum wasted effort, do the work in this order:

1. Fix the global CSS color override problem
2. Fix the broken logo and broken internal links
3. Replace placeholder icons
4. Rebuild header/footer contrast and dark-surface rules
5. Redesign the homepage section rhythm
6. Upgrade the capability and technology page systems
7. Finish archive/detail page polish

## Bottom Line

The Stromy site does not need a new brand. It needs a disciplined implementation of the brand it already has.

The strongest version of this site is:

- darker and more confident where it should be
- lighter and more readable where people need to read
- less repetitive in layout
- more intentional with imagery
- stricter about contrast
- free of placeholder elements and broken destinations

Once the foundation issues are fixed, the site has a strong ceiling.
