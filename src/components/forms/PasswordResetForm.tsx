import { zodResolver } from "@hookform/resolvers/zod"
import { useForm,SubmitHandler } from "react-hook-form"
import { AnimationPlaceholderInput } from "../inputs/AnimationPlaceholderInput"
import { TextButton } from "../buttons/TextButtons"
import { z } from "zod"
import { useMutation } from "@tanstack/react-query"
import { useAuthService } from "../../services/authService"
import { AxiosError } from "axios"
import { LoaderResponse } from "../loader/LoaderResponse"

const schema = z.object({
    password: z.string().min(8).max(40),
    conferm_password: z.string().min(8).max(40)    
})

type PasswordResetFields = z.infer<typeof schema>

interface PasswordResetFormProps{
    token:string,
    showLoader?:boolean
}

export function PasswordResetForm({token,showLoader=false}:PasswordResetFormProps){
    const {register,handleSubmit,formState:{errors},setError,getValues} = useForm<PasswordResetFields>({
        resolver:zodResolver(schema)
    })

    const {mutateAsync,isError,isLoading,isSuccess } = useMutation({
        mutationKey:['auth-reset-password'],
        mutationFn: async(passwordFields:PasswordResetFields)=>{
            console.log(passwordFields)
            await useAuthService.resetPassword(passwordFields,token)
        },
            onError:(err)=>{
            if(err instanceof AxiosError){
                const errorKeys = Object.keys(err.response?.data)
                if(errorKeys.includes('password')) setError('password', { type: 'custom', message: err.response?.data.password[0] })
                if(errorKeys.includes('conferm_password')) setError('conferm_password',{ type: 'custom', message: err.response?.data.conferm_password[0] })
            }
        }
    })


    const onSubmit:SubmitHandler<PasswordResetFields> = async (passwordFields)=>{
        await mutateAsync(passwordFields)
    }

    return(
        (showLoader && !errors.password && !errors.conferm_password && (isError || isSuccess)) ? 
        <LoaderResponse
            isLoading={isLoading}
            isError={isError}
            isSuccess={isSuccess}
            messages={{
                error:"SOMETHING WENT WRONG",
                success:"NEW PASSWORD SETTED"
            }}
            counterInitialValue={10}
            redirect={isSuccess}
        /> 
        : 
        <>
            <form
                className="w-full"
                onSubmit={handleSubmit(onSubmit)}>   
                <div className="w-full grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-y-10 gap-x-4 pb-8">
                    <AnimationPlaceholderInput
                        labelName="PASSWORD"
                        name="password"
                        type="password"
                        register={register('password')}
                        error={errors.password}
                        defaultValue={getValues('password')}
                    />
                    <AnimationPlaceholderInput
                        labelName="CONFERM PASSWORD"
                        name="conferm_password"
                        type="password"
                        register={register('conferm_password')}
                        error={errors.conferm_password}
                        defaultValue={getValues('conferm_password')}
                    />
                    <TextButton
                        text="PASSWORD RESET"
                        type="submit"
                        onClick={()=>{}}
                    />
                </div>
            </form>
        </>
    )
}