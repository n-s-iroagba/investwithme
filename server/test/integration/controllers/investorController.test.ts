import request from 'supertest';
import { app } from "../../../src";
import sequelize from "../../../src/orm_setup";
import { Investor, Manager, Investment, DepositWallet,Notification, Transaction } from "../../../src/types/investorTypes";
import { CreateManagerPayLoad, PayInvestorPayLoad, InvestmentCreationPayLoad,  DepositWalletCreationPayLoad, InvestorCreationPayLoad } from '../../../../common/types';
import { imageFileToBlob } from "../../../../common/helpers";
import { describe, test, expect, beforeAll, afterAll } from "@jest/globals";
import managerImage from './managerimage.jpeg'


const image = imageFileToBlob(managerImage)

const mockInvestorData: InvestorCreationPayLoad = {
    firstName: "Alice",
    lastName: "Smith",
    password: "securePassword123",
    email: "alice.smith@example.com",
    dateOfBirth: new Date("1990-05-10"),
    gender: "Female",
    country: "United States",
    bank: "Chase Bank",
};

const mockManagerData: CreateManagerPayLoad = {
    firstName: "John",
    lastName: "Doe",
    minimumInvestmentAmount: 10000,
    percentageYield: 8,
    duration: 12,
    image:image,
    qualification: "Certified Financial Planner (CFP)"
};
const mockDepositAdminWallet:  DepositWalletCreationPayLoad = {
    currency: 'BTC',
    blockchain: 'Bitcoin',
    network: 'Mainnet',
    address: "1234567...abcdefg",
};
const mockInvestment: InvestmentCreationPayLoad = {
    amount: 10000,
    managerId: 1,
    wallet: mockDepositAdminWallet
};

const mockDepositWallet = {
    address: "1234567...abcdefg",
}

const mockNotification = {
    id: 1,
    title: 'Earnings',
    message: 'You have received earnings from your investment.',
    read: false,
    investorId: 1,
  }
  const mockNotificationInitData = {
    title: 'Earnings' as 'Earnings',
    message: 'You have received earnings from your investment.',
    read: false,
    investorId: 1,
  }
  const mockTransaction = {
    id: 1, // Optional field, can be omitted if not needed
    amount: 1000,
    type: 'Credit' as 'Credit',
    participatingAccount: 'Your Crypto Wallet' as 'Your Crypto Wallet',
    narration: 'Investment Deposit',
    date: new Date().toISOString(),
    read: false,
    investorId: 1,
  };

  const mockTransactioInitData= {

    amount: 1000,
    type: 'Credit' as 'Credit',
    participatingAccount: 'Your Crypto Wallet' as 'Your Crypto Wallet',
    narration: 'Investment Deposit',
    date: new Date (),
    read: false,
    investorId: 1,
  };
jest.setTimeout(100000);

// describe('Investor and Investment API Tests', () => {

//     beforeAll(async () => {
//         try {
            
           
           
//             await DepositWallet.drop();
//             await Investment.drop();
//             await Manager.drop();
//             await Investor.drop();

//             // Sync tables in the correct order
//             await Investor.sync();
//             await Manager.sync();
//             await Investment.sync();
//             await DepositWallet.sync();
    
//             console.log('Models synchronized successfully.');
//         } catch (error) {
//             console.error('Failed to synchronize models:', error);
//             throw error;
//         }
//     });
    
//     afterAll(async () => {
//         try {
//             await sequelize.close();
//             console.log('Database connection closed.');
//         } catch (error) {
//             console.error('Failed to close database connection:', error);
//             throw error;
//         }
//     });
    
//     test(`adds the investor's investment amount given the wallet`, async () => {
//         try {
//             const investor = await Investor.create(mockInvestorData);
//             const manager = await Manager.create(mockManagerData);
//             const investment = await Investment.create({
//                 investorId: investor.id,
//                 ...mockInvestment,
//                 earnings: 0,
//                 amountDeposited: 0,
//                 isPaused: false,
//                 managerId: manager.id,
//             });
//             const wallet = await DepositWallet.create({
//                 investmentId:investment.id,
//                 ...mockDepositWallet})
//             console.log('Investment is',investment)
//             const response = await request(app)
//                 .patch('/pay')
//                 .send({address: "1234567...abcdefg", amount: 200 }as PayInvestorPayLoad);

//             expect(response.status).toBe(200);
//             // Add more specific assertions if needed, e.g., response body checks
//         } catch (error) {
//             console.error('Error during test execution:', error);
//             throw error; // Re-throw the error to fail the test
//         }
//     },100000);
// });


