import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard";
import InvestmentCards from "./components/InvestmentCards";
import InvestmentGuide from "./pages/InvestmentGuide";
import Payments from './pages/Payments'


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
])