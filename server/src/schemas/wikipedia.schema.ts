import { z } from 'zod';

export const pageTitleSchema = z.object({
  title: z.string().min(1).max(50),
});
