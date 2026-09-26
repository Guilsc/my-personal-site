import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Github, Linkedin, MapPin } from "lucide-react";
import { useState } from "react";

import { getGitHubProjects } from "../lib/github.functions";
import { getLinkedInPosts, type LinkedInPost } from "../lib/linkedin.functions";
import { portfolioProjects } from "../content/projects";

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

const expertise = [
  ["01", "Business Analysis", "Complex needs translated into clear, actionable decisions."],
  ["02", "Product & strategy", "Prioritization, alignment, and value-driven delivery."],
  ["03", "Systems & QA", "Dependencies, risks, and edge cases beyond the happy path."],
  ["04", "Applied AI", "Technology supporting sharper analysis, documentation, and decisions."],
];

function Portfolio() {
  const { projects, linkedInPosts } = Route.useLoaderData();

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <a href="#inicio" className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">
            GSC<span className="text-primary">/</span>PORTFOLIO
          </a>
          <nav className="flex items-center gap-5 font-mono text-[9px] tracking-widest text-muted-foreground" aria-label="Primary">
            <a href="#about" className="transition-colors hover:text-foreground">ABOUT</a>
            <a href="#articles" className="transition-colors hover:text-foreground">ARTICLES</a>
            <Link to="/projects" className="transition-colors hover:text-foreground">PROJECTS</Link>
          </nav>
        </div>
      </header>

      <main id="inicio">
        <section className="relative mx-auto grid min-h-[calc(100svh-53px)] max-w-7xl content-center gap-10 px-5 py-14 md:grid-cols-12 md:px-8 md:py-20">
          <div className="pointer-events-none absolute -left-32 -top-32 size-[32rem] bg-[radial-gradient(circle,var(--glow)_0%,transparent_68%)] opacity-60" />
          <div className="relative z-10 md:col-span-7 md:self-center">
            <p className="reveal font-mono text-[11px] tracking-[0.2em] text-primary">(00) SENIOR BUSINESS ANALYST</p>
            <h1 className="mt-7 font-display text-[clamp(3.6rem,11vw,9rem)] font-bold leading-[0.82]">
              <span className="reveal block">Guilherme</span>
              <span className="reveal stroked-text block">da Silva Costa</span>
            </h1>
            <div className="draw mt-10 h-px w-full bg-border" />
            <p className="reveal mt-8 max-w-2xl font-display text-xl font-medium leading-tight text-accent-foreground md:text-3xl">
              Turning technical complexity into real business value through 14+ years of experience.
            </p>
            <a href="#about" aria-label="Continue to profile" className="mt-10 inline-flex size-11 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary">
              <ArrowDown className="size-4" />
            </a>
          </div>
          <div className="reveal relative md:col-span-5 md:self-end">
            <div className="portrait-frame relative aspect-[4/5] overflow-hidden border border-border bg-card">
              <img src="https://avatars.githubusercontent.com/u/12737257?v=4" alt="Guilherme da Silva Costa" width={800} height={800} className="h-full w-full object-cover grayscale transition duration-700 hover:grayscale-0" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-[linear-gradient(transparent,var(--background))] px-4 pb-4 pt-20 font-mono text-[9px] tracking-widest text-muted-foreground">
                <span>LEAD ANALYST / EPAM</span><span>CURITIBA, BR</span>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-border/60 bg-secondary/25">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-10 px-5 py-12 md:grid-cols-4 md:px-8">
            {[["Experience", "14", "Y"], ["Location", "CURITIBA", ""], ["Specialty", "AI & QA", ""], ["Role", "SENIOR BA", ""]].map(([label, value, suffix]) => (
              <div key={label}>
                <p className="mb-2 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">{label}</p>
                <p className="font-display text-2xl font-semibold md:text-3xl">{value}<span className="text-lg text-primary">{suffix}</span></p>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:grid-cols-12 md:px-8 md:py-28">
          <div className="md:col-span-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">(01) ABOUT</p>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-none md:text-5xl">Business and technology, without the noise.</h2>
          </div>
          <div className="space-y-6 text-base leading-relaxed text-muted-foreground md:col-span-8 md:text-lg">
            <p>I work between business and technology, turning complex needs into clear decisions and actionable work. My career spans software testing, Quality Assurance, Business Analysis, and product-focused delivery.</p>
            <p>My QA background still shapes how I think: I look for dependencies, risks, and edge cases, and ask whether a solution truly works beyond the happy path.</p>
            <p>Today, I explore practical ways for artificial intelligence to support better analysis, decision-making, documentation, and software delivery.</p>
            <div className="flex flex-wrap gap-3 pt-2 font-mono text-[10px] tracking-wider text-foreground">
              <span className="border border-border bg-card px-3 py-2">EPAM SYSTEMS</span>
              <span className="border border-border bg-card px-3 py-2">UTFPR</span>
              <span className="inline-flex items-center gap-2 border border-border bg-card px-3 py-2"><MapPin className="size-3 text-primary" /> CURITIBA</span>
            </div>
          </div>
        </section>

        <section className="border-y border-border/60 bg-secondary/20">
          <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-24">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">(02) EXPERTISE</p>
            <div className="mt-8 divide-y divide-border border-y border-border">
              {expertise.map(([number, title, description]) => (
                <div key={number} className="group grid gap-3 py-6 md:grid-cols-12 md:items-center">
                  <span className="font-mono text-[10px] text-primary md:col-span-1">{number}</span>
                  <h3 className="font-display text-2xl font-semibold md:col-span-4 md:text-3xl">{title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground md:col-span-6">{description}</p>
                  <ArrowUpRight className="hidden size-5 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary md:block" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="articles" className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
          <div className="mb-8 flex flex-col items-start gap-6 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between sm:gap-5 sm:pb-4">
            <div className="min-w-0">
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">(03) ARTICLES &amp; POSTS</p>
              <h2 className="mt-4 max-w-full font-display text-[clamp(2.75rem,12vw,4rem)] font-semibold leading-[0.95] sm:text-4xl sm:leading-none">Ideas in practice.</h2>
            </div>
            <a href="https://www.linkedin.com/in/guilherme-da-silva-costa/recent-activity/all/" target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-2 border border-border px-4 py-3 font-mono text-[10px] text-muted-foreground transition-colors hover:border-primary hover:text-primary"><Linkedin className="size-4" /> <span>MORE ON LINKEDIN</span></a>
          </div>

          <ArticlesFeed livePosts={linkedInPosts} />
        </section>

        <section id="projects" className="border-t border-border/60 bg-secondary/20">
          <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
          <div className="mb-8 flex flex-col items-start gap-6 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between sm:gap-5 sm:pb-4">
            <div className="min-w-0">
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">(04) PUBLIC REPOSITORIES</p>
              <h2 className="mt-4 max-w-full font-display text-[clamp(2.75rem,12vw,4rem)] font-semibold leading-[0.95] sm:text-4xl sm:leading-none">Live from GitHub.</h2>
            </div>
            <a href="https://github.com/Guilsc" target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-2 border border-border px-4 py-3 font-mono text-[10px] text-muted-foreground transition-colors hover:border-primary hover:text-primary"><Github className="size-4" /> @GUILSC</a>
          </div>
          <RepositoriesCarousel projects={projects} />
          </div>
        </section>

        <section className="border-t border-border bg-secondary/30">
          <div className="mx-auto max-w-4xl px-5 py-20 text-center md:px-8 md:py-28">
            <p className="font-mono text-[10px] tracking-[0.4em] text-primary">CONTACT</p>
            <h2 className="mt-6 font-display text-4xl font-bold leading-none md:text-6xl">Let’s turn complexity into clarity.</h2>
            <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">Explore my work and connect with me on LinkedIn or GitHub.</p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
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
  const posts = sortLinkedInPosts(livePosts);
  return <ArticlesCarousel posts={posts} />;
}

function ArticlesCarousel({ posts }: { posts: LinkedInPost[] }) {
  const [page, setPage] = useState(0);
  const pageCount = Math.max(1, Math.ceil(posts.length / ITEMS_PER_PAGE));
  const safePage = Math.min(page, pageCount - 1);
  const visiblePosts = posts.slice(safePage * ITEMS_PER_PAGE, (safePage + 1) * ITEMS_PER_PAGE);

  return (
    <div>
      <LinkedInPostList posts={visiblePosts} startIndex={safePage * ITEMS_PER_PAGE} />
      {pageCount > 1 && <CarouselControls page={safePage} pageCount={pageCount} onChange={setPage} label="article posts" />}
    </div>
  );
}

type Repository = Awaited<ReturnType<typeof getGitHubProjects>>[number];

function RepositoriesCarousel({ projects }: { projects: Repository[] }) {
  const [page, setPage] = useState(0);
  const pageCount = Math.max(1, Math.ceil(projects.length / ITEMS_PER_PAGE));
  const safePage = Math.min(page, pageCount - 1);
  const visibleProjects = projects.slice(safePage * ITEMS_PER_PAGE, (safePage + 1) * ITEMS_PER_PAGE);

  if (projects.length === 0) {
    return <p className="border border-border bg-card p-6 text-muted-foreground">No public repositories are available right now.</p>;
  }

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-3">
        {visibleProjects.map((project, index) => {
          const internalSlug = getInternalProjectSlug(project.name);
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
                <span>{project.language || "GITHUB"}</span><span className="size-1 rounded-full bg-border" /><span>★ {project.stars}</span><span className="ml-auto inline-flex items-center gap-1 text-primary">{internalSlug ? "VIEW PROJECT" : "VIEW REPO"} <ArrowUpRight className="size-3" /></span>
              </div>
            </>
          );

          return internalSlug ? (
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

function sortLinkedInPosts(posts: LinkedInPost[]): LinkedInPost[] {
  return [...posts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

function normalizePostCategory(value: string): string {
  const normalized = value.trim().toUpperCase().replace(/\s+/g, " ");
  if (normalized === "COFFE WITH ABA" || normalized === "COFFEE WITH ABA" || normalized === "COFFE WITH A BA" || normalized === "COFFEE WITH BA") {
    return "COFFEE WITH A BA";
  }
  return value;
}

function normalizePostUrl(value: string): string {
  try {
    const url = new URL(value);
    url.search = "";
    url.hash = "";
    return url.toString().replace(/\/$/, "");
  } catch {
    return value.trim();
  }
}

function formatPublicationDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "RECENT";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "America/Sao_Paulo",
  })
    .format(date)
    .toUpperCase();
}

function LinkedInPostList({ posts, startIndex = 0 }: { posts: LinkedInPost[]; startIndex?: number }) {
  return (
    <div className="divide-y divide-border border-y border-border">
      {posts.map((post, index) => (
        <a
          key={post.url}
          href={post.url}
          target="_blank"
          rel="noreferrer"
          className="group grid gap-4 py-7 transition-colors md:grid-cols-12 md:items-center md:py-9"
        >
          <span className="font-mono text-[10px] text-primary md:col-span-1">
            {String(startIndex + index + 1).padStart(2, "0")}
          </span>
          <div className="md:col-span-3">
            <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
              {normalizePostCategory(post.category)}
            </p>
            <p className="mt-2 inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-wider text-primary">
              {formatPublicationDate(post.publishedAt)} · LINKEDIN POST
            </p>
          </div>
          <div className="md:col-span-7">
            <h3 className="font-display text-2xl font-semibold leading-tight transition-colors group-hover:text-primary md:text-3xl">
              {post.title}
            </h3>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              {post.summary}
            </p>
          </div>
          <ArrowUpRight className="size-5 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
        </a>
      ))}
    </div>
  );
}

function PortfolioLoading() {
  return <div className="grid min-h-screen place-items-center bg-background font-mono text-xs tracking-widest text-primary">LOADING PORTFOLIO…</div>;
}

function PortfolioError() {
  return <div className="grid min-h-screen place-items-center bg-background px-6 text-center text-muted-foreground">The portfolio could not load right now. Please try again shortly.</div>;
}


function getInternalProjectSlug(repositoryName: string) {
  const normalized = repositoryName.toLowerCase().replace(/[_\s]+/g, "-");

  return portfolioProjects.find((project) => {
    const repoName = project.repository.split("/").pop()?.toLowerCase().replace(/[_\s]+/g, "-");
    return repoName === normalized;
  })?.slug;
}
