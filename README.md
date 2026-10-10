# Guilherme Costa — Personal Site

Personal portfolio for Guilherme da Silva Costa, focused on Business Analysis, product delivery, systems/QA, applied AI, public projects, and published content.

Canonical repository: [Guilsc/my-personal-site](https://github.com/Guilsc/my-personal-site)

## Live architecture

The portfolio and Bot Ecosystem are separate applications, repositories, and deployments.

| Application | Production domains | Repository |
| --- | --- | --- |
| Portfolio | [guilhermecosta.tech](https://guilhermecosta.tech) · [www.guilhermecosta.tech](https://www.guilhermecosta.tech) | `Guilsc/my-personal-site` |
| Bot Ecosystem | [bot-ecosystem.guilhermecosta.tech](https://bot-ecosystem.guilhermecosta.tech) · [www.bot-ecosystem.guilhermecosta.tech](https://www.bot-ecosystem.guilhermecosta.tech) | [Guilsc/bot-ecosystem](https://github.com/Guilsc/bot-ecosystem) |

Bot Ecosystem launch buttons on project cards and the project detail page open `https://bot-ecosystem.guilhermecosta.tech` in a new tab in both English and Portuguese. Its portfolio case study remains at `/projects/bot-ecosystem`; the application itself has no portfolio route or bundled static output.

The portfolio uses TanStack Start, React, Vite, and Nitro's Node server preset. `src/routes/__root.tsx` displays the active portfolio interface from `public/olympus-v2/` in an iframe for public portfolio pages. API handlers use TanStack routes; the shell also retains an exclusion for legacy Curatia paths. Curatia's launch link points to its separate deployment.

### Repository layout

- `src/routes/`: TanStack routes, server handlers, and portfolio shell.
- `src/content/`: curated project metadata and EN/PT translations used by React routes.
- `public/olympus-v2/`: active static portfolio interface, bilingual content, and project diagrams. Its `content.js` must stay aligned with `src/content/` when changing launch URLs or copy.
- `public/`: portfolio assets and public data snapshots only.
- `scripts/sync-project-content.mjs`: synchronizes public GitHub README evidence into `src/content/generated/`; it does not build or package applications.
- `docs/design-proposals/`: archived design proposals and historical review evidence, excluded from public deployment. The v2 proposal's Bot Ecosystem link also uses the standalone domain.
- `.github/workflows/`: pull request validation and scheduled project-content synchronization.
- `.output/`: generated Nitro server and public assets, ignored by Git.

## Development

Requirements:
- Node.js 22.12 or newer (production and CI use Node.js 22)
- npm

```sh
git clone https://github.com/Guilsc/my-personal-site.git
cd my-personal-site
npm install
npm run dev
```

Open the local URL printed by Vite. Portfolio development does not require cloning, installing, or starting Bot Ecosystem; launch actions still open the deployed external application. To develop Bot Ecosystem, use its repository and development instructions separately.

To run the portfolio's production artifact locally:

```sh
npm run build
npm run preview
```

`preview` and `start` both run `.output/server/index.mjs`. The server accepts `PORT` and `HOST` from the environment. Builds generate the TanStack route tree; on a fresh checkout, run the build before typechecking if that generated file is absent.

Before opening or updating a pull request, run:

```sh
npm run lint
npm run typecheck
npm run build
```

## Production workflow

Production is deployed automatically from `main` to Hostinger.

```text
feature branch -> pull request -> lint/typecheck/build -> review -> merge to main -> Hostinger auto-deploy
```

Treat `main` as production. The validation workflow checks lint, TypeScript, the production build, the Nitro artifact, and an HTTP smoke test.

The portfolio's Hostinger application uses `npm install` to install dependencies, `npm run build` to produce `.output/server/` and `.output/public/`, and `npm start` to run the Node server. Bind only the portfolio domains listed above to this deployment. `public/` is copied into the build, so keep it free of generated artifacts from other applications.

Deploy Bot Ecosystem from `Guilsc/bot-ecosystem` using its own build and server configuration, with both Bot Ecosystem hostnames bound to that separate application. It is served at the subdomain root. `BOT_ECOSYSTEM_BASE` is not a portfolio setting; leave it unset or use `/` in Bot Ecosystem's own deployment. Never clone or build Bot Ecosystem as part of the portfolio build, copy its assets into the portfolio, or add portfolio rewrites/proxies for it.

When updating an existing hosting workspace, discard previous generated build artifacts and rebuild from the current checkout. Domain aliases, HTTPS certificates, and deployment bindings are managed in Hostinger rather than by portfolio route configuration.

## LinkedIn feed

The Articles & Posts section is prepared to consume the Curatia's versioned public publications API while keeping this site's native React/Tailwind presentation.

The personal site does **not** connect directly to the Curatia database. It only understands the public `v1` publications contract.

Configure the endpoint in Hostinger after the Curatia public API is implemented:

```text
CURATIA_PUBLICATIONS_URL=<public Curatia publications endpoint>
```

The site requests:

```text
channel=linkedin
portfolio=true
limit=3
```

Expected response shape:

```json
{
  "version": "1",
  "publications": [
    {
      "id": "stable-public-id",
      "channel": "linkedin",
      "title": "Example title",
      "summary": "Example summary",
      "category": "Business Analysis",
      "url": "https://www.linkedin.com/feed/update/...",
      "publishedAt": "2026-09-23T11:45:21-03:00"
    }
  ]
}
```

The external request has a short server-side timeout and strict runtime validation. If the API is unavailable, unconfigured, invalid, or returns fewer than three posts, curated entries from `src/content/linkedin-posts.json` are used to keep the section populated up to three cards. Duplicate URLs are removed before rendering.
