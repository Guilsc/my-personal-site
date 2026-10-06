---
name: "Guilherme Costa — Particle Brand Proposal"
description: "Standalone portfolio and brand-toolkit draft connecting context, decision and construction."
colors:
  background: "#070708"
  surface: "#141416"
  surface-raised: "#1b1b1e"
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
  disabled-surface: "#292526"
typography:
  display:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(3.2rem, 6.8vw, 6rem)"
    fontWeight: 800
    lineHeight: 1.13
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(2.4rem, 4.2vw, 4.5rem)"
    fontWeight: 750
    lineHeight: 1.13
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(1.5rem, 2.5vw, 2rem)"
    fontWeight: 700
    lineHeight: 1.13
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Hanken Grotesk, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Hanken Grotesk, sans-serif"
    fontSize: "13px"
    letterSpacing: "0.03em"
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
  s24: "24px"
  s32: "32px"
  s48: "48px"
  s64: "64px"
  s96: "96px"
  s128: "128px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.button-ink}"
    rounded: "{rounded.control}"
    padding: "12px 20px"
  button-primary-hover:
    backgroundColor: "{colors.action-hover}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.control}"
    padding: "12px 20px"
  button-secondary-hover:
    backgroundColor: "{colors.quiet-hover}"
  button-disabled:
    backgroundColor: "{colors.disabled-surface}"
    textColor: "{colors.muted}"
    rounded: "{rounded.control}"
    padding: "12px 20px"
  publication-card:
    backgroundColor: "#141416f2"
    textColor: "{colors.text}"
    rounded: "{rounded.card}"
    padding: "32px"
  publication-card-hover:
    backgroundColor: "{colors.publication-hover}"
  evidence-panel:
    backgroundColor: "#141416ed"
    textColor: "{colors.text}"
    rounded: "{rounded.card}"
    padding: "28px 32px"
  select:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text}"
    rounded: "{rounded.control}"
    padding: "12px"
---

# Design System: Guilherme Costa — Particle Brand Proposal

## Overview

**Creative North Star: "Context, Decision, Construction"**

Context becomes decision, and decision becomes construction. This proposed world gives Guilherme's professional work a warm, deliberate voice: near-black space, clear light text, strong Manrope headings and a slowly moving amber-and-rose particle nucleus.

The nucleus supplies atmosphere while projects and writing supply evidence. Broad panels protect dense reading, and large editorial moments alternate with quieter repository rows. This is the original standalone portfolio and brand-toolkit draft for review; it records this package only and does not replace the production repository's DESIGN.md or authorize migration, publishing, push or merge to main.

The code-led direction contract carries seed `f1aadb43`; the user's explicitly pinned Zoey reference overrides assigned result 6. The reference informs composition and behavior. The implementation uses original particles, its own tokens and real portfolio content. The existing product truth defines professional facts and constraints, not approval of this proposed identity.

**Key Characteristics:**

- Warm action color against near-black surfaces.
- Locally served Manrope and Hanken Grotesk.
- Broad responsive panels and editorial publication hierarchy.
- An authored decorative nucleus with pause and reduced motion.
- Real project evidence, publication summaries and explicit contact destinations.

## Colors

Warm amber drives action against near-black space; rose enriches the decorative particle field. The frontmatter is normative. `tokens.json` uses `surfaceRaised` and `particleRose`; CSS binds those values as `--raised` and `--rose`.

### Primary

- **Construction Amber** (`accent`): primary actions, selected controls, emphasized words, category labels and part of the particle field.
- **Warm Hover** (`action-hover`): primary action hover, paired with dark button ink.
- **Pale Amber Focus** (`focus`): conspicuous keyboard outlines.

### Secondary

- **Particle Rose** (`particle-rose`): the complementary particle hue and one decorative capability signal; it does not denote a live state.

### Neutral

- **Near Black** (`background`): page canvas and native select interior.
- **Charcoal Panel** (`surface`): navigation, controls and panel foundations.
- **Raised Charcoal** (`surface-raised`): available toolkit swatch; not a mandate to add raised containers.
- **Warm Paper** (`text`): headings and primary foreground text.
- **Warm Ash** (`muted`): readable body copy, dates and secondary labels.
- **Warm Stroke** (`border`): panel boundaries and repository dividers.
- **Button Ink** (`button-ink`): dark text on amber controls.
- **Quiet Hover**, **Publication Hover** and **Disabled Surface**: the authored interaction surfaces.

**The Evidence Rule.** Atmosphere may attract attention; real work and source-backed writing carry the professional claim.

## Typography

**Display Font:** Manrope, sans-serif fallback.  
**Body Font:** Hanken Grotesk, sans-serif fallback.

Both faces are served locally through `manrope.css`, `hanken.css` and `fonts/`, with swap loading. Their assertive heading and open reading relationship is part of the proposal.

- **Display:** the three-line hero; desktop maximum is the frontmatter's 6rem.
- **Headline:** large section introductions.
- **Title:** panel and repository titles. Curatia and the first publication deliberately use larger editorial treatments.
- **Body:** comfortable reading with a general maximum of 68ch; hero copy is larger and narrower.
- **Label:** categories and supporting publication metadata. Preserve the source's category capitalization.

At 700px and below, body text becomes 17px and the hero uses `clamp(3rem,12vw,4.5rem)`. At 360px and below the final override is `clamp(2rem,12.5vw,2.5rem)`. Publication titles may break long words. Editorial-template page titles use `clamp(2rem,8vw,3rem)` at the mobile breakpoint.

## Layout

