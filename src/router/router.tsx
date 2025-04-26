import { createBrowserRouter } from "react-router";
import { BackgroundView } from "@views/BackgroundView";
import {autenticationFeatureRoutes,UnProtectedRoute,ProtectedRoute, authenticationLoader} from "@features/autentication"
import { homeFeatureRoutes } from "@features/home";
import { NavigationLoader } from "@components/loaders/NavigationLoader/NavigationLoader";
export const router = createBrowserRouter([
    {
        path:'/',
        element:<BackgroundView/>,
        children:[
            // PROTECTED ROUTES
            {
                path:"",
                element:<ProtectedRoute/>,
                loader:authenticationLoader,
                hydrateFallbackElement:<NavigationLoader/>,
                children:[
                    ...autenticationFeatureRoutes.protectedRoutes,
                    ...homeFeatureRoutes.protectedRoutes 
                ]
            },

            // UN PROTECTED ROUTES
            {
                path:"",
                element:<UnProtectedRoute/>,
                children:[
                    ...autenticationFeatureRoutes.unProtectedRoutes,
                    ...homeFeatureRoutes.unProtectedRoutes
                ]
            }
        ]
    }
])