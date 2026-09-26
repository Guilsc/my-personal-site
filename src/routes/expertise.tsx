import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, BriefcaseBusiness, FolderGit2, Linkedin } from "lucide-react";
import { useMemo, useState } from "react";
import { expertiseEvidence, expertiseOrder, type ExpertiseId } from "../content/expertise";
import { portfolioProjects } from "../content/projects";
import { getLinkedInPosts } from "../lib/linkedin.functions";
import { LanguageSwitcher, useLanguage } from "../lib/i18n";

export const Route = createFileRoute("/expertise")({
  validateSearch: (search: Record<string, unknown>) => ({
    focus: expertiseOrder.includes(search.focus as ExpertiseId) ? (search.focus as ExpertiseId) : "business-analysis",
  }),
  loader: () => getLinkedInPosts(),
  head: () => ({ meta: [{ title: "Expertise — Guilherme da Silva Costa" }, { name: "description", content: "Evidence-backed expertise across Business Analysis, Product Strategy, Systems & QA, and Applied AI." }] }),
  component: ExpertisePage,
});

function ExpertisePage() {
  const posts = Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const [hovered, setHovered] = useState<ExpertiseId | null>(null);
  const focus = search.focus;
  const publicationCount = posts.length;

  const metrics = useMemo(() => ({
    "business-analysis": [expertiseEvidence["business-analysis"].projectSlugs.length, publicationCount, expertiseEvidence["business-analysis"].career.length],
    "product-strategy": [expertiseEvidence["product-strategy"].projectSlugs.length, publicationCount, expertiseEvidence["product-strategy"].career.length],
    "systems-qa": [expertiseEvidence["systems-qa"].projectSlugs.length, 0, expertiseEvidence["systems-qa"].career.length],
    "applied-ai": [expertiseEvidence["applied-ai"].projectSlugs.length, publicationCount, expertiseEvidence["applied-ai"].career.length],
  }), [publicationCount]);

  return <div className="min-h-screen bg-background text-foreground">
    <header className="border-b border-border/60"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
      <Link to="/" className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest text-muted-foreground hover:text-primary"><ArrowLeft className="size-3" /> {t.backHome}</Link>
      <div className="flex items-center gap-3"><span className="hidden font-mono text-[10px] tracking-[0.3em] text-muted-foreground sm:inline">GSC<span className="text-primary">/</span>{t.expertise}</span><LanguageSwitcher language={language} onChange={setLanguage} /></div>
    </div></header>
    <main className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
      <p className="font-mono text-[11px] tracking-[0.3em] text-primary">(02) {t.expertise}</p>
      <h1 className="mt-5 max-w-4xl font-display text-5xl font-semibold leading-none md:text-7xl">{t.expertiseTitle}</h1>
      <p className="mt-6 max-w-2xl text-muted-foreground">{t.expertiseIntro}</p>
      <div className="mt-12 space-y-3">
        {expertiseOrder.map((id, index) => {
          const selected = focus === id;
          const active = selected || hovered === id;
          const item = t.expertiseItems[id];
          const evidence = expertiseEvidence[id];
          const projectNames = evidence.projectSlugs.map(slug => portfolioProjects.find(p => p.slug === slug)?.name ?? slug);
          return <section key={id} onMouseEnter={() => setHovered(id)} onMouseLeave={() => setHovered(null)} onClick={() => navigate({ search: { focus: id }, replace: true })} className={`cursor-pointer border transition-all duration-300 ${selected ? "border-primary bg-card opacity-100" : active ? "border-border bg-card opacity-100" : "border-border/60 bg-secondary/10 opacity-40"}`}>
            <div className="grid gap-4 p-5 md:grid-cols-12 md:items-center md:p-7">
              <span className="font-mono text-[10px] text-primary md:col-span-1">{String(index + 1).padStart(2,"0")}</span>
              <div className="md:col-span-4"><h2 className="font-display text-2xl font-semibold md:text-3xl">{item.title}</h2><p className="mt-2 text-sm text-muted-foreground">{item.description}</p></div>
              <div className="grid grid-cols-3 gap-3 md:col-span-6">
                {[[metrics[id][0],t.projectsEvidence],[metrics[id][1],t.writingEvidence],[metrics[id][2],t.careerEvidence]].map(([value,label]) => <div key={String(label)}><p className="font-display text-2xl font-semibold">{value}</p><p className="font-mono text-[8px] tracking-wider text-muted-foreground">{label}</p></div>)}
              </div>
              <ArrowUpRight className={`size-5 transition-transform md:col-span-1 ${active ? "text-primary -translate-y-1 translate-x-1" : "text-muted-foreground"}`} />
            </div>
            {selected && <div className="grid gap-6 border-t border-border p-5 md:grid-cols-3 md:p-7">
              <Evidence icon={<FolderGit2 className="size-4" />} label={t.projectsEvidence} items={projectNames} />
              <Evidence icon={<BriefcaseBusiness className="size-4" />} label={t.careerEvidence} items={evidence.career} />
              <Evidence icon={<Linkedin className="size-4" />} label={t.evidence} items={evidence.signals} />
            </div>}
          </section>;
        })}
      </div>
    </main>
  </div>;
}

function Evidence({icon,label,items}:{icon:React.ReactNode;label:string;items:string[]}) {
  return <div><div className="flex items-center gap-2 text-primary">{icon}<p className="font-mono text-[9px] tracking-widest">{label}</p></div><div className="mt-4 flex flex-wrap gap-2">{items.map(item => <span key={item} className="border border-border px-2.5 py-2 font-mono text-[9px] text-muted-foreground">{item}</span>)}</div></div>;
}
