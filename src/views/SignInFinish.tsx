import { useContext, useEffect, useLayoutEffect, useState } from "react"
import { StepperContext } from "../components/stepper/StepperContext"
import { StepperButtons } from "../components/stepper/StepperButtons"
import { useQuery } from '@tanstack/react-query' 
import { AxiosError } from "axios"
import { ImCheckmark } from "react-icons/im";
import { ImCross } from "react-icons/im";
import { ScaleLoader } from 'react-spinners';
// last step on the finish of the sing in
export function SigninFinish(){
    const {stepper:{onFinish,state,setState},record:{record},error:{setErrorStepper}} = useContext(StepperContext)
    const [enable,setEnable] = useState(true)
    const [counter,setCounter] = useState(10)
    const {isLoading,isError,isSuccess,/*refetch*/} = useQuery({
        queryFn:async ()=> await onFinish(record),
        retry:2,
        queryKey:["user-Signin"],
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

    useEffect(()=>{
        console.log(isSuccess)
        if(isSuccess){
            
            const intervalCounterTimer = setInterval(()=>{
                if(counter > 0) setCounter((value)=>value-1)
                else clearInterval(intervalCounterTimer)
            },1000)
        return ()=>clearInterval(intervalCounterTimer!)
        }
        
    },[])

    // remove the comment in the future , use this only in the production
    /*
    useEffect(()=>{
        const fetch = async ()=> await refetch()
        fetch()
    },[])
    */

    return (
        <div>
            <div className="w-full flex flex-col items-center justify-center py-2">
            {isLoading && <ScaleLoader color="rgb(17 24 39)" width={10} height={100}/>}
            {(isError||isSuccess) && 
                <>
                    <div className={`p-6 sm:p-10 rounded-full ${isError ? "bg-orange-red" : isSuccess ? "bg-green-600" : ""} `} >
                        {isError && <ImCross size={35} />}
                        {isSuccess && <ImCheckmark size={35}/>}
                    </div>
                    {isError && <h1 className="pt-6 text-xl">SOMETHING WENT WRONG</h1>}
                    {isSuccess && 
                        <div>
                            <h1 className="pt-6 text-xl">ACCOUNT CREATED. VERIFY IT !!!</h1>
                            <span>Your going to be redirected to the login page in {counter} seconds</span>
                        </div>
                    }
                </>
            }
            </div>
            { isError &&
                <StepperButtons
                    onNextClick={()=>{}}
                    onPreviousClick={()=>{setState(state - 1)}}
                />
            }   
        </div>        
    )
}