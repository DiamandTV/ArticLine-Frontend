import { zodResolver } from "@hookform/resolvers/zod"
import { AnimationPlaceholderInput,AnimationPlaceholderInputProps } from "../inputs/AnimationPlaceholderInput"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

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
        {
            labelName:'DATE OF BIRTH',
            type:'text'   ,
            name:'dateOfBirth',
            register:register("dateOfBirth"),
            error:errors.dateOfBirth
        }
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
            <button>CLICK</button>
        </form>
    )
}