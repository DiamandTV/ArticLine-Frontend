import { FormOperationInterface } from "@models/forms/FormOperationType"
import { _Create } from "./StoreFormCreate"


export const StoreForm:FormOperationInterface<{}> = {
    Create:(props:{})=>{
        return <_Create  {...props}/>
    },
    Update:(props:StoreFormProps)=>{
        return <div></div>
    }
}