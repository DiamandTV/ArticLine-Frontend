import  { FeatureRoutes, RouteGroup } from "@models/routes/routes";

import { HomePage } from "../pages/HomePage";
import { categoryService } from "../services/categoryService";

const protectedRoutes:RouteGroup = {
    routesWithLayout:[
        {
            path:'/',
            element:<HomePage/>,
            loader:async()=>{
                try{
                    return await categoryService.list()
                }catch(e){
                    console.log(e)
                    return null
                }
            }
        }
    ]   ,
    standaloneRoutes:[]
}

const unProtectedRoutes:RouteGroup = {
    routesWithLayout:[],
    standaloneRoutes:[]
}
    
export const homeFeatureRoutes:FeatureRoutes = {
    protected:protectedRoutes,
    public:unProtectedRoutes
}