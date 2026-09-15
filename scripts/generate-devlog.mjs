import { GoogleGenAI } from '@google/genai';
import fs from 'fs/promises';
import path from 'path';

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('Error: GEMINI_API_KEY environment variable is missing.');
  process.exit(1);
}

const topic = process.env.DEVLOG_TOPIC || 'Weekly Progress & Mechanics Update';
const ai = new GoogleGenAI({ apiKey });

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
          console.warn(`Model ${model} returned transient error (${err.status || 'capacity'}). Retrying in ${delay / 1000}s...`);
          await sleep(delay);
        } else if (isTransient && attempt === 4) {
          console.warn(`Model ${model} unavailable after 4 attempts. Trying fallback model...`);
          break;
        } else {
          throw err;
        }
      }
    }
  }
  throw new Error('All models and retry attempts exhausted.');
}

async function run() {
  const prompt = `
You are a game developer writing an engaging, authentic devlog post for an independent simulation game studio called "Fin & Games".
The studio's current project is "Caravan Park Tycoon", a British coastal holiday park management simulation built in Godot.

Topic/Update Notes: "${topic}"

Respond ONLY with valid Markdown containing YAML frontmatter at the top in this exact schema:
---
title: "<Punchy devlog title>"
description: "<One or two sentence summary>"
pubDate: "${new Date().toISOString().split('T')[0]}"
author: "Fin & Games Team"
draft: false
tags: ["caravan-park-tycoon", "devlog", "simulation"]
---

Followed immediately by 3-4 structured sections detailing progress, systems architecture, design decisions, and what's next. Do not wrap the response in outer code blocks (\`\`\`markdown ... \`\`\`).
`;

  const response = await generateWithRetry(prompt);
  const content = response.text.trim();
  const slug = topic
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  const filename = `${new Date().toISOString().split('T')[0]}-${slug.slice(0, 30)}.md`;
  const targetPath = path.join('src', 'content', 'devlogs', filename);

  await fs.writeFile(targetPath, content, 'utf-8');
  console.log(`Successfully generated devlog: ${targetPath}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
