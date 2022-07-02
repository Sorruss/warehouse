const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    static associate({ Item, User }) {
      this.belongsTo(Item, {
        foreignKey: "item_id",
      });
      this.belongsTo(User, {
        foreignKey: "owner_id",
      });
    }
  }

  CartItem.init(
    {
      ordered_quantity: {
        type: DataTypes.INTEGER,
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
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        defaultValue: new Date(),
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Cart",
      tableName: "cart",
    }
  );

  return CartItem;
};
