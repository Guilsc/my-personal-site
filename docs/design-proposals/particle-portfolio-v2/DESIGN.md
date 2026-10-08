---
name: "Guilherme da Silva Costa — Particle Portfolio v2"
description: "Bilingual professional portfolio extending the pinned particle world."
colors:
  background: "#070708"
  surface: "#141416"
  text: "#f5f2ed"
  muted: "#c2b7ad"
  accent: "#ff963d"
  particle-rose: "#ff3979"
  border: "#3a3330"
  focus: "#ffd1a8"
  button-ink: "#160e08"
  action-hover: "#ffb16d"
  quiet-hover: "#30251d"
  publication-hover: "#1d1816"
  hover-stroke: "#966542"
typography:
  display:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(3rem, 5.7vw, 5.8rem)"
    fontWeight: 800
    lineHeight: 1.14
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(2.5rem, 4.2vw, 4rem)"
    fontWeight: 750
    lineHeight: 1.14
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(1.45rem, 2.1vw, 2rem)"
    fontWeight: 700
    lineHeight: 1.14
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Hanken Grotesk, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Hanken Grotesk, sans-serif"
    fontSize: "13px"
rounded:
  card: "16px"
  control: "10px"
  nav: "30px"
  nav-item: "24px"
spacing:
  s4: "4px"
  s8: "8px"
  s12: "12px"
  s16: "16px"
  s20: "20px"
  s24: "24px"
  s28: "28px"
  s32: "32px"
  s40: "40px"
  s48: "48px"
  s64: "64px"
  s80: "80px"
  s100: "100px"
  s124: "124px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.button-ink}"
    rounded: "{rounded.control}"
    padding: "12px 20px"
  button-primary-hover:
    backgroundColor: "{colors.action-hover}"
    textColor: "{colors.button-ink}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.control}"
    padding: "12px 20px"
  button-secondary-hover:
    backgroundColor: "{colors.quiet-hover}"
  publication-card:
    backgroundColor: "#141416f5"
    textColor: "{colors.text}"
    rounded: "{rounded.card}"
    padding: "32px"
  publication-card-hover:
    backgroundColor: "{colors.publication-hover}"
  evidence-panel:
    backgroundColor: "#141416f0"
    textColor: "{colors.text}"
    rounded: "{rounded.card}"
    padding: "32px 36px"
  tag:
    textColor: "{colors.muted}"
    rounded: "{rounded.control}"
    padding: "6px 12px"
  select:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.control}"
    padding: "12px"
---

# Design System: Guilherme da Silva Costa — Particle Portfolio v2

## Overview

**Creative North Star: "Context, Decision, Construction"**

Context becomes decision, and decision becomes construction. This professional portfolio gives source-backed work a warm, deliberate voice: near-black space, clear light text, strong Manrope headings and slowly moving amber-and-rose particle geometry. The full professional name, existing 14+ years statement, EPAM role and real portrait open the experience.

The nucleus supplies atmosphere while projects and writing supply evidence. Broad panels protect dense reading; alternating introductions and evidence lists lead into publication and repository catalogs. This independent v2 package extends the incumbent world, seed `f1aadb43`, under the user's pinned Zoey reference and `direction-contract.md`. It introduces no new identity and leaves the earlier owner toolkit separate. The comparison brief at `../site-comparison/next-version-brief.md` governs this surface; PRODUCT.md supplies durable professional truth.

**Key Characteristics:**

- Warm action color against near-black surfaces.
- Locally served Manrope and Hanken Grotesk.
- Broad responsive panels and editorial publication hierarchy.
- Independently controllable ambient and process particle geometry.
- Bilingual routes with source-backed cases, feeds and explicit destinations.

## Colors

Amber directs action; rose enriches decorative geometry. Frontmatter records reused source values from `portfolio.css`; `portfolio.js` supplies canvas colors. The declared `--raised` remains unused in this artifact and is not promoted into a token.

### Primary

- **Construction Amber** (`accent`): actions, selected filters, emphasized text, links and ambient particles.
- **Warm Hover** (`action-hover`): primary hover, retaining Button Ink.
- **Pale Amber Focus** (`focus`): keyboard outlines.

### Secondary

- **Particle Rose** (`particle-rose`): ambient particle hue and decorative About pulse; not live status.
- Curatia stages have individual colors in `nodeColors`, recorded in the sidecar as component metadata. Stage selection is separately indicated by an amber border and text explanation.

### Neutral

- **Near Black** (`background`): page ground and translucent sticky header foundation.
- **Charcoal Panel** (`surface`): navigation, selects, secondary controls and translucent reading panels.
- **Warm Paper** (`text`) and **Warm Ash** (`muted`): primary and secondary readable foreground.
- **Warm Stroke** (`border`): panel and control boundaries.
- **Button Ink**, **Quiet Hover**, **Publication Hover** and **Hover Stroke**: source interaction treatments.

