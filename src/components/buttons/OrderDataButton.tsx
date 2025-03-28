import { useNavigate } from "react-router-dom"
import { TextButton } from "./TextButtons"

interface OrderDataButtonProps{
    onClick?:()=>void,
}

export function OrderDataButton({onClick}:OrderDataButtonProps){
    return (
        <div className="h-full flex flex-row justify-center items-center">
             <TextButton
                 text="DATA"
                 className="h-10 flex flex-row text-white"
                //  onClick={()=>{
                //     navigate(`/order/batch/${orderBatchId}`)
                //  }}
                onClick={onClick}
             />
         </div>
         
     )
}

export function OrderDataButtonLink({link}:{link:string}){
    const navigate = useNavigate()
    return <OrderDataButton onClick={()=>navigate(link)}/>
}