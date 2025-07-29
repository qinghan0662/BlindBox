const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    blindBoxId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending'
    },
    resultType: {
      type: DataTypes.STRING
    },
    resultName: {
      type: DataTypes.STRING
    }
    // ...其它字段...
  }, {
    tableName: 'orders',
    timestamps: true
  });

  return Order;
};
