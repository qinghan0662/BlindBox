const express = require('express');
const sequelize = require('./config/sequelize');
const authRoutes = require('./routes/auth');

const app = express();

// 中间件
app.use(express.json());

// 测试数据库连接
sequelize.authenticate()
  .then(() => console.log('MySQL连接成功'))
  .catch(err => console.error('MySQL连接失败:', err));

// 自动同步所有模型
sequelize.sync({ alter: true }) // alter: true 会自动修改表结构
  .then(() => console.log('数据库表同步完成'));

// 路由
app.use('/api/auth', authRoutes);

module.exports = app;