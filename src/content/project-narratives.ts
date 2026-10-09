import type { PortfolioProject } from "./projects";
import type { Language } from "../lib/i18n";

type Narrative = Pick<PortfolioProject, "problem" | "approach" | "outcomes" | "next">;
const portuguese: Record<string, Narrative> = {
  "curatia-content-engine": {
    problem:
      "Conectar descoberta de sinais, pesquisa, criação, aprovação, publicação multicanal e aprendizado em um fluxo editorial governado.",
    approach: [
      "Desenhei um ciclo editorial explícito, do sinal ao aprendizado.",
      "Separei a inteligência editorial dos dados persistentes da aplicação.",
      "Defini a aprovação humana como limite obrigatório antes da publicação.",
    ],
    outcomes: [
      "Uma plataforma funcional de inteligência editorial com um modelo operacional definido.",
      "Um ciclo reutilizável que conecta descoberta, criação, publicação e aprendizado sem eliminar a aprovação humana.",
    ],
    next: "Expandir criação multicanal, distribuição, analytics e orquestração de agentes preservando os limites explícitos de aprovação.",
  },
  "bot-ecosystem": {
    problem:
      "Tornar a atividade de repositórios e agentes de programação mais compreensível que uma lista convencional de arquivos, commits e logs.",
    approach: [
      "Evoluí o conceito original do Bot Crossing para uma camada reutilizável de visualização.",
      "Mantive a aplicação independente do Olympus para que ela possa visualizar outros repositórios.",
      "Integrei a aplicação ao deploy do portfólio sem eliminar sua separação como aplicação.",
    ],
    outcomes: [
      "Uma interface visual executável para explorar a atividade dos repositórios.",
      "Uma aplicação reutilizável que pode apoiar o Olympus e outros repositórios.",
    ],
    next: "Expandir sinais dos repositórios e visualizações da atividade dos agentes conforme os projetos evoluem.",
  },
  "olympus": {
    problem:
      "Coordenar agentes persistentes de IA sem concentrar responsabilidade, memória, governança e execução em um único assistente.",
    approach: [
      "Separei papéis canônicos, aliases narrativos e contratos de responsabilidade de cada domínio.",
      "Defini Governor, Orchestrator e seis pares Domain/Owner declarativos, com limites explícitos.",
      "Validei handoffs e decisões delimitadas em conversas isoladas no host externo.",
    ],
    outcomes: [
      "Uma arquitetura modular documentada com seis contratos Domain/Owner e papéis declarativos validados.",
      "Evidências de validação externa, sem alegar runtime persistente ou execução de produção.",
    ],
    next: "Evoluir para um runtime mínimo apenas por blocos aprovados, mantendo memória e capacidades compartilhadas fora do escopo atual.",
  },
};
export function getProjectNarrative(slug: string, language: Language): Partial<Narrative> {
  return language === "pt" ? (portuguese[slug] ?? {}) : {};
}