// describe('Investor and Investment API Tests', () => {

//     beforeAll(async () => {
//         try {
           
//             await DepositWallet.drop();
//                         await Investment.drop();
//                         await Manager.drop();
//                         await Investor.drop();
            
//                         // Sync tables in the correct order
//                         await Investor.sync({ force: true });
//                         await Manager.sync({ force: true });
//                         await Investment.sync({ force: true });
//                         await DepositWallet.sync({ force: true });
          
//             console.log('Models synchronized successfully.');
//         } catch (error) {
//             console.error('Failed to synchronize models:', error);
//             throw error;
//         }
//     });
    
//     afterAll(async () => {
//         try {
//             await sequelize.close();
//             console.log('Database connection closed.');
//         } catch (error) {
//             console.error('Failed to close database connection:', error);
//             throw error;
//         }
//     });
    
//     test(`creates investment`, async () => {
//         try {
//             const investor = await Investor.create(mockInvestorData);
//             const manager = await Manager.create(mockManagerData);
//             const response = await request(app)
//                 .post('/create-investment/1')
//                 .send(mockInvestment);

//             expect(response.status).toBe(201);
//             // Add more specific assertions if needed, e.g., response body checks
//         } catch (error) {
//             console.error('Error during test execution:', error);
//             throw error; // Re-throw the error to fail the test
//         }
//     },100000);
// });

// describe('should retrieve all notifications for an investor', () => {

//     beforeAll(async () => {
//         try {
//             await DepositWallet.drop();
//                                     await Investment.drop();
//                                     await Manager.drop();
//                                     await Notification.drop()
//                                     await Investor.drop();
                        
//                                     // Sync tables in the correct order
//                                     await Investor.sync({ force: true });
//                                     await Notification.sync({force: true})
//                                     await Manager.sync({ force: true });
//                                     await Investment.sync({ force: true });
                                    
//                                     await DepositWallet.sync({ force: true });
      
//             console.log('Models synchronized successfully.');
//         } catch (error) {
//             console.error('Failed to synchronize models:', error);
//             throw error;
//         }
//     });
    
//     afterAll(async () => {
//         try {
//             await Notification.drop()
//             await sequelize.close();
//             console.log('Database connection closed.');
//         } catch (error) {
//             console.error('Failed to close database connection:', error);
//             throw error;
//         }
//     });
    
//     test(`gets notifications given investor id`, async () => {
//         try {
//             const investor = await Investor.create(mockInvestorData);
//             const notification = await Notification.create(mockNotificationInitData)
//             const response:any = await request(app).get('/get-notifications/1')
            

//             expect(response.status).toBe(200);
//             console.log(response)
//             // expect(response.data[0]).toBe(mockNotification) parse the text attribute;
//             // Add more specific assertions if needed, e.g., response body checks
//         } catch (error) {
//             console.error('Error during test execution:', error);
//             throw error; // Re-throw the error to fail the test
//         }
//     },100000);
// });

describe('should retrieve investment for an investor', () => {

    beforeAll(async () => {
        try {
            await DepositWallet.drop();
                                    await Transaction.drop()
                                    await Investment.drop();
                                    await Manager.drop();
                                    await Notification.drop()
                                    await Investor.drop();
                        
                                    // Sync tables in the correct order
                                    await Investor.sync({ force: true });
                                    await Manager.sync({ force: true });
                                    await Investment.sync({ force: true });
      
            console.log('Models synchronized successfully.');
        } catch (error) {
            console.error('Failed to synchronize models:', error);
            throw error;
        }
    });
    
    afterAll(async () => {
        try {
            await sequelize.close();
            console.log('Database connection closed.');
        } catch (error) {
            console.error('Failed to close database connection:', error);
            throw error;
        }
    });
    
    test(`gets notifications given investor id`, async () => {
        try {
            const investor = await Investor.create(mockInvestorData);
            
            
            const manager = await Manager.create(mockManagerData);
            const investment = await Investment.create({
                investorId: investor.id,
                ...mockInvestment,
                earnings: 0,
                amountDeposited: 0,
                isPaused: false,
                managerId: manager.id,
            });
            
            const response:any = await request(app).get('/get-investment/1')
            

            expect(response.status).toBe(200);
            console.log(response)
            // expect(response.data[0]).toBe(mockNotification) parse the text attribute;
            // Add more specific assertions if needed, e.g., response body checks
        } catch (error) {
            console.error('Error during test execution:', error);
            throw error; // Re-throw the error to fail the test
        }
    },100000);
}); 

