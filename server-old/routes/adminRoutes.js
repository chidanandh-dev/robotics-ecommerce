const express = require('express');
const { getMessages, getOrders, getStats } = require('../controllers/adminController');
const { adminOnly } = require('../middleware/adminMiddleware');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect, adminOnly);
router.get('/stats', getStats);
router.get('/orders', getOrders);
router.get('/messages', getMessages);

module.exports = router;
