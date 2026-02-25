import express from 'express';
import type {
  ErrorRequestHandler,
  Request,
  Response,
  NextFunction,
} from 'express';
import cors from 'cors';
// ENV
import 'dotenv/config';
import './config/env.js';
import { env } from './config/env.js';
// Error
import { AppError } from './utils/error.js';
import { ZodError } from 'zod';
// Router
import wikipediaRoutes from './routes/wikipedia.routes.js';

const app = express();

// Handling CORS
app.use(cors());

// Routes
app.use('/wikipedia', wikipediaRoutes);

// Error Handling
app.use(
  (
    err: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (err instanceof ZodError) {
      return res
        .status(400)
        .json({ message: 'Validation failed.', error: err });
    }
    if (err instanceof AppError) {
      return res
        .status(err.statusCode)
        .json({ message: err.message, error: err });
    }
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: err });
  }
);

// Start Server
app.listen(env.PORT, () => {
  console.log(`Server Starting on Port ${env.PORT}...`);
});
