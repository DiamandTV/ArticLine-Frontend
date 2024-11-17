
import { useEffect, useState } from "react";
import { FieldError } from "react-hook-form"
import { GoAlertFill } from "react-icons/go";
interface InputErrorProps{
    error:FieldError | undefined
}
export function InputError({error}:InputErrorProps){
    const OPEN_POPUP_TIME = 5000 // 5000 ms
    const [openPopUp,setOpenPopUp] = useState(false)
    useEffect(()=>{
        
        if(openPopUp){
            const timer = setTimeout(()=>setOpenPopUp(!openPopUp),OPEN_POPUP_TIME)
            return ()=>clearTimeout(timer)
        }
    },[openPopUp])
    return ( 
        error &&
        <div className="flex flex-col items-center justify-center absolute right-2 bottom-2" >
            <div className="absolute bottom-4 w-40">
                <p 
                    className={`bg-orange-600
                        rounded-xl overflow-hidden 
                        ${openPopUp ? 'p-2' : 'p-0'}` } >{openPopUp ? error.message : null}</p>
                { openPopUp && <div className="border-solid border-8 border-t-orange-600 border-b-transparent border-r-transparent border-l-transparent relative left-1/2 translate-x-[-50%] w-0"></div>}
            </div>
            <GoAlertFill 
                size={22.5} 
                color="rgb(234 88 12)"
                className="hover:cursor-pointer"
                onClick={()=>setOpenPopUp(true)}
            />
        </div>
    )
}


/*
import { FieldError } from "react-hook-form"
import { GoAlertFill } from "react-icons/go";
interface InputErrorProps{
    error:FieldError | undefined
}
export function InputError({error}:InputErrorProps){
    return ( 
        error &&
        <div className="flex flex-row items-center justify-center absolute left-0 top-10 gap-2" >
            <GoAlertFill 
            size={15} 
            color="#FF4500"
            className="hover:cursor-pointer"
            />
            <p className={`rounded-xl overflow-hidden text-orange-600` } >{error.message}</p>
        </div>
    )
} */