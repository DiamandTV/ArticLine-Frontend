import { Button } from "react-bootstrap";
import { PasswordChangeFields, PasswordChangeFieldsProvider } from "../../fields/PasswordChange/PasswordChangeFields";
import { useFormContext } from "react-hook-form";
import { PasswordChangeFieldsType } from "@features/autentication/models/PasswordChange/PasswordChangeFields";
import { useMutation } from "react-query";
import { passwordChangeService } from "@features/autentication/services/passwordChangeServices";
import { AxiosError } from "axios";
import { setServerValidationErrors } from "@utils/serverErrorDecode/errorDecode";
import { useTabsContext } from "@context/Tabs/TabsProvider";
import { usePasswordActual } from "@features/autentication/context/PasswordActualContext/PasswordActualProvider";

export function PasswordChangeForm(){
    const {actual_password} = usePasswordActual()
    return(
        <div className="flex flex-col w-full gap-2">
            <PasswordChangeFieldsProvider
                defaultValues={{
                    actual_password
                }}
                >
                <PasswordChangeFields/>
                <div className="flex flex-row items-center justify-between w-full gap-2">
                    <CancelButton/>
                    <UpdateButton/>
                </div>
            </PasswordChangeFieldsProvider>
        </div>
    )
}

function UpdateButton(){
    const {trigger,getValues,setError} = useFormContext<PasswordChangeFieldsType>()
    const {mutateAsync,isLoading} = useMutation({
        mutationKey:['password-change'],
        mutationFn:async(passwordChangeInfo:PasswordChangeFieldsType)=>await passwordChangeService.changePassword(passwordChangeInfo),
        onSuccess:(data)=>{
            console.log(data)
        },
        onError:(error)=>{
            if(error instanceof AxiosError){
                console.log(error)
                setServerValidationErrors(error,setError,['password','conferm_password'])
            }
        }
    })
    const onClick = async()=>{
        const isNotErrors = await trigger()
        if(isNotErrors){
            const passwordChangeInfo = getValues()
            await mutateAsync(passwordChangeInfo)
        }
    }
    return(
        <Button 
            className="text-sm font-medium"
            onClick={onClick}
            disabled={isLoading}
            >
            UPDATE
        </Button>
    )
}

function CancelButton(){
    const {setKey} = useTabsContext()
    const onClick = ()=>{
        setKey('actual_password')
    }   
    return(
        <Button 
            className="text-sm font-medium"
            onClick={onClick}
            >
            CANCEL
        </Button>
    )
}