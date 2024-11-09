import { useState } from "react"
import { GrLinkNext,GrLinkPrevious } from "react-icons/gr";
interface StepperProps{
    maxStep:number 
    getStep: (state:number)=>React.ReactNode
}

export function Stepper({maxStep,getStep}:StepperProps){
    const [state,setState] = useState(1)
    return(
        <div>
            <div className="py-4">
                {getStep(state)}
            </div>    
            <div className=" flex flex-row justify-between items-center">
                
                    <GrLinkPrevious 
                    size={25} className="hover:cursor-pointer hover:bg-sky-300 box-content p-4 bg-sky-400 rounded-xl"/>
                
                    <GrLinkNext 
                    size={25} className="hover:cursor-pointer hover:bg-sky-300 box-content p-4 bg-sky-400 rounded-xl"/>
                
                
            </div>
        </div>
    ) 
}