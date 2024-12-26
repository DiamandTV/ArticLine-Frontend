import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm,SubmitHandler } from "react-hook-form"
import { AnimationPlaceholderInput } from "../inputs/AnimationPlaceholderInput"
import { TextButton } from "../Buttons/TextButtons"
import { useMutation } from "@tanstack/react-query"
import { useAuthService } from "../../services/authService"
import { LoaderWithChildren } from "../Loader/LoaderWithChildren"
import { AxiosError } from "axios"
import { setSession } from "../../store/authSlice"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
const schema = z.object({
    email:z.string().email(),
    password:z.string().min(8).max(40)
})

type LoginFields = z.infer<typeof schema>

export function LoginForm(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isLoading,isError,isSuccess,mutateAsync,error} = useMutation({
        retry:2,
        mutationKey:['login'],
        mutationFn:async (loginFields:LoginFields)=> await useAuthService.login(loginFields),
        onSuccess:(data)=>{
            console.log(data)
            // todo : check if the data is the response expected from django token serializer
            dispatch(setSession(data.data))
            navigate('/')
        }
    })

    const {register,handleSubmit,formState:{errors},getValues} = useForm<LoginFields>({resolver:zodResolver(schema)})
    const userLogInForms = [
        {
            labelName:'EMAIL',
            type:'text'   ,
            name:'email',
            register:register("email"),
            error:errors.email,
            defaultValue:getValues('email')
        },
        {
            labelName:'PASSWORD',
            type:'password'   ,
            name:'password',
            register:register("password"),
            error:errors.password,
            defaultValue:getValues('password')
        },
    ]
    
    const onSubmit : SubmitHandler<LoginFields> = async (loginFields)=>{
        await mutateAsync(loginFields)
    }

    const getError = ()=>{
       if(error instanceof AxiosError){
            try{
                return (error.response!.data.error[0] as string).toUpperCase()
            }catch(e){
                console.log(e)
                return "SOMETHING WENT WRONG"
            }
       }
       return "SOMETHING WENT WRONG"
    }


    const showLoaderCondition = ()=>{
        return isLoading || ( isError && !errors.password && !errors.email ) 
    }
    return(
        <LoaderWithChildren
            showLoaderCondition={showLoaderCondition}
            showLoader={true}
            loader={{
                isLoading:isLoading,
                isError:isError,
                isSuccess:isSuccess,
                messages:{
                    error:getError(),
                    success:"ACCOUNT LOGGED IN",
                },       
            }}
        >
            <form className="w-full grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-y-4 gap-x-4 " onSubmit={handleSubmit(onSubmit)}> 
                {userLogInForms.map((form)=>
                        <AnimationPlaceholderInput 
                            key={form.name}
                            labelName={form.labelName}
                            type={form.type}
                            name={form.name}
                            register={form.register}
                            error={form.error}
                            defaultValue={form.defaultValue}
                        />
                        )} 
                <div className="flex flex-col col-span-2 w-full items-center justify-center gap-y-4">   
                    <Link to={'/choose/signin'}  className="w-full flex flex-row justify-end">
                        <span className="float-right text-sm italic">You haven't an account yet. Create it now!</span>                
                    </Link>
                    <TextButton
                            type="submit"
                            text="LOGIN"
                            onClick={()=>{
                            }}
                        />
                </div> 
            </form>
        </LoaderWithChildren>
    )
}