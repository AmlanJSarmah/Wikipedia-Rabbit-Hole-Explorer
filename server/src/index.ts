import express from 'express';
import cors from 'cors';
// ENV
import 'dotenv/config';
import './config/env.js';
import { env } from './config/env.js';
// Router
import wikipediaRoutes from './routes/wikipedia.routes.js';

const app = express();

// Handling CORS
app.use(cors());

// Routes
app.use('/wikipedia', wikipediaRoutes);

// Start Server
app.listen(env.PORT, () => {
  console.log(`Server Starting on Port ${env.PORT}...`);
});
