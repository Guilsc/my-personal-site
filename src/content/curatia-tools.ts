export type CuratiaToolAuth = "service" | "user_oauth" | "user_session" | "none";
export type CuratiaToolInterface = "native" | "api" | "mcp";
export type CuratiaToolStatus = "available" | "connected" | "not_connected" | "planned";

export type CuratiaToolDefinition = {
  id: string;
  name: string;
  purpose: string;
  interface: CuratiaToolInterface;
  auth: CuratiaToolAuth;
  status: CuratiaToolStatus;
  capabilities: string[];
  agentAccess: string[];
};

export const curatiaToolRegistry: CuratiaToolDefinition[] = [
  {
    id: "web-search",
    name: "Web Search",
    purpose: "Discover and verify external editorial signals and evidence.",
    interface: "native",
    auth: "service",
    status: "available",
    capabilities: ["discover_signals", "research_sources", "verify_evidence"],
    agentAccess: ["Trend Scout", "Editorial Researcher"],
  },
  {
    id: "supabase",
    name: "Supabase",
    purpose: "Canonical Curatia state, identity, workspace data, evidence and lifecycle persistence.",
    interface: "api",
    auth: "service",
    status: "available",
    capabilities: ["read_workspace", "persist_signals", "persist_content", "persist_evidence"],
    agentAccess: ["Curatia Runtime"],
  },
  {
    id: "github",
    name: "GitHub",
    purpose: "Repository context and future agent/repository operations.",
    interface: "mcp",
    auth: "user_oauth",
    status: "planned",
    capabilities: ["search_code", "read_repository", "issues", "pull_requests"],
    agentAccess: [],
  },
  {
    id: "metricool",
    name: "Metricool",
    purpose: "Approved multi-channel scheduling and publishing.",
    interface: "api",
    auth: "user_oauth",
    status: "planned",
    capabilities: ["schedule_content", "publish_content", "read_performance"],
    agentAccess: ["Publishing Reviewer", "Publishing Worker"],
  },
  {
    id: "google-drive",
    name: "Google Drive",
    purpose: "User-authorized editorial source material and working documents.",
    interface: "mcp",
    auth: "user_oauth",
    status: "planned",
    capabilities: ["search_files", "read_document"],
    agentAccess: ["Editorial Researcher"],
  },
];

export function getCuratiaTool(id: string) {
  return curatiaToolRegistry.find((tool) => tool.id === id);
}