Main content and footer cap at 1320px with 48px horizontal padding; mobile uses 24px, then 18px at 360px. The default desktop hero has a 1.05:0.95 split and 32px gap. A persistent header holds wordmark, section navigation and explicit contact.

Curatia's project narrative sits left and problem, approach and result panels sit right (1.1:1, 80px gap). The broader capability, portrait and challenge compositions use two columns and 96px gaps. These gaps tighten at 1100px. At 700px columns stack in source order, sticky capability copy becomes static and repository rows become vertical.

Publications use a three-column grid with 24px gaps and an opening full-width article. The grid becomes two columns at 1100px and one at 700px. Capability panels use 38px/40px padding on desktop, 28px on mobile and 22px at the narrow breakpoint. Major section spacing reduces from 112px to 72px on mobile.

The fixed particle background intentionally overlaps the mobile hero copy. Text stays foreground; the nucleus is not required to move below it. Its viewport and scroll response is authored in `mockup.js`; maintain this user-pinned background relationship while protecting legibility.

Editorial covers are proposed as 1200 × 630 and square posts as 1080 × 1080, with 64px final-file margins. In the live template page, padding is fluid and mobile aspect ratios become content-driven with a 420px minimum height.

## Elevation & Depth

Depth comes from tonal separation, warm borders and dark translucent panels. The implementation uses no box-shadow vocabulary. The fixed canvas is decorative, noninteractive and behind foreground content. Capability and project panels use translucent charcoal; publication panels are slightly more opaque. Do not add arbitrary floating-card shadows to this recorded system.

**The Reading Rule.** Particle overlap is intentional on mobile; panels and text contrast must preserve readable foreground content.

The original 1,500-point canvas nucleus rotates slowly, subtly ripples and uses additive amber/rose dots. A visible fixed pause button exposes its state with `aria-pressed`; reduced motion starts it static, disables CSS pulses/transitions and retains ordinary scrolling. Visibility handling suspends animation in hidden documents. The canvas remains `aria-hidden` and pointer-transparent.

## Shapes

Broad panels and portrait use gentle 16px corners; controls and native selects use 10px. Navigation is a 30px capsule with 24px items, becoming an open wrapping row on mobile. Fine single-pixel borders delineate surfaces. Decorative signal dots are circular; the nucleus supplies the only large spherical form.

## Components

### Actions and contact links

Primary actions are warm, solid controls with 48px minimum height, 12px/20px padding and a brighter hover. Secondary controls use charcoal, warm strokes and a tonal hover. Text links have a 44px minimum target and become amber on hover. Disabled samples use an explicit disabled surface and blocked cursor.

Interactive links, buttons and selects use a 3px focus outline with 5px offset. Contact routes are real email, LinkedIn and GitHub links; clicking a selector changes explanatory text only.

**The Destination Rule.** A contact link identifies its real destination; the draft has no message-submission backend.

### Navigation

A sticky near-black header preserves section destinations. The active anchor has `aria-current="location"` and the same warm tonal treatment as hover. At 1100px the navigation occupies another header row; at 700px it wraps without a capsule. Scroll padding accounts for the expanded header.

### Panels and publication cards

Capability panels pair a decorative signal, headline, short body and evidence link. Evidence panels explain problem, approach and result. Publication cards contain actual category, title, summary, date and an original LinkedIn destination; hover changes their border to amber and their surface tone. The opening card carries stronger editorial scale, rather than making every item identical.

The six publication summaries are a dated source snapshot; preserve their original language. Full reading opens the original publication. The draft does not contain or imply the complete articles or automatic API synchronization.

### Selectors and project explorer

Challenge choices, publication filters and project steps use `aria-pressed`; selected controls become amber. Publication filters hide unmatched cards. The case toggle exposes `aria-expanded` and controls a real hidden region. Native selects compare two stages, and the output explains when the same stage is selected. Explanatory changes use polite live regions.

### Editable editorial templates

Title and copy fields are native `contenteditable` regions with descriptive labels. Their visible focus uses a 3px pale-amber outline with 8px offset; caret color is amber. Edits last only in the open page. Do not imply persistence or export behavior absent from the draft.

### Review status

The independent finish review returned **FIX**, a bounded closeout, while finding the primary identity coherent and no visual blocker in the seven supplied primary captures. Source includes the mobile-contract wording, editable focus/caret, narrow-template-title and mobile aspect-ratio corrections. The builder subsequently supplied a 320px template capture and reported no overflow or out-of-bounds elements; that is builder evidence, not an independently repeated test. Capture provenance sidecars exist; those files remain the authority for their individual claims. This document adds no independent browser verification. This record closes the design-documentation requirement; it does not change the review verdict into brand approval or production readiness.

## Do's and Don'ts

### Do:

- **Do** keep actions amber and long reading text on protective dark surfaces.
- **Do** preserve the real portrait, project facts, publication dates, summaries and original URLs.
- **Do** retain pause, reduced motion, visible focus, themed caret and narrow-title rules.
- **Do** keep project narrative before its evidence when columns stack.
- **Do** treat this package as a review proposal and preserve EN/PT and live-content fallbacks in a separately authorized implementation.

### Don't:

- **Don't** represent particles or pulsing dots as an assistant, voice interface or live status.
- **Don't** fabricate results, metrics, testimonials, credentials, availability or full article text.
- **Don't** import Zoey branding, imagery, policies or animation code.
- **Don't** add a contact form, login or commercial action without implemented behavior.
- **Don't** treat source review, supplied screenshots or this document as production readiness or user brand approval.
