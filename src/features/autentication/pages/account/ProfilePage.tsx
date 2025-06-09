import { ProfileUpdateForm } from "@features/autentication/components/forms/ProfileForms/ProfileUpdateForm";

export function ProfilePage(){
    return(
        <div className="w-full flex flex-col max-w-[600px] p-mb-df rounded-lg bg-surface-a0 ">
            <div className="w-full p-mb-df">
                {
                    //<h1 className="text-base font-medium p-mb-df">PROFILE DETAILS</h1>
                }
                <ProfileUpdateForm/>
            </div>
        </div>
    )
}