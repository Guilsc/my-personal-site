import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { LanguageSwitcher, useLanguage } from "../lib/i18n";

export function PortfolioHeader() {
  const { language, setLanguage, t } = useLanguage();
  return (
    <header className="gallery-header">
      <a className="gallery-skip" href="#main-content">
        {language === "pt" ? "Ir para o conteúdo" : "Skip to content"}
      </a>
      <div className="gallery-header-top">
        <Link to="/" className="gallery-wordmark">
          Guilherme Costa<span>Business Analysis · Product · AI</span>
        </Link>
        <div className="flex items-center gap-3">
          <LanguageSwitcher language={language} onChange={setLanguage} />
          <a className="gallery-contact" href="mailto:guilherme.silva.costa@hotmail.com">
            {language === "pt" ? "Contato" : "Contact"}
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </a>
        </div>
      </div>
      <nav
        className="gallery-nav"
        aria-label={language === "pt" ? "Navegação principal" : "Primary navigation"}
      >
        <Link to="/" activeOptions={{ exact: true }} activeProps={{ "aria-current": "page" }}>
          {t.backHome}
        </Link>
        <Link to="/projects" activeProps={{ "aria-current": "page" }}>
          {t.nav.projects}
        </Link>
        <Link
          to="/expertise"
          search={{ focus: "business-analysis" }}
          activeProps={{ "aria-current": "page" }}
        >
          {t.nav.expertise}
        </Link>
        <Link to="/articles" activeProps={{ "aria-current": "page" }}>
          {t.nav.articles}
        </Link>
      </nav>
    </header>
  );
}
