const { User, BlindBox } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const jwtSecret = process.env.JWT_SECRET || 'blindbox_secret';

exports.register = async (req, res) => {
  console.log('收到注册请求:', req.body);
  try {
    const { username, password, phone } = req.body;
    if (!username || !password || !phone) {
      console.log('缺少字段:', { username, password, phone });
      return res.status(400).json({ message: '用户名、密码、手机号不能为空' });
    }
    // 检查唯一
    const exist = await User.findOne({ where: { username } });
    if (exist) {
      console.log('用户名已存在:', username);
      return res.status(400).json({ message: '用户名已存在' });
    }
    const existPhone = await User.findOne({ where: { phone } });
    if (existPhone) {
      console.log('手机号已注册:', phone);
      return res.status(400).json({ message: '手机号已注册' });
    }
    // 密码加密
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hash, phone });
    console.log('注册成功:', user.username);
    res.status(201).json({ username: user.username });
  } catch (err) {
    console.error('注册异常:', err);
    res.status(500).json({ message: '注册失败，请检查字段和数据库结构' });
  }
};

exports.login = async (req, res) => {
  console.log('收到登录请求:', req.body);
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { username },
          { phone: username }
        ]
      }
    });
    if (!user) {
      return res.status(400).json({ message: '用户不存在' });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(400).json({ message: '密码错误' });
    }
    const blindBoxes = await BlindBox.findAll({
      where: { creatorId: user.id }
    });
    const token = jwt.sign({ id: user.id, role: user.role }, jwtSecret, { expiresIn: '7d' });
    res.json({
      token,
      username: user.username,
      userId: user.id,
      blindBoxes
    });
  } catch (err) {
    console.error('登录异常:', err);
    res.status(500).json({ message: '登录失败' });
  }
};

exports.getMe = async (req, res) => {
  res.json(req.user);
};