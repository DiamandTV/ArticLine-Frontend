import { Button } from "react-bootstrap";
import { PasswordChangeFields, PasswordChangeFieldsProvider } from "../../fields/PasswordChange/PasswordChangeFields";

export function PasswordChangeForm(){
    return(
        <div className="flex flex-col w-full gap-2">
            <PasswordChangeFieldsProvider>
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
    return(
        <Button className="text-sm font-medium">
            UPDATE
        </Button>
    )
}

function CancelButton(){
    return(
        <Button className="text-xs font-medium">
            CANCEL
        </Button>
    )
}