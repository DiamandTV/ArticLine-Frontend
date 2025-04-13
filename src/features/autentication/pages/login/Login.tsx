import { LoginFields } from "@features/autentication/components/fields/Login/LoginFields";
import { LoginFieldsProvider } from "@features/autentication/components/fields/Login/LoginFieldsProvider";
import { Container } from "react-bootstrap";

export function LoginPage(){
    return(
        <div className="w-full min-h-screen max-h-max flex flex-row items-center justify-center p-2">
            <Container className=" p-2 sm:p-4 md:p-6 lg:!p-10 bg-white rounded-xl ">
                {
                    /*
                    <ProfileInfoFieldsProvider>
                        <ProfileInfoFields className="w-full flex flex-col items-center justify-center gap-2"/>
                    </ProfileInfoFieldsProvider>
                    <AuthInfoFieldsProvider>
                        <AuthInfoFields className="w-full flex flex-col items-center justify-center gap-2"/>
                    </AuthInfoFieldsProvider>
                    */
                }
                <LoginFieldsProvider>
                    <LoginFields className="w-full flex flex-col items-center justify-center gap-2"/>
                </LoginFieldsProvider>
                
            </Container>
        </div>
    )
}
