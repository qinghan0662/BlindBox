const { User } = require('../models');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // 密码加密
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // 创建用户
    const user = await User.create({
      username,
      email,
      password: hashedPassword
    });
    
    res.status(201).json({ success: true });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ error: '用户名或邮箱已存在' });
    } else {
      res.status(500).json({ error: '服务器错误' });
    }
  }
};