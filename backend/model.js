const Sequelize = require("sequelize");


const sequelize = require("./orm_setup");


const Manager = sequelize.define("Manager", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    middleName: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    dateOfBirth: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    votes: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    }
});

const Investor = sequelize.define("Investor", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    middleName: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    dateOfBirth: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    votes: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    working: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    timezone:{
        type:Sequelize.STRING,
        allowNull:false
    }

});

// Define the associations
Manager.hasMany(Investor); // Manager has many Investors
Investor.belongsTo(Manager);

const Wallet = sequelize.define("wallet", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    currency: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

const AdminWallet = sequelize.define("adminWwallet", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    currency: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

const Transaction = sequelize.define("transaction", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
   
    type: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    }
});

// Define the one-to-one association
Investor.hasOne(Wallet, { onDelete: 'CASCADE' }); // Investor has one Wallet
Wallet.belongsTo(Investor); 
const Admin = sequelize.define('admin', {
    name: {
      type: DataTypes.STRING,
      unique: true, // Enforce uniqueness at the database level
      allowNull: false, // Ensure the field is not nullable
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true, // Validate email format
      },
    },
  }, {
    // Define custom validation to ensure only one entry exists
    validate: {
      async uniqueCheck() {
        const count = await Admin.count();
        if (this.isNewRecord && count > 0) {
          throw new Error('This model can only have one entry.');
        }
      },
    },
  });
  Admin.hasMany(Wallet,{
    foreignKey : "address_id",
    onDelete : "CASCADE",
    onUpdate : "CASCADE",
})
sequelize.sync()
  .then(() => {
    console.log('Investor model synced with database.');
  })
  .catch(err => {
    console.error('Unable to sync User model:', err);
  });


module.exports = Investor;