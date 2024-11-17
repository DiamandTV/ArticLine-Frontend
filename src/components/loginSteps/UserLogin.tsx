import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm,SubmitHandler } from "react-hook-form"
import { AnimationPlaceholderInput } from "../inputs/AnimationPlaceholderInput"

const schema = z.object({
    email:z.string().email(),
    password:z.string().min(8).max(40)
})

type UserLoginFields = z.infer<typeof schema>

export function UserLogin(){
    const {register,handleSubmit,formState:{errors} } = useForm<UserLoginFields>({resolver:zodResolver(schema)})
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
    
    const onSubmit : SubmitHandler<UserLoginFields> = (userLogIn)=>{
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
            <button>clik</button>    
        </form>
    )
}