const { admin, db } = require('../config/firebase');
const userRef = db.ref('users');

exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, serviceType, location, contactNumber, email, password } = req.body;
    
    // Basic validation
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    
    // Create user with Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: `${firstName} ${lastName}`
    });
    
    // Save additional user data to Realtime Database
    await userRef.child(userRecord.uid).set({
      firstName,
      lastName,
      serviceType: serviceType || '',
      location: location || '',
      contactNumber: contactNumber || '',
      email,
      role: 'service_provider',
      createdAt: admin.database.ServerValue.TIMESTAMP
    });
    
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      userId: userRecord.uid
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create user'
    });
  }
};

exports.getServiceProviders = async (req, res) => {
  try {
    // Query service providers
    const snapshot = await userRef.orderByChild('role').equalTo('service_provider').once('value');
    const providers = snapshot.val() || {};
    
    // Convert to array and remove sensitive data
    const providersArray = Object.keys(providers).map(key => {
      const provider = providers[key];
      return {
        id: key,
        firstName: provider.firstName,
        lastName: provider.lastName,
        serviceType: provider.serviceType,
        location: provider.location,
        contactNumber: provider.contactNumber,
        email: provider.email
      };
    });
    
    res.status(200).json({
      success: true,
      count: providersArray.length,
      data: providersArray
    });
  } catch (error) {
    console.error('Error fetching service providers:', error);
    res.status(500).json({
      success: false, 
      message: error.message || 'Failed to fetch service providers'
    });
  }
};

exports.getServiceProvidersByType = async (req, res) => {
  try {
    const { type } = req.params;
    
    // Query service providers by type
    const snapshot = await userRef
      .orderByChild('serviceType')
      .equalTo(type)
      .once('value');
    
    const providers = snapshot.val() || {};
    
    // Convert to array and remove sensitive data
    const providersArray = Object.keys(providers).map(key => {
      const provider = providers[key];
      return {
        id: key,
        firstName: provider.firstName,
        lastName: provider.lastName,
        serviceType: provider.serviceType,
        location: provider.location,
        contactNumber: provider.contactNumber,
        email: provider.email
      };
    });
    
    res.status(200).json({
      success: true,
      count: providersArray.length,
      data: providersArray
    });
  } catch (error) {
    console.error('Error fetching service providers by type:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch service providers'
    });
  }
};