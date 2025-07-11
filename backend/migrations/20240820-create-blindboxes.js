// 文件路径: D:\xinjian3\backend\migrations\20240820-create-blindboxes.js
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BlindBoxes', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          min: 0
        }
      },
      coverImage: {
        type: Sequelize.STRING(255),
        defaultValue: 'default_cover.jpg'
      },
      status: {
        type: Sequelize.ENUM('active', 'inactive'),
        defaultValue: 'active'
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('BlindBoxes');
  }
};