class AppError extends Error {
  /**
   * 自定义应用错误类
   * @param {string} message 错误信息
   * @param {number} statusCode HTTP状态码
   * @param {string} errorType 错误类型（用于前端分类处理）
   * @param {boolean} isOperational 是否可操作错误（与系统错误区分）
   */
  constructor(message, statusCode = 400, errorType = 'operational_error', isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.errorType = errorType;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

// 特定错误类型（按业务需求扩展）
class ValidationError extends AppError {
  constructor(fieldErrors, message = '数据验证失败') {
    super(message, 422, 'validation_error');
    this.fieldErrors = fieldErrors; // 字段级错误详情
  }
}

class AuthenticationError extends AppError {
  constructor(message = '认证失败') {
    super(message, 401, 'authentication_error');
  }
}

class PermissionDeniedError extends AppError {
  constructor(message = '无权执行此操作') {
    super(message, 403, 'authorization_error');
  }
}

class NotFoundError extends AppError {
  constructor(resourceName = '资源') {
    super(`${resourceName}不存在`, 404, 'not_found_error');
  }
}

class RateLimitError extends AppError {
  constructor(message = '请求过于频繁') {
    super(message, 429, 'rate_limit_error');
  }
}

/**
 * 全局错误处理中间件
 * 注意：必须作为最后一个中间件使用
 */
const errorHandler = (err, req, res, next) => {
  // 默认值设置
  err.statusCode = err.statusCode || 500;
  err.errorType = err.errorType || 'server_error';

  // 记录错误日志（生产环境应接入日志系统）
  console.error(`[${new Date().toISOString()}]`, {
    error: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    ip: req.ip
  });

  // 生产环境下隐藏系统错误详情
  const isProduction = process.env.NODE_ENV === 'production';
  const response = {
    success: false,
    errorType: err.errorType,
    message: err.message,
    ...(!isProduction && { stack: err.stack })
  };

  // 添加验证错误的字段详情
  if (err instanceof ValidationError && err.fieldErrors) {
    response.fieldErrors = err.fieldErrors;
  }

  // 发送错误响应
  res.status(err.statusCode).json(response);
};

/**
 * 404处理器（需放在所有路由之后）
 */
const notFoundHandler = (req, res, next) => {
  next(new NotFoundError(`路由 ${req.method} ${req.path}`));
};

module.exports = {
  AppError,
  ValidationError,
  AuthenticationError,
  PermissionDeniedError,
  NotFoundError,
  RateLimitError,
  errorHandler,
  notFoundHandler
};