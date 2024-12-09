
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