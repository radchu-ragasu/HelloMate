const { admin, database } = require('../config/firebaseConfig');
const Listing = require('../models/Listing');

class ListingController {
  static async createListing(req, res) {
    try {
      const { title, description, category, price } = req.body;
      const userId = req.user.uid;
      
      // Validate listing data
      const validationResult = Listing.validate({ 
        title, 
        description, 
        category, 
        price 
      });
      
      if (!validationResult.isValid) {
        return res.status(400).json({ errors: validationResult.errors });
      }

      // Create listing instance
      const newListing = new Listing(
        userId, 
        title, 
        description, 
        category, 
        price
      );

      // Save listing in Realtime Database
      const newListingRef = database.ref('listings').push();
      await newListingRef.set(newListing.toJSON());

      res.status(201).json({
        message: 'Listing created successfully',
        listingId: newListingRef.key
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getListings(req, res) {
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
  }
}

module.exports = ListingController;