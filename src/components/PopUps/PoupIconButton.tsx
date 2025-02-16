import { Drawer } from "@mui/material";
import { IconTextButton } from "../Buttons/IconTextButton";
import { useContext } from "react";
import { DrawerContext } from "../Drawer/DrawerContext";

export interface PopupIconButtonProps{
    className?:string,
    children:React.ReactNode
    iconData:{
        label:string,
        icon:React.ReactNode
    }
}

export function PopupIconButton({className="",children,iconData:{label,icon}}:PopupIconButtonProps){
    //const [open,setOpen] = useState(false)
    const {open,setOpen} = useContext(DrawerContext)
    return(
        <>
            <IconTextButton
                className={className}
                label={label}
                icon={icon}
                onClick={()=>{
                    setOpen(true)
                }}
            />
            
            <Drawer
                anchor="right"
                open={open}
                onClose={()=>setOpen(false)}
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

        </>
    )
}

{/* <Dialog 
maxWidth={false}
open={open} 
onClose={()=>setOpen(false)}
PaperProps={{
    style:{
        width:"max-content",
        backgroundColor:"transparent"
    }
}}>
<DialogContent className="max-w-max">
    
</DialogContent>
</Dialog> */}

// <Drawer
                
// anchor="right"
// open={open}
// onClose={()=>setOpen(false)}
// PaperProps={{
//     style:{
//         width:"max-content",
//         backgroundColor:"#0f172a",
//         maxWidth:"max-content"
//     }
// }}
// >
// {children}
// </Drawer>


{/* <Dialog 
maxWidth={false}
open={open} 

onClose={()=>setOpen(false)}
PaperProps={{
style:{
    width:"max-content",
    
    backgroundColor:"#0f172a",
    borderRadius:"20px"
}
}}>
<DialogContent className="max-w-max">
    {children}
</DialogContent>
</Dialog> */}