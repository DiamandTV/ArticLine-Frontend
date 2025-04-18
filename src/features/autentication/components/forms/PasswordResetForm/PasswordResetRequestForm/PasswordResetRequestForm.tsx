import { Button } from "react-bootstrap";
import { PasswordResetRequestFields, PasswordResetRequestFieldsProvider } from "../../../fields/PasswordReset/PasswordResetRequest/PasswordResetRequest";

export function PasswordResetRequestForm(){
    return(
        <div className="w-full flex flex-col md:flex-row md gap-2">
            <PasswordResetRequestFieldsProvider>
                <PasswordResetRequestFields/>
                <PasswordResetRequestFormButton/>
            </PasswordResetRequestFieldsProvider>
        </div>
    )
}

function PasswordResetRequestFormButton(){
    return(
        <Button className="md:px-10">
            CONTINUE
        </Button>
    )
}