const express = require('express');
const sequelize = require('./orm_setup');
const app = express();
const PORT = 8000;
const cors = require('cors');
const routes = require('./router');
const User = require('./model');
const {sendInvestmentReminderEmails, updatePromosAndNotify} = require('./service');
const cron = require('node-cron');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


sendInvestmentReminderEmails()
sendInvestmentReminderEmails()
cron.schedule('0 0 */2 * *',updatePromosAndNotify);


app.use('/', routes)
app.use('/admins', routes); 
app.use('/register_managers', routes); 
app.use('/admin-login', routes); 
app.use('/investors', routes); 
app.use('/verify-email/:token',routes)

sequelize.sync({force:true})
  .then(() => console.log('model formed'))
  .catch(err => console.log(err));

app.listen(PORT, () => {
  console.log(`takum listening on port ${PORT}`);
});