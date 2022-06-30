module.exports = (sequelize, Sequelize) => {
  const Company = sequelize.define("company", {
    company_name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [2, 72],
      },
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
    special_id: {
      type: Sequelize.INTEGER,
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
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [7, 42],
      },
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        len: [10, 10000],
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

  // Company.hasMany(require("./users.model.js")(sequelize, Sequelize));
  // Company.hasMany(require("./items.model.js")(sequelize, Sequelize));

  return Company;
};
