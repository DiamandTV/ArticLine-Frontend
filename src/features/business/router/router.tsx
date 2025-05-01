import FeatureRouteReturnType from "@models/routes/routes";
import { RouteObject } from "react-router";
import { BusinessPage } from "../page/BusinessPage";
import { CreateStore } from "@features/store";
import { BusinessStorePage } from "@features/store/page/BusinessStore/BusinessStorePage";

const protectedRoutes:RouteObject[] = [
    {
        path:'/business/',
        element:<BusinessPage/>,
        children:[
            {
                path:'store/',
                element:<BusinessStorePage/>
            },
            {
                path:'order/',
                element:<div></div>
            },
            {
                path:'order-batch/',
                element:<div></div>
            },
            {
                path:'store/create/',
                element:<CreateStore/>
            },
            
        ]
    }
]

const unProtectedRoutes:RouteObject[] = [
    {}
]

export const businessFeatureRoutes:FeatureRouteReturnType = {
    protectedRoutes,
    unProtectedRoutes
}