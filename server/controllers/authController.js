
 const {ALREADY_VERIFIED_ROUTE,EMAIL_VERIFICATION_ERROR_ROUTE,ADMIN_CLIENT_DASHBOARD_ROUTE,REQUEST_PASSWORD_RESET,JWT_SECRET,CLIENT_DASHBOARD_ROUTE} = require('../config');
const { Investor, Admin, Notification, Referral } = require('../model')
const { encryptPassword, createVerificationJWT,createLoginJWT } = require('../auth')

const { sendVerificationEmail, sendReferalCompletedMail } = require('../service')
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
      const verificationToken = createVerificationJWT(admin.id);
      admin.verificationToken = verificationToken;
      await admin.save();

      await sendVerificationEmail(admin, verificationToken);

      return res.status(201).json({ message: 'Admin created successfully', verificationToken });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  createInvestor: async (req, res) => {
    try {
      let { firstName, lastName, dateOfBirth, email, password, gender, country, bank, timezone, referralCode } = req.body;

      const existingInvestor = await Investor.findOne({ where: { email } });
      if (existingInvestor) {
        return res.status(409).json({ error: 'Investor with this email already exists' });
      }

      password = await encryptPassword(password);
      const newInvestor = await Investor.create({ firstName, lastName, dateOfBirth, email, password, gender, country, bank, timezone });
      newInvestor.referralCode = newInvestor.id + 2222;

      const token = createVerificationJWT(newInvestor.id);
      newInvestor.verificationToken = token;

      if (referralCode) {
        const refereeInvestor = await Investor.findOne({ where: { referralCode: referralCode } });
        if (refereeInvestor) {
          newInvestor.refereeId = refereeInvestor.id;
          await Referral.create({refereeInvestorId: refereeInvestor.id});
          await Notification.create({ investorId: refereeInvestor.id, header: 'Referral', message: `Thank you!\n You just referred ${newInvestor.firstName} ${newInvestor.lastName}. You'd earn ${referralBonusPercent} on the first deposit` });
          await sendReferalCompletedMail(refereeInvestor, newInvestor);
        } else {
          console.error('Referee investor not found');
        }
      }

      await newInvestor.save();
      await sendVerificationEmail(newInvestor, token);
      return res.status(201).json(token);
    } catch (error) {
      console.error('Error registering investor:', error);
      return res.status(400).json({ error: 'Could not register you at this point, our servers are overloaded' });
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
  
      if (!user.verified) {
        const token = createVerificationJWT(user);
        user.verificationToken = token;
        await user.save();
        await sendVerificationEmail(user);
        return res.status(403).json(token);
      }
      const passwordsMatch = await bcrypt.compare(password, user.password);
      if (passwordsMatch) {
        const jwToken = createLoginJWT(user,userType);
        return res.status(200).json({ userType, token: jwToken });
      } else {
        return res.status(400).json({ message: 'Wrong password' });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
  
  verifyMail: async (req, res) => {
    const { token } = req.params;
    try {
      const decoded = decodeJWT(token);
      if (Date.now() >= decoded.exp * 1000) {
        return res.status(401).json({ error: 'Token expired. Please request a new one.' });
      }
      let user = await Admin.findOne({ where: { verificationToken: token } });
      let userType = 'admin';
      if (!user) {
        user = await Investor.findOne({ where: { verificationToken: token } });
        userType = 'investor';
        if (!user) {
          return res.status(400).redirect(EMAIL_VERIFICATION_ERROR_ROUTE);
        }
      }

      if (user.verified) {
        return res.redirect(ALREADY_VERIFIED_ROUTE);
      }

      await user.update({ verified: true, verificationToken: null });
      user.save();
      console.log(`${userType} after update: ${user}`);
      const jwToken = createLoginJWT(user);
      if (userType==='investor'){
        return res.redirect(`${ADMIN_CLIENT_DASHBOARD_ROUTE}/?token=${jwToken}`);
      }
     return res.redirect(`${CLIENT_DASHBOARD_ROUTE}/?token=${jwTtoken}`);
    } catch (error) {
      console.error('Error verifying email:', error);
      return res.status(500).json({ error: 'An error occurred while verifying your email. Please try again later.' });
    }
  },

  resendVerificationToken: async (req, res) => {
    const { token } = req.params;
    try {
      let user = await Admin.findOne({ where: { verificationToken: token } });
      if (!user) {
        user = await Investor.findOne({ where: { verificationToken: token } });
        if (!user) {
          return res.status(400).redirect(EMAIL_VERIFICATION_ERROR_ROUTE);
        }
      }
      const newToken = createVerificationJWT(user.id);
      user.verificationToken = newToken;
      user.save();
      await sendVerificationEmail(user, newToken); // Wait for email to be sent
      return res.status(200).json({ token: newToken }); // Return the new token
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  requestPasswordReset: async (req, res) => {
    const { email } = req.body;

    try {

      let user = await Admin.findOne({ where: { email } });
      if (!user) {
        user = await Investor.findOne({ where: { email } });
        if (!user) {
          return res.status(404).json({ error: 'User not found.' });
        }
      }

      const resetToken = generatePasswordResetToken(user);
      user.passwordResetToken = resetToken;
      user.save();
      await sendPasswordResetEmail(user, resetToken); // Implement this function to send email with resetToken

      return res.status(201);
    } catch (error) {
      return res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
  },

  confirmMailForPasswordChange: async (req, res) => {
    const { token } = req.params;
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      if (Date.now() >= decoded.exp * 1000) {
        return res.redirect(REQUEST_PASSWORD_RESET);
      }
      let user = await Admin.findOne({ where: { PasswordResetToken: token } });
      if (!user) {
        user = await Investor.findOne({ where: { PasswordResetToken: token } })
        if (!user) {
          return res.status(400).json({ error: 'Invalid verification token' });
        }
        const token = createNewPasswordToken(user.id)

        return res.redirect(`${NEW_PASSWORD_URL}/${token}`)
      }
    } catch (error) {
      console.error('Error verifying email:', error);
      return res.status(500).json({ error: 'An error occurred while verifying your email. Please try again later.' });
    }
  },

  changePassword: async (req, res) => {
    const id = request.params
    const { password } = req.body
    try {
      let user = await Admin.findByPk(id)
      let userType = 'admin'
      if (!user) {
        user = await Investor.findByPk(id)
        userType = 'investor'
        if (!user) {
          return res.status(400).json({ error: 'Invalid verification token' });
        }
      }
      user.password = await bcrypt.hash(password, 10)
      user.save()
      const loginToken = createLoginToken(user, userType)
      return res.status(201).json(loginToken)

    } catch (error) {
      throw new Error(`Error logging in admin: ${error.message}`);
    }
  },

}

