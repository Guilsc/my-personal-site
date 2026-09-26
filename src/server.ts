import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";


const GITHUB_OWNER = "Guilsc";
const AGENT_MARKERS = new Set(["AGENTS.md", ".claude", ".hermes", ".agents", ".codex"]);

type PublicRepo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  updated_at: string;
  fork: boolean;
};

const githubHeaders = () => {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "guilherme-costa-bot-ecosystem",
  };
  const token = process.env["GITHUB_TOKEN"];
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
};

async function githubJson<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url, { headers: githubHeaders() });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

async function publicEcosystemThreads() {
  const repos =
    (await githubJson<PublicRepo[]>(
      `https://api.github.com/users/${GITHUB_OWNER}/repos?sort=updated&per_page=30`,
    )) ?? [];

  const inspected = await Promise.all(
    repos.filter((repo) => !repo.fork).map(async (repo) => {
      const root = await githubJson<Array<{ name: string }>>(
        `https://api.github.com/repos/${GITHUB_OWNER}/${encodeURIComponent(repo.name)}/contents`,
      );
      if (!root?.some((entry) => AGENT_MARKERS.has(entry.name))) return null;
      const activity = Date.parse(repo.updated_at) || Date.now();
      return {
        id: `github:${repo.id}`,
        pilot: "github",
        title: repo.description || repo.name,
        preview: repo.description || `Agent-enabled repository: ${repo.name}`,
        project: repo.name,
        projectPath: repo.html_url,
        worktree: "",
        cwd: "",
        gitBranch: "main",
        model: "",
        effort: "",
        createdAt: activity,
        lastActivityAt: activity,
        lastFocusedAt: 0,
        running: false,
        unread: false,
        hasError: false,
        archived: false,
        sizeBytes: 0,
        source: "github",
        canOpen: false,
        ref: { repository: repo.html_url },
      };
    }),
  );

  return inspected.filter(Boolean);
}

function ecosystemJson(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

async function handlePublicEcosystemApi(request: Request): Promise<Response | null> {
  const url = new URL(request.url);
  if (!url.pathname.startsWith("/ecosystem/api/")) return null;

  if (url.pathname === "/ecosystem/api/threads" && request.method === "GET") {
    return ecosystemJson({
      threads: await publicEcosystemThreads(),
      scannedAt: Date.now(),
      warnings: [],
    });
  }

  if (url.pathname === "/ecosystem/api/harnesses" && request.method === "GET") {
    return ecosystemJson({
      harnesses: [{ id: "github", name: "GitHub", detected: true, error: "" }],
    });
  }

  if (url.pathname === "/ecosystem/api/state" && request.method === "GET") {
    return ecosystemJson({
      version: 2,
      archived: [],
      archivedAt: {},
      opened: [],
      plots: {},
      seen: {},
      hiddenProjects: [],
      viewedAt: {},
      settings: null,
      updatedAt: 0,
    });
  }

  if (url.pathname === "/ecosystem/api/state" && request.method === "PUT") {
    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    return ecosystemJson({ ...body, version: 2, updatedAt: Date.now() });
  }

  if (
    ["/ecosystem/api/open", "/ecosystem/api/new-session", "/ecosystem/api/reveal"].includes(
      url.pathname,
    )
  ) {
    return ecosystemJson(
      { ok: false, error: "Desktop actions are available only in the local Bot Ecosystem." },
      400,
    );
  }

  return ecosystemJson({ error: "Unknown endpoint" }, 404);
}

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const ecosystemResponse = await handlePublicEcosystemApi(request);
      if (ecosystemResponse) return ecosystemResponse;
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
