import { Button } from "react-bootstrap";
import { PasswordActualField, PasswordActualFieldProvider } from "../../fields/PasswordChange/PasswordActualField";
import { useFormContext } from "react-hook-form";
import { passwordActualFieldSchema, PasswordActualFieldType } from "@features/autentication/models/PasswordChange/PasswordChangeFields";
import { useMutation } from "react-query";
import { password } from "@features/autentication/services/passwordServices";
import { AxiosError } from "axios";
import { setServerValidationErrors } from "@utils/serverErrorDecode/errorDecode";
import { useTabsContext } from "@context/Tabs/TabsProvider";
import { usePasswordActualContext } from "@features/autentication/context/PasswordActualContext/PasswordActualProvider";

export function PasswordActualForm(){
    return(
        <div className="flex flex-col w-full gap-2">
            <PasswordActualFieldProvider>
                <PasswordActualField/>
                <ChangeButton/>
            </PasswordActualFieldProvider>
        </div>
    )
}

function ChangeButton(){
    const {setKey} = useTabsContext()
    const {setActualPassword} = usePasswordActualContext()
    const {trigger,getValues,setError} = useFormContext <PasswordActualFieldType>()
    const {mutateAsync,isLoading} = useMutation({
        mutationKey:['password-verify'],
        mutationFn:async(passwordActualInfo:PasswordActualFieldType)=>await password.verify(passwordActualInfo),
        onSuccess:(data)=>{
            console.log(data)
            const actual_password = getValues().actual_password
            alert(actual_password)
            setKey('change_password')
            setActualPassword(actual_password)
        },
        onError:(error)=>{
            if(error instanceof AxiosError){
                console.log(error)
                setServerValidationErrors(error,setError,passwordActualFieldSchema.keyof().options)
            }
        }
    
    })

    const onClick = async()=>{
        const isNotErrors = await trigger()
        if(isNotErrors){
            const passwordActualInfo = getValues()
            console.log(passwordActualInfo)
            await mutateAsync(passwordActualInfo)
        }
    }

    return(
        <Button 
            className="text-sm font-medium"
            onClick={onClick}
            disabled={isLoading}
            >
            CHANGE
        </Button>
    )
}