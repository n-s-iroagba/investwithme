const Sequelize = require("sequelize");


const sequelize = new Sequelize("investwithme", "root", "97chocho",{
    dialect : "mysql",
    host: 'localhost',
    port:3306,
});

module.exports = sequelize;

const Investor = require("./model")