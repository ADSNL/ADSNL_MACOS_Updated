const Sequelize = require('sequelize')
const db = {}
const sequelize = new Sequelize('macos_login', 'ADSNL', 'ADSNL_2020', {
    host: 'mysql-macoslog.c0yzxuhp43yb.us-east-2.rds.amazonaws.com',
    dialect: 'mysql',
    operatorsAliases: false,
    port: 3306,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db