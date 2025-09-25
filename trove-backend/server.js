// Import required packages
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // This loads the variables from .env into process.env

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
// This allows your server to understand JSON format
app.use(express.json());
// ------------------

// --- Routes ---
// A simple test route to make sure the server is working
app.get('/api', (req, res) => {
  res.json({ message: "Welcome to the TROVE API! The server is running." });
});
// --------------

// --- Start the Server ---
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});