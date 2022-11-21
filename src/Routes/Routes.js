import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../Layouts/DashboardLayout";
import Dashboard from "../Pages/Dashboard/Dashboard"
import Main from "../Layouts/Main";
import Appointment from "../Pages/Appointment/Appointment";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Users from "../Pages/Users/Users";
import AdminRoute from "./AdminRoute";
import AddDoctor from "../Pages/AddDoctor/AddDoctor";
import ManageDoctors from "../Pages/ManageDoctors/ManageDoctors";
import Payment from "../Pages/Payment/Payment";

export const router = createBrowserRouter([
    {
        path:'/',
        element: <Main></Main>,
        children:[
            {
                path:'/',
                element:<Home></Home>,
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/signup',
                element:<SignUp></SignUp>
            },
            {
                path:'/appointment',
                element:<Appointment></Appointment>
            },
        ]
    },
    {
        path:'/dashboard',
        element:
        <PrivateRoute>
            <DashboardLayout></DashboardLayout>
        </PrivateRoute>,
        children:[
            {
                path:'/dashboard',
                element:<Dashboard></Dashboard>
            },
            {
                path:'/dashboard/users',
                element:<AdminRoute><Users></Users></AdminRoute>
            },
            {
                path:'/dashboard/addDoctors',
                element:<AdminRoute><AddDoctor></AddDoctor></AdminRoute>
            },
            {
                path:'/dashboard/manageDoctors',
                element:<AdminRoute><ManageDoctors></ManageDoctors></AdminRoute>
            },
            {
                path:'/dashboard/payment/:id',
                element:<AdminRoute><Payment></Payment></AdminRoute>,
                loader: ({params})=> fetch(`http://localhost:5000/bookings/${params.id}`)
            },
        ]
    }
])