
import { defineAbilityFor } from "@utils/defineAbility/defineAbility"
import { RootState } from "@store/store"
import { useSelector } from "react-redux"
import { AbilityContext } from "src/config/permissions/can"
import { CartProvider } from "@features/cart"

interface PermissionViewProps{
    children:React.ReactNode
}
export function PermissionView({children}:PermissionViewProps){
    const profile = useSelector((state:RootState)=>state.authReducer.profile)
    if(!profile){
        throw new Error("Authentication is REQUIRED")
    }
    return(
        <AbilityContext.Provider value={defineAbilityFor(profile)}>
            <CartProvider>
                {children}
            </CartProvider>
        </AbilityContext.Provider>
    )
}