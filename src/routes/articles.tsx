import { PortfolioHeader } from "../components/portfolio-header";
import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Linkedin } from "lucide-react";
import { getLinkedInPosts } from "../lib/linkedin.functions";
import { useLanguage } from "../lib/i18n";

export const Route = createFileRoute("/articles")({
  loader: () => getLinkedInPosts(),
  head: () => ({
    meta: [
      { title: "Articles & Posts — Guilherme da Silva Costa" },
      { name: "description", content: "Original writing by Guilherme da Silva Costa." },
    ],
  }),
  component: ArticlesPage,
});

type Filter = "all" | "coffee" | "articles";

function ArticlesPage() {
  const posts = Route.useLoaderData();
  const { language, t } = useLanguage();
  const [filter, setFilter] = useState<Filter>("all");
  const sorted = [...posts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
  const visible = sorted.filter((post) => {
    if (filter === "coffee") return post.category.toLowerCase().includes("coffee");
    if (filter === "articles") return !post.category.toLowerCase().includes("coffee");
    return true;
  });
  const filters: Filter[] = ["all", "coffee", "articles"];

  return (
    <div className="portfolio-gallery min-h-screen bg-background text-foreground">
      <PortfolioHeader />
      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24"
      >
        <h1 className="mt-5 max-w-4xl font-display text-5xl font-semibold leading-none md:text-7xl">
          {t.articlesTitle}
        </h1>
        <p className="mt-6 max-w-2xl text-muted-foreground">{t.articlesIntro}</p>
        <div className="mt-10 flex flex-wrap gap-2 border-y border-border py-3">
          {filters.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              aria-pressed={filter === key}
              className={`min-h-11 px-3 py-2 font-body text-xs tracking-wider ${filter === key ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-card hover:text-primary"}`}
            >
              {t.articleFilters[key]}{" "}
              <span className="opacity-60">
                {String(
                  sorted.filter(
                    (p) =>
                      key === "all" ||
                      (key === "coffee"
                        ? p.category.toLowerCase().includes("coffee")
                        : !p.category.toLowerCase().includes("coffee")),
                  ).length,
                ).padStart(2, "0")}
              </span>
            </button>
          ))}
        </div>
        <div aria-live="polite" className="grid gap-4 py-8 md:grid-cols-2 lg:grid-cols-3">
          {visible.length === 0 && (
            <p className="py-8 text-muted-foreground">
              {language === "pt"
                ? "Nenhum texto neste filtro. Escolha Todos para continuar explorando."
                : "No writing in this view. Choose All to keep exploring."}
            </p>
          )}
          {visible.map((post) => (
            <a
              key={post.url}
              href={post.url}
              target="_blank"
              rel="noreferrer"
              className="group flex min-h-72 flex-col justify-between border border-border bg-card p-6 hover:border-primary/60"
            >
              <div>
                <div className="flex justify-between gap-4">
                  <span className="font-body text-xs uppercase tracking-widest text-muted-foreground">
                    {post.category}
                  </span>
                </div>
                <p className="mt-8 font-body text-xs uppercase text-primary">
                  {new Date(post.publishedAt)
                    .toLocaleDateString(language === "pt" ? "pt-BR" : "en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      timeZone: "America/Sao_Paulo",
                    })
                    .toUpperCase()}
                </p>
                <h2 className="mt-3 font-display text-2xl font-semibold group-hover:text-primary">
                  {post.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{post.summary}</p>
              </div>
              <span className="mt-8 inline-flex items-center gap-2 font-body text-xs text-primary">
                LINKEDIN <ArrowUpRight className="size-3" />
              </span>
            </a>
          ))}
        </div>
        <a
          href="https://www.linkedin.com/in/guilherme-da-silva-costa/recent-activity/all/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 border border-border px-5 py-3 font-body text-xs text-muted-foreground hover:border-primary hover:text-primary"
        >
          <Linkedin className="size-4" />
          {t.moreLinkedIn}
        </a>
      </main>
    </div>
  );
}
