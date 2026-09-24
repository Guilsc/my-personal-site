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

The Articles & Posts section reads published portfolio content from the BA Content Engine Supabase project and renders the latest **3 LinkedIn posts** using this site's native React/Tailwind design.

Only rows matching all of these conditions are readable by the portfolio:

- `status = 'Published'`
- `show_on_portfolio = true`
- `channel = 'linkedin'`

Configure these environment variables in Hostinger:

```text
SUPABASE_URL=https://jzceajrfqtrdemptlfbp.supabase.co
SUPABASE_PUBLISHABLE_KEY=<Supabase publishable key>
```

The publishable key is intentionally used with a narrow Supabase RLS policy; drafts, scheduled items, and non-portfolio content remain inaccessible. If Supabase is unavailable, unconfigured, or returns no published portfolio items, the site falls back to `src/content/linkedin-posts.json`.
