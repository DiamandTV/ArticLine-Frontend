import { AbilityContext } from "../config/permissions/can";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import defineAbilityFor from "../config/permissions/profiles";
export function PermissionView({children}:{children:React.ReactNode}){
    const profile = useSelector((state:RootState)=>state.authReducer.profile)
    console.log(profile)
    return(
        profile ? 
        <AbilityContext.Provider value={defineAbilityFor(profile)}>
            {children}
        </AbilityContext.Provider> : 
        children
    )

}