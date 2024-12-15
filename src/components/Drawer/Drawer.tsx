import { Drawer } from "@mui/material"
import { useContext } from "react"
import { DrawerContext } from "./DrawerContext"

export function DrawerApp({children}:{children:React.ReactNode}){
    const {setOpen,open} = useContext(DrawerContext)
    return(
        <Drawer
            anchor="right"
            open={open}
            onClose={()=>setOpen(false)}
            onClick={(e)=>{
                e.stopPropagation()
            }}
            PaperProps={{
                    style:{
                        width:"max-content",
                        backgroundColor:"#0f172a",
                        maxWidth:"max-content"
                    }
                }}
                >
                {children}
        </Drawer>

    )
}