import { AnimationPlaceholderInput,AnimationPlaceholderInputProps } from "../inputs/AnimationPlaceholderInput"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { StepperButtons } from "../stepper/StepperButtons"
import { useContext, useRef } from "react"
import { StepperContext } from "../stepper/StepperContext"
import { useUserService } from "../../services/userService"

const schema = z.object({
    phone_number: z.string().length(10),
    email: z.string().email(),
    password: z.string().min(8).max(40),
    conferm_password: z.string().min(8).max(40)
})

export type AccountFields =  z.infer<typeof schema>
export function AccountForm(){
    const formRef = useRef<HTMLFormElement | null>(null)
    const {stepper:{state,setState,maxStep,onFinish},record:{record,setRecord},error:{errorStepper,setErrorStepper}} = useContext(StepperContext)
    const { 
            register,
            handleSubmit,
            formState:{ errors},
            getValues
        } = useForm<AccountFields>({
            defaultValues:record[state],
            resolver: zodResolver(schema),
            errors:errorStepper
            })
    const userInfoForms:Array<AnimationPlaceholderInputProps> = [
        {
            labelName:'PHONE NUMBER',
            type:'text'   ,
            name:'phone_number',
            defaultValue:getValues('phone_number'),
            register:register('phone_number'),
            error:errors.phone_number
        },
        {
            labelName:'EMAIL',
            type:'text'   ,
            name:'email',
            defaultValue:getValues('email'),
            register:register('email'),
            error:errors.email
        },
        {
            labelName:'PASSWORD',
            type:'password'   ,
            name:'password',
            defaultValue:getValues('password'),
            register:register('password'),
            error:errors.password
        },
        {
            labelName:'CONFERM PASSWORD',
            type:'password'   ,
            name:'conferm_password',
            defaultValue:getValues('conferm_password'),
            register:register('conferm_password'),
            error:errors.conferm_password
        }
    ]

    const onSubmit : SubmitHandler<AccountFields> = async (account)=>{
        console.log(account)
        // the form has been validated, so go to the next step
        console.log(state,maxStep)
        if(state == maxStep - 1){
            const newRecord = record
            newRecord[state] = account
            setRecord(newRecord)
            // do the onFinish function   
            setErrorStepper( useUserService.decodeToStepperData(await onFinish(record)))
        }else if(state < maxStep - 1){
            setState(state+1)
            const newRecord = record
            newRecord[state] = account
            setRecord(newRecord)
        }
        
    }
    
    return (
        <form 
            ref={formRef}
            className="w-full"
            onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-y-8 gap-x-4  pb-8" >
                {userInfoForms.map((form)=>
                    <AnimationPlaceholderInput 
                        key={form.name}
                        labelName={form.labelName}
                        type={form.type}
                        name={form.name}
                        defaultValue={form.defaultValue}
                        register={form.register}
                        error={form.error}
                    />
                )} 
            </div> 
        <StepperButtons
            onNextClick={()=>formRef.current?.requestSubmit()}
            onPreviousClick={()=>state > 0 ? setState(state-1) : null}
        /> 
        </form>
    )        
}