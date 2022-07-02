const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ImportOrder extends Model {
    static associate({ RegistrationModel }) {
      this.hasMany(RegistrationModel, {
        onDelete: "cascade",
        foreignKey: "import_order_id",
      });
    }
  }

  ImportOrder.init(
    {
      special_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      order_name: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [1, 72],
        },
      },
      income_date: {
        type: DataTypes.STRING,
        defaultValue: new Date().toDateString(),
        allowNull: false,
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
      modelName: "ImportOrder",
      tableName: "import_orders",
    }
  );

  return ImportOrder;
};
