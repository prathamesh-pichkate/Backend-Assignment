import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import faqRoutes from './routes/faqRoutes.js';
import { cache } from './middlewares/cache.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api', cache, faqRoutes);

export default app;