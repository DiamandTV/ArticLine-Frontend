import { MultiFormStepperContext } from "@context/MultiFormStepper/MutliFormStepperContext"
import {  useMultiFormStepperReturnType } from "@models/multiFormStep/mutliFormStep"
import { useContext, useState } from "react"
import { useFormContext } from "react-hook-form"


export function useMultiFormStepper():useMultiFormStepperReturnType{
    const {trigger} = useFormContext()
    const {initialStep,totalSteps,getStepFormData} = useContext(MultiFormStepperContext)
    const [step,setStep] = useState(initialStep )
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
        canPrevious:step > initialStep,
        canNext: step <= totalSteps,
        reset,
        children
    }
}

// export function useMultiFormStepper({initialStep=0,totalSteps,getStepFormData}:useMultiFormStepperProps):useMultiFormStepperReturnType{
//     const {trigger} = useFormContext()
//     const [step,setStep] = useState(initialStep)
//     const stepformData = getStepFormData(step)
//     const children = stepformData?.children
//     const schema = stepformData?.schema
//     const nextStep = async()=>{
//         if(!schema) return false
//         const isNotErrors = await trigger(schema.keyof().options,{shouldFocus:true})
//         if(isNotErrors){
//             if(step < totalSteps){
//                 setStep(step+1)
//             }
//             return true
//         }
//         return false 
//     }
//     const previousStep = async()=>{
//         if(step > initialStep){
//             setStep(step-1)
//             return true
//         }
//         return false
//     }

//     const reset = ()=>{
//         setStep(initialStep)
//     }

//     return {
//         step,
//         setStep,
//         nextStep,
//         previousStep,
//         canPrevious:step > initialStep,
//         canNext: step <= totalSteps,
//         reset,
//         children
//     }
// }