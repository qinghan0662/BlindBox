// 文件路径: D:\xinjian3\backend\migrations\20240820-create-blindbox-items.js
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BlindBoxItems', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      blindBoxId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'BlindBoxes',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      rarity: {
        type: Sequelize.ENUM('common', 'rare', 'epic'),
        defaultValue: 'common'
      },
      probability: {
        type: Sequelize.FLOAT,
        defaultValue: 0.1,
        validate: {
          min: 0,
          max: 1
        }
      },
      imageUrl: Sequelize.STRING(255)
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('BlindBoxItems');
  }
};