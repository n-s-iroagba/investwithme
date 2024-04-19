express = require('express')

const investorController = require('./controllers/investorcontroller')
const adminController = require('./controllers/adminController')
const authController = require('./controllers/authController')

router = express.Router()

router.get("/", investorController.index)


router.post("/login", authController.login)
router.get("/verify-email/:token", authController.verifyMail) 
router.get("/resend-verification-token/:id", authController.resendVerificationToken)
router.post("/request-passswordChange",authController.requestPasswordReset )
router.get("/verify-password-token/:token",authController.confirmMailForPasswordChange )
router.post('/new-password/:id',authController.changePassword )

 router.post("/create-admin", authController.createAdmin)

 router.post("/create-investor", authController.createInvestor)
 router.get('/get-investors', )
 router.patch('/top-up',)
 router.patch('/pay',)
 router.delete('/delete-investor/:id',)

 router.post("/create-manager", adminController.createManager)
 router.get('/get-managers', )
 router.patch('patch-manager',)
 router.delete('/delete-manager/:id',)

 router.post('/create-investment', )
 router.get('/get-investment/:id', )
 router.patch('/patch-investment',)

 router.post('/create-wallet', )
 router.get('/get-wallets', )
 router.patch('patch-wallet',)
 router.delete('/delete-wallet/:id',)

 router.post('/create-promo', )
 router.get('/get-promo', )
 router.patch('patch-promo',)
 router.delete('/delete-promo/:id',)

 router.get('/get-notifications/:id', )

module.exports = router