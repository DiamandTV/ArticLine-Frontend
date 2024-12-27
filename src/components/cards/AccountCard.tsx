import { Avatar } from "@mui/material"
import { CompanyProfileModel } from "../../models/company"
import { CourierProfileModel } from "../../models/Courier"
import { UserProfileModel } from "../../models/user"
import { twMerge } from "tailwind-merge"

interface AccountCardProps extends React.HTMLAttributes<HTMLDivElement>{
    profile:UserProfileModel|CompanyProfileModel|CourierProfileModel,
}
export function AccountCard(props:AccountCardProps){
    const complete_name = props.profile.first_name + " " + props.profile.last_name
    return (
        <div {...props} className={twMerge("w-full flex flex-row justify-items-center items-center py-2 px-2 gap-x-4 " +props.className)} >
            <Avatar
                alt={complete_name}
                src={props.profile.image}
            />

            <h1>{complete_name}</h1>


        </div>
    )
}