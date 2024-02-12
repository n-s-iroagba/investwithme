

const controller = require('./Investorcontroller')

express = require('express')

router = express.Router()

router.get("/", controller.index) 

// router.get("/investors", controller.getInvestors) 

// router.patch("/funds/investor/:id", controller.addInvestorFunds) 
// router.post("/investors", controller.registerInvestor)


// router.post("/adminlogin", controller.Adminlogin)


// router.patch("/investor/:id",controller.deleteInvestor)


module.exports = router