module.exports = (sequelize, Sequelize) => {
  const ExportItems = sequelize.define("exportItems", {
    orderedQuantity: {
      type: Sequelize.INTEGER,
      default: 0,
      allowNull: false,
    },
    itemId: {},
  });

  return ExportItems;
};
