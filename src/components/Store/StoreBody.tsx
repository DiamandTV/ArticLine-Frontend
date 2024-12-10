import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Outlet, useNavigate } from "react-router-dom";
import {v4 as uuid} from "uuid"
const getTabStyle = ()=>({
    "&.MuiTab-root":{
        color:"white",
        opacity:0.6,
        fontWeight:"100",
        fontSize:"12px",
        // borderRight:"2px solid rgb(51 65 85)",
        // borderLeft:"2px solid rgb(51 65 85)"
    },
    "&.Mui-selected":{
        borderBottomColor:"red",
        color:'white',
        opacity:1,
        fontWeight:"600",
        fontSize:"18px",
        
    },   
    
})

export function StoreBody(){
    const [value,setValue] = useState(0)
    const store = useSelector((state:RootState)=>state.storeReducer.store)
    const navigate = useNavigate()
    return (
        <>
        <div className="w-full max-h-max flex flex-col gap-y-4 ">
            <Tabs   
                TabIndicatorProps={{style:{
                    //backgroundColor:"#0ea5e9",
                    backgroundColor:"transparent",
                    height:"3px",
                    
                }}}    
                //className="w-full rounded-xl hover:cursor-pointer border-2 border-gray-700"    
                className="w-full bg-slate-200 bg-opacity-30 backdrop-blur-lg rounded-xl sticky top-0"    
                value={value} 
                onChange={(_,value)=>setValue(value)}>  
                    {store?.store_categories?.map((category)=>(
                        <Tab key={uuid()} sx={getTabStyle()} label={category.name} onClick={()=>{
                            navigate(`/store/details/${store.id}/sub-category/${category.id}`)
                        }}/>
                    ))}
            </Tabs>
        </div>
        <Outlet/>
        </>
    )
}