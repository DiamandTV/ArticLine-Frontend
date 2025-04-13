import { RouteObject } from "react-router"
import FeatureRouteReturnType from "@models/routes/routes"
import { UserSigninPage } from "../pages/signin/UserSigninPage"

const protectedRoutes:RouteObject[] = [
    {

    }
]

const unProtectedRoutes:RouteObject[] = [
    {
        path:"choose/signin/",
        element:<div></div>
    },
    {
        path:"user/signin/",
        element:<UserSigninPage/>
    },
    {
        path:"courier/signin/",
        element:<div></div>
    },
    {
        path:"company/signin/",
        element:<div></div>
    },
    {
        path:"login/",
        element:<div></div>
    },
    {
        path:"email/verification/:id/:token/",
        element:<div></div>        
    },
    {
        path:"password/reset/",
        element:<div></div>
    },
    {
        path:"password/reset-sended/",
        element:<div></div>
    },
    {
        path:"password/reset/:token/",
        element:<div></div>
    }
]

export const autenticationFeatureRoutes:FeatureRouteReturnType  =  {
    protectedRoutes,
    unProtectedRoutes
} 
