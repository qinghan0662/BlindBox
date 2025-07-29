'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const db = {};

// 只加载以大写字母开头的 js 文件（模型文件）
fs.readdirSync(__dirname)
  .filter(file =>
    file !== 'index.js' &&
    file.endsWith('.js') &&
    /^[A-Z]/.test(file)
  )
  .forEach(file => {
    try {
      const modelFunc = require(path.join(__dirname, file));
      if (typeof modelFunc === 'function') {
        const model = modelFunc(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
      } else {
        console.warn(`模型文件 ${file} 不是函数导出，已跳过`);
      }
    } catch (err) {
      console.error(`加载模型文件 ${file} 时出错:`, err);
    }
  });

// 统一写关联关系
db.Order.belongsTo(db.BlindBox, { foreignKey: 'blindBoxId' });
db.Order.belongsTo(db.User, { foreignKey: 'userId' });
db.Comment.belongsTo(db.User, { foreignKey: 'userId' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
