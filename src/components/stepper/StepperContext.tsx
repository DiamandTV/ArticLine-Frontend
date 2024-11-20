import { createContext } from "react";
export interface StepperContextProps{
    stepper:{
        state:number,
        setState:(stateIndex:number)=>void,
        stepLabels: Array<string>,
        maxStep:number,
        onFinish:(record:Array<Record<string,string>>)=>void,
    },
    record:{
        record:Array<Record<string,unknown>>,
        setRecord:(newRecord:Array<Record<string,unknown>>)=>void,
    }

}
export const StepperContext = createContext<StepperContextProps>({
    stepper:{
        state:0,
        setState:()=>{},
        stepLabels: [],
        maxStep:0,    
        onFinish:()=>{}
    },
    record:{
        record:[],
        setRecord:()=>{},
    }
})


