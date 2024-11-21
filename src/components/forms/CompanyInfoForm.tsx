import { zodResolver } from "@hookform/resolvers/zod"
import { AnimationPlaceholderInput,AnimationPlaceholderInputProps } from "../inputs/AnimationPlaceholderInput"
import { AnimationDatePicker } from "../inputs/DatePicker/AnimationDatePicker"
import { SubmitHandler, useForm,FormProvider } from "react-hook-form"
import { StepperButtons } from "../stepper/StepperButtons"
import dayjs, { Dayjs } from 'dayjs';
import { z } from "zod"
import { useContext, useEffect, useRef } from "react"
import { StepperContext } from "../stepper/StepperContext"

const schema = z.object({
        first_name: z.string().min(1).max(150),
        last_name: z.string().min(1).max(150),
        company_name: z.string().min(1).max(150),
        //username: z.string(),
        date_of_foundation: z.custom<Dayjs>((val) => val instanceof dayjs, 'Invalid date')
    })

export type CompanyInfoFields = z.infer<typeof schema>

export function CompanyInfoForm(){    
    const formRef = useRef<HTMLFormElement | null>(null)
    const {stepper:{state,setState,maxStep,onFinish},record:{record,setRecord},error:{errorStepper,setErrorStepper}} = useContext(StepperContext)
    const methods = useForm<CompanyInfoFields>({
        defaultValues:record[state],
        resolver: zodResolver(schema),
      });
    
      const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setError
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
            labelName:'COMPANY NAME',
            type:'text'   ,
            name:'company_name',
            defaultValue:getValues('company_name'),
            register:register("company_name"),
            error:errors.company_name
        },  
    ]
    useEffect(()=>{
        Object.entries(errorStepper).forEach(([key,value])=>setError(key,value,{shouldFocus:true}))
      },[errorStepper])
    
    const onSubmit : SubmitHandler<CompanyInfoFields> = async (info)=>{
        console.log(info)
        // the form has been validated, so go to the next step
        if(state == maxStep){
            // do the onFInish function
            setError(await onFinish(record))
        }else if(state < maxStep - 1){ 
            setState(state+1)
            const newRecord = record
            newRecord[state] = info
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
                    labelName={"DATE OF FOUNDATION"} 
                    name="date_of_foundation" 
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