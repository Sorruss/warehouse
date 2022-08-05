const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    static associate({ Item, User, Producer }) {
      this.hasMany(Item, {
        foreignKey: "company_id",
        onDelete: "cascade",
      });
      this.hasMany(User, {
        foreignKey: "company_id",
        onDelete: "cascade",
      });
      this.hasMany(Producer, {
        foreignKey: "company_id",
        onDelete: "cascade",
      });
    }
  }

  Company.init(
    {
      company_name: {
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
          len: [10, 18],
        },
      },
      phone2: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [10, 18],
        },
      },
      photo_src: {
        type: DataTypes.STRING,
        defaultValue: "default",
        allowNull: true,
      },
      special_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        validate: {
          is: "/^[1-9]{1}[0-9]{6}$/i",
          min: 1000001,
          max: 9999999,
          len: [7, 7],
        },
      },
      company_password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [7, 42],
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
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
      modelName: "Company",
      tableName: "companies",
    }
  );

  return Company;
};
