const {Investor,Admin,Manager, DepositWallet, Investment,Referral}= require('../model')

module.exports = {

  index: async (req, res) => {
    return res.send("hello");
  },
  createInvestment: async (req, res) => {
    try {
      const { managerId, investorId } = req.params;
      const manager = await Manager.findByPk(managerId);
    
      if (!manager) {
        return res.status(404).json({ message: "Manager not found" });
      }

      const investor = await Investor.findByPk(investorId, { include: Investment });
      if (!investor) {
        return res.status(404).json({ message: "Investor not found" });
      }

      if (investor.hasInvested) {
        return res.status(400).json({ message: "Investor has already invested", code: 'INVESTOR_ALREADY_INVESTED' });
      }
  
      if (investor.Investment) {
        await investor.Investment.destroy();
      }

      const managers = await Manager.findAll();

  
      const incrementPercent = manager.returnPercentage / INVESTMENT_TENURE;
      const currentDate = new Date();
      const dueDate = new Date(currentDate);
      dueDate.setDate(dueDate.getDate() + 14);
  
      const newInvestment = await Investment.create({
        managerId,
        investorId,
        incrementPercent,
        creationDate: currentDate,
        isPaused: false,
      });
  
      return res.status(201).json({ investment: newInvestment,managers: managers });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  updateInvestment: async (req, res) => {
    const { id } = req.params;
    const {
      amount,
      managerId,
      address,
      blockchain,
      network,
    
    } = req.body;
  
    try {
      const investment = await Investment.findByPk(id);
      const manager = await Manager.findByPk(managerId);
      if (!manager) {
        return res.status(404).json({ message: "Manager not found" });
      }

      const incrementPercent = manager.returnPercentage / INVESTMENT_TEN
      if (!investment) {
        return res.status(404).json({ message: "Investment not found" });
      }
  
      investment.amount = amount;
      investment.incrementPercent = incrementPercent;
      investment.managerId = managerId;
   
      await investment.save();

    await DepositWallet.create({
        address,
        blockchain,
        network,
        investmentId: id,
      })
      //SEARCH FOR CORRESPONDING ADMIN WALLET
      //CreateNotification
      //SendMailMessage
  
      return res.status(200).json({wallet:wallet });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  getInvestments: async (req, res) => {
    const { id } = req.params;
  
    try {
      const [investment, referrals, manager,wallet] = await Promise.all([
        Investment.findOne({ where: { investorId: id } }),
        Referral.findAll({ where: { refereeId: id } }),
        Manager.findOne({ where: { id: investment.managerId } }),
        DepositWallet.findOne({ where: {investmentId:investment.id} }),
      ]);
  
      if (!investment) {
        return res.status(404).json({ message: 'Investment not found' });
      }
  
      return res.status(200).json({ investment, referrals, manager,wallet });
    } catch (error) {
      console.error('Error in getInvestments:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  updateDepositWallet:async (req, res) => {
    const { id } = req.params;
    const { address, blockchain, network } = req.body;
  
    try {
   
      const depositWallet = await DepositWallet.findByPk(id);
  
      if (!depositWallet) {
        return res.status(404).json({ error: 'Deposit wallet not found' });
      }

      depositWallet.address = address;
      depositWallet.blockchain = blockchain;
      depositWallet.network = network;

      await depositWallet.save();
  
      return res.status(200).json({ message: 'Deposit wallet updated successfully', depositWallet });
    } catch (error) {
      console.error('Error updating deposit wallet:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

} 

