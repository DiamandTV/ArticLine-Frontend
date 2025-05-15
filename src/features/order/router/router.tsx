import { FeatureRoutes, RouteGroup } from "@models/routes/routes";
import { OrderCheckoutPage } from "../pages/Order/OrderCheckoutPage";

const _protected:RouteGroup = {
    routesWithLayout:[
        {
            path:'company/:company-id/store/:store-id/cart/:cart-id/checkout/',
            element:<OrderCheckoutPage/>
        }
    ],
    standaloneRoutes:[

    ]
}

const _pubblic:RouteGroup = {
    routesWithLayout:[

    ],
    standaloneRoutes:[

    ]
}

export const orderRoutes:FeatureRoutes = {
    protected:_protected,
    public:_pubblic
}