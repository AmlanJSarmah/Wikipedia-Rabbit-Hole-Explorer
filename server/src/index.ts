import express from 'express';
import cors from 'cors';
// ENV
import 'dotenv/config';
import './config/env.js';
import { env } from './config/env.js';

const app = express();

app.use(cors());

app.listen(env.PORT, () => {
  console.log('Server Starting on Port 3000...');
});
