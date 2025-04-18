import { Button } from "react-bootstrap";
import { PasswordResetFields, PasswordResetFieldsProvider } from "../../../fields/PasswordReset/PasswordResetNew/PasswordResetFields";

export function PasswordResetForm(){
    return(
        <div className="w-full flex flex-col md:flex-row gap-2">
            <PasswordResetFieldsProvider>
                <PasswordResetFields/>
                <PasswordResetFormButton/>
            </PasswordResetFieldsProvider>
        </div>
    )
}

function PasswordResetFormButton(){
    return(
        <Button className="md:px-10">
            CHANGE
        </Button>
    )
}