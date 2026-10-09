export type PortfolioProject = {
  slug: string;
  name: string;
  eyebrow: string;
  summary: string;
  description: string;
  repository: string;
  launchUrl?: string;
  status: "ACTIVE" | "BUILDING" | "EXPERIMENT";
  tags: string[];
  takeaways: string[];
  role?: string;
  problem?: string;
  approach?: string[];
  outcomes?: string[];
  next?: string;
};

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "curatia-content-engine",
    name: "Curatia",
    eyebrow: "EDITORIAL INTELLIGENCE SYSTEM",
    summary:
      "An editorial intelligence and content operations platform for turning signals into context, decisions, creation, publishing, and learning.",
    description:
      "Curatia connects signal discovery, idea development, editorial research, creation, publishing, and post-publication learning in one governed workspace. It combines editorial intelligence with multi-channel execution while keeping approval and publishing as explicit human decisions.",
    repository: "https://github.com/Guilsc/curatia-content-engine",
    status: "ACTIVE",
    tags: ["AI", "EDITORIAL INTELLIGENCE", "CONTENT OPERATIONS", "SUPABASE"],
    role: "Product owner, workflow designer, and builder",
    problem: "Turn fragmented signal discovery, research, creation, approval, multi-channel publishing, and learning into one governed editorial workflow.",
    approach: ["Designed an explicit editorial lifecycle from signal to learning.", "Separated editorial intelligence from persistent application data.", "Made human approval a hard boundary before publishing."],
    outcomes: ["A working editorial intelligence platform with a defined operating model.", "A reusable lifecycle that connects discovery, creation, publishing, and learning without removing human approval."],
    next: "Expand multi-channel creation, distribution, analytics, and agent orchestration while preserving explicit approval boundaries.",
    takeaways: [
      "Separates editorial intelligence from persistent application data.",
      "Uses explicit human approval as a hard publishing boundary.",
      "Connects discovery, creation, publishing, and learning into one lifecycle.",
    ],
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
    role: "Product designer and builder",
    problem: "Make repository and coding-agent activity easier to understand than a conventional list of files, commits, and logs.",
    approach: ["Evolved the original Bot Crossing concept into a reusable visualization layer.", "Kept the application independent from Olympus OS so it can visualize other repositories.", "Integrated the app into the portfolio deployment without collapsing its application boundary."],
    outcomes: ["A launchable visual interface for exploring repository activity.", "A reusable project boundary that can support Olympus OS and other repositories."],
    next: "Expand repository signals and agent activity views as the underlying projects evolve.",
    takeaways: [
      "Turns repository activity into a visual, explorable interface.",
      "Remains reusable instead of being coupled to a single agent system.",
      "Shares the personal-site deployment while keeping its own application boundary.",
    ],
  },
  {
    slug: "olympus-os",
    name: "Olympus OS",
    eyebrow: "MULTI-AGENT OPERATING SYSTEM",
    summary:
      "An agent operating model for coordinated AI teams, with explicit ownership, memory boundaries, reusable skills, and governed workflows.",
    description:
      "Olympus OS explores how persistent agents can work as a coherent team without collapsing responsibilities into one giant assistant. It separates agent-local operational memory from curated shared knowledge, gives domains clear owners, and uses reusable skills and lifecycle policies to make the system understandable and operable.",
    repository: "https://github.com/Guilsc/olympus",
    status: "BUILDING",
    tags: ["MULTI-AGENT", "AGENT ARCHITECTURE", "MEMORY", "GOVERNANCE"],
    role: "Operating-model designer and agent-system architect",
    problem: "Coordinate persistent AI agents without collapsing ownership, memory, governance, and execution into one oversized assistant.",
    approach: ["Defined explicit agent and Realm ownership boundaries.", "Separated working context, agent memory, and curated shared knowledge.", "Designed reusable Skills, lifecycle policies, escalation paths, and human approval boundaries."],
    outcomes: ["A documented multi-agent operating model with explicit authority and memory boundaries.", "Self-checks that expose technical limitations instead of treating behavioral instructions as enforced permissions."],
    next: "Validate orchestration, permission enforcement, shared knowledge, and observability as implementation matures.",
    takeaways: [
      "Makes agent ownership and responsibility explicit.",
      "Separates working context, agent memory, and curated shared knowledge.",
      "Treats skills, lifecycle policies, and governance as first-class architecture.",
    ],
  },
];

export function getPortfolioProject(slug: string) {
  return portfolioProjects.find((project) => project.slug === slug);
}
