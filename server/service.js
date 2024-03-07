
const nodemailer = require('nodemailer');
const { Investor, Promo } = require('./model'); 
const moment = require('moment');
const schedule = require('node-schedule');

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



const sendVerificationEmail = async (user) => {
  try {
    const verificationToken =generateEmailVerificationToken(user.email);
    user.verificationToken = verificationToken;
    await user.save()

    const verificationLink = `http://localhost:8000/verify-email/${verificationToken}`;
    const emailBody = `Please click this link to verify your email: ${verificationLink}`;      
    await transporter.sendMail({
      from:'iroagba97@gmail.com',
      to: user.email,
      subject: 'verify mail',
      text: emailBody
  })
  } catch (error) {
    console.error('Error sending verification email:', error);
  }
}

const generateEmailVerificationToken = (email) => {
  return jwt.sign({ email }, 'yourSecretKey', { expiresIn: '10m' });
}

const updatePromosAndNotify=async()=>{
  try {
      const newValidityPeriod = moment().add(2, 'days').toDate();
      const updatedPromos = await Promo.update({ validityPeriod: newValidityPeriod }, { where: {} });
      await sendPromoExtensionEmails(newValidityPeriod);
      console.log(`Updated ${updatedPromos.length} promos.`);
  } catch (error) {
      console.error('Error updating promos:', error);
  }
}

const sendPromoExtensionEmails = async (newValidityPeriod)=> {
  const investors = await Investor.findAll({ where: { hasInvested: false } });
  for (const investor of investors) {
      let mailOptions = {
        from: 'your-email@gmail.com', 
        to: investor.email, 
        subject: 'Promo Extension', 
        text: `Dear ${investor.name},\n\nWe are extending our promo! The new validity period is ${newValidityPeriod}.\n\nBest,\nYour Company` // plain text body
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
      await Notification.create({ time: new Date(), message: 'hello this is a promo extension notification notification',investorId:investor.id});
    }
  }

  const sendInvestmentReminderEmails= async()=>{
    try {
      const investors = await Investor.findAll({ where: { hasInvested: false } });
      for (const investor of investors) {
        const sendTime = moment().tz(investor.timezone).hour(8).minute(0).second(0);
        schedule.scheduleJob(sendTime.toDate(),await sendYetToInvestEmail(investor.name,investor.email))
      }
    } catch (error) {
      console.error('Error sending emails:', error);
    }
  }

  const sendYetToInvestEmail =  async(name,email)=>{
    let mailOptions = {
      from: 'your-email@gmail.com', 
      to: email, 
      subject: 'Investment Reminder', 
      text: `Dear ${name},\n\nThis is a reminder for you to make your investment.\n\nBest,\nYour Company`
    }
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  }

  const sendInvestmentEarningEmails= async()=>{
    try {
      const investors = await Investor.findAll({ where: { hasInvested: false } });
     
      for (const investor of investors) {
        let details = '';
        const investments = await Investment.findAll({ where: { investorId:investor.id } })
        investments.forEach(async (investment) => {
          const profit = investment.profit + (investment.amount * (investment.incrementPercentage));
          await investment.update({ profit: increasedAmount });
          details += `Investment Name: ${investment.name}, Amount: ${investment.amount}, Profit: ${profit}\n`
        });
        const sendTime = moment().tz(investor.timezone).hour(8).minute(0).second(0);
        schedule.scheduleJob(sendTime.toDate(),await sendEarningsEmail(investor.name,investor.email,details))
      }
    } catch (error) {
      console.error('Error sending emails:', error);
    }
  }
  const sendEarningsEmail =  async(name,email)=>{
    let mailOptions = {
      from: 'your-email@gmail.com', 
      to: email, 
      subject: 'Investment Reminder', 
      text: `Dear ${name},\n\nThis is a reminder for you to make your investment.\n\nBest,\nYour Company`
    }
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  };
module.exports = {sendVerificationEmail, updatePromosAndNotify,sendInvestmentReminderEmails,sendInvestmentEarningEmails};
