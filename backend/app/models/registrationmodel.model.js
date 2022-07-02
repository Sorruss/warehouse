"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RegistrationModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ ExportOrder, ImportOrder }) {
      this.belongsTo(ExportOrder, {
        foreignKey: "export_order_id",
        allowNull: true,
      });
      this.belongsTo(ImportOrder, {
        foreignKey: "import_order_id",
        allowNull: true,
      });
    }
  }
  RegistrationModel.init(
    {
      ritem_name: DataTypes.STRING,
      ordered_quantity: DataTypes.INTEGER,
      ritem_quantity: DataTypes.INTEGER,
      ritem_id: DataTypes.INTEGER,

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
      modelName: "RegistrationModel",
      tableName: "registration_items",
    }
  );

  return RegistrationModel;
};
