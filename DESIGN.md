---
name: "Guilherme Costa — Circuit / Orbital Portfolio"
description: "Public portfolio connecting professional evidence through a navy, mint, and circuit/orbital visual system."
colors:
  primary: "#b0efcf"
  primary-foreground: "#10251f"
  background: "#0d1923"
  foreground: "#edf2ef"
  card: "#12232f"
  secondary: "#203542"
  secondary-foreground: "#e1ebe7"
  muted-foreground: "#b0bec7"
  accent: "#d9ba80"
  border: "#354650"
  exhibit-bg: "#f2eddf"
  exhibit-text: "#222c2b"
  copper: "#a33e2e"
  copper-foreground: "#fff6e8"
  field-bg: "#fffaf0"
  field-border: "#747e72"
  exhibit-border: "#c2c1b3"
typography:
  display:
    fontFamily: "Chakra Petch, sans-serif"
    fontSize: "clamp(2.8rem, 4.7vw, 4.7rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Chakra Petch, sans-serif"
    fontSize: "clamp(2rem, 4vw, 3.2rem)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Chakra Petch, sans-serif"
    fontSize: "clamp(1.4rem, 3vw, 2.25rem)"
    fontWeight: 500
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Hanken Grotesk, sans-serif"
    fontSize: "1rem"
    lineHeight: 1.6
  label:
    fontFamily: "Hanken Grotesk, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.04em"
rounded:
  square: "0"
spacing:
  compact: "0.5rem"
  small: "1rem"
  gutter-mobile: "1.25rem"
  panel: "1.5rem"
  gutter-desktop: "2rem"
  section-mobile: "3rem"
  section-desktop: "5rem"
components:
  button-system-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    padding: "0.8rem 1rem"
  button-feature:
    backgroundColor: "{colors.copper}"
    textColor: "{colors.copper-foreground}"
    padding: "0.75rem 1rem"
  button-filter-selected:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    padding: "0.5rem 0.75rem"
  chip-capability:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.secondary-foreground}"
    padding: "0.5rem 0.625rem"
  card-evidence:
    backgroundColor: "{colors.card}"
    padding: "1.5rem"
  select-comparison:
    backgroundColor: "{colors.field-bg}"
    textColor: "{colors.exhibit-text}"
    padding: "0.5rem"
    width: "100%"
  nav-link:
    typography: "{typography.label}"
---

# Design System: Guilherme Costa — Circuit / Orbital Portfolio

## Overview

**Creative North Star: "Circuit / Orbital Portfolio"**

The circuit/orbital portfolio connects business, product, systems/QA, and applied AI through an authored dark navy environment. Mint identifies actions and selected states; warm cream and copper distinguish the Curatia evidence panel. Chakra Petch gives headings a technical character, while Hanken Grotesk supports sustained reading.

The decorative nucleus uses fixed expertise labels and animated concentric tracks. It is visual animation only, with no telemetry or assistant connection. The system applies to public portfolio surfaces; the internal Curatia application retains its existing theme. Authentic content, bilingual access, and the existing portrait remain integral.

**Key Characteristics:**
- Dark navy reading environment with mint actions.
- Cream and copper evidence panel for Curatia.
- Fixed expertise structure with restrained orbital motion.
- Native controls, visible navigation, and readable evidence.

## Colors

The public system pairs cool navy, pale mint, and light reading text with a warm cream/copper evidence panel. Frontmatter hex values reflect the final public CSS overrides; they supersede the previous gallery palette.

### Primary
- **Mint:** actions, selected filters, focus, active navigation, and the closing field.
- **Deep green:** foreground on mint fields and actions.

### Secondary
- **Copper:** selected stages and feature links within the cream Curatia panel.
- **Warm light:** text on copper actions.
- **Warm gold:** restrained accent emphasis and applied-AI node cues.

### Neutral
- **Navy ground / navy panel:** public background and evidence cards.
- **Blue slate:** capability-chip surfaces.
- **Reading light / chip light:** main text and secondary-surface foreground.
- **Soft blue-gray:** supporting prose and metadata.
- **Slate divider:** public boundaries.
- **Cream / warm ink:** Curatia panel background and reading foreground.
- **Field cream / field stroke / exhibit divider:** comparison inputs and warm-panel boundaries.

**The Scope Rule.** Apply this system to public portfolio surfaces; preserve the internal application theme.

## Typography

**Display Font:** Chakra Petch with sans-serif fallback.
**Body Font:** Hanken Grotesk with sans-serif fallback.

Angular display lettering establishes the technical identity; regular sans-serif copy keeps the portfolio readable.

