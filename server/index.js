import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.js';
import dashboardRoutes from './routes/dashboard.js';
import postRoutes from './routes/posts.js';
import projectRoutes from './routes/projects.js';
import contactRoutes from './routes/contacts.js';

dotenv.config();

const app = express();
app.use(cors({
  origin: process.env.CLIENT_ORIGIN,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', dashboardRoutes); 
app.use('/api/blog', postRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/contacts', contactRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running at http://localhost:${process.env.PORT}`);
    });
  })
  .catch(err => console.error(err));
