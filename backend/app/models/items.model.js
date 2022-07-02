const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    static associate({ Company, Producer }) {
      this.belongsTo(Company, {
        foreignKey: "company_id",
      });
      this.belongsTo(Producer, {
        foreignKey: "producer_id",
      });
    }
  }

  Item.init(
    {
      item_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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
            today.getDate() +
            " " +
            custom_months[today.getMonth()] +
            " " +
            custom_days[today.getDay()];
          const time = today.getHours() + ":" + today.getMinutes();
          return date + " " + time;
        })(),
        allowNull: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
        validate: {
          min: 0,
          max: 9999999,
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [10, 10000],
        },
      },
      photo_src: {
        type: DataTypes.STRING,
        defaultValue: "default",
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
      modelName: "Item",
      tableName: "items",
    }
  );

  return Item;
};
