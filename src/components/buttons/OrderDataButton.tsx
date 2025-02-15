import { useNavigate } from "react-router-dom"
import { TextButton } from "./TextButtons"


export function OrderDataButton({orderBatchId}:{orderBatchId:string|number}){
    const navigate = useNavigate()
    return (
        <div className="h-full flex flex-row justify-center items-center">
             <TextButton
                 text="DATA"
                 className="h-10 flex flex-row text-white"
                 onClick={()=>{
                    navigate(`/order/batch/${orderBatchId}/inactive/data`)
                 }}
             />
         </div>
         
     )
}