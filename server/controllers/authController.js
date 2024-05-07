
 const {ALREADY_VERIFIED_ROUTE,EMAIL_VERIFICATION_ERROR_ROUTE,ADMIN_CLIENT_DASHBOARD_ROUTE,NEW_PASSWORD_URL,JWT_SECRET,CLIENT_DASHBOARD_ROUTE,EMAIL_VERIFICATION_ROUTE } = require('../config');
const { Investor, Admin, Notification, Referral } = require('../model')
const {  generatePasswordResetToken,
  decodeJWT,
  generateEmailVerificationToken,
  createLoginJWT,
  encryptPassword,
  createNewPasswordToken,
  createAdminLoginJWT } = require('../auth')

const { sendVerificationEmail, sendReferalCompletedMail,sendPasswordResetEmail } = require('../service')
const bcrypt = require('bcrypt');


module.exports = {

  createAdmin: async (req, res) => {
    let { name, email, password } = req.body;
    try {
      const existingAdmin = await Admin.findOne({ where: { email } });
      if (existingAdmin) {
        return res.status(409).json({ message: 'Admin already exists' });
      }

      password = await encryptPassword(password);
      const admin = await Admin.create({ name, email, password });
      const verificationToken = generateEmailVerificationToken( admin.id);
      admin.verificationToken = verificationToken;
      await admin.save();

      await sendVerificationEmail(admin, verificationToken);

      return res.status(201).json(verificationToken);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  createInvestor: async (req, res) => {
    try {
      let { firstName, lastName, dateOfBirth, email, password, gender, country, bank, referralCode } = req.body;

      const existingInvestor = await Investor.findOne({ where: { email } });
      if (existingInvestor) {
        return res.status(409).json('user already exists');
      }

      password = await encryptPassword(password);
      const newInvestor = await Investor.create({ firstName, lastName, dateOfBirth, email, password, gender, country, bank });
      newInvestor.referralCode = newInvestor.id + 2222;

      const token = generateEmailVerificationToken( newInvestor.id);
      newInvestor.verificationToken = token;
     
      if (referralCode) {
        const refereeInvestor = await Investor.findOne({ where: { referralCode: referralCode } });
        if (refereeInvestor) {
          newInvestor.refereeId = refereeInvestor.id;
          await Referral.create({refereeId: refereeInvestor.id,referredId:newInvestor.id});
          await Notification.create({ investorId: refereeInvestor.id, header: 'Referral', message: `Thank you!\n You just referred ${newInvestor.firstName} ${newInvestor.lastName}. You'd earn ${referralBonusPercent} on the first deposit` });
          await sendReferalCompletedMail(refereeInvestor, newInvestor);
        } else {
          throw new Error('Referee investor not found');
        }
      }

      await newInvestor.save();
      await sendVerificationEmail(newInvestor, token);
      return res.status(201).json(token);
    } catch (error) {
      console.error('Error registering investor:', error.message);
      res.status(500).json({ message: error.message });

    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
  
    try {
      let user = await Admin.findOne({ where: { email } });
      let userType = 'admin';
  
      if (!user) {
        user = await Investor.findOne({ where: { email } });
        userType = 'investor';
      }
      
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
  
      if (!user.isVerified) {
        const token = generateEmailVerificationToken( user);
        user.verificationToken = token;
        await user.save();
        await sendVerificationEmail(user);
        return res.status(403).json(token);
      }
      const passwordsMatch = await bcrypt.compare(password, user.password);
      if (passwordsMatch) {
        let loginToken;
      if (userType === 'investor') {
      
      loginToken = createLoginJWT(user)
      }else{
        loginToken = createAdminLoginJWT(user)
      }
      console.log('loginToken:' +loginToken);
      return res.status(200).json({user:userType, token:loginToken})
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  },
  
  verifyMail: async (req, res) => {
    const { token } = req.params;
    const decoded = decodeJWT(token);
    try {
      let creationTime = new Date(decoded.timeOfCreation);
      creationTime.setMinutes(creationTime.getMinutes() + 10);
      
      if (Date.now() >= creationTime) {
        return res.status(401).redirect(`${EMAIL_VERIFICATION_ROUTE}/?token=${token}` );;
      }
      let user = await Admin.findOne({ where: { verificationToken: token } });
      let userType = 'admin';
      if (!user) {
        user = await Investor.findOne({ where: { verificationToken: token } });
        userType = 'investor';
        if (!user) {
          throw new Error('illegal request no such user')
        }
      }
      console.log(user)
      if (user.isVerified) {
        return res.redirect(ALREADY_VERIFIED_ROUTE);
      }

      await user.update({ isVerified: true});
      user.save();
     
      ;
      if (userType==='admin'){
        const jwToken = createAdminLoginJWT(user)
        return res.redirect(`${ADMIN_CLIENT_DASHBOARD_ROUTE}/?token=${jwToken}`);
      }else{
        const jwToken = createLoginJWT(user)
        return res.redirect(`${CLIENT_DASHBOARD_ROUTE}/?token=${jwToken}`);
      }
     
    } catch (error) {
      console.error('Error verifying email:', error.message);
      res.status(500).json({ message: error.message });
    }
  },

  resendVerificationToken: async (req, res) => {
    const { id } = req.params;

    try {
      let user = await Admin.findByPk(id);
      if (!user) {
        user = await Investor.findByPk(id);
        if (!user) {
          throw new Error('illegal request no such user')
        }
      }
      const newToken = generateEmailVerificationToken( user.id);
      user.verificationToken = newToken;
      user.save();
      await sendVerificationEmail(user, newToken); // Wait for email to be sent
      return res.status(200).json(newToken); // Return the new token
    } catch (error) {
      res.status(500).json({ message: error.message });

    }
  },
  requestPasswordReset:async (req, res) => {
    const { email } = req.body;
  
    try {
      let user = await Admin.findOne({ where: { email } });
      let role = 'admin';
  
      if (!user) {
        user = await Investor.findOne({ where: { email } });
        if (!user) {
          return res.status(404).json({ error: 'User not found.' });
        } else {
          role = 'investor';
        }
      }
  
      const resetToken = generatePasswordResetToken(user.id, user.email, role);
      user.changePasswordToken = resetToken;
      await user.save();
  
      await sendPasswordResetEmail(user, resetToken);
  
      return res.status(200).send('Password change request successful');
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  },
  
  confirmMailForPasswordChange: async (req, res) => {
    const { token } = req.params;
    console.log(token)
    try {

      let user = await Admin.findOne({ where: { changePasswordToken: token } });

      if (!user) {
        user = await Investor.findOne({ where: {changePasswordToken: token } })
        if (!user) {
          return res.status(404).json({ error: 'User not found.' });
        }
      }

      const newtoken = createNewPasswordToken(user.id,user.email)

      return res.redirect(`${NEW_PASSWORD_URL}/?token=${newtoken}`)

    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  },

  changePassword: async (req, res) => {
    const {id}= req.params
    const { password } = req.body;
    try {
      let user = await Admin.findByPk(id)
      let role = 'admin'
      if (!user) {
        
        user = await Investor.findOne({ where: { email } });
        if (!user) {
          return res.status(404).json({ error: 'User not found.' });
        }else{
          role = 'investor'
        }
      }
      console.log('role: '+role)
      let loginToken;
      if (role == 'investor'){
        loginToken = createLoginJWT(user) 
      }else{
      loginToken = createAdminLoginJWT(user)
      }
      
      user.save()
      return res.status(200).json({user:role, token:loginToken})

    } catch (error) {
      console.error('Error changing password :', error.message);
      return res.status(500).json({ error: error.message});
    }
  },

}

