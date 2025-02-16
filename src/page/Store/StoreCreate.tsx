//import { useSelector } from "react-redux"
//import { RootState } from "../../store/store"
//import { Can } from "@casl/react"
import { BlurCard } from "../../components/Cards/BlurCard"
//import { StoreFormCreate } from "../../components/forms/StoreFormCreate"
import { StoreFormCreate } from "../../components/Forms/StoreCreate"
export function StoreCreate(){
    //const ability = useSelector((state:RootState)=>state.authReducer.ability)
    return(
        <BlurCard className="mb-2 px-4 sm:px-8">
            <StoreFormCreate/>
        </BlurCard>
    )
}