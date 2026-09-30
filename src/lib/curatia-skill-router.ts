export type CuratiaSkillId =
  | "discovery-research"
  | "editorial-writing"
  | "channel-format"
  | "visual-storytelling"
  | "governance-quality"
  | "product-engineering"
  | "skill-evolution";

export type CuratiaAgent =
  | "scout"
  | "signals"
  | "trend-radar"
  | "editorial-studio"
  | "visual"
  | "publishing"
  | "learning"
  | "platform";

export type CuratiaSkillRouteInput = {
  agent: CuratiaAgent;
  task: string;
  channel?: string | null;
  format?: string | null;
  operation?: string | null;
  artifactState?: "missing" | "existing" | "ready" | "approved" | null;
};

export type CuratiaSkillRoute = {
  skills: CuratiaSkillId[];
  reasons: string[];
  preserveExistingArtifactIntent: boolean;
  capabilityGap: string | null;
};

const add = (target: CuratiaSkillId[], skill: CuratiaSkillId) => {
  if (!target.includes(skill)) target.push(skill);
};

const includesAny = (value: string, terms: string[]) =>
  terms.some((term) => value.includes(term));

export function routeCuratiaSkills(input: CuratiaSkillRouteInput): CuratiaSkillRoute {
  const skills: CuratiaSkillId[] = [];
  const reasons: string[] = [];
  const text = [input.task, input.channel, input.format, input.operation]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (["scout", "signals", "trend-radar"].includes(input.agent) ||
      includesAny(text, ["research", "source", "evidence", "trend", "watch", "signal"])) {
    add(skills, "discovery-research");
    reasons.push("The task depends on discovery, evidence, signals, or editorial research.");
  }

  if (input.agent === "editorial-studio" ||
      includesAny(text, ["write", "draft", "rewrite", "tighten", "hook", "outline", "caption", "copy", "article", "newsletter"])) {
    add(skills, "editorial-writing");
    reasons.push("The task creates or transforms an editorial artifact.");
  }

  if (input.channel || input.format ||
      includesAny(text, ["linkedin", "instagram", "youtube", "tiktok", "carousel", "video", "reel", "post", "newsletter"])) {
    add(skills, "channel-format");
    reasons.push("Channel or format changes the artifact contract and generation behavior.");
  }

  if (input.agent === "visual" ||
      includesAny(text, ["visual", "image", "infographic", "diagram", "carousel", "design"])) {
    add(skills, "visual-storytelling");
    reasons.push("The task contains a visual or visual-storytelling artifact.");
  }

  if (["publishing", "learning"].includes(input.agent) ||
      includesAny(text, ["approve", "ready", "publish", "schedule", "quality", "citation", "measure", "analytics"])) {
    add(skills, "governance-quality");
    reasons.push("The task touches evidence, readiness, approval, publishing, or learning governance.");
  }

  if (input.agent === "platform" ||
      includesAny(text, ["debug", "test", "qa", "deploy", "integration", "frontend", "backend", "database", "github"])) {
    add(skills, "product-engineering");
    reasons.push("The task is a Curatia product/platform engineering operation.");
  }

  if (includesAny(text, ["skill", "capability gap", "agent definition", "persona"])) {
    add(skills, "skill-evolution");
    reasons.push("The task changes or discovers Curatia capabilities.");
  }

  if (!skills.length) {
    if (input.agent === "editorial-studio") add(skills, "editorial-writing");
    else if (input.agent === "scout") add(skills, "discovery-research");
  }

  return {
    skills,
    reasons,
    preserveExistingArtifactIntent: input.artifactState === "existing",
    capabilityGap: skills.length ? null : "No active Curatia skill pack matched this task.",
  };
}

export const CURATIA_SKILL_ROUTER_VERSION = "0.1.0";
