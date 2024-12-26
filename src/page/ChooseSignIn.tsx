import { FaUser } from "react-icons/fa6";
import { LightBlurCard } from "../components/cards/LightBlurCard";
import { StartView, StartViewNoBlur } from "../views/StartView";
import { StoreUserIcon } from "../components/Icons/StoreUser";
import { CourierUserIcon } from "../components/Icons/CourierUser";
import { Link } from "react-router-dom";

export function ChooseSignIn(){
    const data = [
        {
            icon:<FaUser size={60}/>,
            title:"USER PROFILE",
            to:"/user/signin"
        },
        {
            icon:<StoreUserIcon size={60}/>,
            title:"COMPANY PROFILE",
            to:"/company/signin"
        },
        {
            icon:<CourierUserIcon size={60} />,
            title:"COURIER PROFILE",
            to:"/courier/signin"
        }
    ]

    return(
        <StartViewNoBlur >
            <div className="w-full flex flex-row justify-center items-center gap-x-10">
                {
                data.map((_data)=>{
                    return(
                        <Link to={_data.to} className="w-full h-full">
                            <LightBlurCard className="h-full max-h-full flex flex-col gap-y-5 justify-center items-center p-10 py-10">
                                {_data.icon}
                                <h1 className="text-xl italic">{_data.title}</h1>
                            </LightBlurCard>
                        </Link>
                    )
                })
                }
            </div>
        </StartViewNoBlur>
    )
}