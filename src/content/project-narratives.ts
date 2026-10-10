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
      "Mantive a aplicação independente do Olympus OS para que ela possa visualizar outros repositórios.",
      "Publiquei a aplicação de forma independente em seu próprio subdomínio, com link no portfólio.",
    ],
    outcomes: [
      "Uma interface visual executável para explorar a atividade dos repositórios.",
      "Uma aplicação reutilizável que pode apoiar o Olympus OS e outros repositórios.",
    ],
    next: "Expandir sinais dos repositórios e visualizações da atividade dos agentes conforme os projetos evoluem.",
  },
  "olympus-os": {
    problem:
      "Coordenar agentes persistentes de IA sem concentrar responsabilidade, memória, governança e execução em um único assistente.",
    approach: [
      "Defini limites explícitos de responsabilidade para agentes e Realms.",
      "Separei contexto de trabalho, memória dos agentes e conhecimento compartilhado curado.",
      "Desenhei skills reutilizáveis, políticas de ciclo de vida, caminhos de escalonamento e limites de aprovação humana.",
    ],
    outcomes: [
      "Um modelo operacional documentado para equipes de agentes, com limites explícitos de autoridade e memória.",
      "Autoavaliações que expõem limitações técnicas sem tratar instruções comportamentais como permissões efetivamente impostas.",
    ],
    next: "Validar orquestração, aplicação de permissões, conhecimento compartilhado e observabilidade conforme a implementação evolui.",
  },
};
export function getProjectNarrative(slug: string, language: Language): Partial<Narrative> {
  return language === "pt" ? (portuguese[slug] ?? {}) : {};
}
