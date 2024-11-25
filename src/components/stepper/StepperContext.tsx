import { createContext } from "react";
import { AxiosResponse } from "axios";
export interface StepperContextProps{
    stepper:{
        state:number,
        setState:(stateIndex:number)=>void,
        stepLabels: Array<string|null>,
        maxStep:number,
        onFinish:(record:Array<Record<string,unknown>>)=>Promise<AxiosResponse> | Record<string,string>,
    },
    record:{
        record:Array<Record<string,unknown>>,
        setRecord:(newRecord:Array<Record<string,unknown>>)=>void,
    },
    error:{
        errorStepper:Record<string,unknown>,
        setErrorStepper:(newRecord:Record<string,unknown>)=>void,
    },
    beforeChangeMediaQuery:{
        beforeChangeMediaQuery:(isMatched:boolean)=>void,
        setBeforeChangeMediaQuery:(newOnChangedMediaQuery:()=>(isMatched:boolean)=>void)=>void,
    }
}
export const StepperContext = createContext<StepperContextProps>({
    stepper:{
        state:0,
        setState:()=>{},
        stepLabels: [],
        maxStep:0,    
        onFinish:()=>({}),
    },
    record:{
        record:[],
        setRecord:()=>{},
    },
    error:{
        errorStepper:{},
        setErrorStepper:()=>{}
    },
    beforeChangeMediaQuery:{
        beforeChangeMediaQuery:()=>{},
        setBeforeChangeMediaQuery:()=>{}
    }
})


