import { useContext , useEffect } from "react"
import { StepperContext } from "../components/Stepper/StepperContext"
import { StepperButtons } from "../components/Stepper/StepperButtons"
import { useQuery } from '@tanstack/react-query' 
import { AxiosError, AxiosResponse } from "axios"
import { LoaderResponse } from "../components/Loader/LoaderResponse"
import { SERVER_INTERNAL_ERROR_CODE } from "../constraints"

interface FinishProps{
    //queryFn:Promise<AxiosResponse>,
    queryKey:Array<string>,
    onSuccess?:(data:AxiosResponse)=>void,
    loader:{
        message:{
            error:string,
            success:string,
            warning?:string
        },
        redirect:(data:{isLoading:boolean,isError:boolean,isSuccess:boolean})=>boolean,
        
    }
}


// last step on the finish of the sing in
export function Finish({queryKey,onSuccess,loader}:FinishProps){
    const {stepper:{onFinish,state,setState,/*maxStep,getStepData*/singleLine},record:{record},error:{setErrorStepper}} = useContext(StepperContext)
    const {isLoading,isError,isSuccess,refetch} = useQuery({
        queryFn:async ()=> await onFinish(record),
        retry:2,
        refetchOnWindowFocus:false,
        // account === user || company , so it works for the user and the company
        //queryKey:["account-signin"],
        queryKey:queryKey,
        //enabled:false,
        onError:(err)=>{
            if( err instanceof AxiosError && err.status != SERVER_INTERNAL_ERROR_CODE){
                /*
                const allKeys =  []
                for(let ii=0;ii<maxStep;ii++){
                    const {formsKeys} = getStepData(ii)
                    allKeys.push(...formsKeys)
                }
                
                */
               // todo: before visualizing hte errore check if the errorr that is going to be shown is a part of the forms keys
               try{
                    if(err.response?.data){
                        console.log(err.response?.data)
                        setErrorStepper(err.response?.data)
                    }
               }catch(e){
                console.log(e)
               }
                   
                
            }
        },
        onSuccess:(data:AxiosResponse)=>{
            setErrorStepper({})
            if(onSuccess) onSuccess(data)
        }
    })
  
    // remove the comment in the future , use this only in the production
    
    useEffect(()=>{
        console.log("OK")
        const fetch = async ()=> await refetch()
        fetch()
    },[])
    

    return (
        <div>
           <LoaderResponse
                counterInitialValue={10}
                isError={isError}
                isLoading={isLoading}
                isSuccess={isSuccess}
                /*
                messages={{
                    error:"SOMETHING WENT WRONG",
                    success:"ACCOUNT CREATED"
                }}
                    */
                messages={loader.message}
                redirect={loader.redirect({isLoading,isError,isSuccess})}
                
            />
            { isError &&
                <StepperButtons
                    onNextClick={()=>{}}
                    onPreviousClick={()=>{setState(state - 1)}}
                />
            }   
        </div>        
    )
}