var DBSetting = require("../Setting/db.js");
var Sequelize = require('sequelize');
var sequelize = new Sequelize(DBSetting.database, DBSetting.username, DBSetting.password, {
  host: DBSetting.host,
  port: DBSetting.port,
  dialect: 'mysql',//|'mariadb'|'sqlite'|'postgres'|'mssql',

  pool: {
    max: 15,
    min: 0,
    idle: 10000
  },
  // you can close logging
  logging: null,
  
  // SQLite only
  //storage: './database.sqlite'
});

module.exports = sequelize;