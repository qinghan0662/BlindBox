const { Comment, User } = require('../models');

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { blindBoxId: req.params.blindBoxId },
      include: [{ model: User, attributes: ['username'] }],
      order: [['createdAt', 'DESC']]
    });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: '获取评论失败' });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { content, rate } = req.body;
    if (!content) return res.status(400).json({ message: '评论内容不能为空' });
    const comment = await Comment.create({
      userId: req.user.id,
      blindBoxId: req.params.blindBoxId,
      content,
      rate: rate || 5
    });
    // 查询带用户名的评论返回
    const fullComment = await Comment.findByPk(comment.id, {
      include: [{ model: User, attributes: ['username'] }]
    });
    res.json(fullComment);
  } catch (err) {
    console.error('addComment error:', err); // 增加详细日志
    res.status(500).json({ message: '评论失败', error: err.message });
  }
};

