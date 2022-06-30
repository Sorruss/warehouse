const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: "0",
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// MODELS
db.items = require("./items.model.js")(sequelize, Sequelize);
db.cart = require("./cart.model.js")(sequelize, Sequelize);
db.export = require("./export.model.js")(sequelize, Sequelize);
db.importRegistration = require("./import-registration.model.js")(
  sequelize,
  Sequelize
);
db.exportRegistration = require("./export-registration.model.js")(
  sequelize,
  Sequelize
);
db.users = require("./users.model.js")(sequelize, Sequelize);
db.company = require("./company.model.js")(sequelize, Sequelize);
db.producer = require("./producer.model.js")(sequelize, Sequelize);

module.exports = db;
