const express = require('express');
const router = express.Router();
const { admin, database } = require('../config/firebaseConfig');
const authMiddleware = require('../middleware/authMiddleware');
// Create Listing
//POST endpoint for creating listings
//http://localhost:3000/create
router.post('/create', authMiddleware, async (req, res) => {
  try {
    const { title, description, category, price } = req.body;
    
    const listing = {
      userId: req.user.uid,
      title,
      description,
      category,
      price,
      createdAt: admin.database.ServerValue.TIMESTAMP
    };

    const newListingRef = database.ref('listings').push();
    await newListingRef.set(listing);

    res.status(201).json({
      message: 'Listing created successfully',
      listingId: newListingRef.key
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get Listings
//GET endpoint for retrieving listings
//http://localhost:3000/retrieve
router.get('/retrieve', authMiddleware, async (req, res) => {
  try {
    const { category } = req.query;
    let listingsRef = database.ref('listings');
    
    let listings = [];
    const snapshot = await listingsRef.once('value');
    const data = snapshot.val() || {};

    // Convert object to array and optionally filter by category
    listings = Object.keys(data)
      .map(key => ({ id: key, ...data[key] }))
      .filter(listing => !category || listing.category === category);

    res.json(listings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;