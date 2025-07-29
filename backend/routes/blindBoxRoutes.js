// routes/blindBoxRoutes.js
const express = require('express');
const router = express.Router();
const blindBoxController = require('../controllers/blindBoxController');
const { authenticate } = require('../middlewares/auth');

// 抽盲盒接口（推荐用 POST）
router.post('/draw', authenticate, blindBoxController.drawBox);

module.exports = router;