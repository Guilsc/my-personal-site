import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Github, Linkedin, MapPin } from "lucide-react";
import { useState } from "react";

import { getGitHubProjects } from "../lib/github.functions";
import { getLinkedInPosts, type LinkedInPost } from "../lib/linkedin.functions";
import { portfolioProjects } from "../content/projects";
import { getLocalizedProjectContent } from "../content/project-content";
import { expertiseOrder } from "../content/expertise";
import { LanguageSwitcher, useLanguage } from "../lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Guilherme da Silva Costa — Senior Business Analyst" },
      {
        name: "description",
        content:
          "Portfolio of Guilherme da Silva Costa, a Senior Business Analyst connecting business, product, systems, QA, and applied AI.",
      },
      { property: "og:title", content: "Guilherme da Silva Costa — Senior Business Analyst" },
      {
        property: "og:description",
        content: "14+ years turning technical complexity into clear decisions and actionable delivery.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: async () => {
    const [projects, linkedInPosts] = await Promise.all([
      getGitHubProjects(),
      getLinkedInPosts(),
    ]);

    return { projects, linkedInPosts };
  },
  pendingComponent: PortfolioLoading,
  errorComponent: PortfolioError,
  component: Portfolio,
});



function Portfolio() {
  const { projects, linkedInPosts } = Route.useLoaderData();
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="sticky top-0 z-50 px-3 pt-3 md:px-5 md:pt-4">
        <div className="glass-nav mx-auto flex max-w-7xl items-center justify-between rounded-full px-5 py-3.5 md:px-6">
          <a href="#inicio" className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">
            GSC<span className="text-primary">/</span>PORTFOLIO
          </a>
          <div className="flex items-center gap-3 md:gap-5"><nav className="hidden items-center gap-5 font-mono text-[9px] tracking-widest text-muted-foreground sm:flex" aria-label="Primary">
            <a href="#about" className="transition-colors hover:text-foreground">{t.nav.about}</a>
            <Link to="/expertise" search={{ focus: "business-analysis" }} className="transition-colors hover:text-foreground">{t.nav.expertise}</Link>
            <a href="#articles" className="transition-colors hover:text-foreground">{t.nav.articles}</a>
            <Link to="/projects" className="transition-colors hover:text-foreground">{t.nav.projects}</Link>
          </nav><LanguageSwitcher language={language} onChange={setLanguage} /></div>
        </div>
      </header>

      <main id="inicio">
        <section className="hero-shell relative mx-auto min-h-[calc(100svh-68px)] max-w-[1500px] px-5 pb-12 pt-10 md:px-8 md:pb-16 md:pt-14">
          <div className="hero-grid pointer-events-none absolute inset-0" />
          <div className="hero-orb hero-orb-one pointer-events-none absolute" />
          <div className="hero-orb hero-orb-two pointer-events-none absolute" />
          <div className="relative z-10 grid min-h-[calc(100svh-140px)] items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="reveal mb-8 flex flex-wrap items-center gap-3">
                <span className="status-pill"><span className="status-dot" /> AVAILABLE FOR IDEAS, SYSTEMS & HARD PROBLEMS</span>
                <span className="font-mono text-[9px] tracking-[0.18em] text-muted-foreground">CURITIBA / BR</span>
              </div>
              <p className="reveal font-mono text-[10px] tracking-[0.28em] text-primary">SENIOR BUSINESS ANALYST · PRODUCT · APPLIED AI</p>
              <h1 className="hero-title mt-7 font-display font-semibold">
                <span className="reveal block">Guilherme</span>
                <span className="reveal block text-muted-foreground">da Silva Costa</span>
              </h1>
              <div className="mt-10 grid gap-8 border-t border-border/70 pt-7 md:grid-cols-[1fr_auto] md:items-end">
                <p className="reveal max-w-3xl font-display text-[clamp(1.35rem,2.5vw,2.35rem)] font-medium leading-[1.08] text-accent-foreground">
                  {t.hero}
                </p>
                <a href="#work" className="reveal group inline-flex items-center gap-3 font-mono text-[9px] tracking-[0.2em] text-muted-foreground transition-colors hover:text-primary">
                  SELECTED WORK <span className="grid size-10 place-items-center rounded-full border border-border transition-transform group-hover:translate-y-1 group-hover:border-primary"><ArrowDown className="size-4" /></span>
                </a>
              </div>
            </div>
            <div className="reveal relative lg:col-span-4 lg:pl-4">
              <div className="portrait-editorial relative mx-auto max-w-md">
                <div className="portrait-backdrop absolute -inset-4 rounded-[2rem]" />
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] border border-border/80 bg-card">
                  <img src="https://avatars.githubusercontent.com/u/12737257?v=4" alt="Guilherme da Silva Costa" width={800} height={800} className="h-full w-full object-cover grayscale-[20%] transition duration-700 hover:grayscale-0" />
                  <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(transparent,var(--background))] px-5 pb-5 pt-24">
                    <div className="flex items-end justify-between gap-4 font-mono text-[9px] tracking-widest text-muted-foreground">
                      <span>SENIOR BA / EPAM</span><span>14+ YEARS</span>
                    </div>
                  </div>
                </div>
                <div className="portrait-note absolute -bottom-5 -left-5 hidden rounded-2xl border border-border/80 bg-card/90 px-4 py-3 backdrop-blur-xl md:block">
                  <p className="font-mono text-[8px] tracking-[0.2em] text-muted-foreground">FOCUS</p>
                  <p className="mt-1 font-display text-sm font-semibold">Decisions over artifacts.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-border/50 bg-secondary/15">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-8 gap-y-10 px-5 py-10 md:grid-cols-4 md:px-8">
            {[["Experience", "14", "Y"], ["Location", "CURITIBA", ""], ["Specialty", "AI & QA", ""], ["Role", "SENIOR BA", ""]].map(([label, value, suffix]) => (
              <div key={label}>
                <p className="mb-2 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">{label}</p>
                <p className="font-display text-2xl font-semibold md:text-3xl">{value}<span className="text-lg text-primary">{suffix}</span></p>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:grid-cols-12 md:px-8 md:py-32">
          <div className="md:col-span-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">(01) ABOUT</p>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-none md:text-5xl">{t.aboutTitle}</h2>
          </div>
          <div className="space-y-6 text-base leading-relaxed text-muted-foreground md:col-span-8 md:text-lg">
            {t.about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <div className="flex flex-wrap gap-3 pt-2 font-mono text-[10px] tracking-wider text-foreground">
              <span className="border border-border bg-card px-3 py-2">EPAM SYSTEMS</span>
              <span className="border border-border bg-card px-3 py-2">UTFPR</span>
              <span className="inline-flex items-center gap-2 border border-border bg-card px-3 py-2"><MapPin className="size-3 text-primary" /> CURITIBA</span>
            </div>
          </div>
        </section>

        <section className="border-y border-border/50 bg-secondary/10">
          <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-24">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">(02) {t.expertise}</p>
            <div className="mt-8 divide-y divide-border border-y border-border">
              {expertiseOrder.map((id, index) => { const item = t.expertiseItems[id]; return (
                <Link key={id} to="/expertise" search={{ focus: id }} className="expertise-row group grid gap-3 py-7 md:grid-cols-12 md:items-center">
                  <span className="font-mono text-[10px] text-primary md:col-span-1">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="font-display text-2xl font-semibold md:col-span-4 md:text-3xl">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground md:col-span-6">{item.description}</p>
                  <ArrowUpRight className="hidden size-5 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary md:block" />
                </Link>
              ); })}
            </div>
          </div>
        </section>

        <section id="work" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
          <div className="mb-8 flex flex-col items-start gap-6 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between sm:gap-5 sm:pb-4">
            <div className="min-w-0">
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">(03) {t.selectedImpact}</p>
              <h2 className="mt-5 max-w-4xl font-display text-4xl font-semibold leading-none md:text-5xl">{t.impactTitle}</h2>
              <p className="mt-5 max-w-2xl text-muted-foreground">{t.impactIntro}</p>
            </div>
            <Link to="/projects" className="inline-flex shrink-0 items-center gap-2 bg-primary px-4 py-3 font-mono text-[10px] text-primary-foreground transition-opacity hover:opacity-90">{t.viewAll} <ArrowUpRight className="size-3" /></Link>
          </div>
          <div className="work-grid mt-12 grid gap-5 lg:grid-cols-12">
            <article className="work-card work-card-enterprise flex flex-col border border-primary/35 bg-card/70 p-7 backdrop-blur-sm lg:col-span-5">
              <p className="font-mono text-[9px] uppercase tracking-widest text-primary">{t.enterpriseEyebrow}</p>
              <h3 className="mt-5 font-display text-3xl font-semibold">{t.enterpriseTitle}</h3>
              <p className="mt-2 font-mono text-[9px] tracking-wider text-muted-foreground">{t.enterpriseRole}</p>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{t.enterpriseSummary}</p>
              <div className="mt-6 space-y-2">{t.enterpriseEvidence.map(item => <p key={item} className="text-xs leading-relaxed text-muted-foreground">+ {item}</p>)}</div>
            </article>
            {["curatia-content-engine","olympus-os"].map(slug => {
              const project = portfolioProjects.find(item => item.slug === slug)!;
              const localizedProject = getLocalizedProjectContent(slug, language);
              return <Link key={slug} to="/projects/$slug" params={{slug}} className="work-card group flex flex-col border border-border/80 bg-card/70 p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/55">
                <p className="font-mono text-[9px] uppercase tracking-widest text-primary">{localizedProject?.eyebrow ?? project.eyebrow}</p>
                <h3 className="mt-5 font-display text-3xl font-semibold group-hover:text-primary">{project.name}</h3>
                <p className="mt-2 font-mono text-[9px] tracking-wider text-muted-foreground">{localizedProject?.role ?? project.role}</p>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{localizedProject?.summary ?? project.summary}</p>
                <span className="mt-auto pt-8 inline-flex items-center gap-2 font-mono text-[9px] text-primary">{t.viewMore} <ArrowUpRight className="size-3"/></span>
              </Link>;
            })}
          </div>
        </section>

        <section id="articles" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
          <div className="mb-8 flex flex-col items-start gap-6 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between sm:gap-5 sm:pb-4">
            <div className="min-w-0">
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">(04) {t.articles}</p>
              <h2 className="mt-4 max-w-full font-display text-[clamp(2.75rem,12vw,4rem)] font-semibold leading-[0.95] sm:text-4xl sm:leading-none">{t.ideas}</h2>
            </div>
            <div className="flex flex-wrap gap-2"><Link to="/articles" className="inline-flex shrink-0 items-center gap-2 bg-primary px-4 py-3 font-mono text-[10px] text-primary-foreground transition-opacity hover:opacity-90">{t.viewAll} <ArrowUpRight className="size-3" /></Link><a href="https://www.linkedin.com/in/guilherme-da-silva-costa/recent-activity/all/" target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-2 border border-border px-4 py-3 font-mono text-[10px] text-muted-foreground transition-colors hover:border-primary hover:text-primary"><Linkedin className="size-4" /> <span>{t.moreLinkedIn}</span></a></div>
          </div>

          <ArticlesFeed livePosts={linkedInPosts} />
        </section>

        <section id="projects" className="border-t border-border/60 bg-secondary/20">
          <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
          <div className="mb-8 flex flex-col items-start gap-6 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between sm:gap-5 sm:pb-4">
            <div className="min-w-0">
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">(05) {t.repositories}</p>
              <h2 className="mt-4 max-w-full font-display text-[clamp(2.75rem,12vw,4rem)] font-semibold leading-[0.95] sm:text-4xl sm:leading-none">{t.githubLive}</h2>
            </div>
            <div className="flex flex-wrap gap-2"><Link to="/projects" className="inline-flex shrink-0 items-center gap-2 bg-primary px-4 py-3 font-mono text-[10px] text-primary-foreground transition-opacity hover:opacity-90">{t.viewAll} <ArrowUpRight className="size-3" /></Link><a href="https://github.com/Guilsc" target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-2 border border-border px-4 py-3 font-mono text-[10px] text-muted-foreground transition-colors hover:border-primary hover:text-primary"><Github className="size-4" /> @GUILSC</a></div>
          </div>
          <RepositoriesCarousel projects={projects} />
          </div>
        </section>

        <section className="contact-shell border-t border-border/50">
          <div className="mx-auto max-w-4xl px-5 py-20 text-center md:px-8 md:py-28">
            <a href="mailto:guilherme.silva.costa@hotmail.com" className="inline-block font-mono text-[10px] tracking-[0.4em] text-primary transition-opacity hover:opacity-70">CONTACT</a>
            <h2 className="mt-6 font-display text-4xl font-bold leading-none md:text-6xl">{t.contactTitle}</h2>
            <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">{t.contactText}</p>
            <div className="mt-9 flex flex-wrap justify-center gap-3"><a href="mailto:guilherme.silva.costa@hotmail.com" className="inline-flex items-center gap-2 bg-primary px-6 py-4 font-display text-sm font-bold text-primary-foreground transition-colors hover:bg-accent">CONTACT</a>
              <a href="https://www.linkedin.com/in/guilherme-da-silva-costa/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-primary px-6 py-4 font-display text-sm font-bold text-primary-foreground transition-colors hover:bg-accent"><Linkedin className="size-4" /> LINKEDIN</a>
              <a href="https://github.com/Guilsc" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-border bg-card px-6 py-4 font-display text-sm font-bold transition-colors hover:border-primary hover:text-primary"><Github className="size-4" /> GITHUB</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/40 px-5 py-8 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 font-mono text-[9px] tracking-widest text-muted-foreground sm:flex-row sm:justify-between">
          <span>© 2026 GUILHERME DA SILVA COSTA</span><span>CURITIBA, BR</span>
        </div>
      </footer>
    </div>
  );
}

const ITEMS_PER_PAGE = 3;

function ArticlesFeed({ livePosts }: { livePosts: LinkedInPost[] }) {
  const [page, setPage] = useState(0);
  const posts = [...livePosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  if (posts.length === 0) {
    return (
      <p className="border-y border-border py-8 text-sm text-muted-foreground">
        No LinkedIn posts are available right now.
      </p>
    );
  }

  const pageCount = Math.ceil(posts.length / ITEMS_PER_PAGE);
  const safePage = Math.min(page, pageCount - 1);
  const startIndex = safePage * ITEMS_PER_PAGE;
  const visiblePosts = posts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-3">
        {visiblePosts.map((post, index) => (
          <a
            key={post.url}
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="editorial-card group flex min-h-80 flex-col justify-between border border-border/70 bg-card/60 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50"
          >
            <div>
              <div className="flex items-start justify-between gap-4">
                <span className="grid size-8 place-items-center rounded-full border border-border font-mono text-[10px] transition-colors group-hover:border-primary group-hover:text-primary">
                  {String(startIndex + index + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                  {post.category || "LINKEDIN"}
                </span>
              </div>
              <p className="mt-8 font-mono text-[9px] uppercase tracking-wider text-primary">
                {formatPublicationDate(post.publishedAt)}
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold leading-tight transition-colors group-hover:text-primary">
                {post.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {post.summary}
              </p>
            </div>
            <span className="mt-8 inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-wider text-primary">
              OPEN ON LINKEDIN <ArrowUpRight className="size-3" />
            </span>
          </a>
        ))}
      </div>
      {pageCount > 1 && (
        <CarouselControls
          page={safePage}
          pageCount={pageCount}
          onChange={setPage}
          label="LinkedIn posts"
        />
      )}
    </div>
  );
}

function formatPublicationDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "RECENT";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "America/Sao_Paulo",
  })
    .format(date)
    .toUpperCase();
}

type Repository = Awaited<ReturnType<typeof getGitHubProjects>>[number];

function RepositoriesCarousel({ projects }: { projects: Repository[] }) {
  const [page, setPage] = useState(0);
  const ownedProjects = projects.filter((project) => !project.fork);
  const pageCount = Math.max(1, Math.ceil(ownedProjects.length / ITEMS_PER_PAGE));
  const safePage = Math.min(page, pageCount - 1);
  const visibleProjects = ownedProjects.slice(safePage * ITEMS_PER_PAGE, (safePage + 1) * ITEMS_PER_PAGE);

  if (ownedProjects.length === 0) {
    return <p className="border border-border bg-card p-6 text-muted-foreground">No public repositories are available right now.</p>;
  }

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-3">
        {visibleProjects.map((project, index) => {
          const internalSlug = getInternalProjectSlug(project.name);
          const localAppUrl = getLocalAppUrl(project.name);
          const cardClassName = "group flex min-h-64 flex-col justify-between border border-border bg-card p-6 transition-colors hover:border-primary/60";
          const cardContent = (
            <>
              <div>
                <div className="flex items-start justify-between gap-4">
                  <span className="grid size-8 place-items-center rounded-full border border-border font-mono text-[10px] transition-colors group-hover:border-primary group-hover:text-primary">{String(safePage * ITEMS_PER_PAGE + index + 1).padStart(2, "0")}</span>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">{project.fork ? "FORK" : "ORIGINAL"}</span>
                </div>
                <h3 className="mt-8 break-words font-display text-2xl font-semibold">{project.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.description || "A public repository for experiments, learning, and building solutions."}</p>
              </div>
              <div className="mt-8 flex items-center gap-3 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                <span>{project.language || "GITHUB"}</span><span className="size-1 rounded-full bg-border" /><span>★ {project.stars}</span><span className="ml-auto inline-flex items-center gap-1 text-primary">{localAppUrl ? "OPEN APP" : internalSlug ? "VIEW PROJECT" : "VIEW REPO"} <ArrowUpRight className="size-3" /></span>
              </div>
            </>
          );

          return localAppUrl ? (
            <a key={project.id} href={localAppUrl} className={cardClassName}>
              {cardContent}
            </a>
          ) : internalSlug ? (
            <Link key={project.id} to="/projects/$slug" params={{ slug: internalSlug }} className={cardClassName}>
              {cardContent}
            </Link>
          ) : (
            <a key={project.id} href={project.htmlUrl} target="_blank" rel="noreferrer" className={cardClassName}>
              {cardContent}
            </a>
          );
        })}
      </div>
      {pageCount > 1 && <CarouselControls page={safePage} pageCount={pageCount} onChange={setPage} label="repositories" />}
    </div>
  );
}

function CarouselControls({ page, pageCount, onChange, label }: { page: number; pageCount: number; onChange: (page: number) => void; label: string }) {
  return (
    <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
      <span className="font-mono text-[9px] tracking-widest text-muted-foreground">{String(page + 1).padStart(2, "0")} / {String(pageCount).padStart(2, "0")}</span>
      <div className="flex gap-2">
        <button type="button" onClick={() => onChange(Math.max(0, page - 1))} disabled={page === 0} aria-label={`Previous ${label}`} className="inline-flex size-11 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-30"><ArrowLeft className="size-4" /></button>
        <button type="button" onClick={() => onChange(Math.min(pageCount - 1, page + 1))} disabled={page === pageCount - 1} aria-label={`Next ${label}`} className="inline-flex size-11 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-30"><ArrowRight className="size-4" /></button>
      </div>
    </div>
  );
}

function PortfolioLoading() {
  return <div className="grid min-h-screen place-items-center bg-background font-mono text-xs tracking-widest text-primary">LOADING PORTFOLIO…</div>;
}

function PortfolioError() {
  return <div className="grid min-h-screen place-items-center bg-background px-6 text-center text-muted-foreground">The portfolio could not load right now. Please try again shortly.</div>;
}


function getLocalAppUrl(repositoryName: string) {
  const normalized = repositoryName.toLowerCase().replace(/[_\s]+/g, "-");
  return normalized === "bot-ecosystem" ? "/ecosystem/" : undefined;
}

function getInternalProjectSlug(repositoryName: string) {
  return repositoryName.toLowerCase().replace(/[_\s]+/g, "-");
}
