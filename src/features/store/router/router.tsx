import { FeatureRoutes, RouteGroup } from "@models/routes/routes";
import { CreateStore } from "../page/CreateStore/CreateStore";
import { BusinessStoreListPage } from "../page/BusinessStore/BusinessStoreListPage";
import { StorePage } from "../page/BusinessStore/StorePage";
import { StoreProductListPage } from "../page/BusinessStore/StoreProductListPage";
import { StoreCartView } from "../view/StoreCartView";

const _protected:RouteGroup = {
    routesWithLayout:[
        {
            path:'company/:company-id/store/',
            element:<BusinessStoreListPage/>
        },
        {
            
            element:<StoreCartView/>,
            children:[
                {
                    path:'company/:company-id/store/:store-id/',
                    element:<StorePage/>
                },
                {
                    path:'company/:company-id/store/:store-id/category/:store-category-id/',
                    element:<StoreProductListPage/>
                },
            ]
        },
        {
            path:'company/:company-id/store/create/',
            element:<CreateStore/>
        }
    ],
    standaloneRoutes:[]
}

const _public:RouteGroup = {
    routesWithLayout:[],
    standaloneRoutes:[]
}

export const storeRoutes:FeatureRoutes = {
    protected:_protected,
    public:_public
}