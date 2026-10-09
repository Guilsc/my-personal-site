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
      "Bot Ecosystem is an independent evolution derived from Bot Crossing, designed as a reusable visual layer for exploring coding-agent activity across repositories. It can be used with Olympus or other projects without belonging to any one of them.",
    repository: "https://github.com/Guilsc/bot-ecosystem",
    status: "BUILDING",
    tags: ["AI AGENTS", "REPOSITORIES", "VISUALIZATION", "EXPERIMENT"],
    role: "Product designer and builder",
    problem: "Make repository and coding-agent activity easier to understand than a conventional list of files, commits, and logs.",
    approach: ["Evolved the original Bot Crossing concept into a reusable visualization layer.", "Kept the application independent from Olympus so it can visualize other repositories.", "Integrated the app into the portfolio deployment without collapsing its application boundary."],
    outcomes: ["A launchable visual interface for exploring repository activity.", "A reusable project boundary that can support Olympus and other repositories."],
    next: "Expand repository signals and agent activity views as the underlying projects evolve.",
    takeaways: [
      "Turns repository activity into a visual, explorable interface.",
      "Remains reusable instead of being coupled to a single agent system.",
      "Shares the personal-site deployment while keeping its own application boundary.",
    ],
  },
  {
    slug: "olympus",
    name: "Olympus",
    eyebrow: "GOVERNED AGENT ARCHITECTURE",
    summary:
      "A modular foundation for governed AI agent teams, with canonical roles, owned domains, and accountable handoffs.",
    description:
      "Olympus is a clean rebuild of a governable, extensible agent architecture. It separates canonical roles from narrative aliases and defines Governor, Orchestrator, and Domain Owner responsibilities. Six Domain/Owner contracts and host-side validation provide evidence for bounded decisions and handoffs. A persistent Olympus runtime, memory, Workers, and capabilities remain deferred.",
    repository: "https://github.com/Guilsc/olympus",
    status: "BUILDING",
    tags: ["MULTI-AGENT", "AGENT ARCHITECTURE", "DOMAINS", "GOVERNANCE"],
    role: "Operating-model designer and agent-system architect",
    problem: "Coordinate AI agent responsibilities, governance, planning, and specialist work without collapsing all authority into one assistant.",
    approach: [
      "Separated canonical architecture, optional Greek-mythology aliases, and future runtime instances.",
      "Defined Governor, Orchestrator, and six distinct Domain/Owner contracts with bounded responsibilities.",
      "Exercised the User → Governor → Orchestrator → Domain Owner → Result path in external host-side validation.",
    ],
    outcomes: [
      "A versioned modular architecture with validated declarative roles and six Domain/Owner contracts.",
      "Documented host-side validation and explicit limits: no persistent Olympus runtime or production dispatch.",
    ],
    next: "Review the validated foundations and develop a minimal local runtime only through approved architectural blocks.",
    takeaways: [
      "Makes governance, coordination, and specialist ownership separate responsibilities.",
      "Keeps theme aliases independent of canonical architecture.",
      "Maintains a clear Lead Owner and bounded handoffs across domains.",
      "Preserves a human approval boundary and traceable review decisions.",
      "Reuses documented contracts and validation evidence across initiatives.",
      "Distinguishes host-side demonstrations from live production agent execution.",
      "Defers persistent memory, shared capabilities, and Workers until justified.",
    ],
  },
];

export function getPortfolioProject(slug: string) {
  return portfolioProjects.find((project) => project.slug === slug);
}
