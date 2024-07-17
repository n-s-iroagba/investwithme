import express, { Router } from 'express';
import multer from 'multer';


import { changePassword, confirmMailForPasswordChange, createAdmin, createInvestor, login, requestPasswordReset, resendVerificationToken, verifyMail } from './controllers/authController';
import { createInvestment, getInvestment, index, topUp } from './controllers/investmentController';
import { deleteInvestor, getAllInvestors } from './controllers/investorController';
import { getAllDueReferrals, getReferralDetails, payReferralBonus } from './controllers/referralController';

import { createManager, patchManager, getAllManagers, getSingleManager, deleteManager } from './controllers/managerController';
import { createAdminWallet, deleteWallet, getAllWallets, patchWallet } from './controllers/adminWalletControllerr';
import { getNotifications, getTransactions } from './controllers/notificationAndTransactionController';
import { payPromoBonus, getPendingPromo, createPromo, getPromos, getAdvertPromos, updatePromo, deletePromo } from './controllers/promoController';

// import { getNewbies } from './controllers/newbiesControlller';

const router: Router = express.Router();
const upload = multer();

router.get('/', index);

router.post('/login', login);
router.get('/verify-email/:token', verifyMail);
router.get('/resend-verification-token/:email', resendVerificationToken);
router.post('/request-passswordChange', requestPasswordReset);
router.get('/verify-password-token/:token', confirmMailForPasswordChange);
router.post('/new-password/:id', changePassword);
router.get ('/get-available-currencies',getAllWallets)
router.post('/create-admin', createAdmin);
router.post('/create-investor', createInvestor);
router.get('/get-investors',  getAllInvestors);
router.patch('/pay', topUp);
router.get('/pay-referral/:id', payReferralBonus);
router.get('/pay-bonus/:id', payPromoBonus);
router.delete('/delete-investor/:id', deleteInvestor);
router.get('/get-pending-bonus', getPendingPromo);

router.post('/create-manager', upload.single('image'), createManager);
router.get('/get-managers', getAllManagers);
router.patch('/patch-manager/:id',upload.single('image'), patchManager);
router.get('/manager/:id', getSingleManager)
router.delete('/delete-manager/:id', deleteManager);

router.post('/create-investment/:id', createInvestment);
router.get('/get-investment/:id', getInvestment);
router.patch('/patch-investment', getPendingPromo);
router.delete('/delete-investment/:id', /* Add controller function */);

router.post('/create-wallet', createAdminWallet);
router.get('/get-wallets', getAllWallets);
router.patch('/patch-wallet', patchWallet);
router.delete('/delete-wallet/:id', deleteWallet);

router.post('/create-promo', createPromo);
router.get('/get-promo', getPromos);
router.get('/get-adpromo', getAdvertPromos);
router.patch('/patch-promo', updatePromo);
router.delete('/delete-promo/:id', deletePromo);

router.get('/get-notifications/:id', getNotifications);
router.get('/get-transactions/:id', getTransactions);

router.get('/get-pending-referral`', getAllDueReferrals)
router.get('/get-referral-details/:id',getReferralDetails)
export default router;
