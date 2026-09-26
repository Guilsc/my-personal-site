import { execFileSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const tempRoot = resolve(root, ".tmp");
const ecosystemRoot = resolve(tempRoot, "bot-ecosystem");
const output = resolve(root, "public", "ecosystem");

rmSync(ecosystemRoot, { recursive: true, force: true });
mkdirSync(tempRoot, { recursive: true });

const run = (command, args, cwd = root, env = process.env) =>
  execFileSync(command, args, { cwd, env, stdio: "inherit" });

run("git", ["clone", "--depth", "1", "https://github.com/Guilsc/bot-ecosystem.git", ecosystemRoot]);
run("npm", ["ci", "--no-audit", "--no-fund"], ecosystemRoot);
run("npm", ["run", "build"], ecosystemRoot, {
  ...process.env,
  BOT_ECOSYSTEM_BASE: "/ecosystem/",
});

const dist = resolve(ecosystemRoot, "dist");
if (!existsSync(dist)) throw new Error("Bot Ecosystem build did not produce dist/");

rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });
cpSync(dist, output, { recursive: true });

console.log("Bot Ecosystem staged at public/ecosystem for the main Nitro build");
