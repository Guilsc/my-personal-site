import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const LINKEDIN_POSTS_PAGE_SIZE = 50;
const PUBLICATIONS_API_TIMEOUT_MS = 3_000;
const SUPABASE_URL = "https://jzceajrfqtrdemptlfbp.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_tublhoJa1W1NDqxzwCds4A_jRXJHM3r";

export type LinkedInPost = {
  category: string;
  title: string;
  summary: string;
  url: string;
  publishedAt: string;
};

const SupabasePublicationSchema = z.object({
  public_id: z.string().trim().min(1),
  channel: z.literal("linkedin"),
  title: z.string().trim().min(1),
  summary: z.string().trim().min(1),
  category: z.string().trim().nullable().optional(),
  url: z.string().trim().url(),
  published_at: z.string().trim(),
});

type PublicationRow = z.infer<typeof SupabasePublicationSchema>;

function toLinkedInPost(publication: PublicationRow): LinkedInPost {
  return {
    category: publication.category?.trim() || "LATEST FROM LINKEDIN",
    title: publication.title,
    summary: publication.summary,
    url: publication.url,
    publishedAt: publication.published_at,
  };
}

async function getPostsFromSupabase(): Promise<LinkedInPost[]> {
  try {
    const url = new URL("/rest/v1/portfolio_publications", SUPABASE_URL);
    url.searchParams.set("select", "public_id,channel,title,summary,category,url,published_at");
    url.searchParams.set("channel", "eq.linkedin");
    url.searchParams.set("portfolio", "eq.true");
    url.searchParams.set("order", "published_at.desc");
    url.searchParams.set("limit", String(LINKEDIN_POSTS_PAGE_SIZE));

    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        apikey: SUPABASE_PUBLISHABLE_KEY,
      },
      signal: AbortSignal.timeout(PUBLICATIONS_API_TIMEOUT_MS),
    });
    if (!response.ok) {
      console.error(`Supabase portfolio publications failed [${response.status}]`);
      return [];
    }

    const parsed = z.array(SupabasePublicationSchema).safeParse(await response.json());
    if (!parsed.success) {
      console.error("Supabase portfolio publications returned an invalid response");
      return [];
    }
    return parsed.data.map(toLinkedInPost);
  } catch (error) {
    console.error("Supabase portfolio publications request error:", error);
    return [];
  }
}

export const getLinkedInPosts = createServerFn({ method: "GET" }).handler(
  async (): Promise<LinkedInPost[]> => getPostsFromSupabase(),
);
