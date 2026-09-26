import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";

import { getPortfolioProject } from "../content/projects";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getPortfolioProject(params.slug);
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} — Guilherme da Silva Costa` },
          { name: "description", content: loaderData.summary },
        ]
      : [],
  }),
  component: ProjectDetail,
});

function ProjectDetail() {
  const project = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <Link to="/projects" className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest text-muted-foreground transition-colors hover:text-primary">
            <ArrowLeft className="size-3" /> PROJECTS
          </Link>
          <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">
            GSC<span className="text-primary">/</span>{project.slug.toUpperCase()}
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">{project.eyebrow}</p>
            <h1 className="mt-6 font-display text-5xl font-semibold leading-[0.95] md:text-7xl">{project.name}</h1>
            <p className="mt-7 max-w-3xl font-display text-xl font-medium leading-tight text-accent-foreground md:text-2xl">{project.summary}</p>
            <div className="mt-10 h-px bg-border" />
            <p className="mt-10 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">{project.description}</p>
          </div>

          <aside className="md:col-span-4">
            <div className="border border-border bg-card p-6">
              <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">STATUS</p>
              <p className="mt-2 font-mono text-xs text-primary">{project.status}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="border border-border px-2.5 py-2 font-mono text-[9px] tracking-wider text-muted-foreground">{tag}</span>
                ))}
              </div>
              <a href={project.repository} target="_blank" rel="noreferrer" className="mt-8 inline-flex w-full items-center justify-between border border-border px-4 py-3 font-mono text-[10px] tracking-wider transition-colors hover:border-primary hover:text-primary">
                <span className="inline-flex items-center gap-2"><Github className="size-4" /> SOURCE REPOSITORY</span>
                <ArrowUpRight className="size-3" />
              </a>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
