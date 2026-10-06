---
name: "Guilherme Costa — Galeria de trabalho"
description: "Public portfolio with mineral surfaces, cobalt exhibits, and grounded professional evidence."
colors:
  primary: "oklch(0.43 0.19 267)"
  primary-foreground: "oklch(0.985 0.004 90)"
  background: "oklch(0.97 0.008 90)"
  foreground: "oklch(0.24 0.025 260)"
  card: "oklch(0.945 0.01 90)"
  secondary: "oklch(0.92 0.012 90)"
  muted-foreground: "oklch(0.46 0.025 260)"
  accent: "oklch(0.38 0.17 267)"
  border: "oklch(0.81 0.02 90)"
typography:
  display:
    fontFamily: "Bodoni Moda, Georgia, serif"
    fontSize: "clamp(3.6rem, 8vw, 6rem)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Hanken Grotesk, ui-sans-serif, sans-serif"
    fontSize: "clamp(2rem, 4vw, 3.2rem)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Hanken Grotesk, ui-sans-serif, sans-serif"
    fontSize: "clamp(1.4rem, 3vw, 2.25rem)"
    fontWeight: 500
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Hanken Grotesk, ui-sans-serif, sans-serif"
    fontSize: "1rem"
    lineHeight: 1.6
  label:
    fontFamily: "Hanken Grotesk, ui-sans-serif, sans-serif"
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
  button-feature:
    backgroundColor: "{colors.primary-foreground}"
    textColor: "{colors.primary}"
    padding: "0.75rem 1rem"
  button-filter-selected:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    padding: "0.5rem 0.75rem"
  chip-capability:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.foreground}"
    padding: "0.5rem 0.625rem"
  card-evidence:
    backgroundColor: "{colors.card}"
    padding: "1.5rem"
  select-comparison:
    backgroundColor: "{colors.primary-foreground}"
    textColor: "{colors.primary}"
    padding: "0.5rem"
    width: "100%"
  nav-link:
    typography: "{typography.label}"
---

# Design System: Guilherme Costa — Galeria de trabalho

## Overview

**Creative North Star: "Galeria de trabalho"**

The gallery presents actual work through clear hierarchy, broad evidence rows, and plain surfaces. Mineral white supports reading; cobalt fields give selected work a distinct exhibit presence. Hanken Grotesk carries navigation and prose, while Bodoni Moda gives the featured project its own display voice.

This system applies only to public portfolio surfaces inside the gallery scope. The internal Curatia application retains its existing theme. Bilingual content, an authentic portrait, and real project evidence remain integral to the public experience.

**Key Characteristics:**
- Mineral reading surfaces and cobalt exhibit fields.
- Broad, divided evidence rows with square containers.
- Clear contact, visible navigation, and native controls.
- Restrained motion with reduced-motion behavior.

## Colors

The palette pairs warm mineral surfaces with cool cobalt and ink-tinted text. Frontmatter values are normative and preserve the implementation's OKLCH source.

### Primary
- **Cobalt:** selected filters, contact links, the feature exhibit, and closing field.
- **Exhibit light:** foreground and inverse controls within cobalt fields.
- **Deep cobalt:** secondary accent emphasis.

### Neutral
- **Mineral ground:** public page background.
- **Mineral panel:** article and case-study containers.
- **Mineral tag:** capability chip background, always paired with ink text.
- **Ink:** main text and chip foreground.
- **Soft ink:** descriptive text and secondary metadata.
- **Mineral divider:** borders and evidence-row separators.

**The Scope Rule.** Apply the gallery palette and typography inside public portfolio surfaces; do not redefine the internal application theme.

## Typography

**Display Font:** Bodoni Moda with Georgia and serif fallbacks.
**Body Font:** Hanken Grotesk with UI sans-serif fallbacks.

The serif exhibit title contrasts with a direct sans-serif reading system. Heading tracking is tight; prose stays neutral and readable.

