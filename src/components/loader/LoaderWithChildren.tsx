import { LoaderResponse } from "./LoaderResponse"
import { LoaderResponseProps } from "./LoaderResponse"
export interface LoaderWithChildrenProps{
    children:React.ReactNode,
    loader:LoaderResponseProps,
    showLoader?:boolean,
    showLoaderCondition:()=>boolean
}

export function LoaderWithChildren({children,loader:{isLoading,isError,isSuccess,isWarning,messages,redirect=false,counterInitialValue = 0},showLoaderCondition,showLoader=false}:LoaderWithChildrenProps){
    return(
        (showLoader && showLoaderCondition()) ? 
        <LoaderResponse
            isLoading={isLoading}
            isError={isError}
            isSuccess={isSuccess}
            isWarning={isWarning}
            messages={messages}
            counterInitialValue={counterInitialValue}
            redirect={redirect}
        /> 
        : 
        <>{children}</>
    )
}