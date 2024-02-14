import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard";
import InvestmentCards from "./components/InvestmentCards";
import InvestmentGuide from "./pages/InvestmentGuide";
import Payments from './pages/Payments'
import AboutUs from "./pages/AboutUs";
import SignUp from './pages/SignUp'
import Login from "./pages/Login";
import ContactUs from "./pages/ContactUs";
import VerifyEmail from "./pages/VerifyEmail";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import WorkingSignUp from "./pages/WorkingSignUp ";

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
    path:'/register',
    element: <SignUp/>
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
    path:'/admin-dashboard',
    element: <AdminDashboard/>
},
{
    path:'/working/register',
    element: <WorkingSignUp/>
},
])