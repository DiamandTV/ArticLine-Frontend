import { useParams } from "react-router-dom"
import { useStoreService } from "../../services/storeService";
import { useQuery } from "@tanstack/react-query";
import { LoaderResponse } from "../loader/LoaderResponse";
import { BlurCard } from "../cards/BlurCard";
import { useDispatch } from "react-redux";
import { setStoreDetails } from "../../store/storeSlice";


export function StoreQuery({children}:{children:React.ReactNode}){
    const params = useParams()
    const storeId = params.id
    const dispatch = useDispatch()
    const {isLoading,isError,isSuccess} = useQuery({
        refetchOnMount:false,
        refetchOnWindowFocus:false,
        queryKey:['store-details'],
        queryFn:async()=>{
            if(storeId){
                return await useStoreService.getStoreDetails(storeId)
            }
        },
        onSuccess:(data)=>{
            dispatch(setStoreDetails(data?.data))
        }
        
    })
    if(!storeId) return;

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
                    />
                </BlurCard>
            </div>
        )
    )


}