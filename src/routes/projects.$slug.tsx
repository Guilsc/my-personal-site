import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Github, Lightbulb, Rocket, Tags } from "lucide-react";

import { getPortfolioProject } from "../content/projects";
import { getGitHubProject } from "../lib/github.functions";
import { LanguageSwitcher, useLanguage } from "../lib/i18n";

export const Route = createFileRoute("/projects/$slug")({
  loader: async ({ params }) => {
    const curated = getPortfolioProject(params.slug);
    const repository = await getGitHubProject({ data: params.slug });
    if (!repository && !curated) throw notFound();

    return {
      slug: params.slug,
      name: curated?.name ?? repository!.name,
      eyebrow: curated?.eyebrow ?? (repository?.fork ? "FORKED REPOSITORY" : "PUBLIC REPOSITORY"),
      summary: curated?.summary ?? repository?.description ?? "A public repository for experiments, learning, and building solutions.",
      description: curated?.description ?? repository?.description ?? "This project is published from GitHub and uses the portfolio's standard project template. More editorial context can be added as the project evolves.",
      repository: curated?.repository ?? repository!.htmlUrl,
      launchUrl: curated?.launchUrl,
      status: curated?.status ?? "ACTIVE",
      tags: curated?.tags ?? [repository?.language ?? "GITHUB", repository?.fork ? "FORK" : "ORIGINAL"],
      takeaways: curated?.takeaways ?? [
        repository?.description ?? "A public project in Guilherme's active portfolio.",
        repository?.language ? `Built primarily with ${repository.language}.` : "Implementation details are available in the source repository.",
        "This page is generated automatically from the public GitHub repository and can be enriched with curated project metadata later.",
      ],
    };
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
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <Link to="/projects" className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest text-muted-foreground transition-colors hover:text-primary">
            <ArrowLeft className="size-3" /> {t.backProjects}
          </Link>
          <div className="flex items-center gap-3"><span className="hidden font-mono text-[10px] tracking-[0.3em] text-muted-foreground sm:inline">GSC<span className="text-primary">/</span>{project.slug.toUpperCase()}</span><LanguageSwitcher language={language} onChange={setLanguage} /></div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">{project.eyebrow}</p>
            <h1 className="mt-6 font-display text-5xl font-semibold leading-[0.95] md:text-7xl">{project.name}</h1>
            <p className="mt-7 max-w-3xl font-display text-xl font-medium leading-tight text-accent-foreground md:text-2xl">{project.summary}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {project.launchUrl && (
                <a href={project.launchUrl} target={project.launchUrl.startsWith("http") ? "_blank" : undefined} rel={project.launchUrl.startsWith("http") ? "noreferrer" : undefined} className="inline-flex items-center gap-2 bg-primary px-5 py-3 font-mono text-[10px] font-semibold tracking-wider text-primary-foreground transition-opacity hover:opacity-90">
                  <Rocket className="size-4" /> LAUNCH <ArrowUpRight className="size-3" />
                </a>
              )}
              <a href={project.repository} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-border bg-card px-5 py-3 font-mono text-[10px] tracking-wider text-muted-foreground transition-colors hover:border-primary hover:text-primary">
                <Github className="size-4" /> {t.source} <ArrowUpRight className="size-3" />
              </a>
            </div>
          </div>

          <aside className="md:col-span-4">
            <div className="border border-border bg-card p-6">
              <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">{t.status}</p>
              <p className="mt-2 font-mono text-xs text-primary">{project.status}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="border border-border px-2.5 py-2 font-mono text-[9px] tracking-wider text-muted-foreground">{tag}</span>
                ))}
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-16 grid gap-4 border-t border-border pt-8 md:grid-cols-12">
          <section className="border border-border bg-card p-6 md:col-span-7">
            <div className="flex items-center gap-2 text-primary"><Lightbulb className="size-4" /><p className="font-mono text-[10px] tracking-widest">{t.takeaways}</p></div>
            <ul className="mt-6 space-y-4">
              {project.takeaways.map((takeaway) => (
                <li key={takeaway} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />{takeaway}
                </li>
              ))}
            </ul>
          </section>

          <section className="border border-border bg-card p-6 md:col-span-5">
            <div className="flex items-center gap-2 text-primary"><Tags className="size-4" /><p className="font-mono text-[10px] tracking-widest">{t.lens}</p></div>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
            <p className="mt-7 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">{t.capabilities}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tags.map((tag) => <span key={tag} className="bg-secondary px-2.5 py-2 font-mono text-[9px] tracking-wider text-secondary-foreground">{tag}</span>)}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
