import { sendPausedInvestmentEmail } from "./mailService";
import { Manager, Promo } from "./types/adminTypes";
import { Investment, Investor } from "./types/investorTypes";

export function findManagerWithHighestMinInvestment(managers:Manager[], amount:number):Manager {
  if (managers.length === 0){
    throw customError("No managers passed to findManager with Highes ", 404)
  }
  let highestMinInvestmentManager=managers[0];
  let highestMinInvestment = -Infinity;

  for (const manager of managers) {
    if (manager.minimumInvestmentAmount <= amount && manager.minimumInvestmentAmount > highestMinInvestment) {
      highestMinInvestment = manager.minimumInvestmentAmount;
      highestMinInvestmentManager = manager;
    }
  }

  return highestMinInvestmentManager;
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
      <a href="${newPasswordUrl}" class="btn btn-primary">Verify Your Email</a>
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
