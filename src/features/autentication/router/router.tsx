import { RouteObject } from "react-router"
import FeatureRouteReturnType from "@models/routes/routes"
import { UserSigninPage } from "../pages/signin/UserSigninPage"
import { LoginPage } from "../pages/login/Login"
import { SelectProfileTypePage } from "../pages/selectProfileType/SelectProfileType"
import { CourierSigninPage } from "../pages/signin/CourierSigninPage"
import { CompanySigninPage } from "../pages/signin/CompanySigninPage"
import { PasswordResetRequestPage } from "../pages/passwordReset/PasswordResetRequestPage"
import { PasswordResetPage } from "../pages/passwordReset/PasswordResetPage"
import { PasswordResetRequestSendedPage } from "../pages/passwordReset/PasswordResetRequestSendedPage"
import { PasswordResetDonePage } from "../pages/passwordReset/PasswordResetDonePage"
import { AuthVerificationStatusPage } from "../pages/authVerifiication/AuthVerificationStatusPage"

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
        element:<AuthVerificationStatusPage/>,
        loader:()=>{
            // todo: verify the code
        },
        
    },
    {
        path:"password/reset/",
        element:<PasswordResetRequestPage/>
    },
    {
        path:"password/reset-sended/",
        element:<PasswordResetRequestSendedPage/>
    },
    {
        path:"password/reset/:token/",
        element:<PasswordResetPage/>
    },
    {
        path:"password/reset/done/",
        element:<PasswordResetDonePage/>
    }
]

export const autenticationFeatureRoutes:FeatureRouteReturnType  =  {
    protectedRoutes,
    unProtectedRoutes
} 
