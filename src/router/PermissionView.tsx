import { AbilityContext } from "../config/permissions/can";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import defineAbilityFor from "../config/permissions/profiles";
export function PermissionView({children}:{children:React.ReactNode}){
    const profile = useSelector((state:RootState)=>state.profileReduce.profile)
    console.log(children)
    return(
        <div className="w-full h-full bg-red-700">
            {
        profile ? 
        <AbilityContext.Provider value={defineAbilityFor(profile)}>
            {children}
        </AbilityContext.Provider> : 
        children}
        </div>
    )

}