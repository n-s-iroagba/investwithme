const express = require('express');
const sequelize = require('./orm_setup');
const app = express();
const PORT = 8000;
const cors = require('cors');
const routes = require('./router');
const {sendInvestmentReminderEmails,updateInvestmentEarningsAndNotifiy} = require('./service');
const cron = require('node-cron');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

cron.schedule('0 0 */17 * *', updateInvestmentEarningsAndNotifiy());
cron.schedule('0 7 * * *', sendInvestmentReminderEmails())

app.use('/', routes)

app.use('/login', routes); 
app.use('/verify-email/:token',routes)
app.use("/resend-verification-token/:id", routes)
app.use ("/request-passswordChange", routes)
app.use('/new-password', routes)

app.use('/create-admin', routes); 

app.use('/create-investor', routes);
app.use('/get-investors', routes);
app.use('/top-up', routes);
app.use('/pay', routes);
app.use('/delete-investor/:id', routes);

app.use('/create-manager', routes);
app.use('/patch-manager', routes); 
app.use('/get-managers', routes);
app.use('/delete-manager/:id', routes);

app.use('/create-investment',routes)
app.use('/patch-investment',routes)
app.use('/get-investment/:id', routes);

app.use('/create-wallet',routes)
app.use('/get-wallets',routes)
app.use('/patch-wallet',routes)
app.use('/delete-wallet/:id',routes)

app.use('/create-wallet',routes)
app.use('/get-wallets',routes)
app.use('/patch-wallet',routes)
app.use('/delete-wallet/:id',routes)

sequelize.sync()
  .then(() => console.log('model formed'))
  .catch(err => console.log(err));

app.listen(PORT, () => {
  console.log(`takum listening on port ${PORT}`);
});