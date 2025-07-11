const { BlindBox, BlindBoxItem } = require('../models');
const { Op } = require('sequelize');

// 创建盲盒（管理员）
exports.createBlindBox = async (req, res) => {
  try {
    const { name, description, price, items } = req.body;

    // 创建盲盒并关联物品
    const blindBox = await BlindBox.create({
      name,
      description,
      price,
      creatorId: req.user.id, // 假设从JWT中获取用户ID
      items: items.map(item => ({
        ...item,
        probability: item.probability || 0.1 // 默认概率
      }))
    }, {
      include: [{ model: BlindBoxItem, as: 'items' }]
    });

    res.status(201).json({
      success: true,
      data: blindBox
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// 获取盲盒列表（分页+搜索）
exports.getBlindBoxes = async (req, res) => {
  try {
    const { page = 1, limit = 10, keyword } = req.query;
    const offset = (page - 1) * limit;

    const where = {};
    if (keyword) {
      where.name = { [Op.like]: `%${keyword}%` };
    }

    const { count, rows } = await BlindBox.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset,
      include: [{
        model: BlindBoxItem,
        as: 'items',
        attributes: ['id', 'name', 'rarity']
      }],
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

// 抽取盲盒
exports.drawFromBlindBox = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // 1. 查找盲盒
    const blindBox = await BlindBox.findByPk(id, {
      include: [{
        model: BlindBoxItem,
        as: 'items',
        attributes: ['id', 'name', 'rarity', 'probability']
      }]
    });

    if (!blindBox) {
      return res.status(404).json({
        success: false,
        message: '盲盒不存在'
      });
    }

    // 2. 按概率随机抽取物品
    const totalProbability = blindBox.items.reduce(
      (sum, item) => sum + (item.probability || 0.1), 0);
    
    let random = Math.random() * totalProbability;
    let selectedItem = null;

    for (const item of blindBox.items) {
      random -= item.probability || 0.1;
      if (random <= 0) {
        selectedItem = item;
        break;
      }
    }

    // 3. 创建订单记录
    const order = await Order.create({
      userId,
      blindBoxId: blindBox.id,
      itemId: selectedItem.id,
      price: blindBox.price,
      status: 'completed'
    });

    res.json({
      success: true,
      data: {
        item: selectedItem,
        orderId: order.id
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};