const express = require('express');
const { createServiceRequest, updateServiceRequestStatus } = require('../controllers/serviceController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createServiceRequest);
router.patch('/:requestId/status', protect, updateServiceRequestStatus);

module.exports = router;