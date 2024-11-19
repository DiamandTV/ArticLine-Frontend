import { createContext } from "react";
export interface StepperContextProps{
    stepper:{
        state:number,
        setState:(stateIndex:number)=>void,
        stepLabels: Array<string>,
        maxStep:number,
    },
    record:{
        record:Record<string,Record<string,string>>,
        setRecord:(newRecord:Record<string,Record<string,string>>)=>void,
    }

}
export const StepperContext = createContext<StepperContextProps>({
    stepper:{
        state:0,
        setState:()=>{},
        stepLabels: [],
        maxStep:0,    
    },
    record:{
        record:{},
        setRecord:()=>{},
    }
})


