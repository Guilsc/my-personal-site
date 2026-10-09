import type { Language } from "../lib/i18n";

export type LocalizedProjectContent = {
  eyebrow: string;
  summary: string;
  description: string;
  takeaways: string[];
  role?: string;
};

export type ProjectContentManifest = {
  sourceLanguage: Language;
  sourceHash: string;
  translations: Record<Language, LocalizedProjectContent>;
};

// Generated/curated manifests live here. The sourceHash is refreshed by Project Content Sync.
// Curated portfolio metadata remains authoritative for launch URL, status and tags.
export const projectContent: Record<string, ProjectContentManifest> = {
  "curatia-content-engine": {
    sourceLanguage: "en",
    sourceHash: "curated-v1",
    translations: {
      en: {
        eyebrow: "EDITORIAL INTELLIGENCE SYSTEM",
        summary: "An editorial intelligence and content operations platform for turning signals into context, decisions, creation, publishing, and learning.",
        description: "Curatia connects signal discovery, idea development, editorial research, creation, publishing, and post-publication learning in one governed workspace. It combines editorial intelligence with multi-channel execution while keeping approval and publishing as explicit human decisions.",
        takeaways: ["Separates editorial intelligence from persistent application data.", "Uses explicit human approval as a hard publishing boundary.", "Connects discovery, creation, publishing, and learning into one lifecycle."],
        role: "Product owner, workflow designer, and builder"
      },
      pt: {
        eyebrow: "SISTEMA DE INTELIGÊNCIA EDITORIAL",
        summary: "Uma plataforma de inteligência editorial e operações de conteúdo para transformar sinais em contexto, decisões, criação, publicação e aprendizado.",
        description: "Curatia conecta descoberta de sinais, desenvolvimento de ideias, pesquisa editorial, criação, publicação e aprendizado pós-publicação em um workspace governado. A plataforma combina inteligência editorial com execução multicanal, mantendo aprovação e publicação como decisões humanas explícitas.",
        takeaways: ["Separa a inteligência editorial dos dados persistentes da aplicação.", "Usa aprovação humana explícita como limite obrigatório para publicação.", "Conecta descoberta, criação, publicação e aprendizado em um único ciclo."],
        role: "Product owner, designer do workflow e builder"
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
        description: "Bot Ecosystem is an independent evolution derived from Bot Crossing, designed as a reusable visual layer for exploring coding-agent activity across repositories. It can be used with Olympus or other projects without belonging to any one of them.",
        takeaways: ["Turns repository activity into a visual, explorable interface.", "Remains reusable instead of being coupled to a single agent system.", "Shares the personal-site deployment while keeping its own application boundary."],
        role: "Product designer and builder"
      },
      pt: {
        eyebrow: "FERRAMENTA DE VISUALIZAÇÃO DE REPOSITÓRIOS",
        summary: "Uma interface reutilizável que transforma repositórios de software em um universo explorável orientado por agentes.",
        description: "Bot Ecosystem é uma evolução independente derivada do Bot Crossing, criada como uma camada visual reutilizável para explorar a atividade de agentes de código entre repositórios. Pode ser usado com Olympus ou outros projetos sem pertencer exclusivamente a nenhum deles.",
        takeaways: ["Transforma a atividade dos repositórios em uma interface visual e explorável.", "Permanece reutilizável em vez de ficar acoplado a um único sistema de agentes.", "Compartilha o deployment do site pessoal mantendo sua própria fronteira de aplicação."],
        role: "Product designer e builder"
      }
    }
  },
  "olympus": {
    sourceLanguage: "en",
    sourceHash: "curated-v1",
    translations: {
      en: {
        eyebrow: "MULTI-AGENT OPERATING SYSTEM",
        summary: "A modular foundation for governed AI agent teams, with canonical roles, owned domains, and accountable handoffs.",
        description: "Olympus is a clean rebuild of a governable, extensible agent architecture. Canonical roles are distinct from narrative aliases: Governor, Orchestrator, and Domain Owner. Six Domain/Owner contracts and host-side validation establish bounded decisions and handoffs. Persistent runtime, agent memory, Workers, and shared capabilities remain deferred.",
        takeaways: ["Makes agent ownership and responsibility explicit.", "Separates working context, agent memory, and curated shared knowledge.", "Treats skills, lifecycle policies, and governance as first-class architecture."],
        role: "Operating-model designer and agent-system architect"
      },
      pt: {
        eyebrow: "SISTEMA OPERACIONAL MULTIAGENTE",
        summary: "Uma fundação modular para equipes de agentes de IA governadas, com papéis canônicos, domínios responsáveis e handoffs claros.",
        description: "Olympus é uma reconstrução limpa de uma arquitetura de agentes governável e extensível. Papéis canônicos são separados dos aliases narrativos: Governor, Orchestrator e Domain Owner. Seis contratos Domain/Owner e validações externas demonstram decisões e transferências de responsabilidade delimitadas. Runtime persistente, memória de agentes, Workers e capacidades compartilhadas permanecem adiados.",
        takeaways: ["Torna explícitas a responsabilidade e a propriedade de cada agente.", "Separa contexto de trabalho, memória do agente e conhecimento compartilhado curado.", "Trata skills, políticas de ciclo de vida e governança como elementos centrais da arquitetura."],
        role: "Designer do modelo operacional e arquiteto de sistemas de agentes"
      }
    }
  }
};

export function getLocalizedProjectContent(slug: string, language: Language) {
  return projectContent[slug]?.translations[language] ?? projectContent[slug]?.translations.en;
}
