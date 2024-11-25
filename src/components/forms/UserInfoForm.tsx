import { zodResolver } from "@hookform/resolvers/zod"
import { AnimationPlaceholderInput,AnimationPlaceholderInputProps } from "../inputs/AnimationPlaceholderInput"
import { AnimationDatePicker } from "../inputs/DatePicker/AnimationDatePicker"
import { SubmitHandler, useForm,FormProvider } from "react-hook-form"
import { StepperButtons } from "../stepper/StepperButtons"
import dayjs, { Dayjs } from 'dayjs';
import { z } from "zod"
import { useContext, useRef } from "react"
import { StepperContext } from "../stepper/StepperContext"
import {  useEffect } from "react"

/*
function isAdult(date:Dayjs,adultAge:number):boolean{
    const now:Dayjs = dayjs()
    const difference = now.diff(date,'year',true)
    if(difference >= adultAge ) return true
    return false
}
*/

const schema = z.object({
    /*
        first_name: z.string(),//.min(1).max(150),
        last_name: z.string(),//.min(1).max(150),
        //phone_number: z.string().length(10),
        username: z.string(),//.min(1).max(150),
        //username: z.string(),
        date_of_birth: z.custom<Dayjs>((val) => val instanceof dayjs, 'Invalid date').refine((val)=>isAdult(val,18),"You aren't adult")
    */
        first_name: z.string(),//.min(1).max(150),
        last_name: z.string(),//.min(1).max(150),
        //phone_number: z.string().length(10),
        username: z.string(),//.min(1).max(150),
        //username: z.string(),
        date_of_birth: z.custom<Dayjs>((val) => val instanceof dayjs, 'Invalid date'),
    })

export type UserInfoFields = z.infer<typeof schema>

export function UserInfoForm(){    
    const formRef = useRef<HTMLFormElement | null>(null)
    const {stepper:{state,setState,maxStep},record:{record,setRecord},error:{errorStepper},beforeChangeMediaQuery:{setBeforeChangeMediaQuery}} = useContext(StepperContext)
    useEffect(()=>{
        setBeforeChangeMediaQuery(()=>(isMatched)=>{
            if(isMatched){
                 const newRecord = record
                newRecord[state] = getValues()
                setRecord(newRecord)
            }
        })
    },[])
    
    const methods = useForm<UserInfoFields>({
        defaultValues:record[state],
        resolver: zodResolver(schema),
        errors:errorStepper
      });
    
      const {
        register,
        handleSubmit,
        formState: { errors },
        getValues
      } = methods;

    // All the user info form data 
    const userInfoForms:Array<AnimationPlaceholderInputProps> = [
        {
            labelName:'FIRST NAME',
            type:'text'   ,
            name:'first_name',
            defaultValue:getValues('first_name'),
            register:register("first_name"),
            error:errors.first_name
        },
        {
            labelName:'LAST NAME',
            type:'text'   ,
            name:'last_name',
            defaultValue:getValues('last_name'),
            register:register("last_name"),
            error:errors.last_name

        },
        {
            labelName:'USERNAME',
            type:'text'   ,
            name:'username',
            defaultValue:getValues('username'),
            register:register("username"),
            error:errors.username
        },
        
    ]

    const onSubmit : SubmitHandler<UserInfoFields> = async (info)=>{
        console.log(info)
        if(state < maxStep - 1){ 
            setState(state+1)
            const newRecord = record
            newRecord[state] = info
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
    return(
        <FormProvider {...methods}>
            <form
                ref={formRef}
                className="w-full"
                onSubmit={handleSubmit(onSubmit)}>   
                <div className="w-full grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-y-10 gap-x-4 pb-8">
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
                <AnimationDatePicker 
                    labelName={"DATE OF BIRTH"} 
                    name="date_of_birth" 
                    type="text" maxLength={10} 
                    />   
                </div> 
                <StepperButtons
                    onNextClick={()=>formRef.current!.requestSubmit()}
                    onPreviousClick={()=>onPreviousClick()}
                />   
            </form>
        </FormProvider>
    )
}