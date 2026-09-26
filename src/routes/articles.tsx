import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Linkedin } from "lucide-react";
import { getLinkedInPosts } from "../lib/linkedin.functions";
import { LanguageSwitcher, useLanguage } from "../lib/i18n";

export const Route = createFileRoute("/articles")({
  loader: () => getLinkedInPosts(),
  head: () => ({ meta: [{ title: "Articles & Posts — Guilherme da Silva Costa" }, { name: "description", content: "Original writing by Guilherme da Silva Costa." }] }),
  component: ArticlesPage,
});

type Filter = "all" | "coffee" | "articles";

function ArticlesPage() {
  const posts = Route.useLoaderData();
  const { language, setLanguage, t } = useLanguage();
  const [filter, setFilter] = useState<Filter>("all");
  const sorted = [...posts].sort((a,b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  const visible = sorted.filter(post => {
    if (filter === "coffee") return post.category.toLowerCase().includes("coffee");
    if (filter === "articles") return !post.category.toLowerCase().includes("coffee");
    return true;
  });
  const filters: Filter[] = ["all","coffee","articles"];

  return <div className="min-h-screen bg-background text-foreground">
    <header className="border-b border-border/60"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
      <Link to="/" className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest text-muted-foreground hover:text-primary"><ArrowLeft className="size-3" /> {t.backHome}</Link>
      <div className="flex items-center gap-3"><span className="hidden font-mono text-[10px] tracking-[0.3em] text-muted-foreground sm:inline">GSC<span className="text-primary">/</span>{t.nav.articles}</span><LanguageSwitcher language={language} onChange={setLanguage} /></div>
    </div></header>
    <main className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
      <p className="font-mono text-[11px] tracking-[0.3em] text-primary">(03) {t.articles}</p>
      <h1 className="mt-5 max-w-4xl font-display text-5xl font-semibold leading-none md:text-7xl">{t.articlesTitle}</h1>
      <p className="mt-6 max-w-2xl text-muted-foreground">{t.articlesIntro}</p>
      <div className="mt-10 flex flex-wrap gap-2 border-y border-border py-3">
        {filters.map(key => <button key={key} type="button" onClick={() => setFilter(key)} className={`px-3 py-2 font-mono text-[9px] tracking-wider ${filter===key?"bg-primary text-primary-foreground":"text-muted-foreground hover:bg-card hover:text-primary"}`}>{t.articleFilters[key]} <span className="opacity-60">{String(sorted.filter(p => key==="all" || (key==="coffee"?p.category.toLowerCase().includes("coffee"):!p.category.toLowerCase().includes("coffee"))).length).padStart(2,"0")}</span></button>)}
      </div>
      <div className="grid gap-4 py-8 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((post,index) => <a key={post.url} href={post.url} target="_blank" rel="noreferrer" className="group flex min-h-72 flex-col justify-between border border-border bg-card p-6 hover:border-primary/60">
          <div><div className="flex justify-between gap-4"><span className="grid size-8 place-items-center rounded-full border border-border font-mono text-[10px]">{String(index+1).padStart(2,"0")}</span><span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">{post.category}</span></div><p className="mt-8 font-mono text-[9px] uppercase text-primary">{new Date(post.publishedAt).toLocaleDateString(language==="pt"?"pt-BR":"en-US",{month:"short",day:"numeric",year:"numeric",timeZone:"America/Sao_Paulo"}).toUpperCase()}</p><h2 className="mt-3 font-display text-2xl font-semibold group-hover:text-primary">{post.title}</h2><p className="mt-4 text-sm leading-relaxed text-muted-foreground">{post.summary}</p></div>
          <span className="mt-8 inline-flex items-center gap-2 font-mono text-[9px] text-primary">LINKEDIN <ArrowUpRight className="size-3"/></span>
        </a>)}
      </div>
      <a href="https://www.linkedin.com/in/guilherme-da-silva-costa/recent-activity/all/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-border px-5 py-3 font-mono text-[10px] text-muted-foreground hover:border-primary hover:text-primary"><Linkedin className="size-4"/>{t.moreLinkedIn}</a>
    </main>
  </div>;
}
