const { database } = require('../config/firebaseConfig');
const Order = require('../models/Order');

class OrderController {
    static async placeOrder(req, res) {
        try {
            const { userId, category, address, description, photos } = req.body; // Include photos
            
            // Validate the order data
            const validationResult = Order.validate({ userId, category, address, description, photos });
            if (!validationResult.isValid) {
                return res.status(400).json({ errors: validationResult.errors });
            }

            // Create the new order, including photos
            const newOrder = new Order(userId, category, address, description, photos);
            const orderRef = database.ref('orders').push();
            await orderRef.set(newOrder.toJSON());
            
            res.status(201).json({ message: 'Order placed successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getOrders(req, res) {
        try {
            const ordersSnapshot = await database.ref('orders').once('value');
            const orders = ordersSnapshot.val() || {};
            
            const orderList = Object.values(orders);
            res.json(orderList);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = OrderController;