**The Evidence Rule.** Atmosphere may attract attention; real work and source-backed writing carry the professional claim.

## Typography

**Display Font:** Manrope, sans-serif fallback.  
**Body Font:** Hanken Grotesk, sans-serif fallback.

`manrope.css`, `hanken.css` and `fonts/` locally supply both faces with swap loading. Frontmatter contains the base hierarchy. Paragraphs generally cap at 70ch. Hero statement uses 24px/1.5, shrinking to 21px at 850px; paragraph panels use 19px/1.75, shrinking to 17px at 600px. Body remains 18px.

Display applies to the two-line professional name. At 1100px the hero uses `clamp(3rem,6vw,4.6rem)`, at 850px `clamp(3rem,6.7vw,4.4rem)`, at 600px `clamp(2.7rem,9.5vw,3.6rem)`, and at 360px 2.65rem. Page introductions use `clamp(2.9rem,5vw,5rem)`, then `clamp(2.6rem,10vw,3.6rem)` at 600px. Detail titles use `clamp(3rem,5.5vw,5.5rem)`, then `clamp(2.7rem,10vw,4rem)`.

Headlines introduce sections; at 600px they use `clamp(2.3rem,9vw,3rem)`. Chapter headings use 40px, then 32px at 850px. Publication titles use 25px; home titles become 30px at 1100px and 28px at 600px. The first catalog article uses `clamp(2rem,3.8vw,3rem)` before the 28px mobile override. Repository titles use 24px, then 21px at 1100px, with anywhere wrapping. Categories and metadata use the 13px label role; navigation uses 15px desktop and 16px in the compact menu. Numeric counts are tabular.

## Layout

Content caps at 1320px with 48px side padding, reducing to 28px at 850px, 22px at 600px and 18px at 360px. The home hero is a 1.3:0.7 grid with 48px gap, 64px/48px vertical padding and 650px minimum height; at 1500px it grows to 710px. It becomes a block at 600px, preserving name and statement before portrait. The portrait is 210×262px desktop and 140×175px mobile; About uses a separate 280px portrait column before stacking at 600px.

Four fact cards become two columns at 850px. About and impact use a .88:1.12 introduction/evidence split with 100px gap; Expertise reverses the arrangement. At 1100px gaps tighten to 56px; at 850px these sections stack and sticky intros become static. Major section top spacing is 124px, then 90px at 850px and 80px at 600px. Panels use 32px/36px padding; paragraph panels use 36px/40px; mobile panels use 26px.

Home publications and repository paging use three columns with 20px gap. Publications become one column at 1100px; repositories at 850px. Article catalog and project catalog use two columns; article's first card spans both. Catalogs become one column at 600px and 850px respectively. Expertise has a sticky 220px chapter index and 64px gap, tightening to 180px/40px at 1100px; at 850px the index becomes a sticky horizontal scroll strip. Case detail uses 1.25:.75 header columns and two-column evidence panels, stacking at 850px and 600px respectively.

Routes are `/`, `/about`, `/expertise`, `/articles`, `/projects` and `/projects/:slug`, including `/projects/enterprise-transformation` and `/projects/curatia-content-engine`. Expertise supports `?focus=category`; internal pages use breadcrumbs and active navigation. Route folders carry the shared HTML shell for direct entry. English is initial; EN/PT persists in local storage and route renders retain the selected language. English source publications and untranslated fields keep `lang=en`.

## Elevation & Depth

No box shadows are implemented. Depth comes from warm strokes, translucent charcoal and additive particle light. The fixed pointer-transparent, aria-hidden ambient canvas sits behind content. On desktop home its center progresses from the right opening to the left margin with scrolling; mobile geometry recedes behind foreground content. This user-pinned overlap remains intentional.

**The Reading Rule.** Particle overlap is intentional; panels and text contrast must preserve readable foreground content.

The ambient sphere uses 3,200 points desktop and 1,800 below 600px, with lower mobile intensity. The shared RAF loop paints at approximately 30fps (33ms minimum interval); pixel ratio caps at 1.5. Pause cancels RAF and pauses CSS pulses. Reduced motion starts static and disables CSS animation/transitions. Hidden documents suspend animation; process rendering skips offscreen maps. Static geometry remains useful while paused.

## Shapes

Panels and portraits use 16px corners; controls, tags, selects and stage label pills use 10px. Desktop navigation is a 30px capsule with 24px items. Fine one-pixel borders define reading surfaces. Signal and status dots are circular; only decorative About signals pulse. Spherical nuclei are the signature form and represent atmosphere or documented process, never live agents.

