const { admin, auth, database } = require('../config/firebaseConfig');
const User = require('../models/user');

class UserController {
  static async registerUser(req, res) {
    try {
      const { email, password, userType, name, location } = req.body;
      
      // Validate user data
      const validationResult = User.validate({ email, userType, name, location });
      if (!validationResult.isValid) {
        return res.status(400).json({ errors: validationResult.errors });
      }

      // Create user in Firebase Authentication
      const userRecord = await auth.createUser({
        email,
        password
      });

      // Create user instance
      const newUser = new User(email, userType, name, location);

      // Save user details in Realtime Database
      await database.ref(`users/${userRecord.uid}`).set(newUser.toJSON());

      res.status(201).json({
        message: 'User registered successfully',
        userId: userRecord.uid
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getUserLocations(req, res) {
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
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = UserController;