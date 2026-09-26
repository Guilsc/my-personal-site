import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Github, Rocket, Star } from "lucide-react";

import { portfolioProjects } from "../content/projects";
import { getGitHubProjects } from "../lib/github.functions";
import { LanguageSwitcher, useLanguage } from "../lib/i18n";

export const Route = createFileRoute("/projects/")({
  loader: () => getGitHubProjects(),
  head: () => ({
    meta: [
      { title: "Projects — Guilherme da Silva Costa" },
      { name: "description", content: "Selected projects by Guilherme da Silva Costa across Business Analysis, applied AI, and agent systems." },
    ],
  }),
  component: ProjectsPage,
});

type ProjectFilter = "all" | "repositories" | "launch" | "starred";

function slugify(name: string) {
  return name.toLowerCase().replace(/[_\s]+/g, "-");
}

function ProjectsPage() {
  const repositories = Route.useLoaderData();
  const { language, setLanguage, t } = useLanguage();
  const [filter, setFilter] = useState<ProjectFilter>("all");

  const enriched = repositories.map((repository) => {
    const slug = slugify(repository.name);
    const curated = portfolioProjects.find((project) => slugify(project.repository.split("/").pop() ?? "") === slug);
    return { repository, slug, curated };
  });

  const counts = {
    all: enriched.length,
    repositories: enriched.length,
    launch: enriched.filter(({ curated }) => Boolean(curated?.launchUrl)).length,
    starred: enriched.filter(({ repository }) => repository.starred).length,
  };

  const visible = enriched.filter(({ repository, curated }) => {
    if (filter === "launch") return Boolean(curated?.launchUrl);
    if (filter === "starred") return repository.starred;
    return true;
  });

  const filters: { key: ProjectFilter; label: string; icon?: boolean }[] = [
    { key: "all", label: `/ ${t.filters.all}` },
    { key: "repositories", label: `/ ${t.filters.repositories}` },
    { key: "launch", label: `/ ${t.filters.launch}` },
    { key: "starred", label: t.filters.starred, icon: true },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <Link to="/" className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest text-muted-foreground transition-colors hover:text-primary"><ArrowLeft className="size-3" /> HOME</Link>
          <div className="flex items-center gap-3"><span className="hidden font-mono text-[10px] tracking-[0.3em] text-muted-foreground sm:inline">GSC<span className="text-primary">/</span>PROJECTS</span><LanguageSwitcher language={language} onChange={setLanguage} /></div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">(05) PROJECTS</p>
        <h1 className="mt-5 max-w-4xl font-display text-5xl font-semibold leading-none md:text-7xl">{t.projectsTitle}</h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">{t.projectsIntro}</p>

        <div className="mt-10 flex flex-wrap gap-2 border-y border-border py-3">
          {filters.map(({ key, label, icon }) => (
            <button key={key} type="button" onClick={() => setFilter(key)} aria-pressed={filter === key} className={`inline-flex items-center gap-2 px-3 py-2 font-mono text-[9px] tracking-wider transition-colors ${filter === key ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-card hover:text-primary"}`}>
              {icon && <Star className="size-3" fill={filter === key ? "currentColor" : "none"} />}
              {label}
              <span className="opacity-60">{String(counts[key]).padStart(2, "0")}</span>
            </button>
          ))}
        </div>

        <div className="divide-y divide-border border-b border-border">
          {visible.map(({ repository, slug, curated }, index) => (
            <article key={repository.id} className="group grid gap-5 py-8 md:grid-cols-12 md:items-center md:py-10">
              <span className="font-mono text-[10px] text-primary md:col-span-1">{String(index + 1).padStart(2, "0")}</span>
              <div className="md:col-span-3">
                <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">{curated?.eyebrow ?? (repository.fork ? "FORKED REPOSITORY" : "PUBLIC REPOSITORY")}</p>
                <div className="mt-2 flex items-center gap-2 font-mono text-[9px] tracking-wider text-primary">
                  <span>{curated?.status ?? "ACTIVE"}</span>
                  {repository.starred && <Star className="size-3" fill="currentColor" aria-label="Starred on GitHub" />}
                </div>
              </div>
              <Link to="/projects/$slug" params={{ slug }} className="md:col-span-6">
                <h2 className="font-display text-3xl font-semibold transition-colors group-hover:text-primary md:text-4xl">{curated?.name ?? repository.name}</h2>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">{curated?.summary ?? repository.description ?? "A public repository for experiments, learning, and building solutions."}</p>
              </Link>
              <div className="flex items-center gap-2 md:col-span-2 md:justify-end">
                {curated?.launchUrl && <a href={curated.launchUrl} target={curated.launchUrl.startsWith("http") ? "_blank" : undefined} rel={curated.launchUrl.startsWith("http") ? "noreferrer" : undefined} className="inline-flex items-center gap-1 bg-primary px-3 py-2 font-mono text-[9px] font-semibold tracking-wider text-primary-foreground transition-opacity hover:opacity-90"><Rocket className="size-3" /> LAUNCH</a>}
                <Link to="/projects/$slug" params={{ slug }} aria-label={`View ${repository.name} project`} className="inline-flex size-9 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"><ArrowUpRight className="size-4" /></Link>
              </div>
            </article>
          ))}
          {visible.length === 0 && <p className="py-12 font-mono text-xs tracking-wider text-muted-foreground">{t.noProjects}</p>}
        </div>

        <a href="https://github.com/Guilsc" target="_blank" rel="noreferrer" className="mt-10 inline-flex items-center gap-2 border border-border bg-card px-5 py-3 font-mono text-[10px] tracking-wider text-muted-foreground transition-colors hover:border-primary hover:text-primary"><Github className="size-4" /> {t.allRepos} <ArrowUpRight className="size-3" /></a>
      </main>
    </div>
  );
}
