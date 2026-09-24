import { GoogleGenAI } from '@google/genai';
import fs from 'fs/promises';
import path from 'path';

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) { console.error('Error: GEMINI_API_KEY environment variable is missing.'); process.exit(1); }

const ai = new GoogleGenAI({ apiKey });
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const DRAFTS_ROOT = path.join('src', 'content', 'drafts');
const GAMES_ROOT = path.join('src', 'content', 'games');

async function generateWithRetry(prompt, models = ['gemini-3.6-flash', 'gemini-3.6-flash-lite']) {
  for (const model of models) {
    for (let attempt = 1; attempt <= 4; attempt++) {
      try { return await ai.models.generateContent({ model, contents: prompt }); }
      catch (err) {
        const transient = err?.status === 503 || err?.status === 429 || err?.message?.includes('demand') || err?.message?.includes('quota');
        if (transient && attempt < 4) await sleep(attempt * 4000);
        else if (!transient) throw err;
      }
    }
  }
  throw new Error('All models exhausted.');
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const result = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) result.push(...await walk(full));
    else if ((entry.name.endsWith('.txt') || entry.name.endsWith('.md')) && entry.name !== '.gitkeep') result.push(full);
  }
  return result;
}

async function run() {
  try { await fs.access(DRAFTS_ROOT); } catch { console.log('No drafts directory.'); return; }
  const drafts = await walk(DRAFTS_ROOT);
  if (!drafts.length) { console.log('No drafts found.'); return; }

  for (const draftPath of drafts) {
    const rawNotes = await fs.readFile(draftPath, 'utf-8');
    if (!rawNotes.trim()) { await fs.unlink(draftPath); continue; }

    const relative = path.relative(DRAFTS_ROOT, draftPath);
    const parts = relative.split(path.sep);
    const kind = parts[0];
    const game = kind === 'games' ? parts[1] : null;
    if (kind !== 'games' || !game) {
      console.log('Skipping unsupported draft: ' + relative);
      continue;
    }

    const prompt = `
You are writing an authentic development log for Fin & Games and the game Caravan Park Tycoon.
Write in dry, self-deprecating British English with genuine Godot technical detail.
Keep it entertaining but do not invent implementation details that are not supported by the developer notes.

Developer notes:
"""
${rawNotes}
"""

Return ONLY Markdown with this frontmatter:
---
title: "<punchy title>"
description: "<one sentence summary>"
pubDate: "${new Date().toISOString().split('T')[0]}"
author: "Fin & Games Team"
draft: false
game: "${game}"
tags: ["caravan-park-tycoon", "devlog", "gamedev"]
---

Then write 3-4 useful sections.
`;

    const response = await generateWithRetry(prompt);
    const content = response.text.trim();
    const baseName = path.parse(draftPath).name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const targetDir = path.join(GAMES_ROOT, game, 'devlogs');
    await fs.mkdir(targetDir, { recursive: true });
    const targetPath = path.join(targetDir, new Date().toISOString().split('T')[0] + '-' + baseName.slice(0, 40) + '.md');
    await fs.writeFile(targetPath, content, 'utf-8');
    await fs.unlink(draftPath);
    console.log('Created ' + targetPath);
  }
}
run().catch((err) => { console.error(err); process.exit(1); });
