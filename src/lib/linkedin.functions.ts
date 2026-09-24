import { createServerFn } from "@tanstack/react-start";

export type LinkedInPost = {
  category: string;
  title: string;
  summary: string;
  url: string;
};

type PublicPublication = {
  id: string;
  channel: string;
  title: string;
  summary: string;
  category?: string | null;
  url: string;
  publishedAt: string;
};

type PublicPublicationsResponse = {
  version: string;
  publications: PublicPublication[];
};

export const getLinkedInPosts = createServerFn({ method: "GET" }).handler(
  async (): Promise<LinkedInPost[]> => {
    const endpoint = process.env.BA_CONTENT_PUBLICATIONS_URL?.trim();

    if (!endpoint) {
      console.warn("BA Content Engine publications API is not configured.");
      return [];
    }

    try {
      const url = new URL(endpoint);
      url.searchParams.set("channel", "linkedin");
      url.searchParams.set("portfolio", "true");
      url.searchParams.set("limit", "3");

      const response = await fetch(url, {
        headers: {
          Accept: "application/json",
          "User-Agent": "guilherme-costa-portfolio",
        },
      });

      if (!response.ok) {
        console.error(
          `BA Content Engine publications API failed [${response.status}]: ${await response.text()}`,
        );
        return [];
      }

      const payload = (await response.json()) as unknown;
      const publications = parsePublications(payload);

      return publications.slice(0, 3).map((publication) => ({
        category:
          publication.category?.trim() || "LATEST FROM LINKEDIN",
        title: publication.title.trim(),
        summary: publication.summary.trim(),
        url: publication.url.trim(),
      }));
    } catch (error) {
      console.error("BA Content Engine publications API request error:", error);
      return [];
    }
  },
);

function parsePublications(value: unknown): PublicPublication[] {
  if (!isRecord(value)) return [];
  if (value.version !== "1") return [];
  if (!Array.isArray(value.publications)) return [];

  return value.publications.filter(isPublicPublication);
}

function isPublicPublication(value: unknown): value is PublicPublication {
  if (!isRecord(value)) return false;

  return (
    isNonEmptyString(value.id) &&
    value.channel === "linkedin" &&
    isNonEmptyString(value.title) &&
    isNonEmptyString(value.summary) &&
    (value.category === undefined ||
      value.category === null ||
      typeof value.category === "string") &&
    isNonEmptyString(value.url) &&
    isNonEmptyString(value.publishedAt)
  );
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
