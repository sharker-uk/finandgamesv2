import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const devlogs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/devlogs' }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { devlogs };
