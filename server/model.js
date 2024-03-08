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
    minimumDeposit: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    maximumDeposit: {
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
    timezone:{
        type:Sequelize.STRING,
        allowNull:false
    },
    changePasswordToken:{
        type:Sequelize.STRING,
        allowNull:true
    },
    verificationToken:{
        type:Sequelize.STRING,
        allowNull:true
    },
    referralCode:{
        type:Sequelize.STRING,
        allowNull:false,
    }
});

const Investment= sequelize.define("investment", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    amountWithdrawable:{
        type:Sequelize.DOUBLE,
        default:0.00
    },
    paymentStatus:{
        type:Sequelize.BOOLEAN,
        allowNull:false,
        default:false
    },
    incrementPercent:{
        type:Sequelize.DOUBLE,
        allowNull:true,
        defaultValue:1.0

    },
    InvestmentDate:{
        type:Sequelize.DATE,
        allowNull:true,
    },
    dueDate:{
        type:Sequelize.DATE,
        allowNull:true,
    }
});

Investor.hasMany(Investment,{
    foreignKey:'investorId',
    onDelete:'CASCADE'
})

Manager.hasMany(Investment,{
    foreignKey:'managerId',
    onDelete:'CASCADE'
})

const TopUp= sequelize.define("topUp", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    amount:{
        type:Sequelize.DATE,
        allowNull:false

    },
    profit:{
        type: Sequelize.DATE,
        allowNull: false
    },
    
});

Investment.hasMany(TopUp, {
    foreignKey: 'investmentId',
    onDelete: 'CASCADE', 
  });

const DepositWallet = sequelize.define("wallet", {
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

TopUp.hasMany(DepositWallet, {
    foreignKey: 'investmentId',
    onDelete: 'CASCADE', 
  });

const WithdrawalWallet = sequelize.define("wallet", {
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

Investment.hasOne(WithdrawalWallet,{
    foreignKey:'investmentId',
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
    time: {
      type:Sequelize.DATE,
      defaultValue:Sequelize.NOW,
    },
    type: {
      type:Sequelize.STRING,
      allowNull: false,
      validate: {
        isIn: [['deposit', 'withdrawal']],
      },
    },
  });

  Investor.hasMany(Transaction, {
    foreignKey: 'investorId',
    onDelete: 'CASCADE', 
  });

  const Referral = sequelize.define('referral', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    amountRecieved: {
      type:Sequelize.FLOAT,
      allowNull: false,
    },
    profit: {
      type:Sequelize.DOUBLE,
      allowNull:false,
      defaultValue:0
    },
    targetProfit:{
        type:Sequelize.DOUBLE,
      allowNull:true,
    } 
  });
  Investor.hasMany(Referral, {
    foreignKey: 'investorId',
    onDelete: 'CASCADE', 
  });

  Investment.hasOne(Referral,{
    foreignKey: 'investormentId',
    onDelete: 'CASCADE', 
  }

  )

   const Notification = sequelize.define('Notification', {
    amount: {
      type:Sequelize.FLOAT,
      allowNull: false,
    },
    time: {
      type:Sequelize.DATE,
      defaultValue:Sequelize.NOW,
    },
    message: {
      type:Sequelize.STRING,
      allowNull: false,
    
    },
  });



const Currency = sequelize.define('Currency', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true, 
    },
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

Currency.hasOne(AdminWallet,{
    foreignKey:'currencyId'
})

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
        allowNull:true
    },
    verificationToken:{
        type:Sequelize.STRING,
        allowNull:true
    },
    verified: {
      type: Sequelize.BOOLEAN,
      default:false,
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
module.exports =  {Investor,Admin,Manager,AdminWallet,DepositWallet,WithdrawalWallet,Investment,Transaction, TopUp,Notification}