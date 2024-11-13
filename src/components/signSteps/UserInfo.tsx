import { zodResolver } from "@hookform/resolvers/zod"
import { AnimationPlaceholderInput,AnimationPlaceholderInputProps } from "../inputs/AnimationPlaceholderInput"
import { DatePicker } from "@mui/x-date-pickers"
import { MobileDatePicker } from "@mui/x-date-pickers"
import { AnimationDatePickerInput } from "../inputs/DatePicker/AnimationDatePickerInput"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import dayjs from "dayjs"

const schema = z.object({
    firstName: z.string().max(150),
    lastName: z.string().max(150),
    username: z.string().max(150),
    dateOfBirth: z.string()
})
type UseInfoFields = z.infer<typeof schema>
export function UserInfo(){
 
    const {
        register,
        handleSubmit,
        formState:{errors,isSubmitted},
        setError
        }
         = useForm<UseInfoFields>({resolver:zodResolver(schema)})
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
        
        <form className="w-full grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-y-8 gap-x-4 " onSubmit={handleSubmit(onSubmit)}>
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
           <DatePicker
                defaultValue={dayjs(new Date())}
                slots={{
                textField:(params)=><AnimationDatePickerInput
                    labelName="DATE OF BIRTH"
                    type="text"
                    name="dateOfBirth"
                    maxLength={200}
                    params={params}
                    />
            }}/>
        </form>
    )
}