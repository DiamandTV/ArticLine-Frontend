import { FeatureRoutes, RouteGroup } from "@models/routes/routes";
import { CartPage } from "../pages/CartPage";
import { CartListPage } from "../pages/CartListPage";

const _protected:RouteGroup = {
    routesWithLayout:[
        {
            path:'company/:company-id/store/:store-id/cart/:cart-id/',
            element:<CartPage/>
        },
        {
            path:'carts/',
            element:<CartListPage/>
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