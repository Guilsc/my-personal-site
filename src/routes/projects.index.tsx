import { PortfolioHeader } from "../components/portfolio-header";
import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Github, Rocket, Star } from "lucide-react";

import { portfolioProjects } from "../content/projects";
import { getLocalizedProjectContent } from "../content/project-content";
import { getGitHubProjects } from "../lib/github.functions";
import { useLanguage } from "../lib/i18n";

export const Route = createFileRoute("/projects/")({
  loader: () => getGitHubProjects(),
  head: () => ({
    meta: [
      { title: "Projects — Guilherme da Silva Costa" },
      {
        name: "description",
        content:
          "Selected projects by Guilherme da Silva Costa across Business Analysis, applied AI, and agent systems.",
      },
    ],
  }),
  component: ProjectsPage,
});

type ProjectFilter = "all" | "repositories" | "launch" | "forks" | "starred";

function slugify(name: string) {
  return name.toLowerCase().replace(/[_\s]+/g, "-");
}

function ProjectsPage() {
  const repositories = Route.useLoaderData();
  const { language, t } = useLanguage();
  const [filter, setFilter] = useState<ProjectFilter>("all");

  const enriched = repositories.map((repository) => {
    const slug = slugify(repository.name);
    const curated = portfolioProjects.find(
      (project) => slugify(project.repository.split("/").pop() ?? "") === slug,
    );
    const localized = getLocalizedProjectContent(slug, language);
    return { repository, slug, curated, localized };
  });

  const counts = {
    all: enriched.length,
    repositories: enriched.filter(({ repository }) => !repository.fork).length,
    launch: enriched.filter(({ curated }) => Boolean(curated?.launchUrl)).length,
    forks: enriched.filter(({ repository }) => repository.fork).length,
    starred: enriched.filter(({ repository }) => repository.starred).length,
  };

  const visible = enriched.filter(({ repository, curated }) => {
    if (filter === "repositories") return !repository.fork;
    if (filter === "launch") return Boolean(curated?.launchUrl);
    if (filter === "forks") return repository.fork;
    if (filter === "starred") return repository.starred;
    return true;
  });

  const filters: { key: ProjectFilter; label: string; icon?: boolean }[] = [
    { key: "all", label: `/ ${t.filters.all}` },
    { key: "repositories", label: `/ ${t.filters.repositories}` },
    { key: "launch", label: `/ ${t.filters.launch}` },
    { key: "forks", label: language === "pt" ? "/ ADAPTAÇÕES" : "/ FORKS" },
    { key: "starred", label: t.filters.starred, icon: true },
  ];

  return (
    <div className="portfolio-gallery min-h-screen bg-background text-foreground">
      <PortfolioHeader />

      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24"
      >
        <h1 className="mt-5 max-w-4xl font-display text-5xl font-semibold leading-none md:text-7xl">
          {t.projectsTitle}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {t.projectsIntro}
        </p>

        <div className="mt-10 flex flex-wrap gap-2 border-y border-border py-3">
          {filters.map(({ key, label, icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              aria-pressed={filter === key}
              className={`inline-flex items-center gap-2 min-h-11 px-3 py-2 font-body text-xs tracking-wider transition-colors ${filter === key ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-card hover:text-primary"}`}
            >
              {icon && <Star className="size-3" fill={filter === key ? "currentColor" : "none"} />}
              {label}
              <span className="opacity-60">{String(counts[key]).padStart(2, "0")}</span>
            </button>
          ))}
        </div>

        <div className="divide-y divide-border border-b border-border">
          {visible.map(({ repository, slug, curated, localized }) => (
            <article
              key={repository.id}
              className="group grid gap-5 py-8 md:grid-cols-12 md:items-center md:py-10"
            >
              <div className="md:col-span-4">
                <div className="mt-2 flex items-center gap-2 font-body text-xs tracking-wider text-primary">
                  <span>
                    {curated?.status ??
                      (language === "pt" ? "REPOSITÓRIO PÚBLICO" : "PUBLIC REPOSITORY")}
                  </span>
                  {repository.starred && (
                    <Star className="size-3" fill="currentColor" aria-label="Starred on GitHub" />
                  )}
                </div>
              </div>
              <Link to="/projects/$slug" params={{ slug }} className="md:col-span-6">
                <h2 className="font-display text-3xl font-semibold transition-colors group-hover:text-primary md:text-4xl">
                  {curated?.name ?? repository.name}
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                  {localized?.summary ??
                    curated?.summary ??
                    repository.description ??
                    (repository.fork
                      ? language === "pt"
                        ? "Um projeto que exploro, adapto ou uso como referência nos meus experimentos."
                        : "A project I am exploring, adapting, or using as a reference in my own experiments."
                      : language === "pt"
                        ? "Um sistema que construo, uso ou evoluo por meio de experimentação prática."
                        : "A system I am building, using, or evolving through hands-on experimentation.")}
                </p>
              </Link>
              <div className="flex items-center gap-2 md:col-span-2 md:justify-end">
                {curated?.launchUrl && (
                  <a
                    href={curated.launchUrl}
                    target={curated.launchUrl.startsWith("http") ? "_blank" : undefined}
                    rel={curated.launchUrl.startsWith("http") ? "noreferrer" : undefined}
                    className="inline-flex items-center gap-1 bg-primary min-h-11 px-3 py-2 font-body text-xs font-semibold tracking-wider text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    <Rocket className="size-3" />
                    {t.filters.launch}
                  </a>
                )}
                <Link
                  to="/projects/$slug"
                  params={{ slug }}
                  aria-label={
                    language === "pt"
                      ? `Ver projeto ${repository.name}`
                      : `View ${repository.name} project`
                  }
                  className="inline-flex size-11 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </article>
          ))}
          {visible.length === 0 && (
            <div role="status" className="py-12">
              <p>{t.noProjects}</p>
              <button
                type="button"
                onClick={() => setFilter("all")}
                className="gallery-text-link mt-4"
              >
                {language === "pt" ? "Ver todos os projetos" : "Show all projects"}
              </button>
            </div>
          )}
        </div>

        <a
          href="https://github.com/Guilsc"
          target="_blank"
          rel="noreferrer"
          className="mt-10 inline-flex items-center gap-2 border border-border bg-card px-5 py-3 font-body text-xs tracking-wider text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <Github className="size-4" /> {t.allRepos} <ArrowUpRight className="size-3" />
        </a>
      </main>
    </div>
  );
}
