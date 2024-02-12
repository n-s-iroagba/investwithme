const express = require('express');
const sequelize = require('./orm_setup');
const app = express();
const PORT = 8000;
const cors = require('cors');
const routes = require('./router');
const User = require('./model');
const EmailService = require('./service');
const cron = require('node-cron');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cron job to send emails to investors with zero investment value
cron.schedule('0 8 * * *', async () => {
  try {
    // Get users with zero investment value based on their timezones
    const users = await User.findAll({
      where: {
        investmentValue: 0,
      },
    });

    // Iterate over users and send email if their investment value is zero
    users.forEach(async (user) => {
      const currentTime = moment().tz(user.timezone);
      const formattedTime = currentTime.format('YYYY-MM-DD HH:mm:ss');
      await EmailService.sendZeroInvestmentEmail(user.email, formattedTime);
    });
  } catch (error) {
    console.error('Error sending emails:', error);
  }
});
cron.schedule('0 20 * * *', async () => {
  try {
    // Get all users
    const users = await User.findAll();

    // Iterate over users
    for (const user of users) {
      // Get the current time in the user's timezone
      const currentTime = moment().tz(user.timezone);

      // Calculate the new investment amount (increase by 14%)
      const newInvestmentAmount = user.investmentAmount * 1.14;

      // Update the user's investment amount in the database
      await User.update({ investmentAmount: newInvestmentAmount }, {
        where: { id: user.id }
      });

      console.log(`Updated investment amount for user ${user.id}`);
    }
  } catch (error) {
    console.error('Error updating investment amounts:', error);
  }
});

app.use('/', routes); //index route

sequelize.sync()
  .then(() => console.log('model formed'))
  .catch(err => console.log(err));

app.listen(PORT, () => {
  console.log(`takum listening on port ${PORT}`);
});