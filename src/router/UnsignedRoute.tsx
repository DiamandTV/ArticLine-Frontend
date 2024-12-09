import { useEffect } from "react";
import { deleteJWT } from "../services/jwt";
import { Outlet } from "react-router-dom";

export function UnsignedRoute(){
    useEffect(()=>{
        deleteJWT()
    })
        
    return <Outlet />;
}