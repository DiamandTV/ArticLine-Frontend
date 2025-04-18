import { Alert } from "react-bootstrap";

export function PasswordResetErrorText() {
    return (
        <Alert variant="danger">
            😕 Oops! Something went wrong while trying to reset your password. 
            This might be due to a temporary issue or an invalid reset link. Please double-check the link or try again later. 
            If the problem persists, feel free to reach out to our support team — we're here to help!
        </Alert>
    );
}
