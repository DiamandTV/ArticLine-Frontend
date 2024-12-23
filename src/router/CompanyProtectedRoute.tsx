import React from "react";
//import { Can } from "../config/permissions/can";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export function CompanyProtectedRoute({children}:{children:React.ReactNode}){
    const auth = useSelector((state:RootState)=>state.authReducer.auth)
    return  (auth && auth?.type == "COMPANY") ? children : null
}   