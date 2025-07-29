module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      comment: '用户名'
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '密码（加密存储）'
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      comment: '手机号'
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      defaultValue: 'user',
      comment: '用户角色'
    },
    status: {
      type: DataTypes.ENUM('active', 'banned'),
      defaultValue: 'active',
      comment: '用户状态'
    }
  }, {
    tableName: 'users',
    timestamps: true,
    paranoid: true
  });
  return User;
};