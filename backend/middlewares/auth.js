const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { Op } = require('sequelize');

// 错误响应模板
const authError = (res, message) => {
  return res.status(401).json({
    success: false,
    message: message || '认证失败，请重新登录'
  });
};

/**
 * JWT认证中间件
 * 功能：
 * 1. 从Header/Query/Cookie中提取Token
 * 2. 验证Token有效性
 * 3. 注入用户信息到req.user
 */
const authenticate = async (req, res, next) => {
  try {
    // 从多种位置获取token（兼容不同客户端）
    const token = req.headers.authorization?.split(' ')[1] || 
                 req.query.token || 
                 req.cookies?.token;

    if (!token) {
      return authError(res, '未提供认证令牌');
    }

    // 验证JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 查询用户是否存在
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

    // 注入用户信息到请求对象
    req.user = user.get({ plain: true });
    next();
  } catch (err) {
    console.error('JWT验证失败:', err.message);
    
    if (err.name === 'TokenExpiredError') {
      return authError(res, '登录已过期，请重新登录');
    }
    if (err.name === 'JsonWebTokenError') {
      return authError(res, '无效的认证令牌');
    }
    
    authError(res, '认证失败');
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
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
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
  optionalAuth  // 可选认证
};