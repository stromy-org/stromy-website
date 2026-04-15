# Stromy Brand Build — Log

> Multi-session handoff log. Read this first. Update at every phase boundary,
> checkpoint, key decision, approval, and blocker change.

## Status Dashboard

| Field | Value |
|---|---|
| Brand slug | stromy |
| Brand name | Stromy |
| Mode | `A: Build` |
| Scope | Full build from scratch — Phase 0–6. Complete brand rebuild including logos, colors, typography, tokens, imagery, templates, brand book. |
| Build started | 2026-04-07 |
| Last updated | 2026-04-07 |
| Current phase | Phase 2 |
| Current checkpoint | Visual Identity — Logos finalized and written to disk |
| Overall status | `in-progress` |
| Next action | Phase 2 complete for logos. Continue to Phase 3 (design system) or proceed with remaining phases |
| Blockers | `none` |
| Canonical root | `client-data/clients/stromy/` |
| Scratch root | `client-data/clients/stromy/_build/` |
| Log path | `client-data/clients/stromy/.build-history/BUILD_LOG.md` |

## Phase Checklist

- [x] Pre-work — Mode selection / existing-state audit
- [x] Phase 0 — Brand Discovery & Archetype
- [x] Phase 1 — Brand Strategy
- [ ] Phase 2 — Visual Identity
- [ ] Phase 3 — Design System
- [ ] Phase 4 — Imagery Direction
- [ ] Phase 5 — Templates
- [ ] Phase 6 — Brand Book
- [ ] Post-work — Promotion / sync / cleanup

## Key Decisions (append-only)

- `2026-04-07` — Mode A: Build from Scratch selected — user explicitly requested full rebuild, do not reference existing brand files — user
- `2026-04-07` — Scope narrowed: keep existing colors, typography, tokens, imagery, motifs. Rebuild LOGOS only from scratch — user
- `2026-04-07` — Archetype: Primary Sage, Secondary Magician — knowledge authority with transformative edge — user
- `2026-04-07` — Tagline "Intelligence, Orchestrated." confirmed — user approved, no change needed
- `2026-04-07` — Brand strategy approved; guidelines.md §1 updated with refined positioning, personality spectrums, name origin, voice guidelines — user + agent
- `2026-04-07` — Logo exploration board presented (8 wordmark concepts + 4 symbol concepts) — user selected Concept 1 (Score), Concept 4 (Orchestration Node), Symbol S1 (S-Curve), Symbol S3 (Registration Block) — agent + user
- `2026-04-07` — Symbol construction research conducted; skill updated with Symbol Mark Construction Principles in visual-identity.md — agent
- `2026-04-07` — Refined logo board presented (3 wordmarks W1/W2/W3, 6 symbols S1A/S1B/S1C/S3A/S3B/S3C) — user rejected W3 (Score+Node Combined) — agent + user
- `2026-04-07` — Final selections: W2 (Orchestration Node Wordmark) as primary, S1C (S-Curve Minimal) as symbol — user
- `2026-04-07` — Logo files generated: 9 SVGs (logo, logo_white, logo_tagline, logo_mono, icon_dark, icon_green, icon_paper, symbol, favicon) — agent
- `2026-04-07` — Guidelines §2 (Logo System) rewritten for new design; §9 (File Naming) updated; version bumped to 3.0 — agent

## User Preferences / Off-Limits Territory

- Prefers: Interactive review boards for design choices; fresh start with no reference to existing brand
- Avoid: Existing brand files — user wants a complete rethink for logos
- Explicit no-go directions: W3 (Score + Node Combined wordmark) — "doesn't work at all"
- Stakeholder or rollout constraints: (none known yet)

## Open Questions & Assumptions

- [ ] Brand archetype — blocks: Phase 1 — owner: user
- [ ] Color preferences — blocks: Phase 2 — owner: user
- [ ] Typography direction — blocks: Phase 2 — owner: user

## Discarded Directions

- `2026-04-07` — All previous Stromy brand identity — user wants complete rebuild from scratch

---

## Phase Logs

### Pre-work — Mode Selection / Existing-State Audit

- **Status**: `complete`
- **Dates**: 2026-04-07 → 2026-04-07
- **Agent**: Claude Opus 4.6

**Inputs read**
- User request: full brand rebuild from scratch, do not open existing files

**Decisions made this phase**
- Mode A selected — fresh build, Phases 0–6

**Artifacts observed or produced**
- Created `.build-history/BUILD_LOG.md`
- Created `_build/` scratch directory

**Checkpoint ledger**
- `2026-04-07` — Existing state intentionally skipped per user request
- `2026-04-07` — Mode A selected
- `2026-04-07` — Log created

**User approvals**
- User confirmed fresh start

**QA notes**
- N/A

**Handoff notes**
- Proceed to Phase 0 brand discovery

---

### Phase 0 — Brand Discovery & Archetype

- **Status**: `in-progress`
- **Dates**: 2026-04-07 →
- **Agent**: Claude Opus 4.6

**Inputs read**
- User voice brief: Stromy = syllable swap of maestro (orchestra chief). B2B agency — AI workflow design, tooling, analytics, research for corporates and consulting firms. Trust, knowledge, raw credibility. Reports as products. Economist/FT energy. Dark green + orange. Urban/brutalist/materials aesthetic. Logo should be wordmark-primary with a small distinctive element.
- Existing charter.json, tokens.css (preserving colors, fonts, motifs, imagery)

**Decisions made this phase**
- Primary archetype: Sage — knowledge authority, editorial restraint
- Secondary archetype: Magician — transformative, complex-to-simple
- Name origin: maestro → Stromy (syllable swap) — orchestrator metaphor
- Scope: logo rebuild only; existing brand system preserved

**Artifacts produced**
- None (discovery phase)

**Checkpoint ledger**
- `2026-04-07` — Discovery brief captured from voice input
- `2026-04-07` — Archetype candidates proposed (Sage, Ruler, Magician, Creator)
- `2026-04-07` — Primary Sage + Secondary Magician selected by user

**User approvals**
- Archetype combination: Sage + Magician approved

**QA notes**
- N/A unless visual outputs are produced

**Handoff notes**
- (pending)
