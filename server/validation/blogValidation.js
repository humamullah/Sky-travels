import { z } from 'zod';

export const createBlogSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(200),
  excerpt: z.string().max(500).optional(),
  content: z.string().min(50, 'Content must be at least 50 characters'),
  author: z.string().min(2, 'Author name is required'),
  destination: z.string().optional(),
  tags: z.array(z.string()).optional(),
  published: z.boolean().optional(),
});

export const updateBlogSchema = createBlogSchema.partial();
