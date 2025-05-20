import { FeatureRoutes, RouteGroup } from "@models/routes/routes";
import { OrderCheckoutPage } from "../pages/Order/OrderCheckoutPage";
import { OrderListPage } from "../pages/Order/OrderListPage";

const _protected:RouteGroup = {
    routesWithLayout:[
        {
            path:'company/:company-id/store/:store-id/cart/:cart-id/checkout/',
            element:<OrderCheckoutPage/>
        },
        {
            path:'order/',
            element:<OrderListPage/>
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