const { Order, BlindBox, BlindBoxItem, User } = require('../models');

// 获取用户订单历史
exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows } = await Order.findAndCountAll({
      where: { userId },
      limit: parseInt(limit),
      offset,
      include: [
        {
          model: BlindBox,
          attributes: ['id', 'name', 'coverImage']
        },
        {
          model: BlindBoxItem,
          as: 'item',
          attributes: ['id', 'name', 'rarity', 'imageUrl']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        totalPages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
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