import { ImCheckmark } from "react-icons/im";
import { ImCross } from "react-icons/im";
import { ScaleLoader } from 'react-spinners';
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
export interface LoaderResponseProps{
    isError?:boolean,
    isWarning?:boolean,
    isSuccess?:boolean,
    isLoading:boolean,
    counterInitialValue?:number,
    redirect?:boolean,
    messages?:{
        error:string,
        success:string,
        warning?:string
    }
}
export function LoaderResponse({isError,isSuccess,isWarning,isLoading,messages,redirect=true,counterInitialValue=0}:LoaderResponseProps){
    const [counter,setCounter] = useState(counterInitialValue)
    const navigate = useNavigate()
    useEffect(()=>{
        if(redirect){
            const intervalCounterTimer = setTimeout(()=>{
                console.log(counter)
                if(counter > 0){
                    setCounter((value)=>value - 1)
                } 
                else if(counter <= 0 ){
                    
                    clearInterval(intervalCounterTimer)
                    navigate('/login')
                }
            },1000)
        return ()=>clearTimeout(intervalCounterTimer!)
        }
        
    },[counter,isSuccess])
    
    const getLoaderResponseIcon = ()=>{
        if(isWarning) return <ImCross size={32.5}/>
        else if(isError) return <ImCross size={32.5}/>
        else if(isSuccess) return <ImCheckmark size={32.5}/>
    }

    const getLoaderResponseChildren = ()=>{
        if(isWarning) return (<h1 className="pt-6 text-xl">{messages && messages.warning}</h1>)
        else if (isError) return (<h1 className="pt-6 text-xl">{messages && messages.error}</h1>)
        else if(isSuccess) return (<h1 className="pt-6 text-xl">{messages && messages.success}</h1>)
    }
    return (
        <div className="w-full flex flex-col items-center justify-center py-2">
        {isLoading && <ScaleLoader color="rgb(17 24 39)" width={10} height={100}/>}
        {(isError||isSuccess||isWarning) && 
            <>
                <div className={`p-6 sm:p-10 rounded-full ${isWarning ? "bg-yellow-500" : isSuccess ? "bg-green-600" : isError ? "bg-orange-red" : ""} `} >
                    {getLoaderResponseIcon()}
                </div>
                {getLoaderResponseChildren()}
                {redirect && <span className="text-sm">Your going to be redirected to the login page in {counter} seconds</span>}
            </>
        }
        </div>
    )
}