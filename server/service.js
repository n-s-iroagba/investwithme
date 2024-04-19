const nodemailer = require('nodemailer');
const moment = require('moment-timezone');
const { SERVER_VERIFY_EMAIL_ROUTE, COMPANY_NAME, TOKEN_EXPIRATION_TIME, COMPANY_VERIFICATION_EMAIL,COMPANY_REFERRAL_EMAIL,VERIFY_PASSWORD_RESET_TOKEN_URL} = require('./config');
const {getVerificationEmailContent,getNewPasswordEmailContent} = require('./helpers')
const Investor = require('./model'); 

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

const sendVerificationEmail = async (user, verificationToken) => {
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
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Error sending verification email');
  }
};

const sendReferalCompletedMail= async(refreeInvestor,newInvestor)=>{
  let mailOptions = {
        from: COMPANY_REFERRAL_EMAIL,
        to: refreeInvestor.email,
        subject: 'Referral Mail',
        text: `Dear ${refreeInvestor.firstName},\n\n Thank you for referring to ${newInvestor.lastName}, ${newInvestor.firstName}. Your referral bonus shall be credited to ${COMPANY_NAME} most recent investement acoount,
        when the referred investor makes the first deposit.
       \n Thank you ${newInvestor.firstName}`
  }
  try{
      await transporter.sendMail(mailOptions)
      }catch (error) {
        console.error('Error sending verification email:', error);
        throw(new Error(error))
 }
}

const sendPasswordResetEmail=async (user, verificationToken) => {
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
  } catch (error) {
    console.error('Error sending password change email:', error.message);
    throw new Error(error.message);
  }
};


const sendHowToInvestMail= async(investor)=>{
  //Correct the mails
  let mailOptions = {
        from: COMPANY_REFERRAL_EMAIL,
        to: investor.email,
        subject: 'Referral Mail',
        text: `Dear ${refreeInvestor.firstName},\n\n Thank you for referring to ${newInvestor.lastName}, ${newInvestor.firstName}. Your referral bonus shall be credited to ${COMPANY_NAME} most recent investement acoount,
        when the referred investor makes the first deposit.
       \n Thank you ${newInvestor.firstName}`
  }
  try{
      await transporter.sendMail(mailOptions)
      }catch (error) {
        console.error('Error sending verification email:', error);
        throw(new Error(error))
 }
}

