"use strict";
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("RegistrationModels", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      ritem_name: {
        type: DataTypes.STRING,
      },
      ordered_quantity: {
        type: DataTypes.INTEGER,
      },
      ritem_id: {
        type: DataTypes.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("RegistrationModels");
  },
};
