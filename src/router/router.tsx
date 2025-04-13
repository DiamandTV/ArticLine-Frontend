import { createBrowserRouter } from "react-router";
import { BackgroundView } from "@views/BackgroundView";
import {autenticationFeatureRoutes,UnProtectedRoute,ProtectedRoute} from "@features/autentication"
export const router = createBrowserRouter([
    {
        path:'/',
        element:<BackgroundView/>,
        children:[
            // PROTECTED ROUTES
            {
                path:"",
                element:<ProtectedRoute/>,
                children:[
                    ...autenticationFeatureRoutes.protectedRoutes
                ]
            },

            // UN PROTECTED ROUTES
            {
                path:"",
                element:<UnProtectedRoute/>,
                children:[
                    ...autenticationFeatureRoutes.unProtectedRoutes
                ]
            }
        ]
    }
])