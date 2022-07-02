const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Cart, Export, ImportOrder, ExportOrder, Company }) {
      this.hasMany(Cart, {
        onDelete: "cascade",
        foreignKey: "owner_id",
      });
      this.hasMany(Export, {
        onDelete: "cascade",
        foreignKey: "owner_id",
      });
      this.hasMany(ImportOrder, {
        onDelete: "cascade",
        foreignKey: "owner_id",
      });
      this.hasMany(ExportOrder, {
        onDelete: "cascade",
        foreignKey: "owner_id",
      });

      this.belongsTo(Company, {
        foreignKey: "company_id",
      });
    }
  }

  User.init(
    {
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [2, 42],
        },
      },
      middle_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [2, 42],
        },
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [2, 42],
        },
      },
      user_position: {
        type: DataTypes.STRING,
        allowNull: false,
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
      user_login: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [7, 42],
        },
      },
      user_password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [7, 42],
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
      modelName: "User",
      tableName: "users",
    }
  );

  return User;
};
