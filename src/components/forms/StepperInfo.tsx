import { zodResolver } from "@hookform/resolvers/zod"
import { set, SubmitHandler, useForm } from "react-hook-form"
import { z } from 'zod'
import { StepperButtons } from "../stepper/StepperButtons"
import { useContext, useRef } from "react"
import { StepperContext } from "../stepper/StepperContext"
import { AnimationPlaceholderInput } from "../inputs/AnimationPlaceholderInput"
import { AnimationPlaceholderTextArea } from "../inputs/AnimationPlaceholderTextArea"
import { TextareaAutosize } from "@mui/material"

const schema = z.object({
    store_title:z.string().min(1).max(255),
    store_description:z.string().min(1)
})

type StepperInfoFields = z.infer<typeof schema>

export function StepperInfo(){
    const formRef = useRef<HTMLFormElement | null>(null)
    const {stepper:{state,setState,maxStep},record:{record,setRecord},error:{errorStepper},beforeChangeMediaQuery:{setBeforeChangeMediaQuery}} = useContext(StepperContext)
    console.log(state)
    const {handleSubmit,register,formState:{errors},getValues} = useForm<StepperInfoFields>({
        resolver:zodResolver(schema)
    })

    const onSubmit:SubmitHandler<StepperInfoFields> = (storeInfo)=>{
        setState(state+1)
    }

    
    const onPreviousClick = ()=>{
        if(state > 0){
            const newRecord = record
            newRecord[state] = getValues()
            setRecord(newRecord)
            setState(state-1)
        }
    }

    return (
        <form 
            ref={formRef}
            className="w-full"
            onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-y-10  gap-x-4  pb-8" >
              
                    <AnimationPlaceholderInput
                        labelName="TITLE"
                        name="store_title"
                        type="text"
                        register={register('store_title')}
                        error={errors.store_title}
                        defaultValue={getValues('store_title')}
                    /> 
                    <AnimationPlaceholderInput
                        labelName="TITLE"
                        name="store_title"
                        type="text"
                        register={register('store_title')}
                        error={errors.store_title}
                        defaultValue={getValues('store_title')}
                    />   
                
                <div className="w-full md:col-span-2 col-span-1 max-h-max">
                    <AnimationPlaceholderTextArea
                        labelName="DESCRIPTION"
                        name="store_description"
                        register={register('store_description')}
                        error={errors.store_description}
                        defaultValue={getValues('store_description')}
                        className="max-h-24 scrollbar-hide"
                    />
                </div>
            
            </div>
            <StepperButtons
                onNextClick={()=>formRef.current?.requestSubmit()}
                onPreviousClick={()=>onPreviousClick()}
            />
        </form>
    )
}