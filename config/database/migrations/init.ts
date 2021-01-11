module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('dna', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      chain: Sequelize.DataTypes.JSON,
      is_simian: Sequelize.DataTypes.BOOLEAN,
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('dna');
  },
};
