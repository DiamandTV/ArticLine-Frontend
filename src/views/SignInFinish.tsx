import { useContext , useState } from "react"
import { StepperContext } from "../components/stepper/StepperContext"
import { StepperButtons } from "../components/stepper/StepperButtons"
import { useQuery } from '@tanstack/react-query' 
import { AxiosError } from "axios"
import { LoaderResponse } from "../components/loader/LoaderResponse"

// last step on the finish of the sing in
export function SigninFinish(){
    const {stepper:{onFinish,state,setState},record:{record},error:{setErrorStepper}} = useContext(StepperContext)
    const [enable,setEnable] = useState(true)
    const {isLoading,isError,isSuccess,/*refetch*/} = useQuery({
        queryFn:async ()=> await onFinish(record),
        retry:2,
        // account === user || company , so it works for the user and the company
        queryKey:["account-signin"],
        //enabled:false,
        enabled:enable, // remove this in the future , use this only for production
        onError:(err)=>{
            if( err instanceof AxiosError){
                console.log(err.response?.data)
                setErrorStepper(err.response?.data)
            }
        },
        onSuccess:()=>{
            setEnable(false)
            setErrorStepper({})
        }
    })
  
    // remove the comment in the future , use this only in the production
    /*
    useEffect(()=>{
        const fetch = async ()=> await refetch()
        fetch()
    },[])
    */

    return (
        <div>
           <LoaderResponse
                counterInitialValue={10}
                isError={isError}
                isLoading={isLoading}
                isSuccess={isSuccess}
                messages={{
                    error:"SOMETHING WENT WRONG",
                    success:"ACCOUNT CREATED"
                }}
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