import { useContext } from "react"
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
    const {isLoading,isError,isSuccess} = useQuery({
        queryFn:async ()=> await onFinish(record),
        retry:2,
        queryKey:["user-Signin"],
        onError:(err)=>{
            if( err instanceof AxiosError){
                console.log(err.response?.data)
                setErrorStepper(err.response?.data)

            }
        },
        onSuccess:()=>{
            console.log()
        }
    })

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
                    <h1 className="pt-6 text-xl">SOMETHING WENT WRONG</h1>
                </>
            }
            </div>
            <StepperButtons
                onNextClick={()=>{}}
                onPreviousClick={()=>{setState(state - 1)}}
            />   
        </div>        
    )
}