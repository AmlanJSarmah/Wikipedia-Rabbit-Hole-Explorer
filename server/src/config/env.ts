import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number(),
  DATABASE_URL: z.string(),
  SALT: z.coerce.number(),
  JWT_SECRET: z.string(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Invalid env vars');
  process.exit(1);
} else {
  console.log('Parsed env successfully');
}

export const env = parsed.data;
