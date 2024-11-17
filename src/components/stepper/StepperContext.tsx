import { createContext } from "react";
export interface StepperContextProps{
    state:number,
    setState:(stateIndex:number)=>void,
    stepLabels: Array<string>,
    maxStep:number,
}
export const StepperContext = createContext<StepperContextProps>({
    state:0,
    setState:()=>{},
    stepLabels:[],
    maxStep:3,
})


