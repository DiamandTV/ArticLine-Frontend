import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { SiderBarContext } from "../../layouts/SideBar/context/SiderBarContext";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { DialogApp } from "../Dialog/Dialog";

export function MainViewOutlet(){
   

    return(
        <>
            <div className={`w-full flex flex-col bg-slate-900 overflow-auto`}>      
                <Outlet/>
            </div>
        </>
    )
}