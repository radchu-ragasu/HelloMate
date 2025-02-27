import { Router } from 'express';
import db from '../config/firebase'; // Import db from your firebase.ts

const router = Router();

// Get all volunteer services
router.get('/services', async (req, res) => {
  try {
    const ref = db.ref('volunteerServices'); // Reference to the 'volunteerServices' node
    ref.once('value', (snapshot) => {
      const data = snapshot.val();
      res.json(data);
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error });
  }
});

// Get filtered services based on customer needs (filter by category)
router.get('/services/filter', async (req, res) => {
  const { category } = req.query; // Get the category from the query parameters
  try {
    const ref = db.ref('volunteerServices'); // Reference to the 'volunteerServices' node
    ref.orderByChild('category') // Ordering the data by category
      .equalTo(category) // Filtering by the category parameter
      .once('value', (snapshot) => {
        const data = snapshot.val();
        res.json(data || {}); // Return filtered data or an empty object if no match
      });
  } catch (error) {
    res.status(500).json({ message: 'Error filtering data', error });
  }
});

export default router;
