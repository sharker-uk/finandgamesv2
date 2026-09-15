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

async function generateWithRetry(prompt, models = ['gemini-1.5-flash', 'gemini-1.5-pro']) {
  for (const model of models) {
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        console.log(`Requesting ${model} (attempt ${attempt}/3)...`);
        const response = await ai.models.generateContent({
          model,
          contents: prompt,
        });
        return response;
      } catch (err) {
        const is503 = err?.status === 503 || err?.message?.includes('503');
        if (is503 && attempt < 3) {
          const delay = attempt * 3000;
          console.warn(`Model ${model} returned 503. Retrying in ${delay / 1000}s...`);
          await sleep(delay);
        } else if (is503 && attempt === 3) {
          console.warn(`Model ${model} unavailable after 3 attempts. Falling back to next model...`);
          break;
        } else {
          throw err;
        }
      }
    }
  }
  throw new Error('All models and retry attempts failed due to capacity constraints.');
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
