const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    static associate({ Company, Producer }) {
      this.belongsTo(Company, {
        foreignKey: "company_id",
        onDelete: "cascade",
      });
      this.belongsTo(Producer, {
        foreignKey: "producer_id",
        onDelete: "cascade",
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
          len: [2, 72],
        },
      },
      income_date: {
        type: DataTypes.STRING,
        defaultValue: (function () {
          const today = new Date();
          const custom_months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ];
          const custom_days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ];
          const date =
            custom_months[today.getMonth()] +
            " " +
            custom_days[today.getDay()] +
            "(" +
            today.getDate() +
            ")";
          const time =
            today.getHours() +
            ":" +
            (today.getMinutes() < 10
              ? `0${today.getMinutes()}`
              : today.getMinutes());
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
