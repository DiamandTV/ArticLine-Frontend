import { useDispatch } from "react-redux"
import { useQuery } from "@tanstack/react-query"
import { companyStoreService } from "../../services/companyStoreService"
import { useContext, useEffect } from "react"
import { BlurCard } from "../Cards/BlurCard"
import { LoaderResponse } from "../Loader/LoaderResponse"
import {  setStores } from "../../store/profileSlice"
import { PaginationContext } from "../Pagination/PaginationContext"
import { PaginationModel } from "../../models/pagination"

export function StoresQueryCompany({children,load=true}:{children:React.ReactNode,load?:boolean}){
    const dispatch = useDispatch()
    const {page,setPageData} = useContext(PaginationContext)
    const {isLoading,isError,isSuccess,refetch} = useQuery({
        queryKey:['company-stores-list',page],
        queryFn:async()=>await companyStoreService.getCompanyStores({page}),
        refetchOnMount:false,
        refetchOnWindowFocus:false,
        onSuccess:(data)=>{
            if(data && data.data){
                const paginationData = {...data.data} as  PaginationModel
                dispatch(setStores(data.data.results))
                delete paginationData.results
                if(paginationData && setPageData) setPageData(paginationData)
            }
        }
    })

    useEffect(()=>{
        refetch()
    },[])

    return (
            isSuccess ? children : load ?      
                <div className="w-full h-screen min-h-5 flex justify-center items-center">
                    <BlurCard className="h-full flex justify-center items-center">
                        <LoaderResponse
                            isLoading={isLoading}
                            isError={isError}
                            isSuccess={isSuccess}
                            redirect={false}
                            messages={{
                                error:"SOMETHING WENT WRONG",
                                warning:"MAYBE SOMETHING WENT WRONG",
                                success:""
                            }}
                        />
                    </BlurCard>
                </div> : null
            
        )
}