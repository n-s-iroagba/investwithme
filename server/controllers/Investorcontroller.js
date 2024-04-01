const {Investor,Admin,Manager,InvestorWallet, TopUp}= require('../model')
const {sendVerificationEmail,sendReferalCompletedMail} = require('../service')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const multer = require('multer')
const getOrdinalSuffix = require('../helpers')
const JWT_SECRET = 'your_jwt_secret';

module.exports = {

  index: async (req, res) => {
    return res.send("hello");
  },
  registerInvestor: async (req, res) => {
    try {
      const { firstName, lastName, dateOfBirth, email, password,gender, country,  bank, timezone,referralCode } = req.body;
      const newInvestor = await Investor.create({ firstName, lastName, dateOfBirth, email, password,gender, country,  bank, timezone});
      newInvestor.referralCode = newInvestor.id + 2222
      
      const token = createVerificationJWT(newInvestor.id)
      newInvestor.verificationToken = token

      await sendVerificationEmail(newInvestor,token);

      if(referralCode){
        refreeInvestor = await Investor.findOne({where:{referralCode:referralCode}})
        newInvestor.refreeId = refreeInvestor.isDepositIncomplete
        await Notification.create({investorId:refreeInvestor.id,message:'you just referred'})
        await sendReferalCompletedMail(refreeInvestor,newInvestor)

      }

      newInvestor.save()
      return res.status(201).json(token)
    } catch (error) {
      console.error('Error registering investor:', error);
      res.status(400).json({ error: 'Could not register you at this point our servers are over loaded' });
    }
  },

  
  createInvestment: async (req, res)=>{
    try {
      const { managerId, investorId } = req.params;
      const intendedManager = await Manager.findByPk(managerId);
      if (!intendedManager) {
        return res.status(404).json({ message: "Manager not found" });
      }

      const allInvestments = await Investment.findAll({ where: { investorId } });
  
      const numberOfInvestments = allInvestments.length;

      const investmentOrdinalSuffix = getOrdinalSuffix(numberOfInvestments + 1);

      const newInvestment = await Investment.create({
        name: `my ${investmentOrdinalSuffix} investment`,
        amount: 0,
        managerId,
      });

      return res.status(201).json({ investment: newInvestment, managers: allManagers });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  getInvestments: async (req, res)=>{
    try {
      const investments = await Investment.findAll({
        where: { investorId }
      });
  
      const formattedInvestments = investments.map((investment) => {
        const isDepositIncomplete = investment.amount > investment.amountDeposited;
        const hasNoDeposit = investment.amountDeposited === 0;

        return {
          ...investment.dataValues, 
          incompleteDeposit: isDepositIncomplete,
          hasNoDeposit,
        };
      });
  
      return res.status(200).json(formattedInvestments);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
  createInvestorWallet: async (req, res) => {
    try {
      const { type, address } = req.body;
      const {investorId} = req.params.id

      if (!type || !address) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      const existingType = await WalletType.findOne({ where: { type } });
  
      if (existingType) {
        const newWalletAddress = await InvestorWallet({ address});
        newWalletAddress.walletTypeId = existingType.id
        newWalletAddress.investorId = investorId
        await newWalletAddress.save()
      } else {
        const newWalletType = await WalletType.create({ type });
        const newWalletAddress = await newWalletType.createWalletAddress({ address});
        newWalletAddress.walletTypeId = newWalletType.id
        newWalletAddress.investorId = investorId
        await newWalletAddress.save()
      }
      return res.status(201).json({ message: 'Wallet address created successfully', data: newWalletAddress });
    } catch (error) {
      console.error('Error creating wallet address:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  getAllWallets: async (req, res) => {
    try {
      const wallets = await InvestorWallet.findAll();
      return res.status(200).json({ wallets: wallets });
    } catch (error) {
      console.error('Error fetching wallets:', error);
      return res.status(500).json({ error: 'Error fetching wallets' });
    }
  },
  updateWalletAddressById: async (req, res) => {
    const { id } = req.params; 
    const { address } = req.body; 
    try {
      const wallet = await InvestorWallet.findByPk(id);
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

  deleteWalletAddress: async (req, res) => {
    const { id } = req.params;
    try {
      const wallet = await Wallet.findByPk(id);
      if (!wallet) {
        return res.status(404).json({ error: 'Wallet not found' });
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
      let isAdmin= false
      let user =  await Investor.findOne({ where: { email } });
      if(!user){
        user =  user = await Admin.findOne({ where: { email } })
        isAdmin = true
        if (!user)
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      if(user.verified){
      const token = jwt.sign({ id: investor.id, email: investor.email }, JWT_SECRET);
      res.json({ token });
      }else{
        //token is
      }
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
    const { token } = req.params;

    const decoded = verifyPasswordResetToken(token);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    const investor = await Investor.findOne({
      where: { email: decoded.email },
    });
    if (!investor) {
      return res.status(404).json({ message: "User not found" });
    }
    const newChangeToken = generatePasswordChangeToken(user.id);
    // Redirect user to change password route with the token in URL params
    const redirectUrl = `/change-password?token=${newChangeToken}`;
    return res.redirect(redirectUrl);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
},



  resetPassword: async (req, res) => {
    try {
      const {password } = req.body;
      const { token } = req.params;

    const decoded = verifyPasswordChangeToken(token);
    const investor = await Investor.findOne({
      where: { email: decoded.email },
    });
    if (!investor) {
      return res.status(404).json({ message: "User not found" });
    }
  
      if (!user) {
        return res.status(400).send('Password reset token is invalid or has expired.');
      }
  
      // Reset the user's password
      user.password = password;
      user.resetPasswordToken = null;
      user.resetPasswordExpires = null;
      await user.save();
  
      return res.status(200).json('password reset successful');
    } catch (error) {
      console.error('Error resetting password:', error);
      res.status(500).send('Error resetting password.');
    }
  },
  createInvestmentAndTopUp:async (req,res) => {
    const investorId = req.params
    const investor = Investor.findByPk(investorId)
    const {intendedAmount} = req.body 
    const investment = await Investment.create({ 
      amount: intendedAmount, 
      investorId 
    });
    
    const topUp = await TopUp.create({ 
      intendedAmount: intendedAmount,
       investmentId: investment.id 
      });
    await sendCreateNotificationMail(investor)
    Notification.create({investorId:investor.id, message: 'investment created notification'})
    return res.status(201).json('investemet created succesfully');
  },
  createTopUp:async (req,res) => {
    const investmentId = req.params.investmentId
    const {intendedAmount} = req.body 
     TopUp.create({ 
      intendedTopupAmount: topUpAmount,
       investmentId: investment.id ,
      intendedAmount: intendedAmount
      });
  ;
    
    const topUp = await TopUp.create({ inventend: topUpAmount, investmentId: investment.id });
  
    return { investment, topUp };
  },
} 

