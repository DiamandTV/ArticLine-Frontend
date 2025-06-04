import { Button } from "react-bootstrap";
import { PasswordChangeFields, PasswordChangeFieldsProvider } from "../../fields/PasswordChange/PasswordChangeFields";
import { useFormContext } from "react-hook-form";
import { PasswordChangeFieldsType } from "@features/autentication/models/PasswordChange/PasswordChangeFields";
import { useMutation } from "react-query";
import { passwordChangeService } from "@features/autentication/services/passwordChangeServices";
import { AxiosError } from "axios";
import { setServerValidationErrors } from "@utils/serverErrorDecode/errorDecode";
import { useTabsContext } from "@context/Tabs/TabsProvider";
import { usePasswordActualContext } from "@features/autentication/context/PasswordActualContext/PasswordActualProvider";
import { toast } from "react-toastify";
import { AlertCard } from "@components/cards/AlertCard/AlertCard";

export function PasswordChangeForm(){
    const {actual_password} = usePasswordActualContext()
    if (!actual_password) return null; // oppure uno spinner

    return(
        <div className="flex flex-col w-full gap-2">
            <PasswordChangeFieldsProvider
                // defaultValues non è reattivo ai stati (legge il valore solo al primo render)
                // Quindi il controllo viene o fatto prima o bisogna usare reset / setValue
                defaultValues={{
                    actual_password:actual_password,

                    password:'',
                    conferm_password:''
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
    const {setActualPassword} = usePasswordActualContext()
    const {setKey} = useTabsContext()
    const {trigger,getValues,setError,formState:{errors}} = useFormContext<PasswordChangeFieldsType>()
    const {mutateAsync,isLoading} = useMutation({
        mutationKey:['password-change'],
        mutationFn:async(passwordChangeInfo:PasswordChangeFieldsType)=>await passwordChangeService.changePassword(passwordChangeInfo),
        onSuccess:(data)=>{
            console.log(data)
            setActualPassword('')
            setKey('actual_password')
            toast(
                <AlertCard
                    variant="success"
                    title="✅ Password changed"
                    message="Your new password has been saved successfully 🔐"
                />,
                {
                    className: "w-full",
                    hideProgressBar: true,
                    position: 'top-center'
                }
            )
        },
        onError:(error)=>{
            if(error instanceof AxiosError){
                console.log(error)
                setServerValidationErrors(error,setError,['password','conferm_password'])
            }
        }
    })
    console.log(errors)
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