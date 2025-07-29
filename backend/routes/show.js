const express = require('express');
const router = express.Router();
const { 
  createShow,
  getShows,
  getShowById,
  deleteShow
} = require('../controllers/show');
const { authenticate } = require('../middlewares/auth'); // 只解构出函数

// 发布玩家秀
router.post('/', authenticate, createShow);

// 获取所有玩家秀
router.get('/', getShows);

// 获取玩家秀详情
router.get('/:id', getShowById);

// 删除玩家秀（仅本人或管理员）
router.delete('/:id', authenticate, deleteShow);

module.exports = router;
