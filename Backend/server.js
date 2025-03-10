<<<<<<< HEAD
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const reportRoutes = require("./src/routes/ReportRoutes");
=======
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const orderRoutes = require('./src/routes/orderRoutes'); // Import the routes
>>>>>>> main

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

<<<<<<< HEAD
app.use("/", reportRoutes);
=======
app.use('/', orderRoutes); // Use the routes
>>>>>>> main

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
