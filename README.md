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

The Articles & Posts section supports a SociableKIT LinkedIn Profile Posts widget while retaining `src/content/linkedin-posts.json` as a safe fallback.

Create the SociableKIT LinkedIn Profile Posts widget with **Dark Mode** enabled and configure it to show **3 posts**. Then enable it in production by adding this Hostinger environment variable:

```text
VITE_SOCIABLEKIT_LINKEDIN_EMBED_ID=<your SociableKIT embed ID>
```

If the variable is missing, the site continues to render the curated JSON posts, capped at 3 items. The SociableKIT embed ID is not a secret; it is part of the public widget embed code.
