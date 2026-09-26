import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Github, Rocket } from "lucide-react";

import { portfolioProjects } from "../content/projects";
import { getGitHubProjects } from "../lib/github.functions";

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

function slugify(name: string) {
  return name.toLowerCase().replace(/[_\s]+/g, "-");
}

function ProjectsPage() {
  const repositories = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <Link to="/" className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest text-muted-foreground transition-colors hover:text-primary"><ArrowLeft className="size-3" /> HOME</Link>
          <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">GSC<span className="text-primary">/</span>PROJECTS</span>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">(05) PROJECTS</p>
        <h1 className="mt-5 max-w-4xl font-display text-5xl font-semibold leading-none md:text-7xl">Systems I&apos;m building.</h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">Public repositories become project pages automatically. Curated projects add richer context and launch actions without changing the catalog flow.</p>

        <div className="mt-14 divide-y divide-border border-y border-border">
          {repositories.map((repository, index) => {
            const slug = slugify(repository.name);
            const curated = portfolioProjects.find((project) => slugify(project.repository.split("/").pop() ?? "") === slug);
            return (
              <article key={repository.id} className="group grid gap-5 py-8 md:grid-cols-12 md:items-center md:py-10">
                <span className="font-mono text-[10px] text-primary md:col-span-1">{String(index + 1).padStart(2, "0")}</span>
                <div className="md:col-span-3">
                  <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">{curated?.eyebrow ?? (repository.fork ? "FORKED REPOSITORY" : "PUBLIC REPOSITORY")}</p>
                  <p className="mt-2 font-mono text-[9px] tracking-wider text-primary">{curated?.status ?? "ACTIVE"}</p>
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
            );
          })}
        </div>

        <a href="https://github.com/Guilsc" target="_blank" rel="noreferrer" className="mt-10 inline-flex items-center gap-2 border border-border bg-card px-5 py-3 font-mono text-[10px] tracking-wider text-muted-foreground transition-colors hover:border-primary hover:text-primary"><Github className="size-4" /> ALL PUBLIC REPOSITORIES <ArrowUpRight className="size-3" /></a>
      </main>
    </div>
  );
}
