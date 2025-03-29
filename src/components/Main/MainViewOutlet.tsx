//import { useContext } from "react";
import { Outlet } from "react-router-dom";
// import { SiderBarContext } from "../../layouts/SideBar/context/SiderBarContext";
// import { useMediaQuery } from "../../hooks/useMediaQuery";
// import { OverlayBlock } from "../Overlay/OverlayBlock";

export function MainViewOutlet(){
    // const isSM = useMediaQuery({query:'(min-width:40rem)'})
    // const {open,setOpen} = useContext(SiderBarContext)
    return(
        <>
            <div className={`w-full  bg-slate-900 overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-cyan-600 scrollbar-track-transparent`}>      
                {
                    // <OverlayBlock
                    //     showOverlay={open && !isSM}
                    //     onClick={()=>{
                    //         setOpen(false)
                    //     }}
                        
                    // >
                    }
                    <Outlet/>
                {
                //    </OverlayBlock>
                }
            </div>
        </>
    )
}