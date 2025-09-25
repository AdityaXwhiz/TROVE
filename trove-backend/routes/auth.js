const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Import the User model

const router = express.Router();

// --- POST /api/auth/register ---
router.post('/register', async (req, res) => {
  try {
    // Get user data from the request body
    const { firstName, lastName, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists." });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create a new user object
    const newUser = new User({
      firstName,
      lastName,
      email,
      passwordHash // Store the hashed password
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    // Send a success response
    res.status(201).json({ message: "User created successfully!", userId: savedUser._id });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during registration." });
  }
});

module.exports = router;