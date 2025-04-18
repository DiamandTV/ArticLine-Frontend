import { Link } from "react-router";

export function LoginPasswordForgotText(){
    return(
        <div className="w-full flex flex-row items-center justify-end gap-1 text-sm">
            <span>Lost password?</span>
            <Link to={'/password/reset/'}>
                <b className="italic">CLICK HERE!</b>
            </Link>
        </div>
    )
}