import FeatureRouteReturnType from "@models/routes/routes";
import { RouteObject } from "react-router";
import { BusinessPage } from "../page/BusinessPage";
import { CreateStore } from "@features/store";

const protectedRoutes:RouteObject[] = [
    {
        path:'/business/',
        element:<BusinessPage/>,
        children:[
            {
                path:'store/create/',
                element:<CreateStore/>
            }
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