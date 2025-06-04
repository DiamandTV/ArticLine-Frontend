import { RootState } from "@store/store";
import { Container, FloatingLabel, Form } from "react-bootstrap";
import { useSelector } from "react-redux";

export function AuthEmailCard(){
    const profile = useSelector((state:RootState)=>state.authReducer.profile)
    if(!profile) return
    const email = profile.auth.email
    return(
        <div className="p-2 rounded-lg bg-surface-a0">
            <Container className="flex flex-col gap-2 rounded-lg bg-surface-a0 p-mb-df">
                <h1 className="text-base font-medium">EMAIL</h1>
                <FloatingLabel label="EMAIL">
                    <Form.Control type="text" value={email} readOnly/>
                </FloatingLabel>
                <span className="text-sm font-light">🛠️ Please contact customer support to make this change.</span>
            </Container>
        </div>
    )
}