import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/common/Home";

import Login from "../pages/common/Login";
import AboutUs from "../pages/common/AboutUs";
import HowToGuides from "../pages/investor/HowToGuides";
import VerifyEmail from "../pages/common/VerifyEmail";
import Email from "../pages/common/Email";
import NewPassword from "../pages/common/NewPassword";
import Dashboard from "../pages/investor/Dashboard";
import WithdrawalDashboard from "../features/investor/components/WithdrawalDashboard";
import InvestorsDashboard from "../pages/admin/InvestorDashboard";
import CheckMail from "../pages/common/CheckMail";
import InvestmentManagers from "../pages/investor/InvestmentManagers";
import NewInvestment from "../pages/investor/NewInvestment";
import PaymentWalletForm from "../pages/investor/PaymentWalletForm";
import Referrals from "../pages/investor/Referral";
import PatchManager from "../pages/admin/PatchManager";
import Investors from "../pages/admin/Investors";
import Bonus from "../features/promo/layout/Bonus";
import AdminReferral from "../pages/admin/AdminReferral";
import AdminWallets from "../pages/admin/AdminWallets";
import Promotion from "../pages/admin/Promotion";
import AdminManager from "../pages/admin/AdminManager";
import Notifications from "../pages/investor/Notifications";
import Portfolio from "../pages/investor/Portfolio";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminSignUp from "../pages/admin/AdminSignUp";

import FundManagers from "../pages/common/FundManagers";
import EmailVerificationError from "../pages/common/EmailVerificationError";

import SignUp from "../pages/investor/SignUp";
import AlreadyVerified from "../pages/common/AlreadyVerified";
import PrivateRoute from "../wrappers/PrivateRoute";








export const router = createBrowserRouter([

    {
        path: '/',
        element: <Home />
    },
    {
        path: '/signup',
        element: <SignUp/>
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
    // {
    //     path: '/already-verified',
    //     element: <EmailVerified />,
    // },
    {
        path: '/dashboard',
        element:<PrivateRoute Component={Dashboard}/>,
        //<Dashboard username={"Nnamdi"}/>
        

    },
    {
        path: '/withdraw',
        element: <WithdrawalDashboard />,
    },
    {
        path: '/admin/investor-dashboard',
        element: <InvestorsDashboard />,
    },
    // {
    //     path: '/investment-guide',
    //     element: <InvestmentGuide />,
    // },
    {
        path: '/reset-password-info',
        element: <CheckMail />
    },

    {
        path: '/investment/managers',
        element: <InvestmentManagers />,
    },
    {
        path: '/invest',
        element: <PrivateRoute Component={NewInvestment}/>,
    },

    {
        path: '/invest/payment',
        element: <PaymentWalletForm />
    },
    {
        path: '/referral',
        element: <Referrals id={0} />,
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
        element: <PrivateRoute Component={Notifications }/>
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
    {
        path:'/already-verified/:email',
        element:<AlreadyVerified/>
    }

])