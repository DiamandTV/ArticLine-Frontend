import { FeatureRoutes, RouteGroup } from "@models/routes/routes";
import { OrderCheckoutPage } from "../pages/Order/OrderCheckoutPage";
import { OrderBusinessPage } from "../pages/OrderBusiness/OrderBusinessPage";
import { OrderPage } from "../pages/Order/OrderPage";

const _protected:RouteGroup = {
    routesWithLayout:[
        {
            path:'company/:company-id/store/:store-id/cart/:cart-id/checkout/',
            element:<OrderCheckoutPage/>
        },
        {
            path:'orders/',
            element:<OrderPage/>
        },
        {
            path:'company/:company-id/orders/',
            element:<OrderBusinessPage/>
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