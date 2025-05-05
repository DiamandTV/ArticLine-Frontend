import { useEffect } from "react";
import { FieldValues, useFormContext } from "react-hook-form";


interface ResetDefaultProps<T extends FieldValues>{
    toFields:()=>Promise<T>
}
export function DefaultResetter<T extends FieldValues>({toFields}:ResetDefaultProps<T>){
    const context = useFormContext<T>()
    useEffect(()=>{
        const resetDefaultField = async()=>{
            if(context){
                const data = await toFields()
                console.log(data)
                context.reset(data)
            }
        }   
        resetDefaultField()
    },[])
    return null
}