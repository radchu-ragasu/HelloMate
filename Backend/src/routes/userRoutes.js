const express = require('express');
const router = express.Router();
const { admin, auth, database } = require('../config/firebaseConfig');
const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');
//POST endpoint
//endpoint for registering new users
//http://localhost:3000/register
router.post('/register', async (req, res) => {
  try {
    const { email, password, userType, name, location } = req.body;
    
    // Validate input
    if (!email || !password || !userType || !name || !location) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create user in Firebase Authentication
    const userRecord = await auth.createUser({
      email,
      password
    });

    // Save additional user details in Realtime Database
    await database.ref(`users/${userRecord.uid}`).set({
      email,
      userType,
      name,
      location,
      createdAt: admin.database.ServerValue.TIMESTAMP
    });

    res.status(201).json({
      message: 'User registered successfully',
      userId: userRecord.uid
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json({ 
      error: error.message || 'Registration failed',
      details: error.errorInfo || {}
    });
  }
});

// Get All Users (with locations)
//GET endpoint
//endpoint for retrieving name,userType and location of all users (requires authentication)
//http://localhost:3000/locations
router.get('/locations', authMiddleware, async (req, res) => {
  try {
    const usersSnapshot = await database.ref('users').once('value');
    const users = usersSnapshot.val() || {};
    
    const userLocations = Object.keys(users).map(id => ({
      id,
      name: users[id].name,
      userType: users[id].userType,
      location: users[id].location
    }));

    res.json(userLocations);
  } catch (error) {
    console.error('Fetch users error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;