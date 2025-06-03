import { Profile } from "@features/autentication/compositions/Profile";

export function AuthPage(){
    return (
        <div className="w-full ">
            <Profile.AuthPassword/>
        </div>
    )
}