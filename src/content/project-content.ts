import type { Language } from "../lib/i18n";

export type LocalizedProjectContent = {
  eyebrow: string;
  summary: string;
  description: string;
  takeaways: string[];
};

export type ProjectContentManifest = {
  sourceLanguage: Language;
  sourceHash: string;
  translations: Record<Language, LocalizedProjectContent>;
};

// Generated/curated manifests live here. The sourceHash is refreshed by Project Content Sync.
// Curated portfolio metadata remains authoritative for launch URL, status and tags.
export const projectContent: Record<string, ProjectContentManifest> = {
  "ba-content-engine": {
    sourceLanguage: "en",
    sourceHash: "curated-v1",
    translations: {
      en: {
        eyebrow: "EDITORIAL INTELLIGENCE SYSTEM",
        summary: "A structured system for turning signals into researched, approved, published, and learned-from Business Analysis content.",
        description: "BA Content Engine connects trend discovery, idea development, editorial research, drafting, publishing, and post-publication learning into one governed workflow. The project keeps editorial intelligence separate from persistent application data and treats approval as an explicit human decision.",
        takeaways: ["Separates editorial intelligence from persistent application data.", "Uses explicit human approval as a hard publishing boundary.", "Connects discovery, creation, publishing, and learning into one lifecycle."]
      },
      pt: {
        eyebrow: "SISTEMA DE INTELIGÊNCIA EDITORIAL",
        summary: "Um sistema estruturado para transformar sinais em conteúdo de Business Analysis pesquisado, aprovado, publicado e continuamente aprimorado.",
        description: "O BA Content Engine conecta descoberta de tendências, desenvolvimento de ideias, pesquisa editorial, redação, publicação e aprendizado pós-publicação em um único fluxo governado. O projeto separa a inteligência editorial dos dados persistentes da aplicação e trata a aprovação como uma decisão humana explícita.",
        takeaways: ["Separa a inteligência editorial dos dados persistentes da aplicação.", "Usa aprovação humana explícita como limite obrigatório para publicação.", "Conecta descoberta, criação, publicação e aprendizado em um único ciclo."]
      }
    }
  },
  "bot-ecosystem": {
    sourceLanguage: "en",
    sourceHash: "curated-v1",
    translations: {
      en: {
        eyebrow: "REPOSITORY VISUALIZATION TOOL",
        summary: "A reusable interface for turning software repositories into an explorable agent-driven world.",
        description: "Bot Ecosystem is an independent evolution derived from Bot Crossing, designed as a reusable visual layer for exploring coding-agent activity across repositories. It can be used with Olympus OS or other projects without belonging to any one of them.",
        takeaways: ["Turns repository activity into a visual, explorable interface.", "Remains reusable instead of being coupled to a single agent system.", "Shares the personal-site deployment while keeping its own application boundary."]
      },
      pt: {
        eyebrow: "FERRAMENTA DE VISUALIZAÇÃO DE REPOSITÓRIOS",
        summary: "Uma interface reutilizável que transforma repositórios de software em um universo explorável orientado por agentes.",
        description: "Bot Ecosystem é uma evolução independente derivada do Bot Crossing, criada como uma camada visual reutilizável para explorar a atividade de agentes de código entre repositórios. Pode ser usado com Olympus OS ou outros projetos sem pertencer exclusivamente a nenhum deles.",
        takeaways: ["Transforma a atividade dos repositórios em uma interface visual e explorável.", "Permanece reutilizável em vez de ficar acoplado a um único sistema de agentes.", "Compartilha o deployment do site pessoal mantendo sua própria fronteira de aplicação."]
      }
    }
  },
  "olympus-os": {
    sourceLanguage: "en",
    sourceHash: "curated-v1",
    translations: {
      en: {
        eyebrow: "MULTI-AGENT OPERATING SYSTEM",
        summary: "An agent operating model for coordinated AI teams, with explicit ownership, memory boundaries, reusable skills, and governed workflows.",
        description: "Olympus OS explores how persistent agents can work as a coherent team without collapsing responsibilities into one giant assistant. It separates agent-local operational memory from curated shared knowledge, gives domains clear owners, and uses reusable skills and lifecycle policies to make the system understandable and operable.",
        takeaways: ["Makes agent ownership and responsibility explicit.", "Separates working context, agent memory, and curated shared knowledge.", "Treats skills, lifecycle policies, and governance as first-class architecture."]
      },
      pt: {
        eyebrow: "SISTEMA OPERACIONAL MULTIAGENTE",
        summary: "Um modelo operacional de agentes para equipes coordenadas de IA, com responsabilidades explícitas, limites de memória, skills reutilizáveis e fluxos governados.",
        description: "Olympus OS explora como agentes persistentes podem trabalhar como uma equipe coerente sem concentrar todas as responsabilidades em um único assistente. Ele separa a memória operacional local de cada agente do conhecimento compartilhado e curado, define responsáveis claros por domínio e usa skills reutilizáveis e políticas de ciclo de vida para tornar o sistema compreensível e operável.",
        takeaways: ["Torna explícitas a responsabilidade e a propriedade de cada agente.", "Separa contexto de trabalho, memória do agente e conhecimento compartilhado curado.", "Trata skills, políticas de ciclo de vida e governança como elementos centrais da arquitetura."]
      }
    }
  }
};

export function getLocalizedProjectContent(slug: string, language: Language) {
  return projectContent[slug]?.translations[language] ?? projectContent[slug]?.translations.en;
}
