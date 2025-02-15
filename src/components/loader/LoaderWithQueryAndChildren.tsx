
// // this component will make the query 
// import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";
// import { LoaderWithChildren, LoaderWithChildrenProps } from "./LoaderWithChildren";
// import { LoaderResponseProps } from "./LoaderResponse";

// export interface LoaderWithQueryAndChildren extends Omit<LoaderWithChildrenProps,'loader'>{
//     queryOption: Omit<UseQueryOptions<unknown, unknown, unknown, QueryKey>, "initialData"> & { initialData?: () => undefined; },
//     showLoaderCondition:({isLoading,isError,isSuccess}:{isLoading:boolean,isError:boolean,isSuccess:boolean})=>boolean,
//     loader?:LoaderResponseProps
// }
// export function LoaderWithQueryAndChildren({queryOption,loader,showLoaderCondition,showLoader,children}:LoaderWithQueryAndChildren){
//     const {isLoading,isError,isSuccess} = useQuery(queryOption)
    

//     return (
//         <LoaderWithChildren
//             children={children}
//             loader={{
//                 ...loader,isError,isLoading,isSuccess
//             }}
//             showLoaderCondition={()=>showLoaderCondition({isError,isLoading,isSuccess})}
//             showLoader={showLoader}
//         />
//     )
// }

import { useQuery } from "@tanstack/react-query"
import { BlurCard } from "../Cards/BlurCard"
import { LoaderResponse } from "./LoaderResponse"
import { useEffect } from "react"
import { AxiosResponse } from "axios"
//import { useParams, useSearchParams } from "react-router-dom"

interface LoaderQueryProps{
    onSuccess:(data:AxiosResponse)=>void,
    onError:(error:unknown)=>void
    queryKey:Array<unknown>,
    queryFn:()=>Promise<AxiosResponse>,
    children:React.ReactNode,
    loading?:boolean
}

export function LoaderQuery({onSuccess,onError,queryFn,queryKey,children,loading=true}:LoaderQueryProps){
    //const [searchParams] = useSearchParams()
    const {isSuccess,isError,isLoading,refetch} = useQuery({
        refetchOnMount:false,
        refetchOnWindowFocus:false,
        queryKey:queryKey,
        queryFn:async()=>await queryFn(),
        onSuccess:onSuccess,
        onError:onError
    })
    useEffect(()=>{
        refetch()
    },[])

    return (
            (isSuccess || (!loading && !isError)) ? children : 
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