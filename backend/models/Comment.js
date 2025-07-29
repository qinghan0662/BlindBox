module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    blindBoxId: { type: DataTypes.INTEGER, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    rate: { type: DataTypes.INTEGER, defaultValue: 5 }
  }, {
    tableName: 'comments',
    timestamps: true
  });
  return Comment;
};
