module.exports = (sequelize, Sequelize) => {
  const ExportOrders = sequelize.define("exportOrders", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    date: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    items: {},
  });

  return ExportOrders;
};
