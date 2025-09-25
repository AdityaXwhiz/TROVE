// Import required packages
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // This loads the variables from .env into process.env

// Initialize the Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Get the MongoDB connection string from the .env file
const MONGO_URI = process.env.MONGO_URI;

// --- DIAGNOSTIC LINE ---
console.log("Attempting to connect with URI:", MONGO_URI); 
// -------------------------

// --- Database Connection ---
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.error('❌ Error connecting to MongoDB Atlas:', error);
  });
// -------------------------

// (The rest of your file stays the same...)

app.use(express.json());

app.get('/api', (req, res) => {
  res.json({ message: "Welcome to the TROVE API! The server is running." });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});