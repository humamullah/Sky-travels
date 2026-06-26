import { z } from 'zod';

export const createResourceSchema = z.object({
  type: z.enum(['packing-list', 'safety-tip', 'travel-guide', 'faq', 'itinerary']),
  title: z.string().min(3, 'Title must be at least 3 characters'),
  content: z.string().min(20, 'Content must be at least 20 characters'),
  items: z.array(
    z.object({
      label: z.string().min(1),
      description: z.string().optional(),
      optional: z.boolean().optional(),
    })
  ).optional(),
  destination: z.string().optional(),
  published: z.boolean().optional(),
});

export const updateResourceSchema = createResourceSchema.partial();
