import { GrLinkNext,GrLinkPrevious } from "react-icons/gr";
import { useContext } from "react";
import { StepperContext,StepperContextProps } from "./StepperContext";
export interface StepperButtonsProps{
    onNextClick?:()=>void,
    onPreviousClick?:()=>void
}
export function StepperButtons({onNextClick,onPreviousClick}:StepperButtonsProps){
    const {state,maxStep} = useContext<StepperContextProps>(StepperContext)
    return (
        <div className=" flex flex-row justify-between items-center">          
        {
            state > 0 ?
            <GrLinkPrevious                      
                size={25} 
                className="hover:cursor-pointer hover:bg-sky-300 box-content p-4 bg-sky-500 rounded-xl"
                onClick={onPreviousClick}
            />
            : <div></div>
        }
        {
            state < maxStep - 1 ?
            <GrLinkNext 
                    size={25} 
                    className="hover:cursor-pointer hover:bg-sky-300 box-content p-4 bg-sky-500 rounded-xl"
                    onClick={onNextClick}
                />
            : null
        }
    </div>

    )
}