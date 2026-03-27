const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve Static Frontend Files
const path = require('path');
app.use(express.static(path.join(__dirname, '../frontend')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/wishes', require('./routes/wishes'));

// Catch-all route for frontend (for SPA-like behavior)
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Database Connection
const connectWithRetry = () => {
  console.log('Attempting to connect to MongoDB...');
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('MongoDB connected');
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.error('Database connection error:', err.message);
      console.log('Retrying in 5 seconds...');
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();
