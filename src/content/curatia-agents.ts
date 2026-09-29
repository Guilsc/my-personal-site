import type { CuratiaToolDefinition } from "./curatia-tools";
import { curatiaToolRegistry } from "./curatia-tools";

export type CuratiaAgentStatus = "active" | "ready" | "planned";
export type CuratiaAgentDefinition = {
  id: string;
  name: string;
  purpose: string;
  status: CuratiaAgentStatus;
  toolIds: string[];
  humanGate?: string;
};

export const curatiaAgentRegistry: CuratiaAgentDefinition[] = [
  { id:"trend-scout", name:"Trend Scout", purpose:"Discover, deduplicate and register evidence-backed signals.", status:"active", toolIds:["web-search","supabase"], humanGate:"Never promotes a signal to Idea automatically." },
  { id:"trend-evaluator", name:"Trend Evaluator", purpose:"Evaluate editorial relevance, saturation, evidence and second-order implications.", status:"ready", toolIds:["web-search","supabase"], humanGate:"Recommendations do not equal promotion." },
  { id:"editorial-researcher", name:"Editorial Researcher", purpose:"Build the evidence package behind a Candidate before drafting.", status:"ready", toolIds:["web-search","supabase","google-drive"], humanGate:"Unsupported claims remain visible as gaps." },
  { id:"content-writer", name:"Content Writer", purpose:"Turn approved research and thesis into channel-ready drafts.", status:"ready", toolIds:["supabase"], humanGate:"Draft never equals approval." },
  { id:"visual-director", name:"Visual Director", purpose:"Prepare visual direction and briefs for editorial content.", status:"ready", toolIds:["supabase"], humanGate:"Visual Ready never equals approval." },
  { id:"publishing-reviewer", name:"Publishing Reviewer", purpose:"Check approved content before scheduling or publishing.", status:"planned", toolIds:["supabase","metricool"], humanGate:"Publishing requires explicit user approval." },
  { id:"post-learning", name:"Post Learning", purpose:"Turn performance and qualitative feedback into governed learning candidates.", status:"planned", toolIds:["supabase","metricool"], humanGate:"Learnings cannot silently rewrite Skills." },
];

export function toolsForAgent(agent: CuratiaAgentDefinition): CuratiaToolDefinition[] {
  return agent.toolIds.map(id=>curatiaToolRegistry.find(t=>t.id===id)).filter((t):t is CuratiaToolDefinition=>Boolean(t));
}
