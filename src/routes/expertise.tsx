import { PortfolioHeader } from "../components/portfolio-header";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, BriefcaseBusiness, FolderGit2, Linkedin } from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { expertiseEvidence, expertiseOrder, type ExpertiseId } from "../content/expertise";
import { portfolioProjects } from "../content/projects";
import { getLinkedInPosts } from "../lib/linkedin.functions";
import { useLanguage } from "../lib/i18n";

export const Route = createFileRoute("/expertise")({
  validateSearch: (search: Record<string, unknown>) => ({
    focus: expertiseOrder.includes(search["focus"] as ExpertiseId)
      ? (search["focus"] as ExpertiseId)
      : "business-analysis",
  }),
  loader: () => getLinkedInPosts(),
  head: () => ({
    meta: [
      { title: "Expertise — Guilherme da Silva Costa" },
      {
        name: "description",
        content:
          "Evidence-backed expertise across Business Analysis, Product Strategy, Systems & QA, and Applied AI.",
      },
    ],
  }),
  component: ExpertisePage,
});

function ExpertisePage() {
  const posts = Route.useLoaderData();
  const search = Route.useSearch();
  const { language, t } = useLanguage();
  const [focus, setFocus] = useState<ExpertiseId | null>(search.focus);
  useEffect(() => {
    setFocus(search.focus);
  }, [search.focus]);
  const publicationCount = posts.length;

  const metrics = useMemo(
    () => ({
      "business-analysis": [
        expertiseEvidence["business-analysis"].projectSlugs.length,
        publicationCount,
        expertiseEvidence["business-analysis"].career.length,
      ],
      "product-strategy": [
        expertiseEvidence["product-strategy"].projectSlugs.length,
        publicationCount,
        expertiseEvidence["product-strategy"].career.length,
      ],
      "systems-qa": [
        expertiseEvidence["systems-qa"].projectSlugs.length,
        0,
        expertiseEvidence["systems-qa"].career.length,
      ],
      "applied-ai": [
        expertiseEvidence["applied-ai"].projectSlugs.length,
        publicationCount,
        expertiseEvidence["applied-ai"].career.length,
      ],
    }),
    [publicationCount],
  );

  return (
    <div className="portfolio-gallery min-h-screen bg-background text-foreground">
      <PortfolioHeader />
      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24"
      >
        <h1 className="mt-5 max-w-4xl font-display text-5xl font-semibold leading-none md:text-7xl">
          {t.expertiseTitle}
        </h1>
        <p className="mt-6 max-w-2xl text-muted-foreground">{t.expertiseIntro}</p>
        <div className="mt-12 space-y-3">
          {expertiseOrder.map((id) => {
            const selected = focus === id;
            const active = selected;
            const item = t.expertiseItems[id];
            const evidence = expertiseEvidence[id];
            const projectNames = evidence.projectSlugs.map(
              (slug) => portfolioProjects.find((p) => p.slug === slug)?.name ?? slug,
            );
            return (
              <details
                key={id}
                open={selected}
                className={`border border-border transition-colors ${selected ? "bg-card" : "bg-background"}`}
              >
                <summary
                  onClick={(event) => {
                    event.preventDefault();
                    setFocus(selected ? null : id);
                  }}
                  className="cursor-pointer list-none focus-visible:outline-2 focus-visible:outline-primary"
                >
                  <div className="grid gap-4 p-5 md:grid-cols-12 md:items-center md:p-7">
                    <div className="md:col-span-5">
                      <h2 className="font-display text-2xl font-semibold md:text-3xl">
                        {item.title}
                      </h2>
                      <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-3 md:col-span-6">
                      {[
                        [metrics[id][0], t.projectsEvidence],
                        [metrics[id][1], t.writingEvidence],
                        [metrics[id][2], t.careerEvidence],
                      ].map(([value, label]) => (
                        <div key={String(label)}>
                          <p className="font-display text-2xl font-semibold">
                            {label === t.careerEvidence
                              ? expertiseEvidence[id].careerMonths > 0
                                ? `${value} (${formatCareerDuration(expertiseEvidence[id].careerMonths, language)})`
                                : value
                              : value}
                          </p>
                          <p className="font-body text-xs tracking-wider text-muted-foreground">
                            {label}
                          </p>
                        </div>
                      ))}
                    </div>
                    <ArrowUpRight
                      className={`size-5 transition-transform md:col-span-1 ${active ? "text-primary -translate-y-1 translate-x-1" : "text-muted-foreground"}`}
                    />
                  </div>
                </summary>
                {selected && (
                  <div
                    className={`grid gap-6 border-t border-border p-5 md:p-7 ${evidence.aiContexts?.length ? "md:grid-cols-4" : "md:grid-cols-3"}`}
                  >
                    <Evidence
                      icon={<FolderGit2 className="size-4" />}
                      label={t.projectsEvidence}
                      items={projectNames}
                    />
                    <Evidence
                      icon={<BriefcaseBusiness className="size-4" />}
                      label={t.careerEvidence}
                      items={evidence.career}
                    />
                    <Evidence
                      icon={<Linkedin className="size-4" />}
                      label={t.evidence}
                      items={evidence.signals}
                    />
                    {evidence.aiContexts?.length ? (
                      <Evidence
                        icon={<BriefcaseBusiness className="size-4" />}
                        label={t.contextsEvidence}
                        items={evidence.aiContexts}
                      />
                    ) : null}
                  </div>
                )}
              </details>
            );
          })}
        </div>
      </main>
    </div>
  );
}

function formatCareerDuration(months: number, language: "en" | "pt") {
  const years = Math.floor(months / 12);
  const remaining = months % 12;
  if (language === "pt") return remaining ? `${years}a ${remaining}m` : `${years}a`;
  return remaining ? `${years}y ${remaining}m` : `${years}y`;
}

function Evidence({ icon, label, items }: { icon: ReactNode; label: string; items: string[] }) {
  return (
    <div>
      <div className="flex items-center gap-2 text-primary">
        {icon}
        <p className="font-body text-xs tracking-widest">{label}</p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="border border-border px-2.5 py-2 font-body text-xs text-muted-foreground"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
