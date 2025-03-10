const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
<<<<<<< HEAD



const userRoutes = require('./src/routes/userRoutes');
const listingRoutes = require('./src/routes/listingRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/listings', listingRoutes);
=======
const orderRoutes = require('./src/routes/orderRoutes'); // Import the routes

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/', orderRoutes); // Use the routes
>>>>>>> c343edd31c6928d398c3f8319a2cc7e90f822bbe

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
<<<<<<< HEAD
  console.log(`Server running on port ${PORT}`);
=======
  console.log(`Server is running on http://localhost:${PORT}`);
>>>>>>> c343edd31c6928d398c3f8319a2cc7e90f822bbe
});

module.exports = app;