import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const editorialFields = {
  title: z.string(),
  pubDate: z.coerce.date(),
  description: z.string(),
  author: z.string().default('Fin & Games Team'),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
  // Public paths, e.g. /images/blog/article-cover.jpg.
  // Store image assets in public/ so Markdown can reference them predictably.
  coverImage: z.string().optional(),
  coverAlt: z.string().optional(),
};

const gameDevlogs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/games' }),
  schema: z.object({
    ...editorialFields,
    game: z.string(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object(editorialFields),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    ...editorialFields,
    game: z.string().optional(),
  }),
});

export const collections = { gameDevlogs, blog, news };
