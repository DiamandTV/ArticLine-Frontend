//import { useSelector } from "react-redux"
//import { RootState } from "../../store/store"
//import { Can } from "@casl/react"
import { BlurCard } from "../../components/cards/BlurCard"
import { StoreForm } from "../../components/forms/StoreForm"
export function StoreCreate(){
    //const ability = useSelector((state:RootState)=>state.authReducer.ability)
    return(
        <BlurCard className="mb-2 ">
            <StoreForm/>
        </BlurCard>
    )
}