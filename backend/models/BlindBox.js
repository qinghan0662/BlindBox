const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const BlindBox = sequelize.define('BlindBox', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '盲盒名称'
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: '盲盒描述'
  },
  price: {
    type: DataTypes.DECIMAL(10, 2), // 支持小数点后两位
    allowNull: false,
    comment: '盲盒价格',
    validate: {
      min: 0 // 价格不能为负数
    }
  },
  coverImage: {
    type: DataTypes.STRING,
    comment: '封面图片URL',
    defaultValue: 'default_cover.jpg'
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active',
    comment: '盲盒状态'
  }
}, {
  tableName: 'blind_boxes', // 自定义表名
  timestamps: true, // 自动添加 createdAt 和 updatedAt
  paranoid: true, // 启用软删除（自动添加 deletedAt）
  getterMethods: {
    // 示例：添加虚拟字段
    formattedPrice() {
      return `¥${this.price.toFixed(2)}`;
    }
  }
});

// 定义关联关系（可选）
BlindBox.associate = function(models) {
  // 一个盲盒有多个订单
  BlindBox.hasMany(models.Order, {
    foreignKey: 'blindBoxId',
    as: 'orders'
  });
  
  // 一个盲盒属于一个创建者（用户）
  BlindBox.belongsTo(models.User, {
    foreignKey: 'creatorId',
    as: 'creator'
  });
};

module.exports = BlindBox;