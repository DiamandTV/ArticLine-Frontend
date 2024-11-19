import { zodResolver } from "@hookform/resolvers/zod"
import { AnimationPlaceholderInput,AnimationPlaceholderInputProps } from "../inputs/AnimationPlaceholderInput"
import { AnimationDatePicker } from "../inputs/DatePicker/AnimationDatePicker"
import { SubmitHandler, useForm,FormProvider } from "react-hook-form"
import { StepperButtons } from "../stepper/StepperButtons"
import dayjs, { Dayjs } from 'dayjs';
import { z } from "zod"
import { useContext, useRef } from "react"
import { StepperContext } from "../stepper/StepperContext"



function isAdult(date:Dayjs,adultAge:number):boolean{
    const now:Dayjs = dayjs()
    const difference = now.diff(date,'year',true)
    if(difference >= adultAge ) return true
    return false
}


function getSchema(isCompany:boolean){
    return z.object({
        first_name: z.string().min(1).max(150),
        last_name: z.string().min(1).max(150),
        //username: z.string().min(1).max(150),
        username: z.string(),
        date: z.custom<Dayjs>((val) => val instanceof dayjs, 'Invalid date').refine((val)=>isCompany ? true : isAdult(val,18),"You aren't adult")
    })
}


export function InfoForm({isCompany=false}:{isCompany?:boolean}){
    // todo : use Memo for this
    const schema = getSchema(isCompany)
    type InfoFields = z.infer<typeof schema>
    const formRef = useRef<HTMLFormElement | null>(null)
    const {stepper:{state,setState,maxStep},record:{record,setRecord}} = useContext(StepperContext)
    const methods = useForm<InfoFields>({
        defaultValues:record[state],
        resolver: zodResolver(schema),
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
            labelName:isCompany ? 'OWNER FIRST NAME' : 'FIRST NAME',
            type:'text'   ,
            name:'first_name',
            defaultValue:getValues('first_name'),
            register:register("first_name"),
            error:errors.first_name
        },
        {
            labelName:isCompany ?  'OWNER LAST NAME' : 'LAST NAME',
            type:'text'   ,
            name:'last_name',
            defaultValue:getValues('last_name'),
            register:register("last_name"),
            error:errors.last_name

        },
        {
            labelName:isCompany ? 'COMPANY NAME' : 'USERNAME',
            type:'text'   ,
            name:'username',
            defaultValue:getValues('username'),
            register:register("username"),
            error:errors.username
        },  
    ]
    
    const onSubmit : SubmitHandler<InfoFields> = (info)=>{
        console.log(info)
        // the form has been validated, so go to the next step
        if(state == maxStep){
            // do the onFInish function
        }else if(state < maxStep - 1){ 
            setState(state+1)
            const newRecord = {...record,[state]:info}
            setRecord(newRecord)
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
                    labelName={isCompany ? "FOUNDATION DATE" : "DATE OF BIRTH"} 
                    name="date" 
                    type="text" maxLength={10} 
                    />   
                </div> 
                <StepperButtons
                    onNextClick={()=>formRef.current!.requestSubmit()}
                    onPreviousClick={()=>state > 0 ? setState(state-1) : null}
                />   
            </form>
        </FormProvider>
    )
}