import { createServerFn } from "@tanstack/react-start";
import { portfolioProjects } from "../content/projects";

export type GitHubRepository = {
  id: number;
  name: string;
  description: string | null;
  htmlUrl: string;
  language: string | null;
  stars: number;
  fork: boolean;
  updatedAt: string;
  starred: boolean;
};

type GitHubRepositoryResponse = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
  updated_at: string;
};

const CACHE_TTL_MS = 15 * 60 * 1000;

// Repositories that are public on GitHub but intentionally excluded from the
// portfolio. Keep this list explicit so GitHub remains the source of truth for
// every other public repository.
const PORTFOLIO_EXCLUDED_REPOSITORIES = new Set(["my-personal-site"]);

let repositoryCache: { value: GitHubRepository[]; expiresAt: number } | null = null;

function githubHeaders() {
  const token = process.env.GITHUB_TOKEN?.trim();
  return {
    Accept: "application/vnd.github+json",
    "User-Agent": "guilherme-costa-portfolio",
    "X-GitHub-Api-Version": "2022-11-28",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

function fallbackProjects(): GitHubRepository[] {
  return portfolioProjects
    .filter((project) => !PORTFOLIO_EXCLUDED_REPOSITORIES.has(project.slug.toLowerCase()))
    .map((project, index) => ({
      id: -(index + 1),
      name: project.slug,
      description: project.summary,
      htmlUrl: project.repository,
      language: null,
      stars: 0,
      fork: false,
      updatedAt: "",
      starred: false,
    }));
}

function cachedOrFallback(): GitHubRepository[] {
  return repositoryCache?.value?.length ? repositoryCache.value : fallbackProjects();
}

async function fetchGitHubProjects(): Promise<GitHubRepository[]> {
  if (repositoryCache && repositoryCache.expiresAt > Date.now() && repositoryCache.value.length) {
    return repositoryCache.value;
  }

  try {
    const headers = githubHeaders();
    const response = await fetch(
      "https://api.github.com/users/Guilsc/repos?type=owner&sort=updated&direction=desc&per_page=100",
      { headers },
    );

    if (!response.ok) {
      console.error(`GitHub repositories request failed [${response.status}]`);
      return cachedOrFallback();
    }

    const repositories = (await response.json()) as GitHubRepositoryResponse[];

    let starredNames = new Set<string>();
    try {
      const starredResponse = await fetch(
        "https://api.github.com/users/Guilsc/starred?per_page=100",
        { headers },
      );
      if (starredResponse.ok) {
        const starredRepositories = (await starredResponse.json()) as GitHubRepositoryResponse[];
        starredNames = new Set(
          starredRepositories
            .filter((repository) => repository.html_url.toLowerCase().includes("github.com/guilsc/"))
            .map((repository) => repository.name.toLowerCase()),
        );
      }
    } catch (error) {
      console.error("GitHub starred request error:", error);
    }

    const result = repositories
      .filter(
        (repository) =>
          !PORTFOLIO_EXCLUDED_REPOSITORIES.has(repository.name.toLowerCase()),
      )
      .map((repository) => ({
        id: repository.id,
        name: repository.name,
        description: repository.description,
        htmlUrl: repository.html_url,
        language: repository.language,
        stars: repository.stargazers_count,
        fork: repository.fork,
        updatedAt: repository.updated_at,
        starred: starredNames.has(repository.name.toLowerCase()),
      }))
      .sort((a, b) => Number(a.fork) - Number(b.fork));

    if (result.length === 0) {
      console.error("GitHub repositories request returned no portfolio repositories");
      return cachedOrFallback();
    }

    repositoryCache = { value: result, expiresAt: Date.now() + CACHE_TTL_MS };
    return result;
  } catch (error) {
    console.error("GitHub request error:", error);
    return cachedOrFallback();
  }
}

export const getGitHubProjects = createServerFn({ method: "GET" }).handler(
  async (): Promise<GitHubRepository[]> => fetchGitHubProjects(),
);

export const getGitHubProject = createServerFn({ method: "GET" })
  .inputValidator((slug: string) => slug)
  .handler(async ({ data }): Promise<GitHubRepository | null> => {
    const normalizedSlug = data.toLowerCase().replace(/[_\s]+/g, "-");
    const repositories = await fetchGitHubProjects();
    return repositories.find(
      (repository) => repository.name.toLowerCase().replace(/[_\s]+/g, "-") === normalizedSlug,
    ) ?? null;
  });
