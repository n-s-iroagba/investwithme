import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home"
import Dashboard from "./components/dashboard/Dashboard";
import SignupForm from "./components/Forms/SignUpForm";
import InvestmentCards from "./components/Investment_cards/InvestmentCards";


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
    path:'/a',
    element: <SignupForm/>,
},
{
    path:'/dashboard',
    element: <Dashboard/>,
},
{
    path:'/invest',
    element: <InvestmentCards/>,
},
])