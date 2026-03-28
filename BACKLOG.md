# Backlog — stromy-website

Stromy corporate website (Astro + Tailwind). Managed via `/backlog` from stromy-org.

ID prefix: **SW**

---

## In Progress

_No items currently in progress._

---

## Todo

<!--
### [SW-NNN] <Title in imperative mood>
- **priority**: critical | high | medium | low
- **labels**: <comma-separated tags>
- **created**: YYYY-MM-DD
- **depends-on**: <ID> (optional)

<Description — what and why. Enough context for an agent to execute independently.>

#### Acceptance Criteria
- [ ] <Specific, testable condition>
- [ ] <Another condition>
-->

### [SW-001] Add tangible case studies
- **priority**: high
- **labels**: content, case-studies
- **created**: 2026-03-28

Create concrete case studies demonstrating Stromy's capabilities in action. Each case study should follow the MDX content collection format in `src/content/case-studies/` and include: problem statement, approach/methodology, data sources used, deliverables produced, and measurable outcomes. Focus on government relations, crisis management, and strategic communications use cases.

#### Acceptance Criteria
- [ ] At least 3 case study MDX files in `src/content/case-studies/`
- [ ] Each follows the content collection schema with required frontmatter
- [ ] Case studies cover different capability areas (gov relations, crisis, strategic comms)
- [ ] Each includes specific workflow descriptions and data sources used
- [ ] Renders correctly on the case studies page with proper routing

---

### [SW-002] Improve technology and value proposition descriptions
- **priority**: high
- **labels**: content, capabilities, copy
- **created**: 2026-03-28

Enhance the website content to better describe: (1) the technologies used (LangGraph, MCP servers, data pipelines), (2) the value proposition inside each work stream — specifically the types of workflows we can run, the process, and the concrete outputs clients receive. Update capability pages in `src/content/capabilities/` and relevant sections/components.

#### Acceptance Criteria
- [ ] Capability pages updated with clearer technology descriptions
- [ ] Each work stream describes specific workflow types available
- [ ] Process descriptions explain the end-to-end pipeline (data sourcing → analysis → report)
- [ ] Value propositions are concrete (what the client gets, not abstract promises)
- [ ] Consistent tone and depth across all capability pages

---

### [SW-003] Build LangGraph-to-website content pipeline
- **priority**: medium
- **labels**: integration, automation, langgraph
- **created**: 2026-03-28

Build automated pipelines from LangGraph (Stromy) to the website so that workflows can inject content (blog posts, reports, briefings) into the website programmatically. This enables automated publishing: a Stromy workflow produces analysis → formats it as MDX → pushes it to the website repo → triggers rebuild. Key design question: push model (Stromy commits to website repo) vs. pull model (website fetches from an API/data store).

#### Acceptance Criteria
- [ ] Architecture design document for LangGraph → website content pipeline
- [ ] At least one working pipeline: Stromy workflow output → MDX blog post in website
- [ ] Content follows website MDX schema (frontmatter, content structure)
- [ ] Automated or semi-automated (human approval step is acceptable for v1)
- [ ] Pipeline handles images/assets if included in the workflow output
- [ ] Documentation on how to add new content types to the pipeline

---

### [SW-004] Build docs-focused website for stromy-org ecosystem
- **priority**: low
- **labels**: documentation, website, org-wide
- **created**: 2026-03-28

Build a documentation website for the entire stromy-org ecosystem that serves as a navigable interface to all repo docs. Users should be able to zoom into specific repo documentation from the top-level org view. The site should be auto-maintained — wired into individual repo modifications so that when code or docs change (via Claude Code or otherwise), the documentation website updates accordingly.

**Key considerations:**
- Could be a separate Astro site, a section of stromy-website, or a tool like Docusaurus/Starlight
- Must aggregate docs from all repos (CLAUDE.md, README.md, handbook pages, API docs)
- Auto-update mechanism: git hooks, CI pipeline, or pull-based content sync
- Navigation: org overview → repo → specific doc pages
- Search across all repos' documentation

#### Acceptance Criteria
- [ ] Architecture decision: standalone site vs. section of stromy-website vs. docs framework
- [ ] Aggregation mechanism defined (how docs are pulled from individual repos)
- [ ] Auto-update pipeline: repo doc changes trigger site rebuild
- [ ] Navigation structure: org-level overview → per-repo docs → specific pages
- [ ] Search functionality across all repos' documentation
- [ ] At least 3 repos' docs rendered as proof-of-concept
- [ ] Deployment strategy defined (same hosting as stromy-website or separate)

---

## Done

_No completed items yet._
