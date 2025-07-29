const { Show } = require('../models');

// 发布玩家秀
exports.createShow = async (req, res) => {
  try {
    const { blindBoxId, content, image } = req.body;
    const show = await Show.create({
      userId: req.user.id,
      blindBoxId,
      content,
      image
    });
    res.status(201).json(show);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 获取所有玩家秀
exports.getShows = async (req, res) => {
  try {
    const shows = await Show.findAll();
    res.json(shows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 获取玩家秀详情
exports.getShowById = async (req, res) => {
  try {
    const show = await Show.findByPk(req.params.id);
    if (!show) return res.status(404).json({ message: '玩家秀不存在' });
    res.json(show);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 删除玩家秀（仅本人或管理员）
exports.deleteShow = async (req, res) => {
  try {
    const show = await Show.findByPk(req.params.id);
    if (!show) return res.status(404).json({ message: '玩家秀不存在' });
    if (show.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: '无权删除' });
    }
    await show.destroy();
    res.json({ message: '删除成功' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
