import { RouteObject } from "react-router";

interface FeatureRouteReturnType{
    protectedRoutes:RouteObject[],
    unProtectedRoutes:RouteObject[]
}

export default FeatureRouteReturnType