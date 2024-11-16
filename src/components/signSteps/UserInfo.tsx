import { zodResolver } from "@hookform/resolvers/zod"
import { AnimationPlaceholderInput,AnimationPlaceholderInputProps } from "../inputs/AnimationPlaceholderInput"
import { AnimationDatePicker } from "../inputs/DatePicker/AnimationDatePicker"
import { SubmitHandler, useForm,FormProvider } from "react-hook-form"
import dayjs, { Dayjs } from 'dayjs';
import { z } from "zod"
import { RefObject } from "react";

function isAdult(date:Dayjs,adultAge:number):boolean{
    const now:Dayjs = dayjs()
    const difference = now.diff(date,'year',true)
    if(difference >= adultAge ) return true
    return false
}


const schema = z.object({
    firstName: z.string().min(5,"HELLO COME DSADSADS\nADSADSADSADSADSADSAD\nSADSADSADSADSADSADA\nSDAS\nDSADASDASDSAD").max(150),
    lastName: z.string().min(5).max(150),
    username: z.string().min(5).max(150),
    date_of_birth: z.custom<Dayjs>((val) => val instanceof dayjs, 'Invalid date').refine((val)=>isAdult(val,18),"You aren't adult")
})
type UseInfoFields = z.infer<typeof schema>

export function UserInfo({formRef}:{formRef:RefObject<HTMLFormElement>}){
 
    const methods = useForm<UseInfoFields>({
        resolver: zodResolver(schema),
      });
    
      const {
        register,
        handleSubmit,
        formState: { errors },
      } = methods;

    // All the user info form data 
    const userInfoForms:Array<AnimationPlaceholderInputProps> = [
        {
            labelName:'FIRST NAME',
            type:'text'   ,
            name:'firstName',
            register:register("firstName"),
            error:errors.firstName
        },
        {
            labelName:'LAST NAME',
            type:'text'   ,
            name:'lastName',
            register:register("lastName"),
            error:errors.lastName

        },
        {
            labelName:'USERNAME',
            type:'text'   ,
            name:'username',
            register:register("username"),
            error:errors.username
        },
       
    ]
    const onSubmit : SubmitHandler<UseInfoFields> = (userInfo)=>{
        console.log(userInfo)
    }
    return(
        <FormProvider {...methods}>
            <form
                ref={formRef} 
                className="w-full grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-y-8 gap-x-4 " onSubmit={handleSubmit(onSubmit)}>   
                {userInfoForms.map((form)=>
                    <AnimationPlaceholderInput 
                        key={form.name}
                        labelName={form.labelName}
                        type={form.type}
                        name={form.name}
                        register={form.register}
                        error={form.error}
                    />
                )}  
            
            <AnimationDatePicker 
                labelName="DATE OF BIRTH" 
                name="date_of_birth" 
                type="text" maxLength={10} />          
            </form>
        </FormProvider>
    )
}