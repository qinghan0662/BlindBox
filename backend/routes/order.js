const express = require('express');
const router = express.Router();
const { 
  getUserOrders,
  getOrderDetail,
  cancelOrder
} = require('../controllers/order');
const authMiddleware = require('../middlewares/auth');

router.get('/', authMiddleware, getUserOrders);
router.get('/:id', authMiddleware, getOrderDetail);
router.delete('/:id', authMiddleware, cancelOrder);

module.exports = router;