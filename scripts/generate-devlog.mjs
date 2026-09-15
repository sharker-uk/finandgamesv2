import { GoogleGenAI } from '@google/genai';
import fs from 'fs/promises';
import path from 'path';

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('Error: GEMINI_API_KEY environment variable is missing.');
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const DRAFTS_DIR = path.join('src', 'content', 'devlog-drafts');
const POSTS_DIR = path.join('src', 'content', 'devlogs');

async function generateWithRetry(prompt, models = ['gemini-3.6-flash', 'gemini-3.6-flash-lite']) {
  for (const model of models) {
    for (let attempt = 1; attempt <= 4; attempt++) {
      try {
        console.log(`Requesting ${model} (attempt ${attempt}/4)...`);
        const response = await ai.models.generateContent({
          model,
          contents: prompt,
        });
        return response;
      } catch (err) {
        const isTransient = err?.status === 503 || err?.status === 429 || err?.message?.includes('demand') || err?.message?.includes('quota');
        if (isTransient && attempt < 4) {
          const delay = attempt * 4000;
          console.warn(`Model ${model} returned transient error. Retrying in ${delay / 1000}s...`);
          await sleep(delay);
        } else if (isTransient && attempt === 4) {
          console.warn(`Model ${model} unavailable. Trying fallback model...`);
          break;
        } else {
          throw err;
        }
      }
    }
  }
  throw new Error('All models exhausted.');
}

async function run() {
  const files = await fs.readdir(DRAFTS_DIR);
  const draftFiles = files.filter(f => f.endsWith('.txt') || f.endsWith('.md') && f !== '.gitkeep');

  if (draftFiles.length === 0) {
    console.log('No drafts found in', DRAFTS_DIR);
    return;
  }

  for (const file of draftFiles) {
    const draftPath = path.join(DRAFTS_DIR, file);
    const rawNotes = await fs.readFile(draftPath, 'utf-8');

    if (!rawNotes.trim()) {
      console.log(`Skipping empty draft: ${file}`);
      await fs.unlink(draftPath);
      continue;
    }

    console.log(`Processing draft: ${file}...`);

    const prompt = `
You are an indie game developer writing an authentic, thoroughly entertaining devlog for "Fin & Games", creators of "Caravan Park Tycoon"—a simulation game celebrating the quirks of British coastal holiday parks built in Godot.

Tone Guidelines:
- Dry, self-deprecating British humour (think tea-drinking stoicism, horizontal drizzle, and skeptical seagulls).
- Keep technical insights genuine—discuss Godot architecture, node mechanics, and simulation logic accurately—but frame bugs and park systems with wry seaside realities (e.g., wonky chemical toilet valves, deckchairs in the hedge, lukewarm tea, caravan awning physics disasters).
- Witty section headers that fit the aesthetic (e.g., "The Damp Reality", "Plumbing Disasters & Tilemaps", "Keeping the Barrows Rolling").
- Enthusiastic about indie game design without sounding like a corporate PR release.

Raw Developer Notes to expand:
"""
${rawNotes}
"""

Respond ONLY with valid Markdown containing YAML frontmatter at the top in this exact schema:
---
title: "<Punchy, witty devlog title>"
description: "<Dry, one-sentence summary of what broke and what was fixed>"
pubDate: "${new Date().toISOString().split('T')[0]}"
author: "Fin & Games Team"
draft: false
tags: ["caravan-park-tycoon", "devlog", "simulation", "gamedev"]
---

Followed immediately by 3-4 well-structured sections detailing development progress, underlying systems, lessons learned, and what's on the horizon. Do not wrap the output in outer code fences (\`\`\`markdown ... \`\`\`).
`;

    const response = await generateWithRetry(prompt);
    const content = response.text.trim();

    const baseName = path.parse(file).name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const targetFilename = `${new Date().toISOString().split('T')[0]}-${baseName.slice(0, 30)}.md`;
    const targetPath = path.join(POSTS_DIR, targetFilename);

    await fs.writeFile(targetPath, content, 'utf-8');
    console.log(`Created devlog post: ${targetPath}`);

    await fs.unlink(draftPath);
    console.log(`Consumed and removed draft: ${file}`);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
