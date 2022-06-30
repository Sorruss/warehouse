module.exports = (sequelize, Sequelize) => {
  const CartItems = sequelize.define("cartItems", {
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

  CartItems.belongsTo(require("./items.model.js")(sequelize, Sequelize), {
    foreignKey: "item_id",
  });
  CartItems.belongsTo(require("./users.model.js")(sequelize, Sequelize), {
    foreignKey: "owner_id",
  });

  return CartItems;
};
