const { Model } = require("sequelize");
const { getDate } = require("../functions");

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
        defaultValue: getDate(),
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
