import express, { Router } from 'express';
import { isAdmin, isInvestor } from './auth';
import { createInvestment, getInvestment, getInvestmentStatus, getNotifications, getTransactions, index, payPromoBonus, payReferralBonus, topUp } from './controllers/investorController';
import { createAdminWallet, createManager, createPromo, deleteInvestor, deleteManager, deletePromo, deleteWallet, getAllInvestors, getAllManagers, getAllWallets, getPromos, getSingleManager, patchManager, patchWallet, updatePromo, upload } from './controllers/adminController';
import { changePassword, confirmMailForPasswordChange, createAdmin, createInvestor, login, requestPasswordReset, resendVerificationToken, verifyMail } from './controllers/authController';

const router: Router = express.Router();


router.get('/', index);

router.post('/login', login);
router.get('/verify-email/:token', verifyMail);
router.get('/resend-verification-token/:id', resendVerificationToken);
router.post('/request-passswordChange', requestPasswordReset);
router.get('/verify-password-token/:token', confirmMailForPasswordChange);
router.post('/new-password/:id', changePassword);

router.post('/create-admin', createAdmin);
router.post('/create-investor', createInvestor);
router.get('/get-investors', /* Add middleware if needed */ getAllInvestors);
router.get('/get-investment-status/:id', getInvestmentStatus);
router.patch('/pay', topUp);
router.get('/pay-referral/:id', payReferralBonus);
router.get('/pay-bonus/:id', payPromoBonus);
router.delete('/delete-investor/:id', /* Add middleware if needed */deleteInvestor);

router.post('/create-manager', upload, createManager);
router.get('/get-managers', getAllManagers);
router.get('/manager/:id', getSingleManager);
router.patch('/patch-manager/:id',upload, patchManager);
router.delete('/delete-manager/:id', deleteManager);

router.post('/create-investment/:id', createInvestment);
router.get('/get-investment/:id', getInvestment);
router.patch('/patch-investment', /* Add controller function */);
router.delete('/delete-investment/:id', /* Add controller function */);

router.post('/create-wallet', createAdminWallet);
router.get('/get-wallets', getAllWallets);
router.patch('/patch-wallet', patchWallet);
router.delete('/delete-wallet/:id', deleteWallet);

router.post('/create-promo', createPromo);
router.get('/get-promo', getPromos);
router.patch('/patch-promo', updatePromo);
router.delete('/delete-promo/:id', deletePromo);

router.get('/get-notifications/:id', getNotifications);
router.get('/get-transactions/:id', getTransactions);


export default router;
