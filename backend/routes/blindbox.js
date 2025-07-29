const express = require('express');
const router = express.Router();
const { 
  createBlindBox,
  getBlindBoxes,
  getBlindBoxById,
  updateBlindBox,
  deleteBlindBox,
  searchBlindBoxes,
  drawFromBlindBox // 确保这个名字和控制器导出一致
} = require('../controllers/blindbox');
const { authenticate } = require('../middlewares/auth'); // 只解构出函数

// 管理员权限中间件（示例）
const adminMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: '无权访问' });
  }
  next();
};

router.post('/', authenticate, adminMiddleware, createBlindBox);
router.get('/search', searchBlindBoxes); // 放在所有 /:id 之前
router.get('/', getBlindBoxes);
router.get('/:id', getBlindBoxById); // 推荐这样写
router.put('/:id', authenticate, adminMiddleware, updateBlindBox);
router.delete('/:id', authenticate, adminMiddleware, deleteBlindBox);
router.post('/:id/draw', authenticate, drawFromBlindBox); // 推荐这样写

module.exports = router;