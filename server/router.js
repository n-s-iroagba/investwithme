express = require('express')
const multer  = require('multer');
const investorController = require('./controllers/investorcontroller')
const adminController = require('./controllers/adminController')
const authController = require('./controllers/authController')
const {isAdmin,isInvestor} = require('./auth')

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

 router.post("/create-manager", (req, res, next) => {
    // Log req.body here
    console.log('req.body:', req.body);
  
    adminController.upload(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        console.error('Multer error:', err);
        res.status(500).json({ error: 'Error uploading file' });
      } else if (err) {
        // An unknown error occurred when uploading.
        console.error('Unknown error:', err);
        res.status(500).json({ error: 'Error uploading file' });
      } else {
        // Everything went fine, proceed with the route handler.
        next();
      }
    });
  }, adminController.createManager);
  
 router.get('/get-managers',adminController.getAllManagers )
 router.patch('patch-manager',adminController.patchManager)
 router.delete('/delete-manager/:id',adminController.deleteManager)

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