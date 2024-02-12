import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home"
import Dashboard from "./components/dashboard/Dashboard";
import SignupForm from "./components/Forms/SignUpForm";


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
    path:'/b',
    element: <Dashboard/>,
},
])