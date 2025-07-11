const { Sequelize } = require('sequelize');
const dbConfig = require('./db');

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    timezone: dbConfig.timezone,
    logging: false // 关闭SQL日志（生产环境建议开启）
  }
);

module.exports = sequelize;