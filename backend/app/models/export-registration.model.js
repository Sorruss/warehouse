const { Model } = require("sequelize");
const { getDate } = require("../functions");

module.exports = (sequelize, DataTypes) => {
  class ExportOrder extends Model {
    static associate({ RegistrationModel, User }) {
      this.hasMany(RegistrationModel, {
        onDelete: "cascade",
        foreignKey: "export_order_id",
      });
      this.belongsTo(User, {
        foreignKey: "owner_id",
      });
    }
  }

  ExportOrder.init(
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
        defaultValue: getDate(),
        allowNull: true,
      },
      income_date_orig: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
        allowNull: true,
        set(value) {
          this.setDataValue("income_date_orig", value);
          this.setDataValue("income_date", getDate(value));
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
      modelName: "ExportOrder",
      tableName: "export_orders",
    }
  );

  return ExportOrder;
};
