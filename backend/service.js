// services/emailService.js

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-password',
  },
});

class EmailService {
  static async sendZeroInvestmentEmail(email, formattedTime) {
    try {
      await transporter.sendMail({
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Zero Investment Value Alert',
        text: `Hello ${email}, your investment value is zero as of ${formattedTime}. Please take necessary actions.`,
      });
      console.log(`Email sent to ${email}`);
    } catch (error) {
      console.error(`Error sending email to ${email}:`, error);
    }
  }
}

module.exports = EmailService;
