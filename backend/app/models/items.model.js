module.exports = (sequelize, Sequelize) => {
  const Items = sequelize.define("items", {
    item_name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1, 72],
      },
    },
    income_date: {
      type: Sequelize.STRING,
      defaultValue: new Date().toDateString(),
      allowNull: false,
    },
    quantity: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false,
      validate: {
        min: 0,
        max: 9999999,
      },
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        len: [10, 10000],
      },
    },
    photo_src: {
      type: Sequelize.STRING,
      defaultValue: "default",
      allowNull: true,
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

  // Items.belongsTo(require("./company.model.js")(sequelize, Sequelize), {
  //   foreignKey: "company_id",
  // });

  return Items;
};
