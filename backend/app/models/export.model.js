const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ExportItem extends Model {
    static associate({ Item, User }) {
      this.belongsTo(Item, {
        foreignKey: "item_id",
      });
      this.belongsTo(User, {
        foreignKey: "owner_id",
      });
    }
  }

  ExportItem.init(
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
      modelName: "Export",
      tableName: "export",
    }
  );

  return ExportItem;
};
