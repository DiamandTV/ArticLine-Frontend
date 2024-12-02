import { Avatar } from "@mui/material";
import { CompanyProfileModel } from "../../models/company";
import { UserProfileModel } from "../../models/user";

export interface AccountAvatarProps{
    accountProfile:UserProfileModel | CompanyProfileModel
}
export function AccountAvatar({accountProfile:{image,first_name,last_name}}:AccountAvatarProps){
    return (
        <div className="w-full flex flex-row justify-start items-center gap-x-2">
            <Avatar
                alt={`${first_name} ${last_name}`}
                src="image"
                sx={{width:"35px",height:"35px"}}
            />
            <span>{`${first_name} ${last_name}`}</span>
        </div>
    )
}