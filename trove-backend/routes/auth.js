const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Import the jsonwebtoken library
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

  } catch (error) { // <-- BRACES ADDED HERE
    console.error(error);
    res.status(500).json({ message: "Server error during registration." });
  } // <-- AND HERE
});

// --- POST /api/auth/login ---
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // Create the JWT payload
    const payload = {
      user: {
        id: user._id
      }
    };

    // Sign the token and send it to the client
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' }, // The token will be valid for 1 hour
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          message: "Login successful!",
          token: token // Send the token to the user
        });
      }
    );

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during login." });
  }
});


module.exports = router;