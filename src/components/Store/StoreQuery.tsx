import { useNavigate, useParams } from "react-router-dom"
import { useStoreService } from "../../services/storeService";
import { useQuery } from "@tanstack/react-query";
import { LoaderResponse } from "../Loader/LoaderResponse";
import { BlurCard } from "../Cards/BlurCard";
import { useDispatch } from "react-redux";
import { clearStoreDetails, setStoreDetails } from "../../store/storeSlice";
import { useEffect } from "react";
import { StoreModel } from "../../models/store";


export function StoreQuery({children}:{children:React.ReactNode}){
    const params = useParams()
    const storeId = params['store-id']
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {isLoading,isError,isSuccess,refetch} = useQuery({
        enabled:false,
        refetchOnMount:false,
        refetchOnWindowFocus:false,
        queryKey:['store-details',storeId],
        queryFn:async()=>{
            if(storeId){
                return await useStoreService.getStoreDetails(storeId)
            }
        },
        onSuccess:(data)=>{
            if(data && data.data){
                const store = data.data as StoreModel
                dispatch(setStoreDetails(data?.data))
                if(store.store_categories && store.store_categories.length > 0)  navigate(`sub-category/${store.store_categories[0].id}`)
            }
        }
        
    })
    useEffect(()=>{
        dispatch(clearStoreDetails())
        refetch()
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