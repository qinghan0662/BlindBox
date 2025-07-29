const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { Op } = require('sequelize');
const jwtSecret = process.env.JWT_SECRET || 'blindbox_secret';

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : null;
    if (!token) {
      return res.status(401).json({ message: '未提供认证令牌' });
    }
    const decoded = require('jsonwebtoken').verify(token, jwtSecret);
    
    const user = await User.findOne({
      where: {
        id: decoded.id,
        status: { [Op.ne]: 'banned' } // 排除被封禁用户
      },
      attributes: {
        exclude: ['password'] // 不返回密码字段
      }
    });

    if (!user) {
      return authError(res, '用户不存在或已被禁用');
    }

    req.user = user.get({ plain: true });
    next();
  } catch (err) {
    console.error('JWT验证失败:', err.message);
    return res.status(401).json({ success: false, message: '无效的认证令牌' });
  }
};

/**
 * 角色检查中间件
 * @param {string|Array} roles 允许的角色（如 'admin' 或 ['admin', 'editor']）
 */
const authorize = (roles = []) => {
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return (req, res, next) => {
    if (!req.user) {
      return authError(res, '用户未认证');
    }

    if (roles.length > 0 && !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `需要 ${roles.join('/')} 权限`
      });
    }

    next();
  };
};

/**
 * 可选认证中间件（不强制要求登录）
 * 如果用户已登录，会注入user信息
 */
const optionalAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] || 
                 req.query.token || 
                 req.cookies?.token;

    if (token) {
      const decoded = jwt.verify(token, jwtSecret);
      const user = await User.findByPk(decoded.id, {
        attributes: { exclude: ['password'] }
      });
      if (user) req.user = user.get({ plain: true });
    }
  } catch (err) {
    // 忽略token错误（因为是可选认证）
  }
  next();
};

module.exports = {
  authenticate, // 强制认证
  authorize,    // 角色授权
  optionalAuth, // 可选认证
  requireLogin: (req, res, next) => { // 修正导出方式
    if (!req.user) {
      return res.status(401).json({ message: '未登录' });
    }
    next();
  }
};