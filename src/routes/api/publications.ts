import { createFileRoute } from "@tanstack/react-router";
import { getLinkedInPosts } from "../../lib/linkedin.functions";

export const Route = createFileRoute("/api/publications")({
  server: {
    handlers: {
      GET: async () => Response.json({ items: await getLinkedInPosts(), live: true }),
    },
  },
});
