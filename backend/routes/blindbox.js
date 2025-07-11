const express = require('express');
const router = express.Router();
const { 
  createBlindBox,
  getBlindBoxes,
  drawFromBlindBox
} = require('../controllers/blindbox');
const authMiddleware = require('../middlewares/auth');

// 管理员权限中间件（示例）
const adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: '无权访问' });
  }
  next();
};

router.post('/', authMiddleware, adminMiddleware, createBlindBox);
router.get('/', getBlindBoxes);
router.post('/:id/draw', authMiddleware, drawFromBlindBox);

module.exports = router;