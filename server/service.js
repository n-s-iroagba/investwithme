
const nodemailer = require('nodemailer');
const { Investor, Promo } = require('./model');
const {generateEmailVerificationToken}= require('./auth')
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
    const verificationToken = generateEmailVerificationToken(user.email);
    user.verificationToken = verificationToken;
    await user.save()

    const verificationLink = `http://localhost:8000/verify-email/${verificationToken}`;
    const emailBody = `Please click this link to verify your email: ${verificationLink}`;
    await transporter.sendMail({
      from: 'iroagba97@gmail.com',
      to: user.email,
      subject: 'verify mail',
      text: emailBody
    })
  } catch (error) {
    console.error('Error sending verification email:', error);
  }
}



const updatePromosAndNotify = async () => {
  try {
    const newValidityPeriod = moment().add(2, 'days').toDate();
    const updatedPromos = await Promo.update({ validityPeriod: newValidityPeriod }, { where: {} });
    await sendPromoExtensionEmails(newValidityPeriod);
    console.log(`Updated ${updatedPromos.length} promos.`);
  } catch (error) {
    console.error('Error updating promos:', error);
  }
}

const sendPromoExtensionEmails = async (newValidityPeriod) => {
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
    await Notification.create({ time: new Date(), message: 'hello this is a promo extension notification notification', investorId: investor.id });
  }
}

const sendInvestmentReminderEmails = async () => {
  try {
    const investors = await Investor.findAll({ where: { hasInvested: false } });
    for (const investor of investors) {
      const sendTime = moment().tz(investor.timezone).hour(8).minute(0).second(0);
      schedule.scheduleJob(sendTime.toDate(), await sendYetToInvestEmail(investor.name, investor.email))
    }
  } catch (error) {
    console.error('Error sending emails:', error);
  }
}

const sendYetToInvestEmail = async (name, email) => {
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

const updateInvestmentEarningsAndNotifiy = async () => {
  try {
    const investments = await Investment.findAll({ where: { hasDeposit: true } })
    for (const investment of investments) {
      let details = '';
      const investor = await Investor.findOne({ where: { id: investment.investorId } })
      const sendTime = moment().tz(investor.timezone).hour(17).minute(0).second(0);
      schedule.scheduleJob(sendTime.toDate(), async()=>{
        const incrementAmount = investment.amount * investment.incrementPercentage
        const profit = investment.profit + incrementAmount;
        await investment.update({ profit: profit });
        details = `Investment Name: ${investment.name}, Amount: ${investment.amount}, amount of  money made: ${incrementAmount}: Profit: ${profit}\n`
        await sendInvestmentEarningsEmail(investor.name, investor.email, details)
        await updateReferralEarningsAndNotify(investment,investor.name)
    })
  }  
  } catch (error) {
    console.error('Error sending emails:', error);
  }
}

const sendInvestmentEarningsEmail = async (name, email) => {
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

const updateReferralEarningsAndNotify = async (investment,mainInvestorName) => {
  if (!investment.refreeInvestorId)
  return
const refreeInvestorId = investment.refreeInvestorId
  try {
    const refreeInvestor = await Investor.findOne({ where: { id: refreeInvestorId } })
    const referral = await Referral.findOne({where:{refreeInvestorId:refreeInvestorId}})
    const incrementAmount = referral.amountReceived * investment.incrementPercentage
    const profit = referral.profit + incrementAmount;
    await referral.update({ profit: profit });
    details = `Referral Earnings from ${mainInvestorName}, Amount Received: ${referral.amountReceived}, amount of  money made: ${incrementAmount}: Profit: ${profit}\n`
    const sendTime = moment().tz(investor.timezone).hour(17).minute(0).second(0);
    schedule.scheduleJob(sendTime.toDate(), await sendReferralEarningsEmail(refreeInvestor.email, details))
    Notification.create({investorId:refreeInvestorId,message:'referral earning notification'})
  } catch (error) {
    console.error('Error sending emails:', error);
  }
}

const sendReferralEarningsEmail = async (email,details) => {
  let mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Investment Reminder',
    text: details
  }
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};
module.exports = { sendVerificationEmail, updatePromosAndNotify, sendInvestmentReminderEmails,updateInvestmentEarningsAndNotifiy};
