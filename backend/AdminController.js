const Investor = require('../models/investor');

module.exports={
     deleteInvestor:async (req, res) => {
        try {
          const investorId = req.params.id;
          const investor = await Investor.findByPk(investorId);
      
          if (!investor) {
            return res.status(404).json({ error: 'Investor not found' });
          }
      
          await investor.destroy();
      
          res.status(200).json({ message: 'Investor deleted successfully' });
        } catch (error) {
          console.error('Error deleting investor:', error);
          res.status(500).json({ error: 'An error occurred while deleting the investor' });
        }
      },
      
  addInvestmentAmount:async (req, res)=>{
    try {
      const { walletAddress, investmentAmount } = req.body;
      const investor = await Investor.findOne({
        where: {
          depositingAddresses: {
            [Op.contains]: [walletAddress]
          }
        }
      });

      if (!investor) {
        return res.status(404).json({ error: 'Investor not found' });
      }
      investor.investmentValue += investmentAmount;
      await investor.save();
      res.status(200).json({ message: 'Investment amount added successfully' });
    } catch (error) {
      console.error('Error adding investment amount:', error);
      res.status(500).json({ error: 'An error occurred while adding investment amount' });
    }
  }
}

