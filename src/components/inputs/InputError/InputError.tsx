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
            {/* POPUP MESSAGE  */}
                <div className="absolute bottom-4 w-40">
                    <p 
                        className={`bg-sky-400 
                            bg-opacity-85 backdrop-blur-lg rounded-xl overflow-hidden 
                           ${openPopUp ? 'p-2' : 'p-0'}` } >{openPopUp ? error.message : null}</p>
                    <div className="ml-[-5px] border-solid border-8 border-opacity-85 border-t-slate-600 border-b-transparent border-r-transparent border-l-transparent relative left-1/2 w-0"></div>
                </div>
            
            <GoAlertFill 
                size={22.5} 
                color="#FF4500"
                className="hover:cursor-pointer"
                onClick={()=>setOpenPopUp(true)}
            />
        </div>
    )
} 