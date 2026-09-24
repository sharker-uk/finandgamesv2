import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const gameDevlogs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/games' }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    description: z.string(),
    author: z.string().default('Fin & Games Team'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    game: z.string(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    description: z.string(),
    author: z.string().default('Fin & Games Team'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    description: z.string(),
    author: z.string().default('Fin & Games Team'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    game: z.string().optional(),
  }),
});

export const collections = { gameDevlogs, blog, news };
