const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');



const userRoutes = require('./src/routes/userRoutes');
const listingRoutes = require('./src/routes/listingRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/listings', listingRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;