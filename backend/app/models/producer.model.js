const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Producer extends Model {
    static associate({ Item }) {
      this.hasMany(Item, {
        onDelete: "cascade",
        foreignKey: "producer_id",
      });
    }
  }

  Producer.init(
    {
      producer_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [2, 72],
        },
      },
      phone1: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [10, 42],
        },
      },
      phone2: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [10, 42],
        },
      },
      photo_src: {
        type: DataTypes.STRING,
        defaultValue: "default",
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          len: [10, 10000],
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
      modelName: "Producer",
      tableName: "producers",
    }
  );

  return Producer;
};