const sendReferralBonusEmail = async (referee,investor) => {
  //correct mail
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

const sendCompleteInvestmentDepositReceivedEmail = async (investor,investment,manager) => {
  //correct mail
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
const sendIncompleteInvestmentDepositReceivedEmail = async (investor,investment,manager) => {
  //correct mail
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
// const sendPromoBonusPaymentMail= async (investor, amount) =>{
//   //implement
// }








// const sendInvestmentReminderEmails = async () => {
//   try {
//     const investors = await Investor.findAll({ where: { hasInvested: false } });
  
//     for (const investor of investors) {
//       const {firstName, lastName, email,} = investor;


//         await transporter.sendMail({
//           from: 'your-email@gmail.com',
//           to: email,
//           subject: 'Investment Reminder',
//           text: `Hi ${firstName} ${lastName}, This is a friendly reminder to invest in our platform.`,
//           html: `<p>Hi ${firstName} ${lastName},</p><p>This is a friendly reminder to invest in our platform.</p>`,
//         });

//         console.log(`Reminder email sent to ${firstName} ${lastName}`);
//       } else {
//         console.log(`No reminder needed for ${firstName} ${lastName}`);
//       }
//     }

//     console.log('Reminder emails sent successfully.');
//   } catch (error) {
//     console.error('Error sending reminder emails:', error);
//   }
// };





// const updatePromosAndNotify = async () => {
//   try {
//     const newValidityPeriod = moment().add(2, 'days').toDate();
//     const updatedPromos = await Promo.update({ validityPeriod: newValidityPeriod }, { where: {} });
//     await sendPromoExtensionEmails(newValidityPeriod);
//     console.log(`Updated ${updatedPromos.length} promos.`);
//   } catch (error) {
//     console.error('Error updating promos:', error);
//   }
// }

// const sendPromoExtensionEmails = async (newValidityPeriod) => {
//   const investors = await Investor.findAll({ where: { hasInvested: false } });
//   for (const investor of investors) {
//     let mailOptions = {
//       from: 'your-email@gmail.com',
//       to: investor.email,
//       subject: 'Promo Extension',
//       text: `Dear ${investor.name},\n\nWe are extending our promo! The new validity period is ${newValidityPeriod}.\n\nBest,\nYour Company` // plain text body
//     };
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.log('Error sending email:', error);
//       } else {
//         console.log('Email sent:', info.response);
//       }
//     });
//     await Notification.create({ time: new Date(), message: 'hello this is a promo extension notification notification', investorId: investor.id });
//   }
// }

// const sendInvestmentReminderEmails = async () => {
//   try {
//     const investors = await Investor.findAll({ where: { hasInvested: false } });
//     for (const investor of investors) {
//       const sendTime = moment().tz(investor.timezone).hour(8).minute(0).second(0);
//       schedule.scheduleJob(sendTime.toDate(), await sendYetToInvestEmail(investor.name, investor.email))
//     }
//   } catch (error) {
//     console.error('Error sending emails:', error);
//   }
// }

// const sendYetToInvestEmail = async (name, email) => {
//   let mailOptions = {
//     from: 'your-email@gmail.com',
//     to: email,
//     subject: 'Investment Reminder',
//     text: `Dear ${name},\n\nThis is a reminder for you to make your investment.\n\nBest,\nYour Company`
//   }
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log('Error sending email:', error);
//     } else {
//       console.log('Email sent:', info.response);
//     }
//   });
// }

// const updateInvestmentEarningsAndNotifiy = async () => {
//   try {
//     const investments = await Investment.findAll({ where: { hasDeposit: true } })
//     for (const investment of investments) {
//       let details = '';
//       const investor = await Investor.findOne({ where: { id: investment.investorId } })
//       const sendTime = moment().tz(investor.timezone).hour(17).minute(0).second(0);
//       schedule.scheduleJob(sendTime.toDate(), async()=>{
//         const incrementAmount = investment.amount * investment.incrementPercentage
//         const profit = investment.profit + incrementAmount;
//         await investment.update({ profit: profit });
//         details = `Investment Name: ${investment.name}, Amount: ${investment.amount}, amount of  money made: ${incrementAmount}: Profit: ${profit}\n`
//         await sendInvestmentEarningsEmail(investor.name, investor.email, details)
//         await updateReferralEarningsAndNotify(investment,investor.name)
//     })
//   }  
//   } catch (error) {
//     console.error('Error sending emails:', error);
//   }
// }

// const sendInvestmentEarningsEmail = async (name, email) => {
//   let mailOptions = {
//     from: 'your-email@gmail.com',
//     to: email,
//     subject: 'Investment Reminder',
//     text: `Dear ${name},\n\nThis is a reminder for you to make your investment.\n\nBest,\nYour Company`
//   }
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log('Error sending email:', error);
//     } else {
//       console.log('Email sent:', info.response);
//     }
//   });
// };

// const updateReferralEarningsAndNotify = async (investment,mainInvestorName) => {
//   if (!investment.refreeInvestorId)
//   return
// const refreeInvestorId = investment.refreeInvestorId
//   try {
//     const refreeInvestor = await Investor.findOne({ where: { id: refreeInvestorId } })
//     const referral = await Referral.findOne({where:{refreeInvestorId:refreeInvestorId}})
//     const incrementAmount = referral.amountReceived * investment.incrementPercentage
//     const profit = referral.profit + incrementAmount;
//     await referral.update({ profit: profit });
//     details = `Referral Earnings from ${mainInvestorName}, Amount Received: ${referral.amountReceived}, amount of  money made: ${incrementAmount}: Profit: ${profit}\n`
//     const sendTime = moment().tz(investor.timezone).hour(17).minute(0).second(0);
//     schedule.scheduleJob(sendTime.toDate(), await sendReferralEarningsEmail(refreeInvestor.email, details))
//     Notification.create({investorId:refreeInvestorId,message:'referral earning notification'})
//   } catch (error) {
//     console.error('Error sending emails:', error);
//   }
// }


module.exports = {
  sendVerificationEmail,
  sendReferalCompletedMail,
  sendPasswordResetEmail,

 
};
