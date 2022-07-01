module.exports = (sequelize, Sequelize) => {
  const ExportItems = sequelize.define("exportItems", {
    ordered_quantity: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false,
      validate: {
        min: 1,
        max: 9999999,
      },
    },

    createdAt: {
      allowNull: false,
      defaultValue: new Date(),
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      defaultValue: new Date(),
      type: Sequelize.DATE,
    },
  });

  ExportItems.belongsTo(require("./items.model.js")(sequelize, Sequelize), {
    onDelete: "cascade",
    foreignKey: "item_id",
  });

  return ExportItems;
};
