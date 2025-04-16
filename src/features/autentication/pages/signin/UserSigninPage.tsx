import { SigninForm } from "@features/autentication/components/forms/SigninForms/SigninForm";
import { SigninTextFactory } from "@features/autentication/components/texts/SigninText/SigninText";
import { ProfileType } from "@features/autentication/models/Profile/Interface/Type";
import { AuthenticationView } from "@features/autentication/view/AuthenticationView/AuthenticationView";
const profileType:ProfileType = 'USER'
export function UserSigninPage(){
    return(
        <AuthenticationView>
                <SigninTextFactory profileType={profileType}/>
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
                <SigninForm.Create profileType={profileType}/>
        </AuthenticationView>
    )
}