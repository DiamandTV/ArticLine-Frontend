import { StartView } from "../views/StartView";
import { PasswordForgetForm } from "../components/forms/PasswordForgetForm";
import { useNavigate } from "react-router-dom";

export function PasswordForget(){
    const navigate = useNavigate()
    return(
        <StartView>
            <PasswordForgetForm 
                onSubmitForm={()=>{
                    console.log("Ok")
                    navigate('/password/reset-send')
                }}
            />
        </StartView>
    )
}