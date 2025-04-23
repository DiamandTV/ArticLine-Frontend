import { Alert } from "react-bootstrap";

export function SigninDoneText(){
    return(
        <Alert variant="success" style={{ textAlign: "center" }}>
            <h1 className="text-2xl">🎉 <strong>Congratulations!</strong></h1>
            <p>
                You've successfully created your account!
            </p>
            <p>
                We're thrilled to have you with us. To get started, the next step is to verify your account.
            </p>
            <p>
                Please check your inbox for a verification email and follow the instructions to confirm your account.
            </p>
            <p>
                Once verified, you'll be able to fully enjoy all the features. 🚀
            </p>
        </Alert>
    )
}