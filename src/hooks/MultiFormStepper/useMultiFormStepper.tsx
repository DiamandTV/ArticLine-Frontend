import { MultiFormStepperContext } from "@context/MultiFormStepper/MutliFormStepperContext"
import {  useMultiFormStepperReturnType } from "@models/multiFormStep/mutliFormStep"
import { useContext, useState } from "react"
import { useFormContext } from "react-hook-form"
import { useMutation } from "react-query"


export function useMultiFormStepper():useMultiFormStepperReturnType{
    const {initialStep,totalSteps,getStepFormData,mutationOptions} = useContext(MultiFormStepperContext)
    const mutationResult = useMutation<unknown,unknown,unknown,unknown>({...mutationOptions})
    const {trigger,getValues} = useFormContext()


    const [step,setStep] = useState(initialStep)
    const stepformData = getStepFormData(step)
    const children = stepformData?.children
    const schema = stepformData?.schema
    const nextStep = async()=>{
        if(!schema) return false
        const isNotErrors = await trigger(schema.keyof().options,{shouldFocus:true})
        if(isNotErrors){
            if(step + 1 < totalSteps){
                setStep(step+1)
                return true
            }
        }
        if(step === totalSteps -1 ){
            const multiFormValues = getValues()
        
            await mutationResult.mutateAsync(multiFormValues)
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
        children,
        mutationResult
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