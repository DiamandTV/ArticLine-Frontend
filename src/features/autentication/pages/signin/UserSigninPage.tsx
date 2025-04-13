import { SigninForm } from "@features/autentication/components/forms/SigninForms/SigninForm";
import { AuthenticationView } from "@features/autentication/view/AuthenticationView/AuthenticationView";

export function UserSigninPage(){
    return(
        <AuthenticationView>
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
                <SigninForm.Create/>
        </AuthenticationView>
    )
}