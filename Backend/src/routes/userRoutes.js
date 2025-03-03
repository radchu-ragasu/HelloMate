const express = require('express');
const { createUser, getServiceProviders, getServiceProvidersByType } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', createUser);
router.get('/service-providers', getServiceProviders);
router.get('/service-providers/:type', getServiceProvidersByType);
router.get('/', (req, res) => {
    res.json({ message: 'Hello from user routes!' });
});

module.exports = router;
