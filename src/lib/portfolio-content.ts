export type CareerTag = "Business Analysis" | "Product" | "QA" | "Systems" | "AI" | "Leadership";

export type CaseStudy = {
  id: string;
  title: string;
  eyebrow: string;
  summary: string;
  problem: string;
  constraints: string[];
  artifacts: string[];
  outcome: string;
  sourceUrl: string;
};

export type CareerEntry = {
  phase: string;
  role: string;
  organization: string;
  location?: string;
  summary: string;
  highlights: string[];
  tags: CareerTag[];
};

export const careerTags: CareerTag[] = [
  "Business Analysis",
  "Product",
  "QA",
  "Systems",
  "AI",
  "Leadership",
];

export const caseStudies: CaseStudy[] = [
  {
    id: "ai-for-business-analysis",
    title: "Sharper Business Analysis Through Prompt Engineering",
    eyebrow: "AI-ASSISTED ANALYSIS",
    summary: "A practical operating model for using structured prompts to improve analysis without outsourcing judgment.",
    problem: "Business analysts often lose time turning fragmented context into requirements, questions, and decision-ready documentation. Unstructured AI use can accelerate output while weakening traceability and critical thinking.",
    constraints: [
      "Incomplete and evolving business context",
      "Sensitive information that should not be exposed",
      "The need for human validation and accountable decisions",
    ],
    artifacts: [
      "Prompt patterns organized by analysis objective",
      "Requirement and acceptance-criteria review checklists",
      "Assumption, ambiguity, and stakeholder-question logs",
    ],
    outcome: "A repeatable way to accelerate first drafts, expose missing context earlier, and preserve the analyst’s responsibility for validation and business decisions.",
    sourceUrl: "https://www.linkedin.com/posts/gsilvacosta_businessanalysis-promptengineering-aiforbusiness-activity-7369335253288521731--KPq?utm_source=share&utm_medium=member_ios&rcm=ACoAABgu-BcBSWipJ2aNN0s_L41Gf8-7Ac7CnJk",
  },
  {
    id: "tuckman-team-development",
    title: "Making Team Development Visible with the Tuckman Model",
    eyebrow: "TEAM EFFECTIVENESS",
    summary: "A structured lens for diagnosing team dynamics and selecting interventions that fit the team’s current stage.",
    problem: "Delivery friction is often treated as an individual performance issue when the underlying cause is a team moving through a predictable stage of development.",
    constraints: [
      "Different levels of trust and role clarity",
      "Delivery pressure while team norms are still forming",
      "Behaviors that can be misread without shared language",
    ],
    artifacts: [
      "Team-stage assessment prompts",
      "Facilitation questions for alignment conversations",
      "Stage-specific actions for leaders and team members",
    ],
    outcome: "A shared vocabulary for discussing team behavior, choosing proportionate interventions, and creating clearer expectations around collaboration.",
    sourceUrl: "https://www.linkedin.com/posts/gsilvacosta_have-you-met-tuckman-applying-the-tuckman-activity-7132843115144458240-TB03?utm_source=share&utm_medium=member_ios&rcm=ACoAABgu-BcBSWipJ2aNN0s_L41Gf8-7Ac7CnJk",
  },
  {
    id: "analysis-debt",
    title: "Recognizing and Managing Analysis Debt",
    eyebrow: "DECISION QUALITY",
    summary: "A framework for making the hidden cost of rushed discovery and unresolved assumptions visible to delivery teams.",
    problem: "Shortcuts in understanding needs, rules, dependencies, and edge cases can create a backlog of uncertainty that later appears as rework, defects, and delayed decisions.",
    constraints: [
      "Pressure to start delivery before discovery is complete",
      "Unresolved assumptions spread across teams and tools",
      "The cost of missing analysis is difficult to quantify early",
    ],
    artifacts: [
      "Analysis-debt register with ownership and impact",
      "Assumption and decision logs",
      "Risk-based prioritization for debt reduction",
    ],
    outcome: "A practical way to discuss analysis trade-offs, prioritize the most consequential unknowns, and reduce avoidable rework before it reaches delivery.",
    sourceUrl: "https://www.linkedin.com/posts/gsilvacosta_coffeewithaba-businessanalysis-analysisdebt-activity-7505954913575669761-cKJA?utm_source=share&utm_medium=member_ios&rcm=ACoAABgu-BcBSWipJ2aNN0s_L41Gf8-7Ac7CnJk",
  },
];

export const careerEntries: CareerEntry[] = [
  {
    phase: "CURRENT FOCUS",
    role: "Senior Business Analyst / Lead Analyst",
    organization: "EPAM Systems",
    location: "Curitiba, Brazil",
    summary: "Connecting business goals, product direction, system behavior, and delivery teams to turn complexity into clear, actionable work.",
    highlights: [
      "Facilitates alignment across business and technical stakeholders",
      "Frames requirements, dependencies, risks, and decision points",
      "Explores practical AI applications for analysis and delivery",
    ],
    tags: ["Business Analysis", "Product", "Systems", "AI", "Leadership"],
  },
  {
    phase: "CAREER DEVELOPMENT",
    role: "Business Analysis & Product-Focused Delivery",
    organization: "Software delivery environments",
    summary: "Expanded from quality-focused delivery into discovery, prioritization, stakeholder alignment, and value-oriented product decisions.",
    highlights: [
      "Translated complex needs into delivery-ready outcomes",
      "Supported prioritization and cross-functional decision-making",
      "Connected business intent with system and process realities",
    ],
    tags: ["Business Analysis", "Product", "Systems", "Leadership"],
  },
  {
    phase: "FOUNDATION",
    role: "Software Testing & Quality Assurance",
    organization: "Software delivery environments",
    summary: "Built a rigorous foundation in software behavior, risk, dependencies, and the edge cases that determine whether a solution works beyond the happy path.",
    highlights: [
      "Analyzed expected behavior and failure scenarios",
      "Made quality risks visible before release",
      "Developed a systems-oriented approach to problem solving",
    ],
    tags: ["QA", "Systems"],
  },
];