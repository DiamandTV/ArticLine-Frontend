import { useQuery } from "@tanstack/react-query"
import { useOrderService } from "../../../services/orderService"
import { BlurCard } from "../../Cards/BlurCard"
import { LoaderResponse } from "../../Loader/LoaderResponse"
import { useEffect } from "react"

export function OrderQuery({children}:{children:React.ReactNode}){
    const {isSuccess,isError,isLoading,refetch} = useQuery({
        queryKey:['get-orders'],
        queryFn:async()=>await useOrderService.getOrders(),
        refetchOnMount:false,
        refetchOnWindowFocus:false,
        onSuccess:(data)=>{
            console.log(data)
        }
    })
    useEffect(()=>{
        refetch()
    },[])
    return (
            isSuccess ? children : 
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