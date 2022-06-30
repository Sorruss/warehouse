module.exports = (sequelize, Sequelize) => {
  const ImportOrders = sequelize.define("importOrders", {
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

  return ImportOrders;
};
