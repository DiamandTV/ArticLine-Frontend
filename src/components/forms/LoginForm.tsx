import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm,SubmitHandler } from "react-hook-form"
import { AnimationPlaceholderInput } from "../inputs/AnimationPlaceholderInput"
import { TextButton } from "../buttons/TextButtons"

const schema = z.object({
    email:z.string().email(),
    password:z.string().min(8).max(40)
})

type LoginFields = z.infer<typeof schema>

export function LoginForm(){
    const {register,handleSubmit,formState:{errors} } = useForm<LoginFields>({resolver:zodResolver(schema)})
    const userLogInForms = [
        {
            labelName:'EMAIL',
            type:'text'   ,
            name:'email',
            register:register("email"),
            error:errors.email
        },
        {
            labelName:'PASSWORD',
            type:'password'   ,
            name:'password',
            register:register("password"),
            error:errors.password

        },
    ]
    
    const onSubmit : SubmitHandler<LoginFields> = (userLogIn)=>{
        console.log(userLogIn)
    }
    return(
        <form className="w-full grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-y-8 gap-x-4 " onSubmit={handleSubmit(onSubmit)}> 
            {userLogInForms.map((form)=>
                    <AnimationPlaceholderInput 
                        key={form.name}
                        labelName={form.labelName}
                        type={form.type}
                        name={form.name}
                        register={form.register}
                        error={form.error}
                    />
                )}     
            <div className="col-span-2 w-full flex justify-center items-center">
                <TextButton
                    text="LOG IN"
                    type="submit"
                    onClick={()=>{}}

                />  
            </div>
        </form>
    )
}