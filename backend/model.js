const Sequelize = require("sequelize");


const sequelize = require("./orm_setup");


const Investor = sequelize.define("investor", {
    id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull: false,
        primaryKey : true,
    },

    lastName : {
        type : Sequelize.STRING,
        allowNull : false,
    },


    firstName : {
        type : Sequelize.STRING,
        allowNull : false,
    },
    
    middleName : {
        type : Sequelize.STRING,
        allowNull : true,
    },


    dateOfBirth: {
        type: Sequelize.DATEONLY,
        allowNull : false,
    },

    email : {
        type : Sequelize.STRING,
        allowNull : false,
    },

    phoneNumber : {
        type : Sequelize.STRING,
        allowNull : false,
    },
    votes : {
        type : Sequelize.DOUBLE,
        allowNull : false,

    },
})
sequelize.sync()
  .then(() => {
    console.log('Investor model synced with database.');
  })
  .catch(err => {
    console.error('Unable to sync User model:', err);
  });


module.exports = Investor;