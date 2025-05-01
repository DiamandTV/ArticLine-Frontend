import { Link } from "react-router";

export function LoginHeaderText(){
    return(
        <div className="text-center pb-2">
            <h1 className="text-5xl">LOGIN</h1>
            <div className="w-full flex flex-row items-center justify-center gap-1">
                <span>Don't have account?</span>
                <Link to={"/select/signin/"}>
                    <b>SIGN IN</b>
                </Link>
            </div>
        </div>
    )
}