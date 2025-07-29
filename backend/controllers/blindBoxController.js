// controllers/blindBoxController.js
const { BlindBox, Order } = require('../models');

exports.drawBox = async (req, res) => {
  try {
    const userId = req.user.id;
    const blindBoxId = parseInt(req.params.id || req.body.blindBoxId); // 强制为数字
    if (!blindBoxId) return res.status(400).json({ message: '缺少盲盒ID' });

    // 创建订单
    await Order.create({
      userId,
      blindBoxId,
      status: 'pending'
    });

    // 自动让 sales 字段加 1
    const [affectedRows] = await BlindBox.increment('sales', { by: 1, where: { id: blindBoxId } });
    console.log('BlindBox.increment affectedRows:', affectedRows); // 日志确认

    // 查询最新的 sales 字段
    const box = await BlindBox.findByPk(blindBoxId);

    res.json({ message: '抽取成功', sales: box.sales });
  } catch (err) {
    console.error('抽取盲盒异常:', err); // 增加错误日志
    res.status(500).json({ message: '抽取失败' });
  }
};