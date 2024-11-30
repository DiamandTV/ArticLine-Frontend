import React from "react";

export function MainView({children}:{children:React.ReactNode}){
    return(
        <div className='w-screen flex flex-col gap-2 h-screen bg-slate-900 '>
            {children}
        </div>
    )
}