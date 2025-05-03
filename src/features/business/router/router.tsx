import FeatureRouteReturnType from "@models/routes/routes";
import { RouteObject } from "react-router";
import { BusinessPage } from "../page/BusinessPage";
import { CreateStore } from "@features/store";
import { BusinessStoreListPage } from "@features/store/page/BusinessStore/BusinessStoreListPage";
import { BusinessStorePage } from "@features/store/page/BusinessStore/BusinessStorePage";
import { BusinessStoreProductListPage } from "@features/store/page/BusinessStore/BusinessStoreProductListPage";

const protectedRoutes:RouteObject[] = [
    {
        path:'/business/',
        element:<BusinessPage/>,
        children:[
            {
                path:'store/',
                element:<BusinessStoreListPage/>
            },
            {
                path:'order/',
                element:<div></div>
            },
            {
                path:'order-batch/',
                element:<div></div>
            },
            {
                path:'store/create/',
                element:<CreateStore/>
            },
            
            {
                path:'store/:store-id/',
                element:<BusinessStorePage/>
            },
            {
                path:'store/:store-id/:store-category-id/',
                element:<BusinessStoreProductListPage/>
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