import { useMultiFormStepperProps } from "@models/multiFormStep/mutliFormStep";
import { MultiFormStepperContext } from "./MutliFormStepperContext";
import { useState } from "react";

interface MultiFormStepperProviderProps extends Omit<useMultiFormStepperProps,'step'|'setStep'>{
    children:React.ReactNode
}
export function MultiFormStepperProvider(props:MultiFormStepperProviderProps){
    const [step,setStep] = useState(props.initialStep)
    return(
        <MultiFormStepperContext.Provider value={{...props,step,setStep}}>
            {props.children}
        </MultiFormStepperContext.Provider>
    )
}