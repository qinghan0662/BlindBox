const { Sequelize } = require('sequelize');

// 请将 '数据库名'、'用户名'、'密码' 替换为你实际的 MySQL 信息
const sequelize = new Sequelize('blindbox_db', 'root', '!Qing12345han', {
  host: '127.0.0.1',
  port: 3306,
  dialect: 'mysql',
  logging: false
});

module.exports = sequelize;