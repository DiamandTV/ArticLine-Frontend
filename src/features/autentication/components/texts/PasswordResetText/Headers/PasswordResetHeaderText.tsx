import { Alert } from "react-bootstrap";

export function PasswordResetHeaderText(){
    return(
        <div className="text-center pb-2 flex flex-col justify-center items-center gap-2">
            <h1 className="text-5xl">NEW PASSWORD</h1>
            <Alert variant="success" className="w-max italic">
                Please create a new password that you don't use on any other site.
            </Alert>
        </div>
    )
}