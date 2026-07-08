const Sequelize = require("sequelize");
const config = require("./index");

console.log("Connecting to database:", config.db.name);
const sequelize = new Sequelize(
  config.db.name,
  config.db.username,
  config.db.password,
  {
    host: config.db.host,
    dialect: "postgres",
    port: config.db.port,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import only WhatsApp-related models (obfuscated/minimized)
db.UserDetail = require("../models/userDetail")(sequelize, Sequelize.DataTypes);
db.cropAdvisory = require("../models/cropAdvisory")(sequelize, Sequelize.DataTypes);
db.rewardActionType = require("../models/rewardActionTypeModel")(sequelize, Sequelize.DataTypes);
db.rewardActionLog = require("../models/rewardActionLogModel")(sequelize, Sequelize.DataTypes);

// Minimal optional associations that do not pull in other unmapped tables
db.rewardActionLog.belongsTo(db.rewardActionType, {
  foreignKey: "action_id",
});
db.rewardActionType.hasMany(db.rewardActionLog, {
  foreignKey: "action_id",
});

module.exports = db;
