import { AnimationPlaceholderInput,AnimationPlaceholderInputProps } from "../inputs/AnimationPlaceholderInput"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { StepperButtons } from "../stepper/StepperButtons"
import { useContext, useRef } from "react"
import { StepperContext } from "../stepper/StepperContext"
import {  useEffect } from "react"
//import { useUserService } from "../../services/userService"

const schema = z.object({
    auth:z.object({
        //phone_number: z.string().length(10),
        //email: z.string().email(),
        //password: z.string().min(8).max(40),
        //conferm_password: z.string().min(8).max(40)    
        phone_number: z.string(),
        email: z.string(),
        password: z.string(),
        conferm_password: z.string()    
    })
})

export type AccountFields =  z.infer<typeof schema>
export function AccountForm(){
    const formRef = useRef<HTMLFormElement | null>(null)
    const {stepper:{state,setState,maxStep},record:{record,setRecord},error:{errorStepper},beforeChangeMediaQuery:{setBeforeChangeMediaQuery}} = useContext(StepperContext)

    useEffect(()=>
        setBeforeChangeMediaQuery(()=>(isMatched)=>{
            if(isMatched){
                const newRecord = record
                newRecord[state] = getValues()
                setRecord(newRecord)
            }
        }),[])
        

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
            name:'auth.phone_number',
            defaultValue:getValues('auth.phone_number'),
            register:register('auth.phone_number'),
            error:errors.auth?.phone_number
        },
        {
            labelName:'EMAIL',
            type:'text'   ,
            name:'auth.email',
            defaultValue:getValues('auth.email'),
            register:register('auth.email'),
            error:errors.auth?.email
        },
        {
            labelName:'PASSWORD',
            type:'password'   ,
            name:'auth.password',
            defaultValue:getValues('auth.password'),
            register:register('auth.password'),
            error:errors.auth?.password
        },
        {
            labelName:'CONFERM PASSWORD',
            type:'password'   ,
            name:'auth.conferm_password',
            defaultValue:getValues('auth.conferm_password'),
            register:register('auth.conferm_password'),
            error:errors.auth?.conferm_password
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
        }else if(state < maxStep - 1){
            setState(state+1)
            const newRecord = record
            newRecord[state] = account
            setRecord(newRecord)
        }
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
            onPreviousClick={()=>onPreviousClick()}
        /> 
        </form>
    )        
}