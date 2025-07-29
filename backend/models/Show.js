const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

module.exports = (sequelize, DataTypes) => {
  const Show = sequelize.define('Show', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '用户ID'
    },
    blindBoxId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '盲盒ID'
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: '秀内容'
    },
    image: {
      type: DataTypes.STRING,
      comment: '秀图片'
    }
  }, {
    tableName: 'shows',
    timestamps: true,
    paranoid: true
  });

  Show.associate = function(models) {
    Show.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    Show.belongsTo(models.BlindBox, { foreignKey: 'blindBoxId', as: 'blindBox' });
  };

  return Show;
};
