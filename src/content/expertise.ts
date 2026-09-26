import type { Language } from "../lib/i18n";

export type ExpertiseId = "business-analysis" | "product-strategy" | "systems-qa" | "applied-ai";

export const expertiseOrder: ExpertiseId[] = ["business-analysis", "product-strategy", "systems-qa", "applied-ai"];

export const expertiseEvidence = {
  "business-analysis": {
    projectSlugs: ["ba-content-engine", "olympus-os"],
    career: ["EPAM Systems", "CI&T", "McFadyen Digital", "Wipro"],
    signals: ["Requirements", "Process Design", "Stakeholder Alignment", "UAT", "Data Modeling"],
  },
  "product-strategy": {
    projectSlugs: ["ba-content-engine", "olympus-os"],
    career: ["EPAM Systems", "CI&T", "McFadyen Digital"],
    signals: ["Prioritization", "Product Delivery", "Discovery", "Governance", "Decision Design"],
  },
  "systems-qa": {
    projectSlugs: ["bot-ecosystem", "olympus-os", "ba-content-engine"],
    career: ["EPAM Systems", "Wipro", "Bornlogic"],
    signals: ["Quality Assurance", "Testing", "Edge Cases", "Integration", "System Dependencies"],
  },
  "applied-ai": {
    projectSlugs: ["olympus-os", "bot-ecosystem", "ba-content-engine"],
    career: ["EPAM Systems"],
    signals: ["AI Agents", "Multi-Agent Systems", "Context", "Memory", "Automation"],
  },
} satisfies Record<ExpertiseId, { projectSlugs: string[]; career: string[]; signals: string[] }>;

export function expertiseHref(id: ExpertiseId) {
  return `/expertise?focus=${id}`;
}

export function expertiseCopy(t: { expertiseItems: Record<ExpertiseId, { title: string; description: string }> }, id: ExpertiseId) {
  return t.expertiseItems[id];
}
