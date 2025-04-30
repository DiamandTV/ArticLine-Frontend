import { Outlet } from "react-router";

export function BackgroundView(){
    return (
        //<div className="bg-[radial-gradient(at_center_bottom,_#3890C7,_#ECE9EB)] w-full min-h-screen max-h-max">
            <div className="w-full  min-h-screen max-h-max !bg-surface-a20 !text-surface-a0 !font-roboto" > 
                <Outlet/>
            </div>
        //</div>
    )
}