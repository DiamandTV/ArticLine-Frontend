import { MultiFormStepperContext } from "@context/MultiFormStepper/MutliFormStepperContext"
import { ServerErrorsAndTypeInterface } from "@models/ApiResponse/ErrorResponse/ServerErrorResponseInterface"
import {  useMultiFormStepperReturnType } from "@models/multiFormStep/mutliFormStep"
import { AxiosError } from "axios"
import { useContext, useMemo } from "react"
import { useFormContext } from "react-hook-form"
import { useMutation } from "react-query"


export function useMultiFormStepper():useMultiFormStepperReturnType{
    const {step,setStep, initialStep,totalSteps,getStepFormData,mutationOptions} = useContext(MultiFormStepperContext)
    const {trigger,getValues,setError} = useFormContext()
    const mutationResult = useMutation({...mutationOptions,onError:(error, variables, context)=>{
        if(mutationOptions){
            (mutationOptions).onError?.(error, variables, context) 
            console.log(error)
            if(error instanceof AxiosError &&  error.response){
                const errors:ServerErrorsAndTypeInterface = error.response?.data as ServerErrorsAndTypeInterface
                errors.errors.forEach((_err)=>{
                    // todo: check the error before setting the error
                    setError(_err.attr,{message:_err.detail,type:"custom"})
                })
                
            }
        }
    }})
    
    const stepFormData = useMemo(()=>getStepFormData(step),[step,getStepFormData])
    const children = stepFormData?.children
    const schema = stepFormData?.schema


    const nextStep = async()=>{
        if(!schema) return false
        const isNotErrors = await trigger(schema.keyof().options,{shouldFocus:true})
        if(isNotErrors){
            if(step + 1 < totalSteps){
                setStep((oldStep)=>{
                    return oldStep+1
                })
                return true
            }
        }
        if(step === totalSteps -1 ){
            const multiFormValues = getValues()
        
            await mutationResult.mutateAsync(multiFormValues as never)
            return true
        }
        return false 
    }
    const previousStep = async()=>{
        if(step > initialStep){
            setStep((oldStep)=>{
                return oldStep-1
            })
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