module.exports = (sequelize, Sequelize) => {
  const ImportOrders = sequelize.define("importOrders", {
    order_name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [1, 72],
      },
    },
    income_date: {
      type: Sequelize.STRING,
      defaultValue: new Date().toDateString(),
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

  ImportOrders.hasMany(require("./items.model.js")(sequelize, Sequelize), {
    foreignKey: "items_id",
  });
  ImportOrders.belongsTo(require("./users.model.js")(sequelize, Sequelize), {
    foreignKey: "owner_id",
  });

  return ImportOrders;
};
