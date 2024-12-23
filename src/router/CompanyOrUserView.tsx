import { useSelector } from "react-redux"
import { RootState } from "../store/store"

interface CompanyOrUserViewProps{
    userComponent:React.ReactNode,
    companyComponent:React.ReactNode
}
export function CompanyOrUserView({userComponent,companyComponent}:CompanyOrUserViewProps){
    const auth = useSelector((state:RootState)=>state.authReducer.auth)
    if(auth && auth?.type == "COMPANY") return companyComponent
    else if(auth && auth?.type == "USER") return userComponent
    return null
}