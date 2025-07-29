const { Order, BlindBox, BlindBoxItem, User } = require('../models');

// 创建订单
exports.createOrder = async (req, res) => {
  try {
    const { blindBoxId } = req.body;
    const order = await Order.create({
      userId: req.user.id,
      blindBoxId,
      status: 'pending'
    });
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 获取用户订单历史
exports.getUserOrders = async (req, res) => {
  try {
    // 查询当前用户所有订单，并统计每种盲盒的数量
    const orders = await Order.findAll({
      where: { userId: req.user.id },
      include: [{ model: BlindBox, attributes: ['name'] }],
      order: [['createdAt', 'DESC']]
    });

    // 统计每种盲盒的抽取次数
    const boxMap = {};
    orders.forEach(order => {
      const boxId = order.blindBoxId;
      const boxName = order.BlindBox?.name || order.blindBoxId;
      if (!boxMap[boxId]) {
        boxMap[boxId] = { blindBoxId: boxId, blindBoxName: boxName, count: 0 };
      }
      boxMap[boxId].count += 1;
    });

    // 返回统计结果和订单详情
    res.json({
      orders,
      summary: Object.values(boxMap) // [{ blindBoxId, blindBoxName, count }]
    });
  } catch (err) {
    console.error('获取订单失败:', err);
    res.status(500).json({ message: '获取订单失败' });
  }
};

// 获取订单详情
exports.getOrderDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const order = await Order.findOne({
      where: { id, userId },
      include: [
        {
          model: BlindBox,
          attributes: ['id', 'name', 'description']
        },
        {
          model: BlindBoxItem,
          as: 'item',
          attributes: ['id', 'name', 'rarity', 'imageUrl']
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username']
        }
      ]
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: '订单不存在'
      });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// 取消订单（仅限未完成的订单）
exports.cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const order = await Order.findOne({
      where: { id, userId, status: 'pending' }
    });

    if (!order) {
      return res.status(400).json({
        success: false,
        message: '订单不可取消'
      });
    }

    await order.update({ status: 'cancelled' });

    res.json({
      success: true,
      message: '订单已取消'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// 删除订单
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: '订单不存在' });
    if (order.userId !== req.user.id) return res.status(403).json({ message: '无权取消该订单' });
    await order.destroy();
    res.json({ message: '订单已取消' });
  } catch (err) {
    res.status(500).json({ message: '取消订单失败' });
  }
};