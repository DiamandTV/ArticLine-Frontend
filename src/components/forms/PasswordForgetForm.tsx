import { zodResolver } from "@hookform/resolvers/zod"
import { AnimationPlaceholderInput } from "../inputs/AnimationPlaceholderInput"
import { SubmitHandler, useForm } from "react-hook-form"
import { TextButton } from "../Buttons/TextButtons"
import { useAuthService } from "../../services/authService"
import { z } from "zod"

const schema = z.object({
    email:z.string().email()
})

type PasswordResetField = z.infer<typeof schema>



export function PasswordForgetForm({onSubmitForm}:{onSubmitForm?:()=>void}){
    const {register,handleSubmit,formState:{errors}} = useForm<PasswordResetField>({resolver:zodResolver(schema)})

    const onSubmit :SubmitHandler<PasswordResetField> = (passwordForgetField)=>{
        console.log(passwordForgetField)
        try{
            useAuthService.sendResetPasswordRequest(passwordForgetField)
        }catch(e){
            console.log("ERRORE SENDING THE RESET EMAIL")
            console.warn(e)
        }
        if(onSubmitForm != null) onSubmitForm()

    }

    return(
            <form                
                className="w-full flex flex-col justify-center items-center"
                onSubmit={handleSubmit(onSubmit)}>   
                <div className="w-full flex flex-col justify-center items-center gap-y-10 gap-x-4 ">
                    <AnimationPlaceholderInput
                        name="email"
                        labelName="EMAIL"
                        register={register('email')}
                        type="text"
                        error={errors.email}
                    />
                    <TextButton
                        text="RESET PASSWORD"
                        type="submit"
                        onClick={()=>{
                            
                        }}
                    />
                </div>
               
            </form>
    )
}