import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    author: z.string(),
    region: z.enum(['au', 'nl', 'global']),
    tags: z.array(z.string()),
    image: image(),
    featured: z.boolean().default(false),
  }),
});

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/case-studies' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    capability: z.string(),
    region: z.enum(['au', 'nl', 'global']),
    client: z.string(),
    metrics: z.array(z.object({ label: z.string(), value: z.string() })),
    image: image(),
  }),
});

const capabilities = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/capabilities' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string(),
    order: z.number(),
  }),
});

export const collections = { blog, 'case-studies': caseStudies, capabilities };
