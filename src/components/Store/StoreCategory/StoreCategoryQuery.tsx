import { useParams } from "react-router-dom"
import { useStoreService } from "../../../services/storeService";
import { useQuery } from "@tanstack/react-query";
import { LoaderResponse } from "../../loader/LoaderResponse";
import { BlurCard } from "../../cards/BlurCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { setCategoriesAndPagination } from "../../../store/storeSlice";


export function StoreCategoryQuery({children}:{children:React.ReactNode}){
    const dispatch = useDispatch()
    const params = useParams()
    const storeId = params['store-id']
    const storeCategoryId = params['sub-category-id']
    const pageCountCategories = useSelector((state:RootState)=>state.storeReducer.pageCountCategories)

    let page = null
    try{
        if(pageCountCategories && storeCategoryId) page = pageCountCategories![storeCategoryId] as number;
    } catch(e){
        console.log(e)
    }
    console.log(pageCountCategories)
    const {isLoading,isError,isSuccess} = useQuery({
        refetchOnMount:false,
        refetchOnWindowFocus:false,
        queryKey:['store-sub-category-details',storeId,storeCategoryId,page],
        queryFn:async()=>{
            console.log("Ok")
            if(storeId && storeCategoryId && page){
                return await useStoreService.getStoreCategoryProducts({storeId,storeCategoryId,page})
            }
        },
        onSuccess:(data)=>{
            console.log(data)
            dispatch(setCategoriesAndPagination(data?.data))
        },
        onError:(e)=>{
            console.log(e)
        }
        
    })


    if(!storeId || !storeCategoryId) return;

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