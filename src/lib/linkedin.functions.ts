import { createServerFn } from "@tanstack/react-start";

const SOCIABLEKIT_LINKEDIN_FEED_URL =
  "https://data.accentapi.com/feed/25716546.json";

const LINKEDIN_ACTIVITY_URL =
  "https://www.linkedin.com/in/guilherme-da-silva-costa/recent-activity/all/";

export type LinkedInPost = {
  category: string;
  title: string;
  summary: string;
  url: string;
};

type UnknownRecord = Record<string, unknown>;

export const getLinkedInPosts = createServerFn({ method: "GET" }).handler(
  async (): Promise<LinkedInPost[]> => {
    try {
      const response = await fetch(SOCIABLEKIT_LINKEDIN_FEED_URL, {
        headers: {
          Accept: "application/json",
          "User-Agent": "guilherme-costa-portfolio",
        },
      });

      if (!response.ok) {
        console.error(
          `SociableKIT request failed [${response.status}]: ${await response.text()}`,
        );
        return [];
      }

      const feed = (await response.json()) as unknown;
      if (!isRecord(feed) || !Array.isArray(feed.posts)) return [];

      return feed.posts
        .map(normalizePost)
        .filter((post): post is LinkedInPost => post !== null)
        .slice(0, 3);
    } catch (error) {
      console.error("SociableKIT request error:", error);
      return [];
    }
  },
);

function normalizePost(value: unknown): LinkedInPost | null {
  if (!isRecord(value)) return null;

  const rawText = firstString(value, [
    "text",
    "post_text",
    "content",
    "description",
    "message",
    "caption",
  ]);

  if (!rawText) return null;

  const normalizedText = collapseWhitespace(rawText);
  if (!normalizedText) return null;

  const url =
    firstString(value, [
      "permalink",
      "post_url",
      "url",
      "link",
      "linkedin_url",
    ]) ?? LINKEDIN_ACTIVITY_URL;

  const title = makeTitle(normalizedText);
  const summary = makeSummary(normalizedText, title);

  return {
    category: "LATEST FROM LINKEDIN",
    title,
    summary,
    url,
  };
}

function makeTitle(text: string): string {
  const firstLine = text.split(/\n+/)[0]?.trim() || text;
  const firstSentence = firstLine.match(/^(.{20,120}?[.!?])(?:\s|$)/)?.[1];
  const candidate = firstSentence ?? firstLine;

  if (candidate.length <= 105) return candidate;
  return `${candidate.slice(0, 102).trimEnd()}…`;
}

function makeSummary(text: string, title: string): string {
  let remaining = text;
  if (remaining.startsWith(title.replace(/…$/, ""))) {
    remaining = remaining.slice(title.replace(/…$/, "").length).trim();
  }

  const summary = remaining || text;
  if (summary.length <= 240) return summary;
  return `${summary.slice(0, 237).trimEnd()}…`;
}

function firstString(record: UnknownRecord, keys: string[]): string | undefined {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }

  return undefined;
}

function collapseWhitespace(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
