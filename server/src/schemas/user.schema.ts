import { z } from 'zod';

export const userSignUpSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const userSignInSchema = z.object({
  username: z.string(),
  password: z.string(),
});
