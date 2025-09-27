// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors package
require('dotenv').config(); // This loads the variables from .env into process.env

// Import the auth routes
const authRoutes = require('./routes/auth');

// Initialize the Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Get the MongoDB connection string from the .env file
const MONGO_URI = process.env.MONGO_URI;

// --- Database Connection ---
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.error('❌ Error connecting to MongoDB Atlas:', error);
  });
// -------------------------

// --- Middleware ---
app.use(cors()); // Use cors to allow cross-origin requests
app.use(express.json()); // This allows your server to understand JSON

// --- Routes ---
// Use the auth routes for any request starting with /api/auth
app.use('/api/auth', authRoutes);

// A simple test route to make sure the server is working
app.get('/api', (req, res) => {
  res.json({ message: "Welcome to the TROVE API! The server is running." });
});
// --------------

// --- Start the Server ---
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});