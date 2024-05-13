import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute,} from 'sequelize';
import { Investment } from './investorTypes';
import sequelize from '../orm_setup';


export class Admin extends Model<InferAttributes<Admin>, InferCreationAttributes<Admin>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare password: string;
  declare email: string;
  declare changePasswordToken?: string | null;
  declare verificationToken?: string | null;
  declare isVerified: boolean|null;
 
}

export class AdminWallet extends Model<InferAttributes<AdminWallet>, InferCreationAttributes<AdminWallet>> {
  declare id: CreationOptional<number>;
    declare address: string;
    declare currency: string;
    declare blockchain: string;
    declare network: string;  
   

  }



  
export class Promo extends Model<InferAttributes<Promo>, InferCreationAttributes<Promo>> {
  declare id: CreationOptional<number>;
    declare startDate: string;
    declare endDate: string;
}

AdminWallet.init(
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
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    blockchain: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'unique_blockchain_network',
    },
    network: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'unique_blockchain_network',
    },
  },
  {
    sequelize, 
    modelName: 'AdminWallet', 
    indexes: [
      {
        unique: true,
        fields: ['blockchain', 'network'],
        name: 'unique_blockchain_network_index', // Custom index name for the unique pair
      },
    ],
  }
);
Admin.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
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
        isEmail: true,
      },
    },
    changePasswordToken: {
      type: DataTypes.STRING(2048),
      allowNull: true,
    },
    verificationToken: {
      type: DataTypes.STRING(2048),
      allowNull: true,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  
  },
   { sequelize, 
    modelName: 'Admin', 
    validate: {
      async uniqueCheck() {
        const count = await Admin.count();
        if (count > 1) {
          throw new Error('There can only be one admin');
        }
      },
    }
  }
);


Promo.init(
  {
    startDate: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    sequelize, 
    modelName: 'Promo', 
  }
);