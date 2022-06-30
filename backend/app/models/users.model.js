module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    first_name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [2, 42],
      },
    },
    middle_name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [2, 42],
      },
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [2, 42],
      },
    },
    user_position: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phone1: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [10, 42],
      },
    },
    phone2: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [10, 42],
      },
    },
    photo_src: {
      type: Sequelize.STRING,
      defaultValue: "default1.png",
      allowNull: true,
    },
    user_password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [7, 42],
      },
    },

    createdAt: {
      allowNull: false,
      defaultValue: new Date(),
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      defaultValue: new Date(),
      type: Sequelize.DATE,
    },
  });

  User.belongsTo(require("./company.model.js")(sequelize, Sequelize), {
    foreignKey: "company_id",
  });

  // User.hasMany(require("./cart.model.js")(sequelize, Sequelize));
  // User.hasMany(require("./import-registration.model.js")(sequelize, Sequelize));
  // User.hasMany(require("./export-registration.model.js")(sequelize, Sequelize));

  return User;
};
