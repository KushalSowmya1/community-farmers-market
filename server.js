import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';

dotenv.config(); // Load environment variables from .env

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('❌ MONGO_URI is not defined in .env file');
  process.exit(1); // Exit process if Mongo URI is missing
}

app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve static files like index.html

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Fallback route for SPA frontend (e.g., React/Vite)
app.get('*', (req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// Connect to MongoDB and start server
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () =>
      console.log(`🚀 Server running at http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
