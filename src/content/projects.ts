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
    slug: "bot-ecosystem",
    name: "Bot Ecosystem",
    eyebrow: "REPOSITORY VISUALIZATION TOOL",
    summary:
      "A reusable interface for turning software repositories into an explorable agent-driven world.",
    description:
      "Bot Ecosystem is an independent evolution derived from Bot Crossing, designed as a reusable visual layer for exploring coding-agent activity across repositories. It can be used with Olympus OS or other projects without belonging to any one of them.",
    repository: "https://github.com/Guilsc/bot-ecosystem",
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
