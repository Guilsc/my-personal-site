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

The Articles & Posts section reads the public SociableKIT JSON feed at runtime and renders the latest **3 posts** using the portfolio's own React/Tailwind design. SociableKIT is used only as the data source; its embedded visual widget is not used.

The current feed is:

```text
https://data.accentapi.com/feed/25716546.json
```

If the external feed is unavailable or its response cannot be parsed, the site falls back to the curated posts in `src/content/linkedin-posts.json`. No Hostinger environment variable is required for this integration.
