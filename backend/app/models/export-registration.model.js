module.exports = (sequelize, Sequelize) => {
  const ExportOrders = sequelize.define("exportOrders", {
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

  ExportOrders.hasMany(require("./export.model.js")(sequelize, Sequelize), {
    onDelete: "cascade",
    foreignKey: "export_order_id",
  });

  return ExportOrders;
};
