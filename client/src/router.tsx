import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/general/Home"
import Dashboard from "./pages/investor/Dashboard";
import InvestmentCards from "./pages/investor/InvestmentManagers"
import InvestmentGuide from "./pages/investor/InvestmentGuide";
import Payments from './pages/investor/Payments'
import AboutUs from "./pages/general/AboutUs";
import Login from "./pages/general/Login";
import EmailVerified from "./pages/general/EmailVerified";
import VerifyEmail from "./pages/general/VerifyEmail";
import AdminDashboard from "./pages/admin/AdminDashboard"
import Wallets from "./pages/Wallets";
import UpdateWallet from "./pages/UpdateWallet";
import AdminSignUp from "./pages/admin/AdminSignUp";
import InvestmentManagers from "./pages/investor/InvestmentManagers";
import SignUp from "./pages/investor/SignUp";
import SelectWallet from "./pages/SelectWallet";
import AdminWallet from "./pages/admin/AdminWallets";

import AdminInvestmentManagers from "./pages/admin/AdminInvestmentManagers";
import Portfolio from "./pages/investor/Portfolio";
import NewInvestment from "./pages/investor/NewInvestment";
import ManagerForm from "./components/forms/NewManagerForm";
import Email from "./pages/general/Email";
import NewPassword from "./pages/general/NewPassword";
import Transaction from "./components/investor/Transaction";
import EditManagerAccordion from "./components/forms/EditManagerAccordion ";
import Transactions from "./pages/investor/Transactions";
import Referral from "./pages/investor/Referral";
import { Chart } from "chart.js";




export const router = createBrowserRouter([

{
    path:'/',
    element: <Home/>
},

{
    path:'/signup',
    element: <SignUp />,
},

{
    path:'/login',
    element: <Login />
},

{
    path:'/about-us',
    element: <AboutUs />
},



{
    path:'/verify-email',
    element: <VerifyEmail />
},
{
path:'/forgot-password',
element: <Email />
},

{
    path:'/new-password',
    element: <NewPassword />
},
{
    path:'/already-verified',
    element: <EmailVerified/>,
},
{
    path:'/dashboard',
    element: <Dashboard/>,
},

{
    path:'/investment-guide',
    element: <InvestmentGuide />,
},

{
    path:'/invest-managers',
    element: <InvestmentCards />,
},
{
    path:'/invest',
    element: <NewInvestment />,
},

{
    path:'/invest-payment',
    element: <Payments />
},
{
    path:'/referral',
    element: <Referral/>,
},

{
    path:'/transactions',
    element: <Transactions/>
},

{
    path:'/admin/signup',
    element: <AdminSignUp />
},
{
    path:'/admin/dashboard',
    element: <AdminDashboard />,
},

{
    path:'/portfolio',
    element: <Portfolio/>
},
{
    path:'/update-wallet',
    element: <UpdateWallet />
},
{
    path:'/select-wallet',
    element: <SelectWallet />
},
{
    path:'/admin/managers',
    element: <AdminInvestmentManagers />
},

{
    path:'/enter-email',
    element: <Email />
},

{
    path:'/new-password',
    element: <NewPassword />
},
])