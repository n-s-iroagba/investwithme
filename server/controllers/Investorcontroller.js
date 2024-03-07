const {Investor,Admin,Manager,AdminWallet}= require('../model')
const {sendVerificationEmail} = require('../service')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const multer = require('multer')
const JWT_SECRET = 'your_jwt_secret';

module.exports = {

  index: async (req, res) => {
    return res.send("hello");
  },
  registerInvestor: async (req, res) => {
    try {
      const { firstName, lastName, email, password, dateOfBirth,bank,timezone} = req.body;
      const newinvestor = await Investor.create({ firstName, lastName,dateOfBirth, email, password, bank,timezone});
      await sendVerificationEmail(newinvestor);
      res.status(201).json(newinvestor);
    } catch (error) {
      console.error('Error registering investor:', error);
      res.status(400).json({ error: 'Could not register you at this point our servers are over loaded' });
    }
  },
 updateInvestor:async (req, res) => {
    try {
      const { id } = req.params; // Extract the investor ID from req.params
      const { firstName, lastName, email, phoneNumber } = req.body; // Extract updated attributes from req.body
      let investor = await Investor.findByPk(id);
  
      if (!investor) {
        return res.status(404).json({ error: 'Investor not found' });
      }
      investor.firstName = firstName;
      investor.lastName = lastName;
      investor.email = email;
      investor.phoneNumber = phoneNumber;
      await investor.save();
  
      return res.status(200).json({ message: 'Investor updated successfully', investor });
    } catch (error) {
      console.error('Error updating investor:', error);
      return res.status(500).json({ error: 'Failed to update investor' });
    }
  },
 uploadInvestorImage: async (req, res) => {
    try {
      const { id } = req.params; 
      const investor = await Investor.findByPk(id); 
  
      if (!investor) {
        return res.status(404).json({ error: 'Investor not found' });
      }
      if (!req.file) {
        return res.status(400).json({ error: 'An image file must be provided' });
      }
      const imagePath = req.file.path;
       investor.image = imagePath;
      await investor.save();
      return res.status(200).json({ message: 'Investor image uploaded successfully', imagePath: imagePath });
    } catch (error) {
      console.error('Error uploading investor image:', error);
      return res.status(500).json({ error: 'Error uploading investor image' });
    }
  },
  addWallet:async (res,req) => {
    const {address,type,currency} = req.body
    const {id} = req.params
    if(type==='withdrawal'){
    const randomNumber = Math.floor(Math.random() * 10) + 1;
   address+= randomNumber.toString()
    }
      try {
   
          const wallet = await Wallet.create({
              address: address,
              type: type,
              currency: currency,
              investorid
              
          });
          wallet.save();
          return res.status(200).json({message:`admin ${currency} wallet created`})
      } catch (error) {
       
          console.error('Error creating wallet:', error);
          return res.status(500).json({message:`error adding wallet try again later`})
      }
  },
  fetchInvestorWallets: async (req, res) => {
    try {
      const { investorId } = req.params;
      const wallets = await Wallet.findAll({ where: { investorId: investorId } });
      return res.status(200).json({ wallets: wallets });
    } catch (error) {
      console.error('Error fetching investor wallets:', error);
      return res.status(500).json({ error: 'Error fetching investor wallets' });
    }
  },
 updateWalletAddressById:async (req, res) => {
    try {
      const { id } = req.params; 
      const { address } = req.body; 
      let wallet = await Wallet.findOne({ where: { id: walletId, investorId: investorId } });
  
      if (!wallet) {
        return res.status(404).json({ error: 'Wallet not found' });
      }
      wallet.address = address;
      await wallet.save();
      return res.status(200).json({ message: 'Wallet address updated successfully', wallet });
    } catch (error) {
      console.error('Error updating wallet address:', error);
      return res.status(500).json({ error: 'Failed to update wallet address' });
    }
  },
  deleteInvestorWalletAddress:async (req, res) => {
    try {
      const { investorId, walletId } = req.params;
      const investor = await Investor.findByPk(investorId);
  
      if (!investor) {
        return res.status(404).json({ error: 'Investor not found' });
      }
      const wallet = await Wallet.findOne({ where: { id: walletId, investorId: investorId } });
  
      if (!wallet) {
        return res.status(404).json({ error: 'Wallet not found for this investor' });
      }

      await wallet.destroy();
      return res.status(200).json({ message: 'Wallet address deleted successfully' });
    } catch (error) {
      console.error('Error deleting wallet address:', error);
      return res.status(500).json({ error: 'Failed to delete wallet address' });
    }
  },

//Auth
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const investor = await Investor.findOne({ where: { email } });
      if (!investor) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      const isPasswordValid = await bcrypt.compare(password, investor.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      const token = jwt.sign({ id: investor.id, email: investor.email }, JWT_SECRET);
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
        console.log('investor is already verified, no verification email needed.');
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
        const jwToken = jwt.sign({ id: investor.id, email: investor.email }, JWT_SECRET);
        return res.redirect('http://localhost:3000/dashboard')   
    }catch (error) {
        console.error('Error verifying email:', error);
        return res.status(500).json({ error: 'An error occurred while verifying your email. Please try again later.' });
      }
    },
    forgotPassword: async (req, res) => {
      try {
        const { email } = req.body;
        
        // Generate a unique token
        const token = crypto.randomBytes(20).toString('hex');
    
        // Find the investor by email
        const investor = await Investor.findOne({ where: { email: email } });
    
        if (!investor) {
          return res.status(404).send('investor not found');
        }
    
        // Save the token and expiry time to the investor record
        investor.resetPasswordToken = token;
        investor.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
        await investor.save();
        await sendChangePasswordTokenMail(investor)
        res.send('Password reset instructions have been sent to your email.')
      } catch (error) {
        console.error('Error sending reset password email:', error);
        res.status(500).send('Error sending reset password email');
      }
    },
    checkPasswordToken: async (req, res) => {
      try {
        const token = req.params.token;
        const user = await User.findOne({
          where: {
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
          }
        });
    
        if (!user) {
          return res.status(400).send('Password reset token is invalid or has expired.');
        }
    
        // Redirect the user to a page where they can input their new password
        res.redirect(`/reset-password-form?token=${token}`);
      } catch (error) {
        console.error('Error handling reset password request:', error);
        res.status(500).send('Error handling reset password request');
      }

  },
  resetPassword: async (req, res) => {
    try {
      const { token, password } = req.body;
      const user = await User.findOne({
        where: {
          resetPasswordToken: token,
          resetPasswordExpires: { $gt: Date.now() }
        }
      });
  
      if (!user) {
        return res.status(400).send('Password reset token is invalid or has expired.');
      }
  
      // Reset the user's password
      user.password = password;
      user.resetPasswordToken = null;
      user.resetPasswordExpires = null;
      await user.save();
  
      res.send('Password has been successfully reset.');
    } catch (error) {
      console.error('Error resetting password:', error);
      res.status(500).send('Error resetting password.');
    }
  }

} 

