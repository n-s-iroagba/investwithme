const Investor = require('./model')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const JWT_SECRET = 'your_jwt_secret';

module.exports = {

  index: async (req, res) => {
    return res.send("hello");
  },
  registerInvestor: async (req, res) => {
    try {
      const { username, email, password, dateOfBirth } = req.body;
      const newUser = await Investor.create({ username, email, password });

      // Send verification email
      await sendVerificationEmail(newUser);

      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(400).json({ error: 'Could not register you at this point our servers are over loaded' });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Investor.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
      res.json({ token });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  resendVerificationEmail: async (req, res) => {
    try {
      // GET INvestor
      if (investor.verified) {
        console.log('User is already verified, no verification email needed.');
        return;
      }
      sendVerificationEmail(investor)
    }catch (error) {
      console.error('Error verifying email:', error);
      res.status(500).json({ error: 'An error occurred while resending verification email. Please try again later.' });
    }
},
 verifyMail: async (req, res) => {
    try {
      const { token } = req.params;
      const investor = await Investor.findOne({ where: { verificationToken: token } });

      if (!investor) {
        return res.status(400).json({ error: 'Invalid verification token' });
       } 
       await investor.update({ verified: true, verificationToken: null });
        // Log the investor in
        req.session.investor = investor
        res.status(200).json({ message: 'Email verified successfully. You are now logged in.' });
      
    }catch (error) {
        console.error('Error verifying email:', error);
        res.status(500).json({ error: 'An error occurred while verifying your email. Please try again later.' });
      }
    },
  }

  

const sendVerificationEmail = async (user) => {
    try {
      const verificationToken = generateVerificationToken();
      await user.update({ verificationToken });

      const verificationLink = `http://example.com/verify/${verificationToken}`;
      const emailBody = `Please click this link to verify your email: ${verificationLink}`;

      await EmailService.sendEmail(user.email, 'Verify Your Email', emailBody);
    } catch (error) {
      console.error('Error sending verification email:', error);
    }
  }
const generateVerificationToken = () => {
    return Math.random().toString(36).substring(7);
  };