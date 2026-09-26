import { useEffect, useState } from "react";

let runtimeLanguage: Language = "en";

export type Language = "en" | "pt";

export const copy = {
  en: {
    nav: { about: "ABOUT", articles: "ARTICLES", projects: "PROJECTS", expertise: "EXPERTISE" },
    hero: "Turning technical complexity into real business value through 14+ years of experience.",
    aboutTitle: "Business and technology, without the noise.",
    about: [
      "I work between business and technology, turning complex needs into clear decisions and actionable work. My career spans software testing, Quality Assurance, Business Analysis, and product-focused delivery.",
      "My QA background still shapes how I think: I look for dependencies, risks, and edge cases, and ask whether a solution truly works beyond the happy path.",
      "Today, I explore practical ways for artificial intelligence to support better analysis, decision-making, documentation, and software delivery.",
    ],
    expertise: "EXPERTISE",
    expertiseTitle: "Evidence behind the expertise.",
    expertiseIntro: "Projects, writing, and career experience connected to each area of practice.",
    expertiseItems: {
      "business-analysis": { title: "Business Analysis", description: "Complex needs translated into clear, actionable decisions." },
      "product-strategy": { title: "Product & Strategy", description: "Prioritization, alignment, and value-driven delivery." },
      "systems-qa": { title: "Systems & QA", description: "Dependencies, risks, and edge cases beyond the happy path." },
      "applied-ai": { title: "Applied AI", description: "Technology supporting sharper analysis, documentation, and decisions." },
    },
    evidence: "CAPABILITIES", projectsEvidence: "PROJECTS", writingEvidence: "WRITING", careerEvidence: "CAREER", contextsEvidence: "CONTEXTS",
    articles: "ARTICLES & POSTS",
    ideas: "Ideas in practice.",
    moreLinkedIn: "MORE ON LINKEDIN",
    viewAll: "VIEW ALL", viewMore: "VIEW MORE", articlesTitle: "Writing & ideas.", articlesIntro: "Original articles and posts across Business Analysis, product, systems, QA, and applied AI.",
    articleFilters: { all: "ALL", coffee: "COFFEE WITH A BA", articles: "ARTICLES" },
    repositories: "PUBLIC REPOSITORIES",
    githubLive: "Live from GitHub.",
    contactTitle: "Let’s turn complexity into clarity.",
    contactText: "Explore my work and connect with me on LinkedIn or GitHub.",
    projectsTitle: "Systems I'm building.",
    projectsIntro: "Public repositories become project pages automatically. Launchable and starred work can be isolated without splitting the catalog.",
    filters: { all: "ALL", repositories: "REPOSITORIES", launch: "LAUNCH", starred: "STARRED" },
    noProjects: "NO PROJECTS IN THIS VIEW.",
    allRepos: "ALL PUBLIC REPOSITORIES",
    backHome: "HOME", backProjects: "PROJECTS", source: "SOURCE", status: "STATUS",
    takeaways: "KEY TAKEAWAYS", lens: "PROJECT LENS", capabilities: "CAPABILITIES",
    myRole: "MY ROLE", problem: "PROBLEM", approach: "APPROACH", outcomes: "OUTCOMES", next: "NEXT",
    selectedImpact: "SELECTED IMPACT", impactTitle: "Work that connects analysis to outcomes.", impactIntro: "Selected evidence across enterprise delivery, product building, and agent-system design.",
    enterpriseTitle: "Enterprise Transformation", enterpriseEyebrow: "PROFESSIONAL WORK", enterpriseSummary: "Senior Business Analysis across enterprise onboarding, integrations, process design, UAT, and AI-assisted delivery.", enterpriseRole: "Senior Business Analyst · EPAM", enterpriseEvidence: ["Salesforce and MuleSoft integration analysis", "Onboarding and field-mapping design across multiple channels", "UAT coordination, test-data collaboration, and edge-case analysis", "AI-assisted workflows and internal AI initiatives"],
    professionalAI: "PROFESSIONAL AI", aiPlatforms: "PLATFORMS", aiArchitecture: "ARCHITECTURE",
  },
  pt: {
    nav: { about: "SOBRE", articles: "ARTIGOS", projects: "PROJETOS", expertise: "ESPECIALIDADES" },
    hero: "Transformando complexidade técnica em valor real para o negócio através de mais de 14 anos de experiência.",
    aboutTitle: "Negócios e tecnologia, sem ruído.",
    about: [
      "Trabalho entre negócios e tecnologia, transformando necessidades complexas em decisões claras e trabalho acionável. Minha carreira passa por testes de software, Quality Assurance, Business Analysis e entrega orientada a produto.",
      "Minha experiência em QA ainda molda como penso: procuro dependências, riscos e casos de borda, e questiono se uma solução realmente funciona além do caminho feliz.",
      "Hoje, exploro formas práticas de usar inteligência artificial para apoiar melhores análises, decisões, documentação e entrega de software.",
    ],
    expertise: "ESPECIALIDADES",
    expertiseTitle: "Evidências por trás da experiência.",
    expertiseIntro: "Projetos, publicações e trajetória profissional conectados a cada área de atuação.",
    expertiseItems: {
      "business-analysis": { title: "Business Analysis", description: "Necessidades complexas transformadas em decisões claras e acionáveis." },
      "product-strategy": { title: "Produto & Estratégia", description: "Priorização, alinhamento e entrega orientada a valor." },
      "systems-qa": { title: "Sistemas & QA", description: "Dependências, riscos e casos de borda além do caminho feliz." },
      "applied-ai": { title: "IA Aplicada", description: "Tecnologia apoiando análises, documentação e decisões mais precisas." },
    },
    evidence: "CAPACIDADES", projectsEvidence: "PROJETOS", writingEvidence: "PUBLICAÇÕES", careerEvidence: "CARREIRA", contextsEvidence: "CONTEXTOS",
    articles: "ARTIGOS & POSTS",
    ideas: "Ideias na prática.",
    moreLinkedIn: "MAIS NO LINKEDIN",
    viewAll: "VER TODOS", viewMore: "VER MAIS", articlesTitle: "Textos & ideias.", articlesIntro: "Artigos e posts autorais sobre Business Analysis, produto, sistemas, QA e IA aplicada.",
    articleFilters: { all: "TODOS", coffee: "COFFEE WITH A BA", articles: "ARTIGOS" },
    repositories: "REPOSITÓRIOS PÚBLICOS",
    githubLive: "Direto do GitHub.",
    contactTitle: "Vamos transformar complexidade em clareza.",
    contactText: "Explore meu trabalho e conecte-se comigo no LinkedIn ou GitHub.",
    projectsTitle: "Sistemas que estou construindo.",
    projectsIntro: "Repositórios públicos ganham páginas de projeto automaticamente. Projetos executáveis e favoritos podem ser filtrados sem dividir o catálogo.",
    filters: { all: "TODOS", repositories: "REPOSITÓRIOS", launch: "LAUNCH", starred: "FAVORITOS" },
    noProjects: "NENHUM PROJETO NESTA VISÃO.",
    allRepos: "TODOS OS REPOSITÓRIOS PÚBLICOS",
    backHome: "INÍCIO", backProjects: "PROJETOS", source: "CÓDIGO", status: "STATUS",
    takeaways: "PRINCIPAIS APRENDIZADOS", lens: "VISÃO DO PROJETO", capabilities: "CAPACIDADES",
    myRole: "MEU PAPEL", problem: "PROBLEMA", approach: "ABORDAGEM", outcomes: "RESULTADOS", next: "PRÓXIMOS PASSOS",
    selectedImpact: "IMPACTO SELECIONADO", impactTitle: "Trabalho que conecta análise a resultados.", impactIntro: "Evidências selecionadas entre entrega enterprise, construção de produtos e design de sistemas de agentes.",
    enterpriseTitle: "Transformação Enterprise", enterpriseEyebrow: "ATUAÇÃO PROFISSIONAL", enterpriseSummary: "Business Analysis sênior em onboarding enterprise, integrações, desenho de processos, UAT e entrega assistida por IA.", enterpriseRole: "Senior Business Analyst · EPAM", enterpriseEvidence: ["Análise de integrações Salesforce e MuleSoft", "Desenho de onboarding e mapeamento de campos em múltiplos canais", "Coordenação de UAT, colaboração em dados de teste e análise de casos de borda", "Workflows assistidos por IA e iniciativas internas de IA"],
    professionalAI: "IA PROFISSIONAL", aiPlatforms: "PLATAFORMAS", aiArchitecture: "ARQUITETURA",
  },
} as const;

