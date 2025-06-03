import { Button } from "react-bootstrap";
import { PasswordActualField, PasswordActualFieldProvider } from "../../fields/PasswordChange/PasswordActualField";

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
    return(
        <Button className="text-sm font-medium">
            CHANGE
        </Button>
    )
}