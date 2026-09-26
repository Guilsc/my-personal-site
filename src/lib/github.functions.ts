import { createServerFn } from "@tanstack/react-start";

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

const headers = {
  Accept: "application/vnd.github+json",
  "User-Agent": "guilherme-costa-portfolio",
};

async function fetchGitHubProjects(): Promise<GitHubRepository[]> {
  try {
    const [response, starredResponse] = await Promise.all([
      fetch("https://api.github.com/users/Guilsc/repos?sort=updated&per_page=100", { headers }),
      fetch("https://api.github.com/users/Guilsc/starred?per_page=100", { headers }),
    ]);

    if (!response.ok) {
      console.error(`GitHub request failed [${response.status}]`);
      return [];
    }

    const repositories = (await response.json()) as GitHubRepositoryResponse[];
    const starredRepositories = starredResponse.ok
      ? ((await starredResponse.json()) as GitHubRepositoryResponse[])
      : [];

    const starredNames = new Set(
      starredRepositories
        .filter((repository) => repository.html_url.toLowerCase().includes("github.com/guilsc/"))
        .map((repository) => repository.name.toLowerCase()),
    );

    return repositories
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
  } catch (error) {
    console.error("GitHub request error:", error);
    return [];
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
