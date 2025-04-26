import { Navigate, Outlet, useLoaderData } from "react-router";

export function ProtectedRoute(){
    const result = useLoaderData()
    if(!result){
        // 
        return <Navigate to={"/login/"}/>
    }


    return(
        <Outlet/>
    )
}