import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";

import { portfolioProjects } from "../content/projects";

export const Route = createFileRoute("/projects/")({
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

function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <Link to="/" className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest text-muted-foreground transition-colors hover:text-primary">
            <ArrowLeft className="size-3" /> HOME
          </Link>
          <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">
            GSC<span className="text-primary">/</span>PROJECTS
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">(05) PROJECTS</p>
        <h1 className="mt-5 max-w-4xl font-display text-5xl font-semibold leading-none md:text-7xl">
          Systems I&apos;m building.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Selected work gets a home here. Each project stays in its own repository while this site provides the public front door.
        </p>

        <div className="mt-14 divide-y divide-border border-y border-border">
          {portfolioProjects.map((project, index) => (
            <Link
              key={project.slug}
              to="/projects/$slug"
              params={{ slug: project.slug }}
              className="group grid gap-5 py-8 md:grid-cols-12 md:items-center md:py-10"
            >
              <span className="font-mono text-[10px] text-primary md:col-span-1">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="md:col-span-3">
                <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">{project.eyebrow}</p>
                <p className="mt-2 font-mono text-[9px] tracking-wider text-primary">{project.status}</p>
              </div>
              <div className="md:col-span-7">
                <h2 className="font-display text-3xl font-semibold transition-colors group-hover:text-primary md:text-4xl">{project.name}</h2>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">{project.summary}</p>
              </div>
              <ArrowUpRight className="size-5 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
            </Link>
          ))}
        </div>

        <a href="https://github.com/Guilsc" target="_blank" rel="noreferrer" className="mt-10 inline-flex items-center gap-2 border border-border bg-card px-5 py-3 font-mono text-[10px] tracking-wider text-muted-foreground transition-colors hover:border-primary hover:text-primary">
          <Github className="size-4" /> ALL PUBLIC REPOSITORIES <ArrowUpRight className="size-3" />
        </a>
      </main>
    </div>
  );
}
