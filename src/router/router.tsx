import { createBrowserRouter, } from "react-router";
import { BackgroundView } from "@views/BackgroundView";
import {autenticationFeatureRoutes,ProtectedRoute, authenticationLoader, UnProtectedRoute} from "@features/autentication"
import { homeFeatureRoutes } from "@features/home";
import { NavigationLoader } from "@components/loaders/NavigationLoader/NavigationLoader";
import { LayoutView } from "@views/LayoutView";
import { storeRoutes } from "@features/store/router/router";
import { cartRoutes } from "@features/cart";
import { orderRoutes } from "@features/order";
export const router = createBrowserRouter([
    {
        path:'/',
        element:<BackgroundView/>,
        children:[
            // PROTECTED ROUTES
            {
                path:"",
                element:<ProtectedRoute/>,
                loader:async()=>{
                    return authenticationLoader()
                },
                hydrateFallbackElement:<NavigationLoader/>,
                children: [
                            {
                                path:"",
                                element:<LayoutView/>,
                                children:[
                                    ...autenticationFeatureRoutes.protected.routesWithLayout,
                                    ...homeFeatureRoutes.protected.routesWithLayout,
                                    ...storeRoutes.protected.routesWithLayout,
                                    ...cartRoutes.protected.routesWithLayout,
                                    ...orderRoutes.protected.routesWithLayout
                                    //...businessFeatureRoutes.protected.routesWithLayout
                                ]
                            },


                            ...autenticationFeatureRoutes.protected.standaloneRoutes,
                            ...homeFeatureRoutes.protected.standaloneRoutes ,
                            ...storeRoutes.protected.standaloneRoutes,
                            ...cartRoutes.protected.standaloneRoutes,
                            ...orderRoutes.protected.standaloneRoutes
                            //...businessFeatureRoutes.protected.standaloneRoutes
                            ]
                },
            
                        // UN PROTECTED ROUTES
                {
                    path:"",
                    element:<UnProtectedRoute/>,
                    children:[
                        {
                            path:"",
                            element:<LayoutView/>,
                            children:[
                                ...autenticationFeatureRoutes.public.routesWithLayout,
                                ...homeFeatureRoutes.public.routesWithLayout,
                                ...storeRoutes.public.routesWithLayout,
                                ...cartRoutes.public.routesWithLayout,
                                ...orderRoutes.public.routesWithLayout
                                //...businessFeatureRoutes.public.routesWithLayout
                            ]
                        },
    
                        ...autenticationFeatureRoutes.public.standaloneRoutes,
                        ...homeFeatureRoutes.public.standaloneRoutes,
                        ...storeRoutes.public.standaloneRoutes,
                        ...cartRoutes.public.standaloneRoutes,
                        ...orderRoutes.public.standaloneRoutes
                        //...businessFeatureRoutes.public.standaloneRoutes
                    ]
            }        
        ]
    }
])