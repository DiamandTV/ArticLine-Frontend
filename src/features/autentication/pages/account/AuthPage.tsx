import { Profile } from "@features/autentication/compositions/Profile";

export function AuthPage(){
    return (
        <div className="flex flex-col w-full gap-2">
            <Profile.AuthEmail/>
            <Profile.AuthPhoneNumber/>
            <Profile.AuthPassword/>
        </div>
    )
}