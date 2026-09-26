import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const LINKEDIN_POSTS_PAGE_SIZE = 50;
const PUBLICATIONS_API_TIMEOUT_MS = 3_000;

export type LinkedInPost = {
  category: string;
  title: string;
  summary: string;
  url: string;
  publishedAt: string;
};

const PublicPublicationSchema = z.object({
  id: z.string().trim().min(1),
  channel: z.literal("linkedin"),
  title: z.string().trim().min(1),
  summary: z.string().trim().min(1),
  category: z.string().trim().nullable().optional(),
  url: z.string().trim().url(),
  publishedAt: z
    .string()
    .trim()
    .refine((value) => !Number.isNaN(Date.parse(value)), {
      message: "Expected a valid publication timestamp",
    }),
});

const PublicPublicationsResponseSchema = z.object({
  version: z.literal("1"),
  publications: z.array(PublicPublicationSchema),
});

export const getLinkedInPosts = createServerFn({ method: "GET" }).handler(
  async (): Promise<LinkedInPost[]> => {
    const endpoint = process.env["BA_CONTENT_PUBLICATIONS_URL"]?.trim();

    if (!endpoint) {
      return [];
    }

    try {
      const url = new URL(endpoint);
      url.searchParams.set("channel", "linkedin");
      url.searchParams.set("status", "Published");
      url.searchParams.set("portfolio", "true");
      url.searchParams.set("active", "true");
      url.searchParams.set("limit", String(LINKEDIN_POSTS_PAGE_SIZE));

      const response = await fetch(url, {
        headers: {
          Accept: "application/json",
          "User-Agent": "guilherme-costa-portfolio",
        },
        signal: AbortSignal.timeout(PUBLICATIONS_API_TIMEOUT_MS),
      });

      if (!response.ok) {
        const details = (await response.text()).slice(0, 500);
        console.error(
          `BA Content Engine publications API failed [${response.status}]: ${details}`,
        );
        return [];
      }

      const parsed = PublicPublicationsResponseSchema.safeParse(
        (await response.json()) as unknown,
      );

      if (!parsed.success) {
        console.error(
          "BA Content Engine publications API returned an invalid v1 response:",
          parsed.error.issues.slice(0, 3),
        );
        return [];
      }

      return parsed.data.publications.map((publication) => ({
          category:
            publication.category?.trim() || "LATEST FROM LINKEDIN",
          title: publication.title,
          summary: publication.summary,
          url: publication.url,
          publishedAt: publication.publishedAt,
        }));
    } catch (error) {
      console.error("BA Content Engine publications API request error:", error);
      return [];
    }
  },
);
