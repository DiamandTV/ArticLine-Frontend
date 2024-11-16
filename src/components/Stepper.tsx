import { RefObject, useRef, useState } from "react"
import { GrLinkNext,GrLinkPrevious } from "react-icons/gr";
interface StepperProps{
    maxStep:number 
    getStep: (state:number,formRef: RefObject<HTMLFormElement>)=>React.ReactNode
}

export function Stepper({maxStep,getStep}:StepperProps){
    const [state,setState] = useState(0)
    const formRef = useRef<HTMLFormElement>(null)

    const next = ()=>{
        if(state < maxStep - 1) setState(state+1)
        // submit the form from the parent
        formRef.current?.requestSubmit()
    }
    const previous = ()=>{
        if(state > 0) setState(state-1)
        
    }
    return(
        <div>
            <div className="py-4">
                {getStep(state,formRef)} 
            </div>    
            <div className=" flex flex-row justify-between items-center">          
                {
                    state > 0 ?
                    <GrLinkPrevious                      
                        size={25} 
                        className="hover:cursor-pointer hover:bg-sky-300 box-content p-4 bg-sky-400 rounded-xl"
                        onClick={previous}
                    />
                    : <div></div>
                }
                {
                    state < maxStep - 1 ?
                    <GrLinkNext 
                            size={25} 
                            className="hover:cursor-pointer hover:bg-sky-300 box-content p-4 bg-sky-400 rounded-xl"
                            onClick={next}
                        />
                    : null
                }
            </div>
        </div>
    ) 
}