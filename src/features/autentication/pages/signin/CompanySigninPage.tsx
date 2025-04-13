import { ProfileInfoFields } from "@features/autentication/components/fields/ProfileInfo/ProfileInfoForm";


export function CompanySigninPage(){
    return(
        <div className="w-full h-full flex flex-row items-center justify-center">
            <div className="w-max h-max p-4 bg-white">
                <ProfileInfoFields/>
            </div>
        </div>
    )
}