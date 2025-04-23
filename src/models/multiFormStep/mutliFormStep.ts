import { UseMutationOptions, UseMutationResult } from "react-query"
import { ZodObject, ZodRawShape } from "zod"

export type GetStepFormDataReturnType = {
    title?:string,
    schema:ZodObject<ZodRawShape>,
    children:React.ReactNode,

}|null

//interface useMultiFormStepperFetchProps export 

export interface useMultiFormStepperProps<TData = unknown, TError = unknown , TVariables = never, TContext = unknown >{
    initialStep:number,
    totalSteps:number,

    step:number,
    setStep:React.Dispatch<React.SetStateAction<number>>,

    getStepFormData:(step:number)=>GetStepFormDataReturnType,
    mutationOptions?:UseMutationOptions<TData,TError,TVariables,TContext>
}

export interface useMultiFormStepperReturnType{
    step:number,
    setStep:React.Dispatch<React.SetStateAction<number>>,
    nextStep:()=>Promise<boolean>,
    previousStep:()=>Promise<boolean>,
    canNext:boolean,
    canPrevious:boolean,
    reset:()=>void,
    children:React.ReactNode|null,
    mutationResult:UseMutationResult<unknown,unknown,never,unknown>
}