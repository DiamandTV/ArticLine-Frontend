import { useParams } from "react-router-dom"
import { useStoreService } from "../../services/storeService";
import { useQuery } from "@tanstack/react-query";
import { LoaderResponse } from "../loader/LoaderResponse";
import { BlurCard } from "../cards/BlurCard";
import { useDispatch } from "react-redux";
import { clearStoreDetails, setStoreDetails } from "../../store/storeSlice";
import { useEffect } from "react";


export function StoreQuery({children}:{children:React.ReactNode}){
    const params = useParams()
    const storeId = params['store-id']
    const dispatch = useDispatch()
    const {isLoading,isError,isSuccess} = useQuery({
        refetchOnMount:false,
        refetchOnWindowFocus:false,
        queryKey:['store-details',storeId],
        queryFn:async()=>{
            if(storeId){
                return await useStoreService.getStoreDetails(storeId)
            }
        },
        onSuccess:(data)=>{
            dispatch(setStoreDetails(data?.data))
        }
        
    })
    useEffect(()=>{
        dispatch(clearStoreDetails())
    },[])

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