## Components

### Actions and controls

Primary and secondary actions use 48px minimum height and 12px/20px padding. At 360px padding becomes 12px/16px and type 15px. Secondary controls use charcoal and warm strokes. Text links target 44px minimum height. Pager controls are 44px square and disabled with opacity .45 and default cursor. Links, buttons and selects use a 3px pale focus outline with 5px offset. Selection, caret and scrollbar are authored in the stylesheet.

### Navigation

The sticky header holds wordmark, four route links, EN/PT, pause and compact-menu button. It is 88px minimum height desktop, 76px at 850px and 72px at 600px. At 850px navigation becomes a hidden absolute dropdown inset 20px, opened with `aria-expanded`; language and motion remain visible. Active page/section uses `aria-current` and Quiet Hover. Below 600px language controls narrow to 36px, icons/menu to 38px; at 360px these widths are 32px/34px while minimum height remains 44px. The header has no explicit contact action; contact appears in the home sequence.

### Panels, feeds and catalogs

Broad evidence panels pair real headings, copy and links. Publication cards put title before category and preserve summary, date and LinkedIn original; the catalog opening card earns stronger editorial scale. Hover shifts tone and stroke. GitHub is a separate three-per-page feed with previous/next controls; Articles filters All / Coffee with a BA / Articles, Projects filters All / Repositories / Launch / Forks / Starred. Counts derive from current data, with loading, saved fallback/retry and empty states. Snapshot counts are not product limits. Preview API paths are `/api/publications` and `/api/repositories`; source/saved data live in `content.js`, `publications.json` and `repositories.json`.

Curated cases preserve contribution, problem, approach, outcomes, next steps, takeaways and capabilities when supplied. Enterprise explicitly states that detailed outcomes are unpublished. Forks identify exploring/adapting. Details and Source remain distinct from Launch; Launch opens the existing deployed tools. Full publication text remains on LinkedIn. Contact topic updates the real mailto context; LinkedIn/GitHub remain explicit destinations.

**The Destination Rule.** A contact link identifies its real destination; the mockup has no message-submission backend.

### Curatia process diagram

Seven selectable stages follow Signal → Idea → Research → Creation → Approval → Publishing → Learning; human approval precedes publication. The 480px desktop map positions stages around a central particle nucleus. Each transparent stage button reserves 64px above its separate opaque label pill so its colored nucleus remains visible. Each miniature sphere uses 360 points and radius 38px desktop / 34px mobile; the central sphere uses 650 points and radius 92px / 65px. Connections join the true geometric centers, with decorative traveling points.

At 600px the map becomes a two-column grid with top space 185px for the central nucleus; the final stage spans both columns. Stage buttons use 104px minimum height; the fixed minimum map height is removed, fitting all nuclei without the former empty lower band. Selected pills gain amber border and Quiet Hover; selection explains the stage in a polite live region. Two native selects compare stages and explain lifecycle order, including identical selections. This illustrates a process without executing it.

### Evidence and limits

Source of truth for this record is `portfolio.css`, `portfolio.js`, `index.html`, direction contract and product/brief. `verification.json`, `detector-findings.json`, `finish-review.md` and `.impeccable/review/` contain bounded builder and independent evidence. Home desktop/mobile/full-page, actual-user-width, About PT, Expertise, Articles, Projects, Enterprise and Curatia captures have PNG provenance sidecars; fresh `curatia-flow.png` and `mobile-flow.png` show the separated nuclei. `verification.json` records the reviewer fix and source hashes.

This documentation pass inspected source and records supplied evidence; it did not perform independent browser tests. Reduced-motion media emulation and timed canvas-stop observation remain untested; cancellation/static behavior is source-verified. Native capture dimensions differ from configured viewports, as disclosed in provenance. The initial finish review requested nucleus visibility and artifact-specific documentation; source fixes and refreshed records do not themselves change its verdict. No production migration, merge, push to main or deployment is implied.

## Do's and Don'ts

### Do:

- **Do** keep actions amber and long reading text on protective dark surfaces.
- **Do** preserve the real portrait, project facts, publication dates, summaries and original URLs.
- **Do** retain pause, reduced motion, visible focus and compact bilingual navigation.
- **Do** preserve reading order when columns stack and keep process nuclei separate from opaque labels.
- **Do** derive feed counts from data and maintain saved-content, retry and empty states.

### Don't:

- **Don't** represent particles or pulsing dots as an assistant, voice interface or live status.
- **Don't** fabricate results, metrics, testimonials, credentials, availability or full article text.
- **Don't** import Zoey branding, imagery, policies or animation code.
- **Don't** turn source review or supplied screenshots into claims of independently verified motion or production readiness.
