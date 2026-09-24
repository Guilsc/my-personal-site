import { createServerFn } from "@tanstack/react-start";

export type LinkedInPost = {
  category: string;
  title: string;
  summary: string;
  url: string;
};

type PortfolioContentItem = {
  category: string | null;
  title: string;
  summary: string | null;
  body: string;
  external_url: string | null;
  published_at: string | null;
};

export const getLinkedInPosts = createServerFn({ method: "GET" }).handler(
  async (): Promise<LinkedInPost[]> => {
    const supabaseUrl = process.env.SUPABASE_URL?.trim();
    const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY?.trim();

    if (!supabaseUrl || !publishableKey) {
      console.warn("Supabase portfolio feed is not configured.");
      return [];
    }

    const query = new URLSearchParams({
      select:
        "category,title,summary,body,external_url,published_at",
      status: "eq.Published",
      show_on_portfolio: "eq.true",
      channel: "eq.linkedin",
      order: "published_at.desc",
      limit: "3",
    });

    try {
      const response = await fetch(
        `${supabaseUrl.replace(/\/$/, "")}/rest/v1/content_items?${query.toString()}`,
        {
          headers: {
            Accept: "application/json",
            apikey: publishableKey,
            Authorization: `Bearer ${publishableKey}`,
            "User-Agent": "guilherme-costa-portfolio",
          },
        },
      );

      if (!response.ok) {
        console.error(
          `Supabase portfolio feed failed [${response.status}]: ${await response.text()}`,
        );
        return [];
      }

      const items = (await response.json()) as PortfolioContentItem[];

      return items.map((item) => ({
        category: item.category?.trim() || "LATEST FROM LINKEDIN",
        title: item.title.trim(),
        summary: item.summary?.trim() || makeSummary(item.body),
        url:
          item.external_url?.trim() ||
          "https://www.linkedin.com/in/guilherme-da-silva-costa/recent-activity/all/",
      }));
    } catch (error) {
      console.error("Supabase portfolio feed request error:", error);
      return [];
    }
  },
);

function makeSummary(body: string): string {
  const normalized = body.replace(/\s+/g, " ").trim();

  if (normalized.length <= 240) return normalized;
  return `${normalized.slice(0, 237).trimEnd()}…`;
}
