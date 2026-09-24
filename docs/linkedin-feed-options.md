# LinkedIn feed decision record

Last updated: 2026-09-24

This document preserves the viable LinkedIn feed approaches for the personal site so an experiment does not erase a previously designed solution.

## Current production behavior

The site still has a local fallback in `src/content/linkedin-posts.json`.

No Firecrawl integration is in production.

## Option A — BA Content Engine public API

**Status:** preserved and implementation-ready, but not selected for the current experiment.

Personal Site PR #2 contains the current consumer implementation:

- PR: https://github.com/Guilsc/my-personal-site/pull/2
- branch: `integration/linkedin-sociablekit`
- configuration: `BA_CONTENT_PUBLICATIONS_URL`
- fallback: `src/content/linkedin-posts.json`

The consumer expects the versioned contract:

```http
GET /api/v1/publications?channel=linkedin&portfolio=true&limit=3
```

Expected response:

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

The provider-side contract is documented separately in BA Content Engine PR #2:

https://github.com/Guilsc/ba-content-engine/pull/2

### Direct next steps if this option is revisited

1. Implement the BA Content Engine `v1` publications endpoint without exposing its internal database schema.
2. Keep the response fields above backward-compatible.
3. Deploy the endpoint and configure `BA_CONTENT_PUBLICATIONS_URL` in Hostinger.
4. Validate the latest-three response plus the local JSON fallback.
5. Re-run the personal-site senior PR review before merge.
6. Only after validation, decide whether the local fallback remains permanent or becomes emergency-only.

## Option B — Firecrawl public LinkedIn scrape

**Status:** active proof of concept.

Goal: determine whether Firecrawl can retrieve the latest public posts from Guilherme's LinkedIn activity page without authenticating to LinkedIn.

Target:

```text
https://www.linkedin.com/in/guilherme-da-silva-costa/recent-activity/all/
```

Constraints for the experiment:

- public LinkedIn content only
- no LinkedIn username/password
- no LinkedIn session cookie
- no persistent authenticated browser profile
- no production site changes until the proof of concept is validated

### Proof-of-concept success criteria

The experiment passes only if Firecrawl can return:

1. at least one real post authored by Guilherme;
2. the post text;
3. a usable LinkedIn post URL;
4. correct newest-first ordering for multiple posts;
5. stable enough output to normalize without page-specific DOM selectors.

### Direct next steps if the proof of concept succeeds

1. Compare extracted results against the actual latest LinkedIn posts.
2. Decide the refresh strategy before coding the production integration.
3. Prefer a bounded server-side refresh/cache rather than scraping on every visitor request.
4. Preserve the existing local JSON fallback.
5. Add timeout and stale-data behavior so LinkedIn/Firecrawl can never block the portfolio.
6. Re-evaluate Firecrawl cost, reliability, and LinkedIn platform risk before merge.
7. Update the PR implementation only after that decision gate.

### Stop conditions

Do not proceed with Firecrawl if the public page returns a sign-in wall, missing/incorrect post URLs, inconsistent ordering, or content that requires an authenticated LinkedIn session.

## Decision rule

Experiments may be implemented on separate branches, but a directional integration change should not replace another viable option until the experiment is validated and explicitly chosen.
