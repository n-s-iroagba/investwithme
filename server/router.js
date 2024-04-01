express = require('express')
const Investorcontroller = require('./controllers/Investorcontroller')
const investorController = require('./controllers/Investorcontroller')
const adminController = require('./controllers/adminController')
const authController = require('./controllers/authController')

router = express.Router()

router.get("/", investorController.index)

router.post("/admins", authController.createAdmin)
router.post("/investors", authController.createInvestor)

router.post("/login", authController.login)

router.post("/register_managers", adminController.createManager)

 router.get("/verify-email/:token", authController.verifyMail) 
 router.get("/resend-verification-token/:id", authController.resendVerificationToken) 




// router.post("/adminlogin", controller.Adminlogin)


// router.patch("/investor/:id",controller.deleteInvestor)


module.exports = router