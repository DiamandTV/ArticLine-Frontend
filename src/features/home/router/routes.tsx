import FeatureRouteReturnType from "@models/routes/routes";
import { RouteObject } from "react-router";
import { HomePage } from "../pages/HomePage";
import { categoryService } from "../services/categoryService";

const protectedRoutes:RouteObject[] = [
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
]

const unProtectedRoutes:RouteObject[] = [
    {}
]

export const homeFeatureRoutes:FeatureRouteReturnType = {
    protectedRoutes,
    unProtectedRoutes
}