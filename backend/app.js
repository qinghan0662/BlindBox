const express = require('express');
const sequelize = require('./config/sequelize');
const authRoutes = require('./routes/auth');
const blindboxRoutes = require('./routes/blindbox'); // 新增
const orderRoutes = require('./routes/order'); // 新增
const showRoutes = require('./routes/show'); // 新增
const commentRoutes = require('./routes/comment'); // 新增

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
app.use('/api/blindbox', blindboxRoutes); // 盲盒管理
app.use('/api/order', orderRoutes); // 订单管理
app.use('/api/show', showRoutes); // 玩家秀
app.use('/api/comment', commentRoutes); // 评论管理

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`服务器已启动，端口：${PORT}`);
});

module.exports = app;