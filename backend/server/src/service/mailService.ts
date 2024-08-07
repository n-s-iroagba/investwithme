import nodemailer from 'nodemailer';

import { SERVER_VERIFY_EMAIL_ROUTE, TOKEN_EXPIRATION_TIME, COMPANY_NAME, COMPANY_VERIFICATION_EMAIL, COMPANY_REFERRAL_EMAIL, VERIFY_PASSWORD_RESET_TOKEN_URL, COMPANY_SUPPORT_EMAIL } from '../constants';
import { customError } from '../helpers/commonHelpers';
import { getVerificationEmailContent, getNewPasswordEmailContent, getHowToInvestEmailContent, getInvestmentDepositReceivedEmailContent, getInvestmentPausedEmailContent, getInvestmentPausedReminderEmailContent, getInvestmentPromoBonusEmailContent, getInvestmentPromoEmailContent, getReferralBonusEmailContent } from '../helpers/mailServiceHelpers';
import { Admin, Promo, AdminWallet } from '../types/adminTypes';
import { Investor, Investment, DepositWallet, Referral, Manager,Notification} from '../types/investorTypes';
const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: 'questertech.co',
    pass: 'nbcd adsm krym lwyh',
  },
});

export const sendVerificationEmail = async (user: Investor|Admin) => {
  const verificationToken = user.verificationToken
  const verificationUrl = `${SERVER_VERIFY_EMAIL_ROUTE}/${verificationToken}`;
  const emailHtmlContent = getVerificationEmailContent(verificationUrl, TOKEN_EXPIRATION_TIME, COMPANY_NAME);
  try {
    const emailBody = { html: emailHtmlContent };
    await transporter.sendMail({
      from: COMPANY_VERIFICATION_EMAIL,
      to: user.email,
      subject: `Verify your email address to complete registration at ${COMPANY_NAME}`,
      ...emailBody,
    });
  } catch (error:any) {
    console.error('Error sending verification email:', error);
  }
};

export const sendReferalCompletedMail = async (refreeInvestor: Investor, newInvestor: Investor) => {
  let mailOptions = {
    from: COMPANY_REFERRAL_EMAIL,
    to: refreeInvestor.email,
    subject: 'Referral Registeration',
    text: `Dear ${refreeInvestor.firstName},\n\n Thank you for referring to ${newInvestor.lastName}, ${newInvestor.firstName}. Your referral bonus shall be credited to ${COMPANY_NAME} most recent investment account, when the referred investor makes the first deposit.\n\n Thank you ${newInvestor.firstName}`
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error:any) {
    console.error('Error sending referral completed email:', error);
  
  }
};

export const sendPasswordResetEmail = async (user:Investor|Admin) => {
  const verificationToken = user.changePasswordToken;
  const verificationUrl = `${VERIFY_PASSWORD_RESET_TOKEN_URL}/${verificationToken}`;
  const emailHtmlContent = getNewPasswordEmailContent(verificationUrl, TOKEN_EXPIRATION_TIME, COMPANY_NAME);
  try {
    const emailBody = { html: emailHtmlContent };
    await transporter.sendMail({
      from: COMPANY_VERIFICATION_EMAIL,
      to: user.email,
      subject: `Change your ${COMPANY_NAME} account password`,
      ...emailBody,
    });
  } catch (error:any) {
    console.error('Error sending password reset email:', error.message);
  }
};

export const sendPausedInvestmentEmail = async (investor: Investor, investment: Investment) => {
  // Ensure getInvestmentPausedEmailContent is properly called with investor and investment arguments
  const emailHtmlContent = getInvestmentPausedEmailContent(investor, investment);
  try {
    const emailBody = { html: emailHtmlContent };
    await transporter.sendMail({
      from: COMPANY_SUPPORT_EMAIL,
      to: investor.email,
      subject: `Pause of investment earnings due to Incomplete Deposit`,
      ...emailBody,
    });
  } catch (error: any) {
    console.error('Error sending paused investment email:', error.message);
  }
};

export const sendPausedReminderEmail = async (investor: Investor, investment: Investment) => {
  const emailHtmlContent = getInvestmentPausedReminderEmailContent(investor, investment);
  try {
    const emailBody = { html: emailHtmlContent };
    await transporter.sendMail({
      from: COMPANY_SUPPORT_EMAIL,
      to: investor.email,
      subject: `Reminder concerning paused investment`,
      ...emailBody,
    });
  } catch (error: any) {
    console.error('Error sending paused investment email:', error.message);
  }
};

export const sendPromoMail = async (investor:Investor,promo:Promo) => {
  const emailHtmlContent = getInvestmentPromoEmailContent(investor, promo);
  try {
    const emailBody = { html: emailHtmlContent };
    await transporter.sendMail({
      from: COMPANY_SUPPORT_EMAIL,
      to: investor.email,
      subject: `Promo`,
      ...emailBody,
    });
  } catch (error: any) {
    console.error('Error sending paused investment email:', error.message);
  }
};



