import { useQuery } from "@tanstack/react-query"
import { useOrderService } from "../../../services/orderService"
import { BlurCard } from "../../Cards/BlurCard"
import { LoaderResponse } from "../../Loader/LoaderResponse"
import { useContext, useEffect } from "react"
//import { useParams, useSearchParams } from "react-router-dom"
import { PaginationModel } from "../../../models/pagination"
import { PaginationContext } from "../../Pagination/PaginationContext"
import { useDispatch } from "react-redux"
import { OrderType, setOrders } from "../../../store/orderSlice"


export function OrderQuery({children}:{children:React.ReactNode}){
    //const [searchParams] = useSearchParams()
    const dispatch = useDispatch()
    const {setPageData,page,setLoading} = useContext(PaginationContext)
    const {isSuccess,isError,isLoading,refetch} = useQuery({
        queryKey:['get-orders',page],
        queryFn:async()=>await useOrderService.getOrders({page:page}),
        refetchOnMount:false,
        refetchOnWindowFocus:false,
        onSuccess:(data)=>{
            console.log(data)
            if(data && data.data){
                const paginationData = {...data.data} as  PaginationModel
                dispatch(setOrders({
                    orders:paginationData.results,
                    type:OrderType.NORMAL
                }))
                delete paginationData.results
                if(paginationData && setPageData) setPageData(paginationData)
            }
            
        }
    })
    useEffect(()=>{
        refetch()
    },[])

    useEffect(()=>{
        if(setLoading){
        setLoading(isLoading)
        }
    },[isLoading])

    return (
            !isError ? children : 
            (
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
                </div>
            )
        )
}