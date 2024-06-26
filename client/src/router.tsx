import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/general/Home"
import Dashboard from "./pages/investor/Dashboard";

import InvestmentGuide from "./pages/investor/InvestmentGuide";

import AboutUs from "./pages/general/AboutUs";
import Login from "./pages/general/Login";
import EmailVerified from "./pages/general/EmailVerifiedPage";
import VerifyEmail from "./pages/general/VerifyEmail";
import AdminDashboard from "./pages/admin/AdminDashboard"

import AdminSignUp from "./pages/admin/AdminSignUp";
import InvestmentManagers from "./pages/investor/InvestmentManagers";
import SignUp from "./pages/investor/SignUp";



import Portfolio from "./pages/investor/Portfolio";


import Email from "./pages/general/Email";
import NewPassword from "./pages/general/NewPassword";

import Transactions from "./pages/investor/Transactions";
import Referral from "./pages/investor/Referral";
import AdminManager from "./pages/admin/AdminManager";
import AdminWallets from "./pages/admin/AdminWallets";
import Notifications from "./pages/investor/Notification";
import PaymentWalletForm from "./pages/investor/PaymentWalletForm";
import WithdrawalDashboard from "./components/investor/WithdrawalDashboard";
import InvestorsDashboard from "./pages/admin/InvestorsDashboard";
import AdminReferral from "./pages/admin/AdminReferral";

import Promotion from "./pages/admin/Promotion";
import PatchManager from "./pages/admin/PatchManager";
import Bonus from "./pages/admin/Bonus";
import Investors from "./pages/admin/Investors";
import EmailVerificationError from "./pages/general/EmailVerificationError";
import PasswordChangeCheckMail from "./pages/general/PasswordChangeCheckMail";
import NewInvestment from "./pages/investor/NewInvestment";
import FundManagers from "./pages/general/FundManagers";
import HowToGuides from "./pages/investor/HowToGuides";




export const router = createBrowserRouter([

    {
        path: '/',
        element: <Home />
    },

    {
        path: '/signup',
        element: <SignUp />,
    },

    {
        path: '/login',
        element: <Login />
    },

    {
        path: '/about-us',
        element: <AboutUs />
    },

   

    {
        path: '/how-to-guide',
        element: <HowToGuides />
    },

    {
        path: '/verify-email',
        element: <VerifyEmail />
    },
    {
        path: '/forgot-password',
        element: <Email />
    },

    {
        path: '/new-password',
        element: <NewPassword />
    },
    {
        path: '/already-verified',
        element: <EmailVerified />,
    },
    {
        path: '/dashboard',
        element: <Dashboard username={""} id={1} />,//<PrivateRoute Component={Dashboard}/>,

    },
    {
        path: '/withdraw',
        element: <WithdrawalDashboard />,
    },
    {
        path: '/admin/investor-dashboard',
        element: <InvestorsDashboard />,
    },
    {
        path: '/investment-guide',
        element: <InvestmentGuide />,
    },
    {
        path: '/reset-password-info',
        element: <PasswordChangeCheckMail />
    },

    {
        path: '/invest/managers',
        element: <InvestmentManagers />,
    },
    {
        path: '/invest',
        element: <NewInvestment username={"Nnamdi"} />
    },

    {
        path: '/invest/payment',
        element: <PaymentWalletForm />
    },
    {
        path: '/referral',
        element: <Referral id={1} />,
    },

    {
        path: '/transactions',
        element: <Transactions />
    },

    {
        path: '/admin/signup',
        element: <AdminSignUp />
    },
    {
        path: '/admin/dashboard',
        element: <AdminDashboard username={"ss"} />
    },

    {
        path: '/portfolio',
        element: <Portfolio />
    },
    {
        path: '/notifications',
        element: <Notifications />
    },
    {
        path: '/admin/managers',
        element: <AdminManager />
    },
    {
        path: '/admin/promo',
        element: <Promotion />
    },
    {
        path: '/admin/investor-dashboard',
        element: <InvestorsDashboard />
    },

    {
        path: '/admin/wallets',
        element: <AdminWallets />
    },
    {
        path: '/admin/referrals',
        element: <AdminReferral />
    },
    {
        path: '/admin/bonus',
        element: <Bonus />
    },
    {
        path: '/admin/investors',
        element: <Investors />
    },
    {
        path: '/patch-manager',
        element: <PatchManager />
    },
    {
        path: '/enter-email',
        element: <Email />
    },
    {
        path: '/fund-managers',
        element: <FundManagers/>
    },
    {
        path: '/new-password/:token',
        element: <NewPassword />
    },
    {
        path: '/email-verification-error',
        element: <EmailVerificationError />
    },

])