import { useMultiFormStepperProps } from "@models/multiFormStep/mutliFormStep";
import { createContext } from "react";

export const MultiFormStepperContext = createContext<useMultiFormStepperProps>({
    initialStep:0,
    totalSteps:0,
    getStepFormData:()=>null,
})