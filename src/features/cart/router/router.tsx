import { FeatureRoutes, RouteGroup } from "@models/routes/routes";
import { CartPage } from "../pages/CartPage";

const _protected:RouteGroup = {
    routesWithLayout:[
        {
            path:'company/:company-id/store/:store-id/cart/:cart-id/',
            element:<CartPage/>
        }
    ],
    standaloneRoutes:[]
}

const _pubblic:RouteGroup = {
    routesWithLayout:[],
    standaloneRoutes:[]
}

export const cartRoutes:FeatureRoutes = {
    protected:_protected,
    public:_pubblic
}