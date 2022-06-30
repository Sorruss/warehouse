module.exports = (sequelize, Sequelize) => {
  const ExportOrders = sequelize.define("exportOrders", {
    order_name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [1, 72],
      },
    },
    income_date: {
      type: Sequelize.STRING,
      allowNull: false,
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

  ExportOrders.hasMany(require("./items.model.js")(sequelize, Sequelize), {
    foreignKey: "items_id",
  });
  ExportOrders.belongsTo(require("./users.model.js")(sequelize, Sequelize), {
    foreignKey: "owner_id",
  });

  return ExportOrders;
};
