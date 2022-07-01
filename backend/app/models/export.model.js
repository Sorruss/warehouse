const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ExportItem extends Model {
    static associate({ Item, ExportOrder }) {
      this.belongsTo(Item, {
        onDelete: "cascade",
        foreignKey: "item_id",
      });
      this.belongsTo(ExportOrder, {
        onDelete: "cascade",
        foreignKey: "export_order_id",
        allowNull: true,
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
