#!/usr/bin/env node
/**
 * One-pass editorial assistant for Fin & Games Markdown drafts.
 *
 * Usage:
 *   GEMINI_API_KEY=... node scripts/polish-article.mjs path/to/draft.md
 *   GEMINI_API_KEY=... node scripts/polish-article.mjs draft.md output-edited.md
 *
 * The source is never overwritten. Frontmatter is preserved verbatim and only
 * the article body is sent to the model.
 */
import { readFile, writeFile } from "node:fs/promises";
import { basename, dirname, extname, resolve } from "node:path";
import { GoogleGenAI } from "@google/genai";

const inputPath = process.argv[2];
if (!inputPath) {
  console.error("Usage: node scripts/polish-article.mjs <draft.md> [output.md]");
  process.exit(2);
}

const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
if (!apiKey) {
  console.error("Missing GEMINI_API_KEY (or GOOGLE_API_KEY). No model call was made.");
  process.exit(2);
}

const sourcePath = resolve(inputPath);
const outputPath = resolve(process.argv[3] || resolve(dirname(sourcePath), `${basename(sourcePath, extname(sourcePath))}.edited.md`));
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

const instructions = `You are the copy editor for Fin & Games, a small independent game studio.
Edit the supplied draft into clear, professional, natural British English.

Rules:
- Preserve the author's meaning, opinions, personality, humour, and level of certainty.
- Correct grammar, spelling, punctuation, repetition, and awkward phrasing.
- Improve paragraph flow and headings only where useful; do not inflate the length.
- Never invent facts, milestones, quotes, technical details, dates, names, metrics, or promises.
- Keep code, commands, paths, identifiers, Markdown links, image references, alt text,
  and HTML/Markdown structures intact unless a clear typo makes a minimal correction necessary.
- Retain first-person voice when the author uses it.
- Do not add an introduction about your work, editorial notes, explanations, or a conclusion
  that was not present in the source.
- Return only the edited Markdown body. Do not add frontmatter or wrap it in a code fence.`;

const ai = new GoogleGenAI({ apiKey });
const result = await ai.models.generateContent({
  model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
  contents: `${instructions}\n\n--- DRAFT START ---\n${body}\n--- DRAFT END ---`,
});

const edited = result.text?.trim();
if (!edited) {
  console.error("The model returned no text. Original draft remains unchanged.");
  process.exit(1);
}

await writeFile(outputPath, `${frontmatter}${frontmatter && !frontmatter.endsWith("\n") ? "\n" : ""}${edited}\n`, { flag: "wx" });
console.log(`Edited draft written to: ${outputPath}`);
console.log("Original draft preserved. Review the edited file before publishing.");
