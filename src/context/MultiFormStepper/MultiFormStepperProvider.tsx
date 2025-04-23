import { useMultiFormStepperProps } from "@models/multiFormStep/mutliFormStep";
import { MultiFormStepperContext } from "./MutliFormStepperContext";
import { useState } from "react";

interface MultiFormStepperProviderProps<T> extends Omit<useMultiFormStepperProps<T>,'step'|'setStep'>{
    children:React.ReactNode
}

export function MultiFormStepperProvider<T>(props:MultiFormStepperProviderProps<T>){
    const [step,setStep] = useState(props.initialStep)
    return(
        <MultiFormStepperContext.Provider value={{...props,step,setStep}}>
            {props.children}
        </MultiFormStepperContext.Provider>
    )
}