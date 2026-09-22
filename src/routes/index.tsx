import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, Github, Linkedin, MapPin } from "lucide-react";

import portrait from "../assets/guilherme-portrait.jpg";
import { getGitHubProjects } from "../lib/github.functions";

const projectsQueryOptions = queryOptions({
  queryKey: ["github-projects", "Guilsc"],
  queryFn: () => getGitHubProjects(),
  staleTime: 10 * 60 * 1000,
});

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Guilherme da Silva Costa — Business Analyst" },
      {
        name: "description",
        content:
          "Portfólio de Guilherme da Silva Costa, Senior Business Analyst conectando negócios, produto, sistemas, QA e IA aplicada.",
      },
      { property: "og:title", content: "Guilherme da Silva Costa — Business Analyst" },
      {
        property: "og:description",
        content: "14+ anos transformando complexidade técnica em decisões claras e entregas viáveis.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(projectsQueryOptions),
  pendingComponent: ProjectsLoading,
  errorComponent: ProjectsError,
  component: Portfolio,
});

const expertise = [
  ["01", "Business Analysis", "Necessidades complexas transformadas em decisões claras."],
  ["02", "Produto & estratégia", "Priorização, alinhamento e entregas orientadas a valor."],
  ["03", "Sistemas & QA", "Dependências, riscos e casos de borda além do happy path."],
  ["04", "IA aplicada", "Análise, documentação e decisões apoiadas por tecnologia."],
];

function Portfolio() {
  const { data: projects } = useSuspenseQuery(projectsQueryOptions);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <a href="#inicio" className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">
            GSC<span className="text-primary">/</span>PORTFOLIO
          </a>
          <nav className="flex items-center gap-5 font-mono text-[9px] tracking-widest text-muted-foreground" aria-label="Principal">
            <a href="#sobre" className="transition-colors hover:text-foreground">SOBRE</a>
            <a href="#projetos" className="transition-colors hover:text-foreground">PROJETOS</a>
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
              Decifrando complexidade técnica em valor real de negócio através de 14+ anos de experiência.
            </p>
            <a href="#sobre" aria-label="Ir para a apresentação" className="mt-10 inline-flex size-11 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary">
              <ArrowDown className="size-4" />
            </a>
          </div>
          <div className="reveal relative md:col-span-5 md:self-end">
            <div className="portrait-frame relative aspect-[4/5] overflow-hidden border border-border bg-card">
              <img src={portrait} alt="Retrato editorial de Guilherme da Silva Costa" width={1200} height={1500} className="h-full w-full object-cover grayscale transition duration-700 hover:grayscale-0" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-[linear-gradient(transparent,var(--background))] px-4 pb-4 pt-20 font-mono text-[9px] tracking-widest text-muted-foreground">
                <span>LEAD ANALYST / EPAM</span><span>CURITIBA, BR</span>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-border/60 bg-secondary/25">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-10 px-5 py-12 md:grid-cols-4 md:px-8">
            {[["Experiência", "14", "Y"], ["Localização", "CURITIBA", ""], ["Especialidade", "IA & QA", ""], ["Atuação", "SENIOR BA", ""]].map(([label, value, suffix]) => (
              <div key={label}>
                <p className="mb-2 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">{label}</p>
                <p className="font-display text-2xl font-semibold md:text-3xl">{value}<span className="text-lg text-primary">{suffix}</span></p>
              </div>
            ))}
          </div>
        </section>

        <section id="sobre" className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:grid-cols-12 md:px-8 md:py-28">
          <div className="md:col-span-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">(01) SOBRE</p>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-none md:text-5xl">Negócio e tecnologia, sem ruído.</h2>
          </div>
          <div className="space-y-6 text-base leading-relaxed text-muted-foreground md:col-span-8 md:text-lg">
            <p>Trabalho entre negócio e tecnologia, ajudando a transformar necessidades complexas em decisões claras e trabalho acionável. Minha trajetória atravessa Testes, Quality Assurance, Business Analysis e produto.</p>
            <p>O background em QA ainda molda minha forma de pensar: procuro dependências, riscos, casos de borda e questiono se uma solução realmente faz sentido além do caminho feliz.</p>
            <p>Hoje, exploro como a inteligência artificial pode apoiar melhores análises, decisões, documentação e entrega de software de forma prática.</p>
            <div className="flex flex-wrap gap-3 pt-2 font-mono text-[10px] tracking-wider text-foreground">
              <span className="border border-border bg-card px-3 py-2">EPAM SYSTEMS</span>
              <span className="border border-border bg-card px-3 py-2">UTFPR</span>
              <span className="inline-flex items-center gap-2 border border-border bg-card px-3 py-2"><MapPin className="size-3 text-primary" /> CURITIBA</span>
            </div>
          </div>
        </section>

        <section className="border-y border-border/60 bg-secondary/20">
          <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-24">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">(02) ESPECIALIDADES</p>
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

        <section id="projetos" className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
          <div className="mb-8 flex items-end justify-between border-b border-border pb-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">(03) PROJETOS PÚBLICOS</p>
              <h2 className="mt-4 font-display text-4xl font-semibold">GitHub, ao vivo.</h2>
            </div>
            <a href="https://github.com/Guilsc" target="_blank" rel="noreferrer" className="hidden items-center gap-2 font-mono text-[10px] text-muted-foreground transition-colors hover:text-primary sm:flex"><Github className="size-4" /> @GUILSC</a>
          </div>
          {projects.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {projects.map((project, index) => (
                <a key={project.id} href={project.htmlUrl} target="_blank" rel="noreferrer" className="group flex min-h-64 flex-col justify-between border border-border bg-card p-6 transition-colors hover:border-primary/60">
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <span className="grid size-8 place-items-center rounded-full border border-border font-mono text-[10px] transition-colors group-hover:border-primary group-hover:text-primary">{String(index + 1).padStart(2, "0")}</span>
                      <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">{project.fork ? "FORK" : "ORIGINAL"}</span>
                    </div>
                    <h3 className="mt-8 break-words font-display text-2xl font-semibold">{project.name}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.description || "Repositório público para experimentos, estudos e construção de soluções."}</p>
                  </div>
                  <div className="mt-8 flex items-center gap-3 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                    <span>{project.language || "GITHUB"}</span><span className="size-1 rounded-full bg-border" /><span>★ {project.stars}</span><span className="ml-auto inline-flex items-center gap-1 text-primary">VER REPO <ArrowUpRight className="size-3" /></span>
                  </div>
                </a>
              ))}
            </div>
          ) : <p className="border border-border bg-card p-6 text-muted-foreground">Nenhum repositório público disponível no momento.</p>}
        </section>

        <section className="border-t border-border bg-secondary/30">
          <div className="mx-auto max-w-4xl px-5 py-20 text-center md:px-8 md:py-28">
            <p className="font-mono text-[10px] tracking-[0.4em] text-primary">CONTATO</p>
            <h2 className="mt-6 font-display text-4xl font-bold leading-none md:text-6xl">Vamos transformar complexidade em clareza.</h2>
            <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">Conheça meu trabalho e entre em contato pelo LinkedIn ou GitHub.</p>
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

function ProjectsLoading() {
  return <div className="grid min-h-screen place-items-center bg-background font-mono text-xs tracking-widest text-primary">CARREGANDO PORTFÓLIO…</div>;
}

function ProjectsError() {
  return <div className="grid min-h-screen place-items-center bg-background px-6 text-center text-muted-foreground">O portfólio não pôde carregar agora. Tente novamente em instantes.</div>;
}
