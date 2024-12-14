// Finish Component of the Stepper for the in line Stepper Mode
import { useContext, useEffect } from "react"
import { TextButton } from "../components/buttons/TextButtons"
import { AxiosError, AxiosResponse } from "axios"
import { StepperContext } from "../components/stepper/StepperContext"
import { SERVER_INTERNAL_ERROR_CODE } from "../constraints"
import { useMutation, useQuery } from "@tanstack/react-query"

interface FinishLineProps{
    button:{
        text:string,
        onClick:()=>void
    },
    queryKey:Array<unknown>,
    onSuccess:(data:AxiosResponse)=>void
    onError:(data:AxiosError)=>void
}
export function FinishLine({button:{text,onClick},queryKey,onSuccess,onError}:FinishLineProps){
    const {stepper:{state,setState,/*maxStep,getStepData*/singleLine,onFinish},record:{record},error:{setErrorStepper},finish:{finish,setFinish}} = useContext(StepperContext)
    //const data = useContext(StepperContext)
    const {isLoading,isError,isSuccess,refetch} = useQuery({
        queryFn:async ()=> {
            console.log("RECORD")
            console.log(record)
            return await onFinish([...record])
        },
        retry:0,
        enabled:false,
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
            setFinish(false)
        },
        onSuccess:(data:AxiosResponse)=>{
            setErrorStepper({})
            if(onSuccess) onSuccess(data)
        }
    })
  
    useEffect(()=>{
        if(finish ){
            refetch()
        }
    },[finish])

    


    return (
        <div className="w-full flex flex-col justify-center items-center">
            <TextButton
                text={text}
                onClick={()=>{
                    console.log("OK")
                    setFinish(true)
                    onClick()
                }}
            />
        </div>
    )
}