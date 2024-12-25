import { Tabs } from "@mui/material";
import { useContext, } from "react";
import { TabsContext } from "./TabsContext";

export function TabsApp({children}:{children:React.ReactNode}){
    const {value,setValue} = useContext(TabsContext)
    return(
        <Tabs
            orientation="horizontal"
            value={value}
            onChange={(_,_value)=>{
                setValue(_value)
            }}  
            variant="fullWidth"
            TabIndicatorProps={{
                style:{
                    backgroundColor:"#38bdf8"
                }
            }}
            sx={{
                "& .MuiButtonBase-root":{
                    color:"white",
                    backgroundColor:"rgb(203, 213, 225,0.3)",
                    backdropFilter:"blur(100px)",
                    //borderTopLeftRadius:"0.75rem",
                    //borderTopRightRadius:"0.75rem",
                    //marginRight:"5px",
                    //marginLeft:"5px"
                }
            }}
            >
            {children}
        </Tabs>
    )
}

export function TabPanel({index,children}:{index:number,children:React.ReactNode}){
    const {value} = useContext(TabsContext)
    return (
        <div
            role="tabpanel"
            hidden={value!==index}

        >
            {children}
        </div>
    )
}