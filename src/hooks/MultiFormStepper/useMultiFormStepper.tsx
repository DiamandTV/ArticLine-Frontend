import { useState } from "react"
import { useFormContext } from "react-hook-form"
import { ZodObject, ZodRawShape } from "zod"

interface useMultiFormStepperProps{
    initialStep?:number,
    totalSteps:number,
    getStepFormData:(step:number)=>{schema:ZodObject<ZodRawShape>,children:React.ReactNode}|null
}

interface useMultiFormStepperReturnType{
    step:number,
    setStep:React.Dispatch<React.SetStateAction<number>>,
    nextStep:()=>Promise<boolean>,
    previousStep:()=>Promise<boolean>,
    reset:()=>void,
    children:React.ReactNode|null
}
export function useMultiFormStepper({initialStep=0,totalSteps,getStepFormData}:useMultiFormStepperProps):useMultiFormStepperReturnType{
    const {trigger} = useFormContext()
    const [step,setStep] = useState(initialStep)
    const stepformData = getStepFormData(step)
    const children = stepformData?.children
    const schema = stepformData?.schema
    const nextStep = async()=>{
        if(!schema) return false
        const isNotErrors = await trigger(schema.keyof().options,{shouldFocus:true})
        if(isNotErrors){
            if(step < totalSteps){
                setStep(step+1)
            }
            return true
        }
        return false 
    }
    const previousStep = async()=>{
        if(step > initialStep){
            setStep(step-1)
            return true
        }
        return false
    }

    const reset = ()=>{
        setStep(initialStep)
    }

    return {
        step,
        setStep,
        nextStep,
        previousStep,
        reset,
        children
    }
}