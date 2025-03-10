const express = require('express');
const OrderController = require('../controllers/orderController'); // Import the controller

const router = express.Router();

router.post('/place', OrderController.placeOrder); // Define the order placement route
router.get('/orders', OrderController.getOrders); // Define the get orders route

module.exports = router; // Export the router
