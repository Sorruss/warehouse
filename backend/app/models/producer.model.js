module.exports = (sequelize, Sequelize) => {
  const Producer = sequelize.define("producer", {
    producer_name: {
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
      defaultValue: "default",
      allowNull: true,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true,
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

  Producer.hasMany(require("./items.model.js")(sequelize, Sequelize), {
    onDelete: "cascade",
    foreignKey: "producer_id",
  });

  return Producer;
};
