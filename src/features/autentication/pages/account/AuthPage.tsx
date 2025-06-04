import { Profile } from "@features/autentication/compositions/Profile";

export function AuthPage(){
    return (
        <div className="max-w-[600px] flex flex-col w-full gap-2 justify-center items-center">
            <Profile.AuthEmail/>
            <Profile.AuthPhoneNumber/>
            <Profile.AuthPassword/>
        </div>
    )
}