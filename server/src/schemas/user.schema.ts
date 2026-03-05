import { z } from 'zod';

export const userPostSchema = z.object({
  username: z.string(),
  password: z.string(),
});
