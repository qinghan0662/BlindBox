// server.js 或 app.js
const express = require('express');
const cors = require('cors');
const app = express();

// 中间件
app.use(cors());
app.use(express.json());

// 导入盲盒路由
const blindBoxRoutes = require('./routes/blindBoxRoutes');
app.use('/api/blind-boxes', blindBoxRoutes);

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`后端服务运行中：http://localhost:${PORT}`);
});