import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard";
import InvestmentCards from "./components/InvestmentCards";
import InvestmentGuide from "./pages/InvestmentGuide";
import Payments from './pages/Payments'
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";
import ContactUs from "./pages/ContactUs";
import VerifyEmail from "./pages/VerifyEmail";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard"
import NewWallet from "./pages/NewWallet";
import Wallets from "./pages/Wallets";
import UpdateWallet from "./pages/UpdateWallet";
import AdminSignUpPage from "./pages/AdminSignUpPage";
import InvestmentManagers from "./pages/InvestmentManagers";


export const router = createBrowserRouter([

{
    path:'/',
    element: <Home/>,
},

{
    path:'/account',
    element: <Dashboard/>,
},

{
    path:'/dashboard',
    element: <Dashboard/>,
},
{
    path:'/invest',
    element: <InvestmentCards/>,
},
{
    path:'/investment-guide',
    element: <InvestmentGuide/>,
},
{
    path:'/make-payment',
    element: <Payments/>
},
{
    path:'/about-us',
    element: <AboutUs/>
},
{
    path:'/login',
    element: <Login/>
},
{
    path:'/contact-us',
    element: <ContactUs/>
},
{
    path:'/verify-email',
    element: <VerifyEmail/>
},
{
    path:'/admin-login',
    element: <AdminLogin/>
},
{
    path:'/admin',
    element: <AdminSignUpPage/>
},
{
    path:'/admin-dashboard',
    element: <AdminDashboard/>
},

{
    path:'/create-wallets',
    element: <NewWallet/>
},
{
    path:'/view-wallets',
    element: <Wallets/>
},
{
    path:'/update-wallet',
    element: <UpdateWallet/>
},
{
    path:'/investement-managers',
    element: <InvestmentManagers/>
},
])