### Hierarchy
- **Display:** the featured project title uses the display token.
- **Headline:** section headings use the headline token. The introduction scales from 2.6rem to 4.8rem; inner route titles scale from 2.5rem to 6rem.
- **Title:** evidence-row headings use the title token; article titles use 1.5rem semibold.
- **Body:** regular prose follows the body token. Supporting copy commonly uses 0.875rem; evidence descriptions are constrained to about 65–70ch.
- **Label:** navigation uses the label token. Functional metadata uses the same 0.75rem scale with wider tracking; uppercase is reserved for existing labels.

**The Exhibit Voice Rule.** Reserve Bodoni Moda for the featured exhibit title; use Hanken Grotesk for navigation, evidence, and reading.

## Layout

Public content shares an 80rem maximum container. Desktop horizontal gutters are 2rem; at 640px and below they become 1.25rem. Main gallery sections use 5rem vertical spacing, reduced to 3rem on mobile. Inner routes use their existing responsive 12-column grid and 5rem/6rem main vertical padding.

Evidence rows use a three-part grid for identity, description, and action. Mobile rows place descriptions beneath their title and preserve an adjacent action. Profile and closing layouts stack on narrow screens. Navigation wraps rather than disappearing. The comparison panel uses two columns, becoming one at 640px. Article grids progress from one to two and then three columns at the existing Tailwind medium and large breakpoints.

## Elevation & Depth

The gallery uses tonal fields and thin dividers rather than floating shadows. Active navigation has an inset two-pixel underline; this is a state marker, not elevation. Keyboard focus uses a three-pixel outline with five-pixel offset, switching to the light foreground inside cobalt fields. Comparison selectors use a four-pixel outline offset.

**The Flat Surface Rule.** Use tonal separation and thin borders for depth; do not introduce decorative card shadows.

## Shapes

Primary surfaces and controls are square. Evidence rows remain open and separated by one-pixel lines. The authentic portrait has a 4:5 crop. Small round list bullets express list structure rather than a rounded container language.

## Components

### Buttons
Feature links use the light foreground as their fill, cobalt text, and 0.75rem by 1rem padding. Their hover fill becomes a slightly deeper mineral tone. Selected filters invert into cobalt with light text; unselected filters are soft ink and gain panel fill/cobalt text on hover. Most controls have a 44px minimum height; featured links use 48px. Keyboard focus remains visible.

### Chips
Capability chips use mineral-tag fill and ink text, with 0.5rem by 0.625rem padding. Status tags use a mineral border and soft-ink text. They display evidence metadata rather than acting as filters.

### Cards / Containers
Case-study and article containers use mineral-panel fill, square corners, thin mineral borders, and 1.5rem padding. Articles indicate hover through border emphasis and cobalt titles. Do not apply the article-card treatment to broad evidence rows.

### Inputs / Fields
The gallery's comparison fields are native labeled selects, full width, square, and at least 44px high. Their light fill and cobalt text remain readable within the feature field. Each field has its own label; matching selections show a status message.

### Navigation
The header combines a compact wordmark, language switch, and immediate contact. The navigation band has thin borders and 44px link targets. Active links use cobalt plus an inset underline. On mobile both header and navigation wrap. A keyboard-visible skip link reaches the focusable main content.

### Process Explorer
Five native stage buttons expose pressed state and update a polite live description. A disclosure button opens a two-select comparison of actual lifecycle boundaries. The panel preserves content when closed and uses native form controls. Hover arrows on evidence rows move three pixels over 180ms ease-out; reduced motion removes this transform and transition.

## Do's and Don'ts

### Do:
- **Do** preserve the public gallery scope when adding screens.
- **Do** use cobalt for selected states and feature fields, with the matching light foreground.
- **Do** retain native labeled selectors and meaningful disclosure controls.
- **Do** keep functional metadata, readable text, and visible keyboard focus.
- **Do** use authentic imagery and evidence with documented provenance.

### Don't:
- **Don't** import the old internal dark theme into public gallery surfaces.
- **Don't** add decorative numbering or section kickers.
- **Don't** invent project outcomes or use fabricated product imagery.
- **Don't** hide essential navigation on narrow screens.
