
import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute } from 'sequelize';
import { Manager } from './adminTypes';
import sequelize from '../orm_setup';


export class Investor extends Model<InferAttributes<Investor>, InferCreationAttributes<Investor>>{
declare id: CreationOptional<number>;
declare lastName: string;
declare firstName: string;
declare dateOfBirth: Date;
declare email: string;
declare bank: string;
declare password: string;
declare gender: string;
declare country: string;
declare referralCode: number | null;
declare verificationToken: string | null;
declare referrerId: number | null;
declare hasInvested: boolean | null;
declare isVerified: boolean | null;
declare changePasswordToken: string | null;
declare investment: NonAttribute<Investment>|null;
declare referrals: NonAttribute<Referral[]>|null;
}
  
export class Investment extends Model<InferAttributes<Investment>, InferCreationAttributes<Investment>> {
  declare id: CreationOptional<number>;
  declare amount: number;
  declare earnings: number | null;
  declare amountDeposited: number|0;
  declare creationDate: Date;
  declare investmentDate: Date | null;
  declare isPaused: boolean;
  declare investorId:ForeignKey<Investor['id']>
  declare investor: NonAttribute<Investor>
  declare manager: NonAttribute<Manager>
  declare managerId: ForeignKey<Manager['id']>
  declare depositWallet: NonAttribute<DepositWallet>  
  }

 export class DepositWallet extends Model<InferAttributes<DepositWallet>, InferCreationAttributes<DepositWallet>>{
declare id: CreationOptional<number>;
declare address: string;
declare blockchain: string;
declare investmentId:ForeignKey<Investment['id']>
declare investment: NonAttribute<Investment>
  declare network: string;
}

export class Referral extends Model<InferAttributes<Referral>, InferCreationAttributes<Referral>>  {
declare id: CreationOptional<number>;
declare amount: CreationOptional<number>;
declare referrerId:ForeignKey<Investor['id']>
declare referrer: NonAttribute<Investor>
declare referredId :number
declare hasInvested: boolean|null
}

export class Notification extends Model<InferAttributes<Notification>, InferCreationAttributes<Notification>>   {
declare id: CreationOptional<number>;
declare title:'Earnings'|'Bonus Payout'|'How To Deposit'|'Referral Registration'|'Referral bonus imbursement'|'Bonus imbursement'|'Investment deposit'|
    'Investment Deposit'|'Incomplete Investment Deposit'|'Investment Paused' |'Investment Continued'|'Promo Notification'|'How to invest'|'Promo Extension';
declare message:string
declare investorId:ForeignKey<Investor['id']>
declare investor: NonAttribute<Investor>
 }

 export class Transaction extends Model<InferAttributes<Transaction>, InferCreationAttributes<Transaction>>  {
declare id: CreationOptional<number>;
declare amount: number;
declare participatingAccount: 'Cassock'|'Your Crypto Wallet';
declare narration: string;
declare date: Date;
declare type: 'Debit' | 'Credit';
declare investorId:ForeignKey<Investor['id']>
declare investor: NonAttribute<Investor>

}
Investor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bank: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    referralCode: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    verificationToken: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    referrerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    hasInvested: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    changePasswordToken: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  { sequelize, modelName: 'Investor' }
);


DepositWallet.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    blockchain: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    network: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'DepositWallet' }
);

Investment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
  
    amount: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    earnings: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    amountDeposited: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    creationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    investmentDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    isPaused: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { sequelize, modelName: 'Investment' }
);

Referral.init(
        {
          id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
          },
          amount: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0.0,
          },
          referredId: {
              type: DataTypes.INTEGER, // Adjust this to match the foreign key type
              allowNull: false,
             
            },
            hasInvested: {
              type: DataTypes.BOOLEAN, // Adjust this to match the foreign key type
              allowNull: false,
              defaultValue: false,
             
            },
        },
        { sequelize, modelName: 'Referral' }
    
      );
  
 
Notification.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'Notification' }
);


Transaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    participatingAccount: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['Your Wallet', 'COMPANY_NAME']],
      },
    },
    narration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['Debit', 'Credit']],
      },
    },
  },
  { sequelize, modelName: 'Transaction' }
);

