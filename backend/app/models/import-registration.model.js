module.exports = (sequelize, Sequelize) => {
  const ImportOrders = sequelize.define("importOrders", {
    special_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    order_name: {
      type: Sequelize.STRING,
      allowNull: true,
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

  ImportOrders.hasMany(require("./cart.model.js")(sequelize, Sequelize), {
    onDelete: "cascade",
    foreignKey: "import_order_id",
  });

  return ImportOrders;
};
