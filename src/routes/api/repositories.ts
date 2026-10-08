import { createFileRoute } from "@tanstack/react-router";
import { getGitHubProjects } from "../../lib/github.functions";

export const Route = createFileRoute("/api/repositories")({
  server: {
    handlers: {
      GET: async () => Response.json({ items: await getGitHubProjects(), live: true }),
    },
  },
});
