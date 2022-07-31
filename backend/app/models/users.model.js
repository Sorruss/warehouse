const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Cart, Export, ImportOrder, ExportOrder, Company }) {
      this.hasMany(Cart, {
        onDelete: "cascade",
        foreignKey: "owner_id",
        onDelete: "cascade",
      });
      this.hasMany(Export, {
        onDelete: "cascade",
        foreignKey: "owner_id",
        onDelete: "cascade",
      });
      this.hasMany(ImportOrder, {
        onDelete: "cascade",
        foreignKey: "owner_id",
        onDelete: "cascade",
      });
      this.hasMany(ExportOrder, {
        onDelete: "cascade",
        foreignKey: "owner_id",
        onDelete: "cascade",
      });

      this.belongsTo(Company, {
        foreignKey: "company_id",
        onDelete: "cascade",
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
      user_role: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "worker",
        validate: {
          isIn: [["worker", "admin"]],
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
