#!/usr/bin/env node
/**
 * Profile-aware editorial assistant for Fin & Games Markdown drafts.
 *
 * Usage:
 *   GEMINI_API_KEY=... node scripts/polish-article.mjs draft.md
 *   GEMINI_API_KEY=... node scripts/polish-article.mjs draft.md --profile devlog
 *   GEMINI_API_KEY=... node scripts/polish-article.mjs draft.md edited.md --profile studio
 *
 * The source is never overwritten. YAML frontmatter is preserved verbatim and
 * only the article body is sent to the model.
 */
import { readFile, writeFile } from "node:fs/promises";
import { basename, dirname, extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { GoogleGenAI } from "@google/genai";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const promptsDir = resolve(scriptDir, "../prompts/editorial");
const args = process.argv.slice(2);
const inputPath = args.shift();

if (!inputPath || inputPath === "--help" || inputPath === "-h") {
  console.log("Usage: node scripts/polish-article.mjs <draft.md> [output.md] [--profile blog|studio|devlog]");
  console.log("Profiles: blog (default), studio, devlog, or auto. The original draft is never overwritten.");
  process.exit(inputPath ? 0 : 2);
}

let outputArg;
let profile = "auto";
for (let i = 0; i < args.length; i += 1) {
  if (args[i] === "--profile") {
    profile = args[i + 1];
    i += 1;
  } else if (args[i].startsWith("--profile=")) {
    profile = args[i].slice("--profile=".length);
  } else if (!args[i].startsWith("-") && !outputArg) {
    outputArg = args[i];
  } else {
    console.error("Unknown argument: " + args[i]);
    process.exit(2);
  }
}

const allowedProfiles = new Set(["auto", "blog", "studio", "devlog"]);
if (!allowedProfiles.has(profile)) {
  console.error('Unknown profile "' + profile + '". Choose blog, studio, devlog, or auto.');
  process.exit(2);
}

const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
if (!apiKey) {
  console.error("Missing GEMINI_API_KEY (or GOOGLE_API_KEY). No model call was made.");
  process.exit(2);
}

const sourcePath = resolve(inputPath);
const outputPath = resolve(outputArg || resolve(dirname(sourcePath), basename(sourcePath, extname(sourcePath)) + ".edited.md"));
if (sourcePath === outputPath) {
  console.error("Refusing to overwrite the original draft.");
  process.exit(2);
}

const source = await readFile(sourcePath, "utf8");
const frontmatterMatch = source.match(/^(---\r?\n[\s\S]*?\r?\n---\r?\n?)([\s\S]*)$/);
const frontmatter = frontmatterMatch?.[1] ?? "";
const body = frontmatterMatch ? frontmatterMatch[2] : source;
if (!body.trim()) {
  console.error("The draft body is empty.");
  process.exit(2);
}

function inferProfile(path) {
  const normalised = path.replaceAll("\\", "/").toLowerCase();
  if (/(^|\/)(devlogs?|development)(\/|$)/.test(normalised) || /game-devlog/.test(normalised)) return "devlog";
  if (/(^|\/)(news|announcements?|studio-updates?)(\/|$)/.test(normalised)) return "studio";
  return "blog";
}

const selectedProfile = profile === "auto" ? inferProfile(sourcePath) : profile;
const instructions = await readFile(resolve(promptsDir, selectedProfile + ".md"), "utf8");
const ai = new GoogleGenAI({ apiKey });
const result = await ai.models.generateContent({
  model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
  contents: instructions.trim() + "\n\n--- DRAFT START ---\n" + body + "\n--- DRAFT END ---",
});

const edited = result.text?.trim();
if (!edited) {
  console.error("The model returned no text. Original draft remains unchanged.");
  process.exit(1);
}

await writeFile(outputPath, frontmatter + (frontmatter && !frontmatter.endsWith("\n") ? "\n" : "") + edited + "\n", { flag: "wx" });
console.log("Editorial profile: " + selectedProfile);
console.log("Edited draft written to: " + outputPath);
console.log("Original draft preserved. Review the edited file before publishing.");
