import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const owner = "Guilsc";
const outputRoot = path.resolve("src/content/generated");
const headers = { Accept: "application/vnd.github+json", "User-Agent": "guilherme-costa-portfolio" };

const reposResponse = await fetch(`https://api.github.com/users/${owner}/repos?sort=updated&per_page=100`, { headers });
if (!reposResponse.ok) throw new Error(`GitHub repositories request failed: ${reposResponse.status}`);
const repos = await reposResponse.json();

for (const repo of repos) {
  const slug = repo.name.toLowerCase().replace(/[_\s]+/g, "-");
  const readmeResponse = await fetch(`https://api.github.com/repos/${owner}/${repo.name}/readme`, { headers });
  if (!readmeResponse.ok) continue;
  const readme = await readmeResponse.json();
  const source = Buffer.from(readme.content ?? "", "base64").toString("utf8");
  const sourceHash = createHash("sha256").update(source).digest("hex");
  const dir = path.join(outputRoot, slug);
  const manifestPath = path.join(dir, "source.json");
  let previous;
  try { previous = JSON.parse(await readFile(manifestPath, "utf8")); } catch {}
  if (previous?.sourceHash === sourceHash) continue;

  await mkdir(dir, { recursive: true });
  await writeFile(manifestPath, JSON.stringify({
    repository: repo.html_url,
    sourceFile: readme.path,
    sourceHash,
    sourceLanguage: detectLanguage(source),
    syncedAt: new Date().toISOString()
  }, null, 2) + "\n");

  // Preserve source text as evidence. Translation is intentionally not performed by the build.
  await writeFile(path.join(dir, "source.md"), source);
  console.log(`Synced ${repo.name} (${sourceHash.slice(0, 8)})`);
}

function detectLanguage(text) {
  const sample = text.toLowerCase().replace(/[`*_#>\[\]()]/g, " ").slice(0, 12000);
  const pt = [" para ", " com ", " uma ", " não ", " projeto ", " sobre ", " como ", " que ", " português "].reduce((n, token) => n + sample.split(token).length - 1, 0);
  const en = [" the ", " and ", " with ", " this ", " project ", " for ", " from ", " that ", " english "].reduce((n, token) => n + sample.split(token).length - 1, 0);
  return pt > en ? "pt" : "en";
}
