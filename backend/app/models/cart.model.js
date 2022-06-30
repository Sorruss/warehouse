module.exports = (sequelize, Sequelize) => {
  const CartItems = sequelize.define("cartItems", {
    orderedQuantity: {
      type: Sequelize.INTEGER,
      default: 0,
      allowNull: false,
    },
    itemId: {},
  });

  return CartItems;
};
