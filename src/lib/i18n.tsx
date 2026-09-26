import { useEffect, useState } from "react";

export type Language = "en" | "pt";

export const copy = {
  en: {
    nav: { about: "ABOUT", articles: "ARTICLES", projects: "PROJECTS" },
    hero: "Turning technical complexity into real business value through 14+ years of experience.",
    aboutTitle: "Business and technology, without the noise.",
    about: [
      "I work between business and technology, turning complex needs into clear decisions and actionable work. My career spans software testing, Quality Assurance, Business Analysis, and product-focused delivery.",
      "My QA background still shapes how I think: I look for dependencies, risks, and edge cases, and ask whether a solution truly works beyond the happy path.",
      "Today, I explore practical ways for artificial intelligence to support better analysis, decision-making, documentation, and software delivery.",
    ],
    expertise: "EXPERTISE",
    articles: "ARTICLES & POSTS",
    ideas: "Ideas in practice.",
    moreLinkedIn: "MORE ON LINKEDIN",
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
  },
  pt: {
    nav: { about: "SOBRE", articles: "ARTIGOS", projects: "PROJETOS" },
    hero: "Transformando complexidade técnica em valor real para o negócio através de mais de 14 anos de experiência.",
    aboutTitle: "Negócios e tecnologia, sem ruído.",
    about: [
      "Trabalho entre negócios e tecnologia, transformando necessidades complexas em decisões claras e trabalho acionável. Minha carreira passa por testes de software, Quality Assurance, Business Analysis e entrega orientada a produto.",
      "Minha experiência em QA ainda molda como penso: procuro dependências, riscos e casos de borda, e questiono se uma solução realmente funciona além do caminho feliz.",
      "Hoje, exploro formas práticas de usar inteligência artificial para apoiar melhores análises, decisões, documentação e entrega de software.",
    ],
    expertise: "ESPECIALIDADES",
    articles: "ARTIGOS & POSTS",
    ideas: "Ideias na prática.",
    moreLinkedIn: "MAIS NO LINKEDIN",
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
  },
} as const;

export function useLanguage() {
  const [language, setLanguageState] = useState<Language>("en");
  useEffect(() => {
    const saved = window.localStorage.getItem("gsc-language");
    if (saved === "pt" || saved === "en") setLanguageState(saved);
  }, []);
  const setLanguage = (next: Language) => {
    setLanguageState(next);
    window.localStorage.setItem("gsc-language", next);
    document.documentElement.lang = next === "pt" ? "pt-BR" : "en";
    window.dispatchEvent(new CustomEvent("gsc-language-change", { detail: next }));
  };
  useEffect(() => {
    const sync = (event: Event) => setLanguageState((event as CustomEvent<Language>).detail);
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
