const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');
const { authenticate } = require('../middlewares/auth');

// 创建订单（用户抽盒后）
router.post('/', authenticate, orderController.createOrder);

// 获取当前用户订单列表
router.get('/', authenticate, orderController.getUserOrders);

// 获取订单详情
router.get('/:id', authenticate, orderController.getOrderDetail);

// 取消订单
router.post('/:id/cancel', authenticate, orderController.cancelOrder);

// 删除订单
router.delete('/:id', authenticate, orderController.deleteOrder);

module.exports = router;