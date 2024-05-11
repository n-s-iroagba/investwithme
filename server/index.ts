import express, { Request, Response } from 'express';
import sequelize from './orm_setup';
import cron from 'node-cron';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './router';
import { Admin } from './types/adminTypes';


const app = express();
const PORT = 8000;



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// cron.schedule('0 0 */17 * *', updateInvestmentEarningsAndNotifiy());
// cron.schedule('0 7 * * *', sendInvestmentReminderEmails());

app.use('/', routes);

app.use('/login', routes);
app.use('/verify-email/:token', routes);
app.use("/resend-verification-token/:id", routes);
app.use("/request-passswordChange", routes);
app.use('/new-password/:id', routes);
app.use("/verify-password-token/:token", routes);

app.use('/create-admin', routes);

app.use('/create-investor', routes);
app.use('/get-investors', routes);
app.use('/pay-referral/:id', routes);
app.use('/pay-bonus/:id', routes);
app.use('/pay', routes);
app.use('/delete-investor/:id', routes);

app.use('/create-manager', routes);
app.use('/patch-manager', routes);
app.use('/get-managers', routes);
app.use('/manager/:id', routes);
app.use('/delete-manager/:id', routes);

app.use('/create-promo', routes);
app.use('/patch-promo', routes);
app.use('/get-promo', routes);
app.use('/delete-manager', routes);

app.use('/create-investment/:id', routes);
app.use('/patch-investment', routes);
app.use('/get-investment/:id', routes);
app.use('/get-investment-status/:id', routes);

app.use('/create-wallet', routes);
app.use('/get-wallets', routes);
app.use('/patch-wallet', routes);
app.use('/delete-wallet/:id', routes);

app.use('/create-wallet', routes);
app.use('/get-wallets', routes);
app.use('/patch-wallet', routes);
app.use('/delete-wallet/:id', routes);

app.use('/get-notifications/:id', routes);
app.use('/get-transactions/:id', routes);
app.use('/get-newbies', routes);

sequelize
  .sync()
  .then(() => console.log('model formed'))
  .catch((err:any) => console.log(err));
Admin.sync()
app.listen(PORT, () => {
  console.log(`takum listening on port ${PORT}`);
});

