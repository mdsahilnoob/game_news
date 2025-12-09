import { glob } from "astro/loaders";
import { defineCollection, z } from 'astro:content';

// News Collection - Strict Schema for Editorial Content
const newsCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: "./src/content/news" }),
  schema: z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(20, 'Description must be at least 20 characters'),
    pubDate: z.coerce.date(),
    author: z.string().min(1, 'Author is required'),
    tags: z.array(z.string()).min(1, 'At least one tag is required'),
    coverImage: z.string().optional(),
  }),
});

// Blog Collection - For legacy blog posts
const blogCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    description: z.string(),
    author: z.string(),
    image: z.object({
      url: z.string(),
      alt: z.string()
    }).optional(),
    tags: z.array(z.string()),
  }),
});

export const collections = {
  news: newsCollection,
  blog: blogCollection,
};