### Hierarchy
- **Display:** the introduction uses the display token, tight tracking and a 1.05 line height. At 900px it scales from 2.5rem to 4rem; at 640px it scales from 2.4rem to 3.5rem. Mint can emphasize a meaningful headline span.
- **Headline:** section headings use the headline token. The Curatia exhibit title scales from 2.6rem to 4rem at weight 600; inner route titles scale from 2.5rem to 6rem.
- **Title:** evidence rows use the title token; article titles use 1.5rem semibold.
- **Body:** regular reading uses the body token; supporting descriptions often use 0.875rem. Introduction prose uses 1.15rem, becoming 1rem on mobile, within 43ch.
- **Label:** navigation uses the label token; functional metadata uses the same readable 0.75rem scale. Diagram labels are 0.8rem, becoming 0.75rem on mobile.

**The Technical Voice Rule.** Use Chakra Petch for headings and Hanken Grotesk for navigation and reading.

## Layout

The public home header, opening, and sections use an 86rem maximum width; inner routes retain their 80rem container. Desktop gutters remain 2rem, becoming 1.25rem at 640px. Sections use 5rem vertical spacing, reduced to 3rem on mobile.

The introduction pairs copy with a slightly wider diagram column, using a 37rem minimum height on desktop. At 900px the height becomes content-driven; at 640px copy and diagram stack. The orbit has a square aspect ratio and a 36rem maximum width. Four expertise labels remain fixed around the drawing.

Broad evidence rows use three-part desktop grids and descriptions beneath titles on mobile. Profile and closing layouts stack at narrow widths. Navigation wraps and stays visible. Process comparison uses two columns, becoming one at 640px. Article grids follow the existing medium/large two- and three-column breakpoints.

## Elevation & Depth

Tonal panels, thin dividers, and drawn orbital tracks establish depth. Cards do not float on decorative shadows. Active navigation uses a two-pixel inset underline. Keyboard focus uses a three-pixel outline and five-pixel offset; warm-panel controls use copper focus, comparison selectors use a four-pixel offset, and closing links use deep-green focus.

**The Flat Surface Rule.** Use tonal separation, drawn tracks, and thin borders for depth rather than decorative card shadows.

## Shapes

Controls, reading panels, and article cards are square. Thin borders preserve structure. Concentric circles and circuit paths belong to the decorative nucleus, rather than imposing rounded cards across the interface. The portrait keeps its authentic 4:5 crop; small round bullets express list structure.

## Components

### Buttons
Primary system actions use mint fill, deep-green text, 0.8rem by 1rem padding, and a 48px minimum height; hover brightens the mint. Selected public filters use the same color pairing. Curatia feature links use copper with warm-light text and 0.75rem by 1rem padding; hover deepens copper. Typical controls retain 44px minimum targets and visible focus.

### Chips
Capability chips use blue-slate fill and chip-light text with 0.5rem by 0.625rem padding. Status tags use a slate border and muted text. These are evidence metadata, not interactive filters.

### Cards / Containers
Article and case-study cards use navy-panel fill, thin slate borders, square corners, and 1.5rem padding. Hover emphasizes article borders and titles in mint. Curatia is a distinct cream evidence field with copper actions and warm dividers; it keeps its scoped local variables.

### Inputs / Fields
Process comparison uses native labeled selects with cream fill, warm-ink text, a field stroke, square corners, full width, and a 44px minimum height. Copper outlines mark focus. Selecting the same stage produces a status message.

### Navigation
The compact Chakra Petch wordmark accompanies language selection and immediate contact. Navigation retains thin boundaries, readable labels, and 44px link targets. Mint plus an underline marks the current page. Header and navigation wrap on mobile; the skip link becomes visible on focus.

### Process Explorer
Five stage buttons expose pressed state and update a polite live description. A disclosure opens authentic two-stage comparison. Pressed stages use copper fill and warm-light text inside the cream exhibit.

### Decorative System Core
A canvas draws concentric tracks, four fixed circuit connections, slow segmented orbits, a gently breathing center, and phase-shifted light points. Native pause/resume exposes pressed state. Reduced motion renders a static drawing and hides the unnecessary pause control. Animation stops when offscreen or the document is hidden; the canvas and expertise labels are decorative and hidden from assistive technology, with the relationship explained in adjacent text. No telemetry, microphone, or assistant integration is implied.

Evidence-row arrows retain a three-pixel hover translation over 180ms ease-out; reduced motion removes the transition and transform.

## Do's and Don'ts

### Do:
- **Do** keep mint actions paired with their dark foreground.
- **Do** preserve the cream/copper local palette within Curatia evidence.
- **Do** keep decorative motion pausable and static under reduced motion.
- **Do** retain native labeled selectors, meaningful metadata, and visible keyboard focus.
- **Do** use authentic professional evidence and provenance-bearing imagery.

### Don't:
- **Don't** connect the decorative nucleus to fake telemetry or assistant behavior.
- **Don't** turn expertise labels into moving targets.
- **Don't** apply public theme overrides to the internal Curatia tool.
- **Don't** add decorative numbering, section kickers, or fabricated outcomes.
- **Don't** hide essential navigation on narrow screens.
