//import { useSelector } from "react-redux"
//import { RootState } from "../../store/store"
//import { Can } from "@casl/react"
import { BlurCard } from "../../components/cards/BlurCard"
import { StoreFormLine } from "../../components/forms/StoreFromLine"
//import { StoreFormCreate } from "../../components/forms/StoreFormCreate"
export function StoreCreate(){
    //const ability = useSelector((state:RootState)=>state.authReducer.ability)
    return(
        <BlurCard className="mb-2 ">
            <StoreFormLine/>
        </BlurCard>
    )
}