import { useFormContext } from "react-hook-form";
import { StoreInfoFields, StoreInfoFieldsProvider } from "../../fields/Store/StoreFields";
import { storeInfoFieldsSchema, StoreInfoFieldsType } from "@features/store/model/Store/Fields/StoreFields";
import { Button } from "react-bootstrap";
import { useMutation } from "react-query";

export function _Create(){
    return(
        <div className="w-full flex flex-col gap-2 ">
            <StoreInfoFieldsProvider>
                <StoreInfoFields />
                <CreateButton/>
            </StoreInfoFieldsProvider>
        </div>
    )
}

function CreateButton(){
    const {trigger,getValues} = useFormContext<StoreInfoFieldsType>()
    const {} = useMutation({
        mutationKey:['create-store'],
        mutationFn:async(params:StoreInfoFieldsType)=>{}
    })
    const onClick = async(event:React.MouseEvent)=>{
        event.stopPropagation()
        const isNotError = await trigger(storeInfoFieldsSchema.keyof().options,{shouldFocus:true})
        if(isNotError){
            //
            const values = storeInfoFieldsSchema.parse(getValues())
            console.log(values)
        }else{
            alert("ERROR")
        }
    }
    return(
        <Button className="w-full" onClick={onClick}>
            CREATE
        </Button>
    )
}