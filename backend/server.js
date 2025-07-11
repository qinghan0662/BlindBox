const app = require('./app');
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`后端服务已启动: http://localhost:${PORT}`);
});