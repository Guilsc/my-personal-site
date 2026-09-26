export type PortfolioProject = {
  slug: string;
  name: string;
  eyebrow: string;
  summary: string;
  description: string;
  repository: string;
  status: "ACTIVE" | "BUILDING" | "EXPERIMENT";
  tags: string[];
};

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "ba-content-engine",
    name: "BA Content Engine",
    eyebrow: "EDITORIAL INTELLIGENCE SYSTEM",
    summary:
      "A structured system for turning signals into researched, approved, published, and learned-from Business Analysis content.",
    description:
      "BA Content Engine connects trend discovery, idea development, editorial research, drafting, publishing, and post-publication learning into one governed workflow. The project keeps editorial intelligence separate from persistent application data and treats approval as an explicit human decision.",
    repository: "https://github.com/Guilsc/ba-content-engine",
    status: "ACTIVE",
    tags: ["BUSINESS ANALYSIS", "AI", "EDITORIAL SYSTEMS", "SUPABASE"],
  },
  {
    slug: "bot-crossing",
    name: "Bot Crossing",
    eyebrow: "REPOSITORY VISUALIZATION TOOL",
    summary:
      "A reusable interface for turning software repositories into an explorable agent-driven world.",
    description:
      "Bot Crossing is a reusable project built from a fork of the original Bot Crossing concept and evolved with custom behavior and visual direction. It reads repositories and provides a game-like surface for exploring them, so it can be used independently with Olympus OS or other projects rather than belonging to any one repository.",
    repository: "https://github.com/Guilsc/bot-crossing",
    status: "BUILDING",
    tags: ["AI AGENTS", "REPOSITORIES", "VISUALIZATION", "EXPERIMENT"],
  },
  {
    slug: "olympus-os",
    name: "Olympus OS",
    eyebrow: "MULTI-AGENT OPERATING SYSTEM",
    summary:
      "An agent operating model for coordinated AI teams, with explicit ownership, memory boundaries, reusable skills, and governed workflows.",
    description:
      "Olympus OS explores how persistent agents can work as a coherent team without collapsing responsibilities into one giant assistant. It separates agent-local operational memory from curated shared knowledge, gives domains clear owners, and uses reusable skills and lifecycle policies to make the system understandable and operable.",
    repository: "https://github.com/Guilsc/olympus_OS",
    status: "BUILDING",
    tags: ["MULTI-AGENT", "AGENT ARCHITECTURE", "MEMORY", "GOVERNANCE"],
  },
];

export function getPortfolioProject(slug: string) {
  return portfolioProjects.find((project) => project.slug === slug);
}
