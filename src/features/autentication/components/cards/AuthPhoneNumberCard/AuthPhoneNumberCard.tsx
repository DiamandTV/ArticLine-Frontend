import { RootState } from "@store/store";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { PhoneNumberActualFields, PhoneNumberActualFieldsProvider } from "../../fields/PhoneNumberChange.tsx/PhoneNumberActualFields";

export function AuthPhoneNumberCard(){
    const profile = useSelector((state:RootState)=>state.authReducer.profile)
    if(!profile) return
    return(
        <div className="p-2 rounded-lg bg-surface-a0">
            <Container className="flex flex-col gap-2 rounded-lg bg-surface-a0 p-mb-df">
                <h1 className="text-base font-medium">PHONE NUMBER</h1>
                <PhoneNumberActualFieldsProvider
                    defaultValues={{
                        actual_phone_number:profile.auth.phone_number
                    }}
                >
                    <PhoneNumberActualFields/>
                </PhoneNumberActualFieldsProvider>
                <span className="text-sm font-light">
                    🛠️ To update your phone number, please contact customer support.
                </span>
            </Container>
        </div>
    )
}