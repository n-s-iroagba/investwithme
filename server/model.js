const Sequelize = require("sequelize");
const sequelize = require("./orm_setup");
const { COMPANY_NAME } = require("./config");


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
    image: {
      type: Sequelize.STRING,
      allowNull: false,
  },
    minimumDeposit: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },

    returnPercentage: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    country: {
        type: Sequelize.STRING,
        allowNull: false,
    },

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
    dateOfBirth: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    bank: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    gender: {
      type: Sequelize.STRING,
      allowNull: false,
  },
  country: {
    type: Sequelize.STRING,
    allowNull: false,
},
    timezone:{
        type:Sequelize.STRING,
        allowNull:false
    },
    referralCode:{
      type:Sequelize.INTEGER,
      allowNull:true,
  },
  verificationToken:{
    type:Sequelize.STRING,
    allowNull:true
},

referreeId:{
  type:Sequelize.INTEGER,
  allowNull:true,
},

hasInvested:{
  type:Sequelize.BOOLEAN,
  allowNull:true,
},

changePasswordToken:{
        type:Sequelize.STRING,
        allowNull:true
    },

});

const Investment= sequelize.define("investment", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
 
    incrementPercent:{
        type:Sequelize.DOUBLE,
        allowNull:false,
        defaultValue:0.0
    },
    amount:{
        type:Sequelize.INTEGER,
        allowNull:true,
        defaultValue:0

    },

   amountDeposited:{
    type:Sequelize.INTEGER,
    allowNull:false,
    defaultValue:0
   },

  creationDate:{
        type:Sequelize.DATE,
        allowNull:false,
    },
    investmentDate:{
      type:Sequelize.DATE,
      allowNull:false,
    },
    dueDate:{
        type:Sequelize.DATE,
        allowNull:true,
    },
    isPaused:{
      type:Sequelize.BOOLEAN,
      allowNull:false,
      defaultValue:false
    }
});

Investor.hasOne(Investment,{
    foreignKey:'investorId',
    onDelete:'CASCADE'
})

Manager.hasMany(Investment,{
    foreignKey:'managerId',
    onDelete:'CASCADE'
})

const DepositWallet = sequelize.define("depositWallet", {
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
    blockchain: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    network: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Investor.hasOne(DepositWallet,{
    foreignKey:'investorId',
    onDelete:'CASCADE'
})


const Transaction = sequelize.define('transaction', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    amount: {
      type:Sequelize.FLOAT,
      allowNull: false,
    },
    participatingAccound: {
      type:Sequelize.STRING,
      allowNull: false,
      validate: {
        isIn: [['Your Wallet', COMPANY_NAME]],
      },
    },
  narration: {
      type:Sequelize.STRING,
      allowNull: false,
    },
    date: {
      type:Sequelize.DATE,
      defaultValue:Sequelize.NOW,
    },
    type: {
      type:Sequelize.STRING,
      allowNull: false,
      validate: {
        isIn: [['Deposit', 'Credit']],
      },
    },
  });

  Investor.hasMany(Transaction, {
    foreignKey: 'investorId',
    onDelete: 'CASCADE', 
  });

  Investment.Admin.hasMany(Transaction, {
    foreignKey: 'investmentId',
    onDelete: 'CASCADE', 
  });
  
  const Referral = sequelize.define('Referral', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    amount: {
      type: Sequelize.DOUBLE,
      allowNull: false,
      defaultValue: 0.0,
    },
    duePayment: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });
  
  Investor.hasMany(Referral, {
    foreignKey: 'refereeId',
    onDelete: 'CASCADE', 
  });
  
  Investor.hasOne(Referral, {
    foreignKey: 'referredId',
    onDelete: 'CASCADE', 
  });
  DepositWallet.hasOne(Referral,{
    foreignKey: 'walletId',
    onDelete: 'CASCADE', 
  });

   const Notification = sequelize.define('notifications', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type:Sequelize.STRING,
      allowNull: false,
    
    },
    message: {
      type:Sequelize.STRING,
      allowNull: false,
    
    },
  });

  Investor.hasMany(Notification, {
    foreignKey: 'investorId',
    onDelete: 'CASCADE', 
  });
  const PromoNotification = sequelize.define('promoNotifications', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type:Sequelize.STRING,
      allowNull: false,
    
    },
    message: {
      type:Sequelize.STRING,
      allowNull: false,
    
    },
  });

  Investor.hasMany(PromoNotification, {
    foreignKey: 'investorId',
    onDelete: 'CASCADE', 
  });




  const AdminWallet = sequelize.define('AdminWallet', {
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
    blockchain: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: 'unique_blockchain_network', // Use a custom unique constraint name
    },
    network: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: 'unique_blockchain_network', // Use the same custom unique constraint name
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['blockchain', 'network'],
        name: 'unique_blockchain_network_index' // Custom index name for the unique pair
      }
    ]
  });
  



const Admin = sequelize.define('admin', {
    name: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    changePasswordToken:{
        type:Sequelize.STRING,
        defaultValue:'',
        allowNull:true
    },
    verificationToken:{
        type:Sequelize.STRING,
        defaultValue:"",
        allowNull:true
    },
    verified: {
      type: Sequelize.BOOLEAN,
      defaultValue:false,
      allowNull: false,
    },
  }, {
    // Define custom validation to ensure only one entry exists
    validate: {
      async uniqueCheck() {
        const count = await Admin.count();
        if (this.isNewRecord && count > 0) {
          throw new Error('There can only be one admin');
        }
      },
    },
  });

sequelize.sync()
  .then(() => {
    console.log('Investor model synced with database.');
  })
  .catch(err => {
    console.error('Unable to sync User model:', err);
  });
module.exports =  {Investor,Admin,Manager,AdminWallet,DepositWallet,Referral,Investment,Transaction,Notification,PromoNotification}