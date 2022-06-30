module.exports = (sequelize, Sequelize) => {
  const Items = sequelize.define("items", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    middleName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    position: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phone1: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phone2: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    photoSrc: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });

  return Items;
};
