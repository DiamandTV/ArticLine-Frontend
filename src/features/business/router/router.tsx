import FeatureRouteReturnType from "@models/routes/routes";
import { RouteObject } from "react-router";
import { BusinessPage } from "../page/BusinessPage";

const protectedRoutes:RouteObject[] = [
    {
        path:'/business',
        element:<BusinessPage/>,
    }
]

const unProtectedRoutes:RouteObject[] = [
    {}
]

export const businessFeatureRoutes:FeatureRouteReturnType = {
    protectedRoutes,
    unProtectedRoutes
}