const FIRECRAWL_SCRAPE_URL = "https://api.firecrawl.dev/v2/scrape";
const LINKEDIN_ACTIVITY_URL =
  "https://www.linkedin.com/in/guilherme-da-silva-costa/recent-activity/all/";

const extractionSchema = {
  type: "object",
  additionalProperties: false,
  required: ["posts"],
  properties: {
    posts: {
      type: "array",
      maxItems: 3,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["text", "url"],
        properties: {
          text: { type: "string", minLength: 1 },
          url: { type: "string", minLength: 1 },
          publishedAt: { type: "string" },
        },
      },
    },
  },
};

const requestBody = {
  url: LINKEDIN_ACTIVITY_URL,
  maxAge: 0,
  onlyMainContent: true,
  formats: [
    {
      type: "json",
      schema: extractionSchema,
      prompt:
        "Extract up to the 3 most recent actual LinkedIn posts authored by Guilherme da Silva Costa that are visible on this recent-activity page. Exclude comments, ads, recommendations, and content authored by other people. For each post return the visible post text, its LinkedIn post URL, and published date/time when visible. Do not invent missing values. Order newest first.",
    },
  ],
};

const response = await fetch(FIRECRAWL_SCRAPE_URL, {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify(requestBody),
  signal: AbortSignal.timeout(30_000),
});

const payload = await response.json().catch(() => null);

if (!response.ok) {
  console.error(
    `Firecrawl request failed [${response.status}]:`,
    JSON.stringify(payload),
  );
  process.exit(1);
}

const posts = payload?.data?.json?.posts;

if (!Array.isArray(posts) || posts.length === 0) {
  console.error(
    "Firecrawl returned no candidate LinkedIn posts.",
    JSON.stringify(payload, null, 2),
  );
  process.exit(1);
}

const invalidPost = posts.find(
  (post) =>
    !post ||
    typeof post.text !== "string" ||
    post.text.trim().length === 0 ||
    typeof post.url !== "string" ||
    !isLinkedInPostUrl(post.url),
);

if (invalidPost) {
  console.error(
    "Firecrawl returned a candidate with missing text or an unusable LinkedIn URL.",
    JSON.stringify(invalidPost, null, 2),
  );
  process.exit(1);
}

console.log(`Found ${posts.length} candidate LinkedIn post(s).\n`);

for (const [index, post] of posts.entries()) {
  console.log(`#${index + 1}`);
  console.log(`URL: ${post.url}`);
  console.log(`Published: ${post.publishedAt || "not exposed"}`);
  console.log(`Text: ${compact(post.text).slice(0, 280)}`);
  console.log();
}

function isLinkedInPostUrl(value) {
  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      (url.hostname === "linkedin.com" ||
        url.hostname.endsWith(".linkedin.com")) &&
      (url.pathname.includes("/feed/update/") ||
        url.pathname.includes("/posts/"))
    );
  } catch {
    return false;
  }
}

function compact(value) {
  return value.replace(/\s+/g, " ").trim();
}
