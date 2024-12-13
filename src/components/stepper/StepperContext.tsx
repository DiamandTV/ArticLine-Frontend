import { createContext } from "react";
import { AxiosResponse } from "axios";
import { StepperGetStepDataProps } from "./Stepper";
export interface StepperContextProps{
    stepper:{
        state:number,
        setState:(stateIndex:number)=>void,
        stepLabels: Array<string|null>,
        getStepData:(state:number)=>StepperGetStepDataProps,
        maxStep:number,
        onFinish:(record:Array<Record<string,unknown>>)=>Promise<AxiosResponse> | Record<string,string>,
        singleLine:boolean
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
    },
    finish:{
        finish:boolean,
        setFinish:(finish:boolean)=>void
    }
}
export const StepperContext = createContext<StepperContextProps>({
    stepper:{
        state:0,
        setState:()=>{},
        stepLabels: [],
        maxStep:0,    
        getStepData:()=>({
            component:<div></div>,
            formsKeys:[]
        }),
        onFinish:()=>({}),
        singleLine:false
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
    },
    finish:{
        finish:false,
        setFinish:()=>{}
    }
})