export const sendPromoExtensionMail = async (investor: Investor, promo:Promo) => {
  const emailHtmlContent = getInvestmentPromoEmailContent(investor, promo);
  try {
    const emailBody = { html: emailHtmlContent };
    await transporter.sendMail({
      from: COMPANY_SUPPORT_EMAIL,
      to: investor.email,
      subject: `Promo extension`,
      ...emailBody,
    });
  } catch (error: any) {
    console.error('Error sending paused investment email:', error.message);
  }
}
export const sendHowToInvestMail = async (investor: Investor,  depositWallet: DepositWallet,
  investment: Investment,
  adminWallet: AdminWallet) => {
  const emailHtmlContent = getHowToInvestEmailContent(investor,  depositWallet,investment,adminWallet);
  try {
    const emailBody = { html: emailHtmlContent };
    await transporter.sendMail({
      from: COMPANY_SUPPORT_EMAIL,
      to: investor.email,
      subject: `How to make your deposit`,
      ...emailBody,
    });
  } catch (error: any) {
    console.error('Error sending paused investment email:', error.message);
  }
}

export const sendReferralBonusEmail = async (investor:Investor,referral:Referral) => {
  const emailHtmlContent = getReferralBonusEmailContent(investor, referral);
  try {
    const emailBody = { html: emailHtmlContent };
    await transporter.sendMail({
      from: COMPANY_SUPPORT_EMAIL,
      to: investor.email,
      subject: `Payment of referral bonus`,
      ...emailBody,
    });
  } catch (error: any) {
    console.error('Error sending paused investment email:', error.message);
  }
};

export const sendPromoBonusEmail = async (investor:Investor,promoAmount:number) => {
  const emailHtmlContent = getInvestmentPromoBonusEmailContent(investor, promoAmount);
  try {
    const emailBody = { html: emailHtmlContent };
    await transporter.sendMail({
      from: COMPANY_SUPPORT_EMAIL,
      to: investor.email,
      subject: `Payment of deposit Bonus`,
      ...emailBody,
    });
  } catch (error: any) {
    console.error('Error sending paused investment email:', error.message);
  }
}
export const sendInvestmentDepositReceivedEmail = async (investor: Investor, investment:Investment) => {
  const emailHtmlContent = getInvestmentDepositReceivedEmailContent(investor, investment);
  try {
    const emailBody = { html: emailHtmlContent };
    await transporter.sendMail({
      from: COMPANY_SUPPORT_EMAIL,
      to: investor.email,
      subject: ` Deposit received`,
      ...emailBody,
    });
  } catch (error: any) {
    console.error('Error sending paused investment email:', error.message);
  }
};

export const sendInvestmentReminderEmails = async ()=>{
 try{
  const investors = await Investor.findAll();

  for (const investor of investors) {

    const investment = await Investment.findOne({
      where: {
        investorId: investor.id
      }
    })
    if(!investment){
     return
    }
    const hasValidInvestment =  investment.amountDeposited > 0

    if (!hasValidInvestment) { 
      await sendReminderMail(investor)
    }
  }
}catch(error){
  console.error(error)
}
}

const sendReminderMail =async (investor:Investor) => {
  const emailHtmlContent = `Dear ${investor.firstName}  ${investor.lastName},\n\nIt looks like you have no investments or your investments have a zero balance Our Investors are making profits daily, do not be left out.
   Please consider making a deposit.\n\nBest regards,\n
   Investment Team`
  try {
    const emailBody = { html: emailHtmlContent };
    await transporter.sendMail({
      from: COMPANY_SUPPORT_EMAIL,
      to: investor.email,
      subject: `Make your first deposit`,
      ...emailBody,
    });
  } catch (error: any) {
    console.error('Error sending paused investment email:', error.message);
  }
}


export const updateInvestmentEarningsAndNotifiy = async ()=>{
  try{
   const investors = await Investor.findAll();
 
   for (const investor of investors) {
 
     const investment = await Investment.findOne({
       where: {
         investorId: investor.id
       }
     })
     if(!investment){
      return
     }
     const hasValidInvestment =  investment.amountDeposited > 0
 
     if (hasValidInvestment) { 
       const manager = await Manager.findByPk(investment.managerId);
       if (!manager){
        throw customError('manager not found',404)
       }
       investment.earnings += investment.amountDeposited * (manager.percentageYield /(manager.duration * 7* 100));
       await investment.save()
       await  Notification.create({
        title:'Earnings',
        message: `You've earned a total of $${investment.earnings} in total.,\n Thanks for choosing us.`,
        investorId: investor.id,
       })
       await sendEarningsMail(investor, investment.earnings)
     }
   }
 }catch(error){
   console.error(error)
 }
 }
const  sendEarningsMail =(investor:Investor, earnings:number)=>{
  const emailHtmlContent = `Dear ${investor.firstName}  ${investor.lastName},\n\nYou've earned a total of $${earnings} in total.,\n Thanks for choosing us.
   \n\nBest regards,\n
   Investment Team`
  try {
    const emailBody = { html: emailHtmlContent };
    transporter.sendMail({
      from: COMPANY_SUPPORT_EMAIL,
      to: investor.email,
      subject: `Earnings`,
      ...emailBody,
    });
  } catch (error: any) {
    console.error('Error sending paused investment email:', error.message);
  }
}
