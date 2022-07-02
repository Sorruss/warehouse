const { Model } = require("sequelize");

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
        defaultValue: (function () {
          const today = new Date();
          const custom_months = [
            "Січень",
            "Лютий",
            "Березень",
            "Квітень",
            "Травень",
            "Червень",
            "Липень",
            "Серпень",
            "Вересень",
            "Жовтень",
            "Листопад",
            "Грудень",
          ];
          const custom_days = [
            "Неділя",
            "Понеділок",
            "Вівторок",
            "Середа",
            "Четвер",
            "П'ятниця",
            "Субота",
          ];
          const date =
            custom_months[today.getMonth()] +
            " " +
            custom_days[today.getDay()] +
            "(" +
            today.getDate() +
            ")";
          const time = today.getHours() + ":" + today.getMinutes();
          return date + " " + time;
        })(),
        allowNull: true,
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
