# Personal Site Backlog

Canonical repository: `Guilsc/my-personal-site`  
Production branch: `main`  
Production domain: `guilhermecosta.tech`

## Infrastructure

- [x] Gate pull requests with lint, TypeScript typecheck, and production build validation

- [x] Connect Hostinger production app directly to this GitHub repository
- [x] Configure Hostinger to deploy automatically from `main`
- [x] Confirm the correct Node.js build and start commands for the current TanStack Start/Nitro app
- [x] Verify custom domain and HTTPS after the first GitHub-driven deployment
- [x] Remove any manual deployment step that is no longer needed

## Integrations

- [x] Load public repositories dynamically from GitHub
- [x] Prepare the Articles & Posts section to consume the BA Content Engine v1 public publications API
- [x] Deploy the BA Content Engine v1 public publications endpoint
- [ ] Configure `BA_CONTENT_PUBLICATIONS_URL` in Hostinger
- [ ] Validate latest-3 published-post rendering against the live BA public API
- [x] Add graceful fallbacks for external content integrations
- [x] Add timeout and runtime validation to the publications API client
- [x] Keep Articles & Posts filled up to 3 items using curated fallback content
- [x] Show publication dates and keep fallback content aligned with the live feed

## Content

- [ ] Keep profile, experience, links, and other frequently edited copy in dedicated content files
- [ ] Review current copy for freshness and consistency
- [ ] Keep Articles & Posts limited to the most relevant recent items

## Enhancements

- [ ] Improve SEO/social metadata, including a dedicated Open Graph image
- [ ] Add lightweight analytics only if there is a clear need and free/low-cost option
- [ ] Review accessibility and performance after deployment migration

## Completed foundation

- [x] Create current portfolio visual direction
- [x] Add professional profile and portrait
- [x] Display public GitHub repositories
- [x] Validate mobile and desktop experience
- [x] Keep visible content in English
- [x] Add Articles & Posts section
- [x] Add Business Analysis case-study content
- [x] Add career/profile content
- [x] Centralize current LinkedIn post data in `src/content/linkedin-posts.json`
