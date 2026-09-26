# Guilherme Costa — Personal Site

Personal portfolio for Guilherme da Silva Costa, focused on Business Analysis, product delivery, systems/QA, applied AI, public projects, and published content.

Canonical repository: `Guilsc/my-personal-site`  
Production: `https://guilhermecosta.tech`

## Development

Requirements:
- Node.js 22
- npm

```sh
git clone https://github.com/Guilsc/my-personal-site.git
cd my-personal-site
npm install
npm run dev
```

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

Treat `main` as production.

## LinkedIn feed

The Articles & Posts section is prepared to consume the BA Content Engine's versioned public publications API while keeping this site's native React/Tailwind presentation.

The personal site does **not** connect directly to the BA Content Engine database. It only understands the public `v1` publications contract.

Configure the endpoint in Hostinger after the BA Content Engine public API is implemented:

```text
BA_CONTENT_PUBLICATIONS_URL=<public BA Content Engine publications endpoint>
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
