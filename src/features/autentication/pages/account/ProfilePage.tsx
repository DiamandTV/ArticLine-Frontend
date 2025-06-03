import { ProfileForm } from "@features/autentication/components/forms/ProfileForms/ProfileForm";

export function ProfilePage(){
    return(
        <div className="h-full">
            <div className="p-2 rounded-lg bg-surface-a0">
                <ProfileForm.Update/>
            </div>
        </div>
    )
}