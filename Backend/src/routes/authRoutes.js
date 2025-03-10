const express = require('express');
const router = express.Router();
const { auth, database } = require('../config/firebaseConfig');
const authMiddleware = require('../middleware/AuthMiddleware');
// Signup Route
// POST endpoint for user registration
// https://localhost:3000/signup
router.post('/signup', async (req, res) => {
  try {
    const { email, password, username, location, userType } = req.body;

    // Validate input
    if (!email || !password || !username || !location || !userType) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if user already exists
    try {
      await auth.getUserByEmail(email);
      return res.status(400).json({ error: 'User already exists' });
    } catch (error) {
      // If getUserByEmail throws an error, it means the user doesn't exist (which is what we want)
      if (error.code !== 'auth/user-not-found') {
        throw error;
      }
    }

    // Create user in Firebase Authentication
    const userRecord = await auth.createUser({
      email,
      password
    });

    // Save additional user details in Realtime Database
    await database.ref(`users/${userRecord.uid}`).set({
      username,
      email,
      location,
      userType,
      createdAt: new Date().toISOString()
    });

    res.status(201).json({
      message: 'User registered successfully',
      userId: userRecord.uid
    });

  } catch (error) {
    console.error('Signup error:', error);
    
    // Handle specific Firebase authentication errors
    if (error.code === 'auth/email-already-in-use') {
      return res.status(400).json({ error: 'Email is already in use' });
    }
    
    if (error.code === 'auth/invalid-email') {
      return res.status(400).json({ error: 'Invalid email format' });
    }
    
    if (error.code === 'auth/weak-password') {
      return res.status(400).json({ error: 'Password is too weak' });
    }

    res.status(500).json({ 
      error: 'Failed to register user', 
      details: error.message 
    });
  }
});

// Login Route
// POST endpoint for user login
// https://localhost:3000/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Firebase doesn't provide a direct login method via Admin SDK
    // This is a placeholder - actual login would be handled client-side
    const userRecord = await auth.getUserByEmail(email);
    
    res.json({
      message: 'Login successful',
      userId: userRecord.uid
    });
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
  }
});

// Change Password Route
// POST endpoint for changing user's password
// https://localhost:3000/change-password (POST request)
router.post('/change-password', authMiddleware, async (req, res) => {
  try {
    const { newPassword } = req.body;
    const uid = req.user.uid;
    
    await auth.updateUser(uid, {
      password: newPassword
    });
    
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;