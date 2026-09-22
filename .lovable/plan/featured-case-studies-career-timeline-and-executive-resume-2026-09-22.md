# Featured Case Studies, Career Timeline, and Executive Resume

## Overview
Extend the existing single-page portfolio with three connected sections, preserving its dark editorial style and keeping all visible content in English.

## What will be added

### 1. Featured business analysis case studies
Add a **Featured Case Studies** section before the GitHub repositories, built from the three topics selected:

- **Business Analysis, Prompt Engineering & AI for Business**
- **Applying the Tuckman Model to Team Development**
- **Coffee with ABA: Analysis Debt**

Each case study will use a consistent, executive-friendly narrative:

- Problem
- Constraints
- Approach and artifacts created
- Business outcome

Cards will show a concise overview and expand in place to reveal the complete narrative. Links to the original LinkedIn posts will remain available. Because no client-confidential facts or measured results were supplied, outcomes will be phrased as practical/expected business value rather than invented metrics or project claims.

### 2. Interactive career experience timeline
Add a vertical timeline based only on the verified profile information already provided:

- Senior Business Analyst / Lead Analyst at EPAM Systems
- Earlier Business Analysis and product-focused delivery experience
- Quality Assurance and software testing foundation
- 14+ years across software delivery

Visitors can filter entries using tags such as **Business Analysis**, **Product**, **QA**, **Systems**, **AI**, and **Leadership**. Entries will use broad career phases where exact dates or employer details are unavailable, avoiding fabricated chronology.

### 3. On-page executive resume view
Add an **Executive Resume** view within the portfolio, opened from the timeline area. It will present a compact, scannable summary of:

- Executive profile
- Core capabilities
- Career experience
- Selected case studies
- Education and location
- LinkedIn and GitHub links

The view will be suitable for browser printing, with navigation and decorative elements hidden in print mode. No downloadable PDF file will be generated.

## Navigation and structure
- Add **CASE STUDIES** and **EXPERIENCE** to the primary navigation while keeping it compact on mobile.
- Renumber section labels so the page remains sequential.
- Keep GitHub repositories as a distinct technical work section that complements the new business analysis case studies.

## Technical details
- Extract the new structured content into a reusable typed content module rather than enlarging the main page file further.
- Use local React state for tag filtering and expanded case-study/resume states; no backend or account setup is required.
- Reuse the existing semantic color tokens, typography, borders, motion utilities, and icon library.
- Add accessible buttons, filter states, expanded-state labels, keyboard support, and reduced-motion behavior.
- Add print-specific styles only for the executive resume view.

## Validation
- Verify case-study expansion, timeline filters, resume opening/closing, and external links.
- Check desktop and mobile layouts for overflow, readable text, and non-overlapping controls.
- Confirm the homepage still loads when GitHub is unavailable and that no browser errors are introduced.
