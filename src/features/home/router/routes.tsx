import FeatureRouteReturnType from "@models/routes/routes";
import { RouteObject } from "react-router";
import { HomePage } from "../pages/HomePage";

const protectedRoutes:RouteObject[] = [
    {
        path:'/',
        element:<HomePage/>
    }
]

const unProtectedRoutes:RouteObject[] = [
    {}
]

export const homeFeatureRoutes:FeatureRouteReturnType = {
    protectedRoutes,
    unProtectedRoutes
}