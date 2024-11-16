import { AnimationPlaceholderInput,AnimationPlaceholderInputProps } from "../inputs/AnimationPlaceholderInput"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { RefObject } from "react"

const schema = z.object({
    phone_number: z.string().min(9).max(9),
    email: z.string().email(),
    password: z.string().min(8).max(40),
    conferm_password: z.string().min(8).max(40)
})

type UserAccountFields =  z.infer<typeof schema>
export function UserAccount({formRef}:{formRef:RefObject<HTMLFormElement>}){
    const { 
            register,
            handleSubmit,
            formState:{ errors},
        } = useForm<UserAccountFields>({
        resolver: zodResolver(schema),
        })
    const userInfoForms:Array<AnimationPlaceholderInputProps> = [
        {
            labelName:'PHONE NUMBER',
            type:'text'   ,
            name:'phone_number',
            register:register('phone_number'),
            error:errors.phone_number
        },
        {
            labelName:'EMAIL',
            type:'text'   ,
            name:'email',
            register:register('email'),
            error:errors.email
        },
        {
            labelName:'PASSWORD',
            type:'text'   ,
            name:'password',
            register:register('password'),
            error:errors.password
        },
        {
            labelName:'CONFERM PASSWORD',
            type:'text'   ,
            name:'conferm_password',
            register:register('conferm_password'),
            error:errors.conferm_password
        }
    ]

    const onSubmit : SubmitHandler<UserAccountFields> = (userAccount)=>{
        console.log(userAccount)
    }
    
    return (
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
        </form>
    )        
}