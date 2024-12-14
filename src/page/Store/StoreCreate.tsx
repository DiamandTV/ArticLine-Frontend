//import { useSelector } from "react-redux"
//import { RootState } from "../../store/store"
//import { Can } from "@casl/react"
import { BlurCard } from "../../components/cards/BlurCard"
//import { StoreFormCreate } from "../../components/forms/StoreFormCreate"
import { StoreFormCreate } from "../../components/forms/StoreCreate"
export function StoreCreate(){
    //const ability = useSelector((state:RootState)=>state.authReducer.ability)
    return(
        <BlurCard className="mb-2 ">
            <StoreFormCreate/>
        </BlurCard>
    )
}