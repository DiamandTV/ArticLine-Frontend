import { RouteObject } from "react-router"
import FeatureRouteReturnType from "@models/routes/routes"
import { UserSigninPage } from "../pages/signin/UserSigninPage"
import { LoginPage } from "../pages/login/Login"
import { SelectProfileTypePage } from "../pages/selectProfileType/SelectProfileType"
import { CourierSigninPage } from "../pages/signin/CourierSigninPage"
import { CompanySigninPage } from "../pages/signin/CompanySigninPage"
import { PasswordResetRequestPage } from "../pages/passwordReset/PasswordResetRequestPage"
import { PasswordResetPage } from "../pages/passwordReset/PasswordResetPage"

const protectedRoutes:RouteObject[] = [
    {

    }
]

const unProtectedRoutes:RouteObject[] = [
    {
        path:"select/signin/",
        element:<SelectProfileTypePage/>
    },
    {
        path:"user/signin/",
        element:<UserSigninPage/>
    },
    {
        path:"courier/signin/",
        element:<CourierSigninPage/>
    },
    {
        path:"company/signin/",
        element:<CompanySigninPage/>
    },
    {
        path:"login/",
        element:<LoginPage/>
    },
    {
        path:"email/verification/:id/:token/",
        element:<div></div>        
    },
    {
        path:"password/reset/",
        element:<PasswordResetRequestPage/>
    },
    // {
    //     path:"password/reset-sended/",
    //     element:<div></div>
    // },
    {
        path:"password/reset/:token/",
        element:<PasswordResetPage/>
    }
]

export const autenticationFeatureRoutes:FeatureRouteReturnType  =  {
    protectedRoutes,
    unProtectedRoutes
} 
