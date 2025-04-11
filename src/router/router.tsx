import { createBrowserRouter } from "react-router";
import { BackgroundView } from "@views/BackgroundView";
import {autenticationFeatureRoutes,ProtectedView,UnProtectedView} from "@features/autentication"
export const router = createBrowserRouter([
    {
        path:'/',
        element:<BackgroundView/>,
        children:[
            // PROTECTED ROUTES
            {
                path:"",
                element:<ProtectedView/>,
                children:[
                    ...autenticationFeatureRoutes.protectedRoutes
                ]
            },

            // UN PROTECTED ROUTES
            {
                path:"",
                element:<UnProtectedView/>,
                children:[
                    ...autenticationFeatureRoutes.unProtectedRoutes
                ]
            }
        ]
    }
])