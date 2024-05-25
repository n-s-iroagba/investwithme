import nodemailer from 'nodemailer';
import moment from 'moment-timezone';
import { 
  SERVER_VERIFY_EMAIL_ROUTE, 
  COMPANY_NAME, 
  TOKEN_EXPIRATION_TIME, 
  COMPANY_VERIFICATION_EMAIL, 
  COMPANY_REFERRAL_EMAIL, 
  VERIFY_PASSWORD_RESET_TOKEN_URL 
} from './config';
import { getVerificationEmailContent, getNewPasswordEmailContent } from './helpers';
import { Investment, Investor } from './types/investorTypes';
import { Manager } from './types/adminTypes';

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: 'iroagba97',
    pass: 'czsunjdjxhtinbew',
  },
});

export const sendVerificationEmail = async (user: any, verificationToken: string) => {
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

export const sendReferalCompletedMail = async (refreeInvestor: any, newInvestor: any) => {
  let mailOptions = {
    from: COMPANY_REFERRAL_EMAIL,
    to: refreeInvestor.email,
    subject: 'Referral Mail',
    text: `Dear ${refreeInvestor.firstName},\n\n Thank you for referring to ${newInvestor.lastName}, ${newInvestor.firstName}. Your referral bonus shall be credited to ${COMPANY_NAME} most recent investment account, when the referred investor makes the first deposit.\n\n Thank you ${newInvestor.firstName}`
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error:any) {
    console.error('Error sending referral completed email:', error);
  
  }
};

export const sendPasswordResetEmail = async (user: any, verificationToken: string) => {
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

export const sendPausedInvestmentEmail = async (investor:Investor,investment:Investment) => {
  // Add logic for sending paused investment email
};
export const sendPausedReminderEmail = async (user: any, verificationToken: string) => {
  // Add logic for sending paused investment email
};
export const sendPromoMail = async (investor: any, startDate: string, endDate: string, PROMO_PERCENT: number) => {
  // Add logic for sending promo mail
};

export const sendPromoExtensionMail = async (investor: any, startDate: Date, endDate: Date, PROMO_PERCENT: number) => {
  // Add logic for sending promo extension mail
};

export const sendHowToInvestMail = async (investor: any) => {
  // Add logic for sending how to invest mail
};

export const sendReferralBonusEmail = async (referee: any, investor: any) => {
  // Add logic for sending referral bonus email
};

export const sendPromoBonusEmail = async (investor:Investor,amount:number) => {
  // Add logic for sending referral bonus email
};
export const sendCompleteInvestmentDepositReceivedEmail = async (investor: Investor, investment:Investment) => {
  // Add logic for sending complete investment deposit received email
};

export const sendIncompleteInvestmentDepositReceivedEmail = async (investor: Investor, investment:Investment) => {
  // Add logic for sending incomplete investment deposit received email
};


