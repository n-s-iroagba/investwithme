express = require('express')
const Investorcontroller = require('./controllers/Investorcontroller')
const investorController = require('./controllers/Investorcontroller')
const adminController = require('./controllers/adminController')

router = express.Router()

router.get("/", investorController.index)



router.post("/admins", adminController.createAdmin)
router.post("/admin/login", adminController.loginAdmin)

router.post("/register_managers", adminController.createManager)
router.post("/investors", investorController.registerInvestor)
 router.get("/verify-email/:token", adminController.verifyMail) 

// router.patch("/funds/investor/:id", controller.addInvestorFunds) 
// router.post("/investors", controller.registerInvestor)


// router.post("/adminlogin", controller.Adminlogin)


// router.patch("/investor/:id",controller.deleteInvestor)


module.exports = router