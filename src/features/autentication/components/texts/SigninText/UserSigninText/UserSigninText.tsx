import { Link } from "react-router";

export function UserSigninText(){
    return(
        <div className="text-center pb-2">
            <h1 className="text-5xl">SIGN IN</h1>
            
            <div className="w-full flex flex-row items-center justify-center gap-1">
                <span>Already have account?</span>
                <Link to={"/login/"}>
                    <b>LOGIN</b>
                </Link>
            </div>
        </div>
    )
}