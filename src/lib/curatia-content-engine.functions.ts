import { createServerFn } from "@tanstack/react-start";

export type BASignal = {
  id: string;
  title: string;
  summary: string | null;
  state: "New" | "Watch" | "Explore" | "Promoted" | "Ignored" | "Archived";
  detected_at: string;
  first_published_at: string | null;
  why_it_may_matter: string | null;
  evidence_strength: string | null;
  saturation: string | null;
};

function config() {
  const url = process.env["SUPABASE_URL"]?.replace(/\/$/, "");
  const key = process.env["SUPABASE_SECRET_KEY"];
  if (!url || !key) throw new Error("BA Content Engine is not configured.");
  return { url, key };
}

export const getBASignals = createServerFn({ method: "GET" }).handler(async (): Promise<BASignal[]> => {
  const { url, key } = config();
  const endpoint = new URL(url + "/rest/v1/signals");
  endpoint.searchParams.set("select", "id,title,summary,state,detected_at,first_published_at,why_it_may_matter,evidence_strength,saturation");
  endpoint.searchParams.set("state", "in.(New,Watch,Explore)");
  endpoint.searchParams.set("order", "detected_at.desc");
  const response = await fetch(endpoint, { headers: { apikey: key, Authorization: `Bearer ${key}` } });
  if (!response.ok) throw new Error("Unable to load Trend Radar.");
  return response.json();
});
