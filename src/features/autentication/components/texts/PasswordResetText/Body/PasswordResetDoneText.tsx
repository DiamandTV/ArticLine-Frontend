import { Alert } from "react-bootstrap";

export function PasswordResetDoneText() {
    return (
        <Alert variant="success">
            😊 All set! Your password has been successfully reset. You can now log in with your new password. If you run into any trouble, we're just a message away!
        </Alert>
    );
}