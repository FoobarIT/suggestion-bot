module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Suggests',
        'guildId',
         Sequelize.INTEGER
       )
    ]);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'Suggests',
      'guildId'
    );
  }
};