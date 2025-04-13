import { ProfileInfoFieldsProvider } from "@features/autentication/components/fields/ProfileInfo/ProfileInfoFieldsProvider";
import { ProfileInfoFields } from "@features/autentication/components/fields/ProfileInfo/ProfileInfoFields";
import { Container } from "react-bootstrap";
import { AuthInfoFieldsProvider } from "@features/autentication/components/fields/AuthInfo/AuthInfoFieldsProvider";
import { AuthInfoFields } from "@features/autentication/components/fields/AuthInfo/AuthInfoFields";
import { SigninFieldsProvider } from "@features/autentication/components/fields/Signin/SigninFieldsProvider";
import { SigninFields } from "@features/autentication/components/fields/Signin/SigninFields";

export function UserSigninPage(){
    return(
        <div className="w-full min-h-screen max-h-max flex flex-row items-center justify-center p-2">
            <Container className="p-2  sm:p-4 md:p-6 lg:!p-10 bg-white rounded-xl ">
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
                <SigninFieldsProvider>
                    <SigninFields/>
                </SigninFieldsProvider>
                
            </Container>
        </div>
    )
}