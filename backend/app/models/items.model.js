module.exports = (sequelize, Sequelize) => {
  const Items = sequelize.define("items", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    date: {
      type: Sequelize.STRING,
      default: new Date().toDateString(),
      allowNull: false,
    },
    quantity: {
      type: Sequelize.INTEGER,
      default: 0,
      allowNull: false,
    },
    desciption: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    producer: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Items;
};
