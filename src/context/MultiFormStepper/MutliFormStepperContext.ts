import { useMultiFormStepperProps } from "@models/multiFormStep/mutliFormStep";
import { createContext } from "react";


export const MultiFormStepperContext = createContext<useMultiFormStepperProps<never>>({
    initialStep:0,
    totalSteps:0,
    step:0,
    setStep:()=>{},
    getStepFormData:()=>null,
    mutationOptions:{}
})