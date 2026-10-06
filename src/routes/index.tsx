import { ProcessExplorer } from "../components/process-explorer";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight, Github, Linkedin } from "lucide-react";
import { useState } from "react";

import { getGitHubProjects } from "../lib/github.functions";
import { getLinkedInPosts, type LinkedInPost } from "../lib/linkedin.functions";
import { portfolioProjects } from "../content/projects";
import { getLocalizedProjectContent } from "../content/project-content";
import { expertiseOrder } from "../content/expertise";
import { useLanguage } from "../lib/i18n";

import { PortfolioHeader } from "../components/portfolio-header";

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
        content:
          "14+ years turning technical complexity into clear decisions and actionable delivery.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: async () => {
    const [projects, linkedInPosts] = await Promise.all([getGitHubProjects(), getLinkedInPosts()]);

    return { projects, linkedInPosts };
  },
  pendingComponent: PortfolioLoading,
  errorComponent: PortfolioError,
  component: Portfolio,
});

function Portfolio() {
  const { projects, linkedInPosts } = Route.useLoaderData();
  const { language, t } = useLanguage();
  const featured = portfolioProjects.find((project) => project.slug === "curatia-content-engine")!;
  const featuredCopy = getLocalizedProjectContent(featured.slug, language) ?? featured;
  return (
    <div className="portfolio-gallery min-h-screen bg-background text-foreground">
      <PortfolioHeader />
      <main id="main-content" tabIndex={-1}>
        <section className="gallery-opening" aria-labelledby="gallery-title">
          <div className="gallery-introduction">
            <h1 id="gallery-title">
              {language === "pt" ? "O trabalho fala." : "The work speaks."}
            </h1>
            <div>
              <p>{t.hero}</p>
              <a
                className="gallery-text-link"
                href="https://www.linkedin.com/in/guilherme-da-silva-costa/"
                target="_blank"
                rel="noreferrer"
              >
                {language === "pt" ? "Vamos conversar" : "Let’s connect"}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>
          <article className="gallery-feature">
            <div className="gallery-feature-heading">
              <h2>{featured.name}</h2>
              <p>{featuredCopy.role}</p>
            </div>
            <p className="gallery-feature-description">{featuredCopy.summary}</p>
            <ProcessExplorer />
            <div className="gallery-feature-bottom">
              <p>{featuredCopy.takeaways[1]}</p>
              <Link
                to="/projects/$slug"
                params={{ slug: featured.slug }}
                className="gallery-feature-link"
              >
                {language === "pt" ? "Explorar o projeto" : "Explore the project"}
                <ArrowUpRight className="size-5" aria-hidden="true" />
              </Link>
            </div>
          </article>
        </section>

        <section className="gallery-section" aria-labelledby="work-title">
          <div className="gallery-section-heading">
            <h2 id="work-title">{language === "pt" ? "Outros trabalhos." : "More work."}</h2>
            <Link to="/projects" className="gallery-text-link">
              {t.viewAll}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="gallery-work-list">
            {portfolioProjects
              .filter((project) => project.slug !== featured.slug)
              .map((project) => {
                const localized = getLocalizedProjectContent(project.slug, language) ?? project;
                return (
                  <Link
                    key={project.slug}
                    to="/projects/$slug"
                    params={{ slug: project.slug }}
                    className="gallery-work-row"
                  >
                    <div>
                      <h3>{project.name}</h3>
                      <p>{localized.role}</p>
                    </div>
                    <p>{localized.summary}</p>
                    <ArrowUpRight className="size-6" aria-hidden="true" />
                  </Link>
                );
              })}
          </div>
        </section>

        <section
          id="about"
          className="gallery-profile gallery-section"
          aria-labelledby="profile-title"
        >
          <div>
            <img
              src="/images/guilherme-costa-profile.webp"
              alt="Guilherme da Silva Costa"
              width={640}
              height={800}
              loading="lazy"
              className="gallery-portrait"
            />
            <p className="mt-4 text-sm text-muted-foreground">
              Senior Business Analyst · EPAM
              <br />
              Curitiba, Brasil
            </p>
          </div>
          <div>
            <h2 id="profile-title">{t.aboutTitle}</h2>
            <div className="gallery-profile-copy">
              {t.about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <h3 className="mt-10 text-xl font-semibold">{t.enterpriseTitle}</h3>
            <p className="mt-3 text-muted-foreground">{t.enterpriseSummary}</p>
            <ul className="gallery-evidence">
              {t.enterpriseEvidence.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <a
              className="gallery-text-link mt-6"
              href="https://www.linkedin.com/in/guilherme-da-silva-costa/"
              target="_blank"
              rel="noreferrer"
            >
              {language === "pt" ? "Conheça minha trajetória" : "Explore my background"}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className="gallery-section" aria-labelledby="expertise-title">
          <div className="gallery-section-heading">
            <h2 id="expertise-title">{t.expertiseTitle}</h2>
          </div>
          <div className="gallery-work-list">
            {expertiseOrder.map((id) => {
              const item = t.expertiseItems[id];
              return (
                <Link key={id} to="/expertise" search={{ focus: id }} className="gallery-work-row">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <ArrowUpRight className="size-5" aria-hidden="true" />
                </Link>
              );
            })}
          </div>
        </section>

        <section id="articles" className="gallery-section" aria-labelledby="writing-title">
          <div className="gallery-section-heading">
            <h2 id="writing-title">{t.ideas}</h2>
            <Link to="/articles" className="gallery-text-link">
              {t.viewAll}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <ArticlesFeed livePosts={linkedInPosts} />
        </section>

        <section id="projects" className="gallery-section" aria-labelledby="repositories-title">
          <div className="gallery-section-heading">
            <h2 id="repositories-title">{t.githubLive}</h2>
            <a
              className="gallery-text-link"
              href="https://github.com/Guilsc"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </div>
          <RepositoriesCarousel projects={projects} />
        </section>

        <section className="gallery-closing" aria-labelledby="contact-title">
          <div>
            <h2 id="contact-title">{t.contactTitle}</h2>
            <p>{t.contactText}</p>
          </div>
          <div className="gallery-closing-links">
            <a href="mailto:guilherme.silva.costa@hotmail.com">
              {language === "pt" ? "Enviar e-mail" : "Email me"}
              <ArrowUpRight aria-hidden="true" className="size-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/guilherme-da-silva-costa/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
              <ArrowUpRight aria-hidden="true" className="size-5" />
            </a>
          </div>
        </section>
      </main>
      <footer className="gallery-footer">
        <span>© 2026 Guilherme da Silva Costa</span>
        <span>Curitiba, Brasil</span>
      </footer>
    </div>
  );
}

const ITEMS_PER_PAGE = 3;

function ArticlesFeed({ livePosts }: { livePosts: LinkedInPost[] }) {
  const { language } = useLanguage();
  const [page, setPage] = useState(0);
  const posts = [...livePosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  if (posts.length === 0) {
    return (
      <p className="border-y border-border py-8 text-sm text-muted-foreground">
        {language === "pt"
          ? "Nenhuma publicação disponível no momento. Explore meus projetos ou visite o LinkedIn."
          : "No posts are available right now. Explore my projects or visit LinkedIn."}
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
        {visiblePosts.map((post) => (
          <a
            key={post.url}
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex min-h-72 flex-col justify-between border border-border bg-card p-6 transition-colors hover:border-primary/60"
          >
            <div>
              <div className="flex items-start justify-between gap-4">
                <span className="font-body text-xs uppercase tracking-widest text-muted-foreground">
                  {post.category || "LINKEDIN"}
                </span>
              </div>
              <p className="mt-8 font-body text-xs uppercase tracking-wider text-primary">
                {formatPublicationDate(post.publishedAt, language)}
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold leading-tight transition-colors group-hover:text-primary">
                {post.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{post.summary}</p>
            </div>
            <span className="mt-8 inline-flex items-center gap-2 font-body text-xs uppercase tracking-wider text-primary">
              {language === "pt" ? "LER NO LINKEDIN" : "READ ON LINKEDIN"}{" "}
              <ArrowUpRight className="size-3" />
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

function formatPublicationDate(value: string, language: "en" | "pt"): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "RECENT";

  return new Intl.DateTimeFormat(language === "pt" ? "pt-BR" : "en-US", {
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
  const { language } = useLanguage();
  const [page, setPage] = useState(0);
  const ownedProjects = projects.filter((project) => !project.fork);
  const pageCount = Math.max(1, Math.ceil(ownedProjects.length / ITEMS_PER_PAGE));
  const safePage = Math.min(page, pageCount - 1);
  const visibleProjects = ownedProjects.slice(
    safePage * ITEMS_PER_PAGE,
    (safePage + 1) * ITEMS_PER_PAGE,
  );

  if (ownedProjects.length === 0) {
    return (
      <p className="border border-border bg-card p-6 text-muted-foreground">
        {language === "pt"
          ? "Nenhum repositório disponível no momento. Veja os trabalhos selecionados acima."
          : "No repositories are available right now. Explore the selected work above."}
      </p>
    );
  }

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-3">
        {visibleProjects.map((project) => {
          const internalSlug = getInternalProjectSlug(project.name);
          const localAppUrl = getLocalAppUrl(project.name);
          const cardClassName =
            "group flex min-h-64 flex-col justify-between border border-border bg-card p-6 transition-colors hover:border-primary/60";
          const cardContent = (
            <>
              <div>
                <div className="flex items-start justify-between gap-4">
                  <span className="font-body text-xs uppercase tracking-widest text-muted-foreground">
                    {project.fork ? (language === "pt" ? "ADAPTAÇÃO" : "FORK") : "ORIGINAL"}
                  </span>
                </div>
                <h3 className="mt-8 break-words font-display text-2xl font-semibold">
                  {project.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {project.description ||
                    (language === "pt"
                      ? "Um repositório público para experimentos, aprendizado e construção de soluções."
                      : "A public repository for experiments, learning, and building solutions.")}
                </p>
              </div>
              <div className="mt-8 flex items-center gap-3 font-body text-xs uppercase tracking-wider text-muted-foreground">
                <span>{project.language || "GITHUB"}</span>
                <span className="size-1 rounded-full bg-border" />
                <span>★ {project.stars}</span>
                <span className="ml-auto inline-flex items-center gap-1 text-primary">
                  {localAppUrl
                    ? language === "pt"
                      ? "ABRIR APP"
                      : "OPEN APP"
                    : internalSlug
                      ? language === "pt"
                        ? "VER PROJETO"
                        : "VIEW PROJECT"
                      : language === "pt"
                        ? "VER REPOSITÓRIO"
                        : "VIEW REPO"}{" "}
                  <ArrowUpRight className="size-3" />
                </span>
              </div>
            </>
          );

          return localAppUrl ? (
            <a key={project.id} href={localAppUrl} className={cardClassName}>
              {cardContent}
            </a>
          ) : internalSlug ? (
            <Link
              key={project.id}
              to="/projects/$slug"
              params={{ slug: internalSlug }}
              className={cardClassName}
            >
              {cardContent}
            </Link>
          ) : (
            <a
              key={project.id}
              href={project.htmlUrl}
              target="_blank"
              rel="noreferrer"
              className={cardClassName}
            >
              {cardContent}
            </a>
          );
        })}
      </div>
      {pageCount > 1 && (
        <CarouselControls
          page={safePage}
          pageCount={pageCount}
          onChange={setPage}
          label="repositories"
        />
      )}
    </div>
  );
}

function CarouselControls({
  page,
  pageCount,
  onChange,
  label,
}: {
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
  label: string;
}) {
  const { language } = useLanguage();
  return (
    <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
      <span className="font-body text-xs tracking-widest text-muted-foreground">
        {String(page + 1).padStart(2, "0")} / {String(pageCount).padStart(2, "0")}
      </span>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onChange(Math.max(0, page - 1))}
          disabled={page === 0}
          aria-label={language === "pt" ? "Página anterior" : `Previous ${label}`}
          className="inline-flex size-11 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ArrowLeft className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => onChange(Math.min(pageCount - 1, page + 1))}
          disabled={page === pageCount - 1}
          aria-label={language === "pt" ? "Próxima página" : `Next ${label}`}
          className="inline-flex size-11 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ArrowRight className="size-4" />
        </button>
      </div>
    </div>
  );
}

function PortfolioLoading() {
  return (
    <div
      className="portfolio-gallery grid min-h-screen place-items-center bg-background text-primary"
      role="status"
    >
      Loading portfolio / Carregando portfólio…
    </div>
  );
}

function PortfolioError() {
  return (
    <div className="portfolio-gallery grid min-h-screen place-items-center bg-background px-6 text-center">
      <div>
        <h1 className="text-3xl">The portfolio could not load.</h1>
        <p className="mt-4">Não foi possível carregar o portfólio.</p>
        <a href="/" className="gallery-text-link mt-6">
          Try again / Tentar novamente
        </a>
      </div>
    </div>
  );
}

function getLocalAppUrl(repositoryName: string) {
  const normalized = repositoryName.toLowerCase().replace(/[_\s]+/g, "-");
  return normalized === "bot-ecosystem" ? "/ecosystem/" : undefined;
}

function getInternalProjectSlug(repositoryName: string) {
  return repositoryName.toLowerCase().replace(/[_\s]+/g, "-");
}
