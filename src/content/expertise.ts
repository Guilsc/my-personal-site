export type ExpertiseId = "business-analysis" | "product-strategy" | "systems-qa" | "applied-ai";

export const expertiseOrder: ExpertiseId[] = ["business-analysis", "product-strategy", "systems-qa", "applied-ai"];

export const expertiseEvidence = {
  "business-analysis": {
    projectSlugs: ["ba-content-engine", "olympus-os"],
    career: ["EPAM Systems", "CI&T", "McFadyen Digital", "Wipro"],
    careerMonths: 92,
    signals: ["Requirements", "Process Design", "Stakeholder Alignment", "UAT", "Data Modeling"],
  },
  "product-strategy": {
    projectSlugs: ["ba-content-engine", "olympus-os"],
    career: ["EPAM Systems", "CI&T", "McFadyen Digital"],
    careerMonths: 66,
    signals: ["Prioritization", "Product Delivery", "Discovery", "Governance", "Decision Design"],
  },
  "systems-qa": {
    projectSlugs: ["bot-ecosystem", "olympus-os", "ba-content-engine"],
    career: ["EPAM Systems", "Wipro", "Bornlogic", "Jaycon Systems", "CINQ"],
    careerMonths: 122,
    signals: ["Quality Assurance", "Testing", "Edge Cases", "Integration", "System Dependencies"],
  },
  "applied-ai": {
    projectSlugs: ["olympus-os", "bot-ecosystem", "ba-content-engine"],
    career: ["EPAM Systems"],
    careerMonths: 0,
    signals: ["AI Factory", "AI Agents", "Multi-Agent Systems", "Multi-Model Orchestration", "Google AI Studio", "Salesforce Agentforce", "Claude", "OpenAI", "Context & Memory", "Automation"],
    aiContexts: ["Equifax client delivery", "EPAM internal initiatives"],
  },
} satisfies Record<ExpertiseId, { projectSlugs: string[]; career: string[]; careerMonths: number; signals: string[]; aiContexts?: string[] }>;

export function expertiseHref(id: ExpertiseId) {
  return `/expertise?focus=${id}`;
}

export function expertiseCopy(t: { expertiseItems: Record<ExpertiseId, { title: string; description: string }> }, id: ExpertiseId) {
  return t.expertiseItems[id];
}
