import { ZodObject, ZodRawShape } from "zod"

export type GetStepFormDataReturnType = {schema:ZodObject<ZodRawShape>,children:React.ReactNode}|null

export interface useMultiFormStepperProps{
    initialStep:number,
    totalSteps:number,
    getStepFormData:(step:number)=>GetStepFormDataReturnType
}

export interface useMultiFormStepperReturnType{
    step:number,
    setStep:React.Dispatch<React.SetStateAction<number>>,
    nextStep:()=>Promise<boolean>,
    previousStep:()=>Promise<boolean>,
    canNext:boolean,
    canPrevious:boolean,
    reset:()=>void,
    children:React.ReactNode|null
}