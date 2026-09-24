# My Tech Palette

Create a personal website com foco tech.design parecido com https://www.escadassummit.com.br/v2?utm_source=IG_Bio_v2&utm_medium=social&utm_content=link_in_bio&lp_variant=v2 porém falando um pouco de mim e aí a sessão de projetos que puxará do git.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/5c324007-f76d-59a8-987a-7168b68c50bc).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```


## Production workflow

Production is deployed from `main` to Hostinger. Normal changes should follow:

```text
feature branch -> pull request -> CI build check -> merge to main -> Hostinger auto-deploy
```

Do not use Lovable as the day-to-day deployment path.

## LinkedIn feed

The Articles & Posts section is prepared to consume the BA Content Engine's versioned public publications API and render the latest **3 LinkedIn posts** using this site's native React/Tailwind design.

The personal site does **not** connect directly to the BA Content Engine database. It only understands the public `v1` publications contract.

Configure the API endpoint in Hostinger when the BA Content Engine endpoint is implemented:

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

Until the endpoint exists—or whenever it is unavailable or returns an invalid response—the site falls back to `src/content/linkedin-posts.json`.
