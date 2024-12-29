import { useContext } from "react";
import { LoaderQuery } from "../loader/LoaderWithQueryAndChildren";
import { PaginationContext } from "../Pagination/PaginationContext";
import { useCompanyService } from "../../services/companyService";
import { PaginationModel } from "../../models/pagination";
import { useDispatch } from "react-redux";
import { setDevices } from "../../store/profileSlice";

export function DevicesQuery({children}:{children:React.ReactNode}){
    const dispatch = useDispatch()
    const {page,setPageData} = useContext(PaginationContext)
    return(
        <LoaderQuery 
            queryKey={['get-company-devices',page]}
            queryFn={async()=>await useCompanyService.geCompanyDevices({page})}
            onSuccess={(data)=>{
                const paginationData = {...data.data} as  PaginationModel
                dispatch(setDevices(paginationData.results))
                delete paginationData.results
                if(paginationData && setPageData) setPageData(paginationData)
            }}
            onError={(error)=>{
                console.log(error)
            }}
        >
            {children}
        </LoaderQuery>
    )
}