import {Investor, Referral} from './types/investorTypes'
import {Investment,DepositWallet} from './types/investorTypes'
import {formatEndDate} from './helpers'
import { COMPANY_NAME, COMPANY_SUPPORT_EMAIL } from './config';
import { AdminWallet, Promo } from './types/adminTypes';

export const getInvestmentPausedEmailContent = (investor: Investor, investment: Investment) => {
    return `
      Dear ${investor.firstName} ${investor.lastName},
  
      We hope this message finds you well. We are writing to inform you that your investment with ${COMPANY_NAME} has been paused.
  
      The grace period for completing the deposit required to activate your investment has elapsed, and we have not received the necessary funds to proceed. As a result, we have temporarily paused your investment to prevent any potential issues.
  
      Please review the details of your investment below:
      - Investment Amount: ${investment.amount}
      - Amount Deposited : ${investment.amountDeposited}
      - Date of first deposit: ${investment.investmentDate && formatEndDate(investment.investmentDate)}
  
      To resume your investment, please complete the deposit at your earliest convenience. If you have already made the deposit and believe this message is in error, kindly contact our support team immediately at ${COMPANY_SUPPORT_EMAIL} or call chat us on our social media handle.
  
      We value your investment and are here to assist you with any questions or concerns you may have. Thank you for your understanding and prompt attention to this matter.
  
      Best regards,
  
      The Investment Team
      ${COMPANY_NAME}
    `;
  }
  
  export const getInvestmentPausedReminderEmailContent  = (investor: Investor, investment: Investment) => {
     return `    Dear ${investor.firstName} ${investor.lastName},
    
     We hope this message finds you well. We are writing to remind you that your investment with ${COMPANY_NAME} has been paused.
 
     The grace period for completing the deposit required to activate your investment has elapsed, and we have not received the necessary funds to proceed. As a result, we have temporarily paused your investment to prevent any potential issues.
 
     Please review the details of your investment below:
     - Investment Amount: ${investment.amount}
     - Amount Deposited: ${investment.amountDeposited}
     - Date of First Deposit: ${investment.investmentDate && formatEndDate(investment.investmentDate)}
 
     To resume your investment, please complete the deposit at your earliest convenience. If you have already made the deposit and believe this message is in error, kindly contact our support team immediately at ${COMPANY_SUPPORT_EMAIL} or chat with us on  any of our social media handles.
 
     We value your investment and are here to assist you with any questions or concerns you may have. Thank you for your understanding and prompt attention to this matter.
 
     Best regards,
 
     The Investment Team
     ${COMPANY_NAME}
   `;
  }

  export const getInvestmentPromoEmailContent = (investor: Investor, promo: Promo) => {
    return `
      Dear ${investor.firstName} ${investor.lastName},
  
      We are excited to share an exclusive promotion from ${COMPANY_NAME} with you!
  
      Introducing our latest promotion
      Earn up to ${promo.bonusPercent} on your next investment!

  
      This promotion is available until ${formatEndDate(promo.endDate)}. Don't miss out on this incredible opportunity to enhance your investment portfolio.
  
      If you have any questions or need further information, please contact our support team at ${COMPANY_NAME} or chat us on any of our social media handles.
  
      We appreciate your continued trust and investment with ${COMPANY_NAME}.
  
      Best regards,
  
      The Investment Team
      ${COMPANY_NAME}
    `;
  };

  export const getInvestmentPromoExtensionEmailContent = (investor: Investor, promo: Promo) => {
    return `
      Dear ${investor.firstName} ${investor.lastName},
  
      We have some exciting news for you!
  
      Our promotion has been extended! 
  
      Earn up to ${promo.bonusPercent} on your next investment!
  
      You now have until ${formatEndDate(promo.endDate)} to take advantage of this amazing opportunity. Don’t miss out on enhancing your investment portfolio with our extended promotional offer.
  
      If you have any questions or need further information, please contact our support team at ${COMPANY_SUPPORT_EMAIL} or call us at  chat us on any of our social media handles.
  
      We appreciate your continued trust and investment with${COMPANY_SUPPORT_EMAIL}.
  
      Best regards,
  
      The Investment Team
      ${COMPANY_NAME}
    `;
  };

  export const getHowToInvestEmailContent = (
    investor: Investor,
    depositWallet: DepositWallet,
    investment: Investment,
    adminWallet: AdminWallet
  ) => {
    return `
      Dear ${investor.firstName} ${investor.lastName},
  
      We hope this message finds you well. Thank you for choosing to with us.
  
      To complete your investment, please follow the instructions below:
  
      1. Transfer the investment amount of ${investment.amount}  to the following wallet address:
         - Crypto currency: ${adminWallet.currency}
         - Wallet Address: ${adminWallet.address}
  
      2. Ensure that the transfer is made from your deposit wallet address that you submitted on our website when creating your portfolio:
         - Your Deposit Wallet Address: ${depositWallet.address}
  
      Once the transfer is complete, you will receive the deposit in your investment account within 12 hours.
  
      If you have any questions or need assistance, please contact our support team at ${COMPANY_SUPPORT_EMAIL} of on any of our social media handles
  
      We appreciate your trust and investment with us. We look forward to helping you achieve your investment goals.
  
      Best regards,
  
      The Investment Team
      ${COMPANY_NAME}
    `;
  };

  export const getReferralBonusEmailContent = (investor: Investor, referral: Referral) => {
    return `
      Dear ${investor.firstName} ${investor.lastName},
  
      We are pleased to inform you that you have earned a referral bonus!
  
      Thanks for your referral, ${investor.firstName} ${investor.lastName}, you have received a bonus of $${referral.amount}.
  
      We greatly appreciate your trust and support in recommending ${COMPANY_NAME} to your network.
  
      If you have any questions or need further assistance, please contact our support team at ${COMPANY_SUPPORT_EMAIL} or chat us on any of our social media handles.
  
      Thank you once again for being a valued investor and helping us grow our community.
  
      Best regards,
  
      The Investment Team
      ${COMPANY_SUPPORT_EMAIL}
    `;
  };


  export const getInvestmentPromoBonusEmailContent = (investor: Investor, amount:Number) => {
    return `
      Dear ${investor.firstName} ${investor.lastName},
  
      We are excited to inform you about a special promotional bonus from us!
  
      As part of fullfilling our  promotion offer, you are havereceive a bonus of ${amount}.
  
      We appreciate your continued trust and investment with ${COMPANY_NAME}.
  
      Best regards,
  
      The Investment Team
      ${COMPANY_NAME}
    `;
  };


  export const getInvestmentDepositReceivedEmailContent = (investor: Investor, investment: Investment) => {
    return `
      Dear ${investor.firstName} ${investor.lastName},
  
      We are pleased to inform you that we have received your investment.
  
      Here are the details of your deposit:
      - Investment Amount: ${investment.amountDeposited} 
      - Deposit Date: ${investment.investmentDate && formatEndDate(investment.investmentDate)}
  
      Thank you for your trust in uls. We are excited to help you achieve your investment goals.
  
      If you have any questions or need further assistance, please contact our support team at ${COMPANY_SUPPORT_EMAIL}.
  
      We appreciate your continued trust and investment with us.
  
      Best regards,
  
      The Investment Team
      ${COMPANY_NAME} -
    `;
  };