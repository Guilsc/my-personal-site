import { useId, useState } from "react";
import { useLanguage } from "../lib/i18n";

const stages = {
  en: [
    {
      name: "Discovery",
      description: "Discover signals and develop ideas that can become editorial work.",
      boundary: "Input: signals and ideas.",
    },
    {
      name: "Context",
      description: "Research and develop editorial context before creating content.",
      boundary: "Input: the idea and its research.",
    },
    {
      name: "Creation",
      description: "Turn the editorial context into content for the intended channel.",
      boundary: "Output: content ready for a human decision.",
    },
    {
      name: "Human approval",
      description: "Approval remains an explicit human decision before publication.",
      boundary: "Boundary: publishing requires human approval.",
    },
    {
      name: "Publishing",
      description:
        "Publish approved content across channels and connect the work to post-publication learning.",
      boundary: "Input: approved content. Next: learning.",
    },
  ],
  pt: [
    {
      name: "Descoberta",
      description: "Descobrir sinais e desenvolver ideias que podem se tornar trabalho editorial.",
      boundary: "Entrada: sinais e ideias.",
    },
    {
      name: "Contexto",
      description: "Pesquisar e desenvolver contexto editorial antes de criar o conteúdo.",
      boundary: "Entrada: a ideia e sua pesquisa.",
    },
    {
      name: "Criação",
      description: "Transformar o contexto editorial em conteúdo para o canal pretendido.",
      boundary: "Saída: conteúdo pronto para uma decisão humana.",
    },
    {
      name: "Aprovação humana",
      description: "A aprovação continua sendo uma decisão humana explícita antes da publicação.",
      boundary: "Limite: publicar exige aprovação humana.",
    },
    {
      name: "Publicação",
      description:
        "Publicar conteúdo aprovado nos canais e conectar o trabalho ao aprendizado pós-publicação.",
      boundary: "Entrada: conteúdo aprovado. Depois: aprendizado.",
    },
  ],
};

export function ProcessExplorer() {
  const { language } = useLanguage();
  const [selected, setSelected] = useState(0);
  const [compare, setCompare] = useState(false);
  const [other, setOther] = useState(3);
  const panelId = useId();
  const list = stages[language];
  const stage = list[selected]!;
  const comparison = list[other]!;
  return (
    <div className="gallery-explorer">
      <div
        className="gallery-process"
        role="group"
        aria-label={
          language === "pt"
            ? "Explorar o ciclo editorial da Curatia"
            : "Explore the Curatia editorial lifecycle"
        }
      >
        {list.map((item, index) => (
          <button
            key={item.name}
            type="button"
            aria-pressed={selected === index}
            onClick={() => setSelected(index)}
            className="gallery-process-step"
          >
            {item.name}
          </button>
        ))}
      </div>
      <div className="gallery-stage" aria-live="polite" aria-atomic="true">
        <h3>{stage.name}</h3>
        <p>{stage.description}</p>
      </div>
      <button
        type="button"
        className="gallery-compare-button"
        aria-expanded={compare}
        aria-controls={panelId}
        onClick={() => setCompare(!compare)}
      >
        {language === "pt"
          ? compare
            ? "Fechar comparação"
            : "Comparar duas etapas"
          : compare
            ? "Close comparison"
            : "Compare two stages"}
      </button>
      <div id={panelId} hidden={!compare} className="gallery-comparison">
        <div>
          <label htmlFor={`${panelId}-left`}>
            {language === "pt" ? "Primeira etapa" : "First stage"}
          </label>
          <select
            id={`${panelId}-left`}
            value={selected}
            onChange={(event) => setSelected(Number(event.target.value))}
          >
            {list.map((item, index) => (
              <option key={item.name} value={index}>
                {item.name}
              </option>
            ))}
          </select>
          <h3>{stage.name}</h3>
          <p>{stage.description}</p>
          <p className="gallery-boundary">{stage.boundary}</p>
        </div>
        <div>
          <label htmlFor={`${panelId}-right`}>
            {language === "pt" ? "Segunda etapa" : "Second stage"}
          </label>
          <select
            id={`${panelId}-right`}
            value={other}
            onChange={(event) => setOther(Number(event.target.value))}
          >
            {list.map((item, index) => (
              <option key={item.name} value={index}>
                {item.name}
              </option>
            ))}
          </select>
          <h3>{comparison.name}</h3>
          <p>{comparison.description}</p>
          <p className="gallery-boundary">{comparison.boundary}</p>
        </div>
        {selected === other && (
          <p role="status">
            {language === "pt"
              ? "Você selecionou a mesma etapa. Escolha outra para comparar."
              : "You selected the same stage. Choose a different one to compare."}
          </p>
        )}
      </div>
    </div>
  );
}
