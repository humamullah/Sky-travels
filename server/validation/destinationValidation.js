import { z } from 'zod';

export const createDestinationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  location: z.string().min(2, 'Location is required'),
  province: z.string().optional(),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  category: z.enum(['beach', 'mountain', 'city', 'desert', 'forest', 'cultural', 'adventure']),
  bestTime: z.string().min(2, 'Best time to visit is required'),
  difficulty: z.enum(['easy', 'moderate', 'challenging']).optional(),
  budgetRange: z.object({
    min: z.number().min(0).optional(),
    max: z.number().min(0).optional(),
    currency: z.string().optional(),
  }).optional(),
  highlights: z.array(z.string()).optional(),
  tips: z.array(z.string()).optional(),
  howToReach: z.object({
    byAir: z.string().optional(),
    byRoad: z.string().optional(),
    byTrain: z.string().optional(),
  }).optional(),
  rating: z.number().min(0).max(5).optional(),
  featured: z.boolean().optional(),
  active: z.boolean().optional(),
});

export const updateDestinationSchema = createDestinationSchema.partial();

export const destinationQuerySchema = z.object({
  category: z.string().optional(),
  featured: z.string().optional(),
  difficulty: z.string().optional(),
  page: z.string().optional(),
  limit: z.string().optional(),
  search: z.string().optional(),
});
