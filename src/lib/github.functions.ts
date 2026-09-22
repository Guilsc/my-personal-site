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

export const getGitHubProjects = createServerFn({ method: "GET" }).handler(
  async (): Promise<GitHubRepository[]> => {
    const response = await fetch(
      "https://api.github.com/users/Guilsc/repos?sort=updated&per_page=12",
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "guilherme-costa-portfolio",
        },
      },
    );

    if (!response.ok) {
      const details = await response.text();
      console.error(`GitHub request failed [${response.status}]: ${details}`);
      return [];
    }

    const repositories = (await response.json()) as GitHubRepositoryResponse[];

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
      }))
      .sort((a, b) => Number(a.fork) - Number(b.fork));
  },
);