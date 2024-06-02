import { getJSDocReturnTag } from "typescript";
import { REFERRAL_BONUS_PERCENT } from "./config";
import { payPromoBonus } from "./controllers/promoController";
import {  sendPausedInvestmentEmail } from "./mailService";
import { Manager, Promo } from "./types/adminTypes";
import { Investment, Investor, Transaction,Notification, Referral, PendingPromo } from "./types/investorTypes";


export const handleIsPaused = (investment: Investment): void => {
  if (investment.amountDeposited >= investment.amount) {
      investment.isPaused = false;
      Notification.create({
          investorId: investment.investorId,
          title: 'Investment Continued',
          message: `Congratulations!\nYou just completed your portfolio deposit, and your investment has been unpaused`,
      });
  } else {
      throw customError('Investment amount not reached', 400); // Throw error if investment amount not reached
  }
};

export const handlePromo = async (investor: Investor, amount: number): Promise<void> => {
  const promo = await Promo.findOne();

  if (!promo) {
      return;
  }

  const promoBonus = (promo.bonusPercent/100) * amount;

  const pendingPromo = await PendingPromo.create({
      investorId: investor.id,
      amount: promoBonus,
  });

  await Notification.create({
      investorId: investor.id,
      title: 'Promo Bonus',
      message: `Congratulations!\nYou just earned $${promoBonus} on your first deposit`,
  });

  await Transaction.create({
    type: 'Credit',
    amount: promoBonus,
    date: new Date(),
    narration: 'Promo bonus',
    participatingAccount: 'Your Wallet',
    investorId: investor.id
  });
}

export const handleFirstDepositReferral = async (investor: Investor, amount: number): Promise<void> => {
  if (investor.referrerId === null) {
      return;
  }

  const referral = await Referral.findOne({ where: { referredId: investor.id, referrerId: investor.referrerId } });

  if (!referral) {
     return;
  }

  referral.amount = amount * REFERRAL_BONUS_PERCENT;

  const referralInvestment = await Investment.findOne({ where: { investorId: investor.referrerId } });

  if (!referralInvestment) {
      return;
  }
  await referral.save();
};


export const createDepositNotificationAndTransaction = async (investment:Investment,amount:number,investorId:number) => {
    const notificationTitle = investment.amountDeposited >= investment.amount ? 'Investment deposit' : 'Incomplete Investment Deposit';
    const notificationMessage =
      investment.amountDeposited >= investment.amount
        ? `Thank you,\nWe have received your deposit of $${amount}, we look forward to growing wealth with you.\nCheers,`
        : `Thank you,\nWe have received your deposit. However, we wish to notify you that the deposited amount (${investment.amountDeposited}) is lower than the actual required amount (${investment.amount}). Kindly ensure you pay the remaining amount as soon as possible.\nCheers,`;

    await Notification.create({
      title: notificationTitle,
      message: notificationMessage,
      investorId: investorId,
    });

    await Transaction.create({
      type: 'Credit',
      amount: amount,
      date: new Date(),
      narration: 'Investment Deposit',
      participatingAccount: 'Your Wallet',
      investorId: investorId
    });
  }

export const changeManager = async(investment:Investment) => {
  const managers = await Manager.findAll()
  if(managers.length === 0){
    throw customError('No managers in database ', 404); 
  }

  let highestMinInvestmentManager= await Manager.findByPk(investment.managerId);
  if (!highestMinInvestmentManager) {
    highestMinInvestmentManager = managers[0];
  }
  let highestMinInvestment = investment.amountDeposited

  for (const manager of managers) {
    if (manager.minimumInvestmentAmount <= investment.amountDeposited  && manager.minimumInvestmentAmount > highestMinInvestment) {
      highestMinInvestment = manager.minimumInvestmentAmount;
      highestMinInvestmentManager = manager;
    }
  }
  investment.managerId = highestMinInvestmentManager.id;
  investment.amount =investment.amountDeposited
  investment.save()
}

export const getVerificationEmailContent = (verificationUrl:string,TOKEN_EXPIRATION_TIME:string,COMPANY_NAME:string) => {
    return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email Address</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
  </head>
  <body class="text-center">
    <h1 class="text-center">Welcome to ${COMPANY_NAME}!</h1>
    <p  class="text-center">Thank you for signing up. To complete your registration, please click the button below to verify your email address.</p>
    <p  class="text-center">
    <a href= ${verificationUrl}>
    <button style="background-color: #007bff; color: #fff; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">
    Verify Your Email
  </button>
</a>
    </p>
    <p>If the button doesn't work, you can copy and paste the following link into your browser:</p>
    <p>${verificationUrl}</p>
    <p>This verification link will expire in ${TOKEN_EXPIRATION_TIME} hours.</p>
    <p>Sincerely,</p>
    <p>${COMPANY_NAME} Team</p>
  </body>
  </html>`;
  }

 export  const getNewPasswordEmailContent = (newPasswordUrl:string,TOKEN_EXPIRATION_TIME:string,COMPANY_NAME:string) => {
    return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Change your password</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
  </head>
  <body class="text-center">
    <h1 class="text-center">Welcome to ${COMPANY_NAME}!</h1>
    <p  class="text-center">Thank you made a request to change your password. Kindly click the link or buttion below to change your password.</p>
    <p  class="text-center">
      <a href="${newPasswordUrl}" class="btn btn-primary">Change Password</a>
    </p>
    <p>If the button doesn't work, you can copy and paste the following link into your browser:</p>
    <p>${newPasswordUrl}</p>
    <p>This verification link will expire in ${TOKEN_EXPIRATION_TIME} hours.</p>
    <p>Sincerely,</p>
    <p>${COMPANY_NAME} Team</p>
  </body>
  </html>`;

  }
  export const formatEndDate = (date:Date) => {
    const options:any = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate;
  };
  
  export const checkPausedInvestmentStatusAndSendEmail = async (investor:Investor,investment:Investment) => {
    try {
      const currentDate = new Date();
      let investmentDate
      if (investment.investmentDate){
      investmentDate = new Date(investment.investmentDate);
      }
      let threeDaysLater 
      if (investmentDate){
       threeDaysLater = new Date(investmentDate);
      
      threeDaysLater.setDate(threeDaysLater.getDate() + 3);
    
      if (investment.amountDeposited < investment.amount && currentDate > threeDaysLater) {
        investment.isPaused = true;
        await sendPausedInvestmentEmail(investor, investment)
        await investment.save();
        console.log('Investment paused successfully.');
      } 
    }else {
        console.log('Investment does not meet the criteria for pausing.');
    }
    } catch (error) {
      console.error('Error checking investment status:', error);
    }
  };

  export function customError(message: string, status: number): any {
    const error: { message: string; status?: number } = new Error(message);
    error.status = status;
    return error;
  }
  
  export const deleteRunningPromo= async ()=> {
    try {
      const promos = await Promo.findAll()
      for (const promo of promos) {
      const currentDate = new Date();
      const endDate = new Date(promo.endDate);

      if (currentDate > endDate) {
        await promo.destroy();
        
      }
    }
    } catch (error: any) {
      console.error('Error deleteRunningpromo function:', error);
      
    }
  }
