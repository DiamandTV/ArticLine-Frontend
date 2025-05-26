import { FeatureRoutes, RouteGroup } from "@models/routes/routes";
import { OrderDeliveryBatchPage } from "../pages/OrderDeliveryBatchPage";

const _protected:RouteGroup = {
    routesWithLayout:[
        {
            path:'company/:company-id/order-delivery-batch/',
            element:<OrderDeliveryBatchPage/>
        }
    ],
    standaloneRoutes:[]
}

const _pubblic:RouteGroup = {
    routesWithLayout:[

    ],
    standaloneRoutes:[

    ]
}

export const orderDeliveryBatchRoutes:FeatureRoutes = {
    protected:_protected,
    public:_pubblic
}