export function useLanguage() {
  const [language, setLanguageState] = useState<Language>(() => runtimeLanguage);

  const setLanguage = (next: Language) => {
    runtimeLanguage = next;
    setLanguageState(next);
    document.documentElement.lang = next === "pt" ? "pt-BR" : "en";
    window.dispatchEvent(new CustomEvent("gsc-language-change", { detail: next }));
  };

  useEffect(() => {
    document.documentElement.lang = runtimeLanguage === "pt" ? "pt-BR" : "en";
    const sync = (event: Event) => {
      const next = (event as CustomEvent<Language>).detail;
      runtimeLanguage = next;
      setLanguageState(next);
    };
    window.addEventListener("gsc-language-change", sync);
    return () => window.removeEventListener("gsc-language-change", sync);
  }, []);

  return { language, setLanguage, t: copy[language] };
}

export function LanguageSwitcher({ language, onChange }: { language: Language; onChange: (language: Language) => void }) {
  return (
    <div className="flex border border-border" aria-label="Language">
      {(["en", "pt"] as const).map((item) => (
        <button key={item} type="button" onClick={() => onChange(item)} aria-pressed={language === item} className={`px-2.5 py-2 font-mono text-[9px] tracking-widest transition-colors ${language === item ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-primary"}`}>
          {item.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
