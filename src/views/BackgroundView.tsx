import { Outlet } from "react-router";

export function BackgroundView(){
    return (
        <div className="bg-[radial-gradient(at_center_bottom,_#3890C7,_#ECE9EB)] w-full h-[1000px]">
            <Outlet/>
        </div>
    )
}