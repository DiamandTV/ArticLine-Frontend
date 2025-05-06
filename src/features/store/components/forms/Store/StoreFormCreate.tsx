import { StoreInfoFields, StoreInfoFieldsProvider } from "../../fields/Store/StoreFields";
import { storeInfoFieldsTransformedSchema, StoreInfoFieldsType } from "@features/store/model/Store/Fields/StoreFields";
import { useMutation } from "react-query";
import { storeBusinessServices } from "@features/store/services/storeBusinessServices";
import { FormCreateButton } from "@components/buttons/FormCreateButton/FormCreateButton";

export function Create(){
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
    const mutationResults = useMutation({
        mutationKey:['create-store'],
        mutationFn:async(params:StoreInfoFieldsType)=>{
            return await storeBusinessServices.create(storeInfoFieldsTransformedSchema.parse(params))
        },
        onSuccess:(data)=>{
            // todo:send to the list of pages
            console.log(data)
        },
        onError:()=>{
            
        }
    })
    return(
        <FormCreateButton<StoreInfoFieldsType>
            mutationResult={mutationResults}
            schema={storeInfoFieldsTransformedSchema}
        />
    )
}

// function CreateButton(){
//     const {trigger,getValues,setError} = useFormContext<StoreInfoFieldsType>()
//     const {isLoading,mutateAsync} = useMutation({
//         mutationKey:['create-store'],
//         mutationFn:async(params:StoreInfoFieldsType)=>{
//             await storeBusinessServices.create(storeInfoFieldsTransformedSchema.parse(params))
//         },
//         onSuccess:(data)=>{
//             // todo:send to the list of pages
//             console.log(data)
//         },
//         onError:(err)=>{
//             if(err instanceof AxiosError){
//                 const errorReponse = err.response?.data as ServerErrorsAndTypeInterface
//                 if(errorReponse && errorReponse?.type === 'validation_error'){
//                     const errors = errorReponse.errors
//                     errors.forEach((err)=>{
//                         const attr = err.attr as string                      
//                         setError(attr as keyof StoreInfoFieldsType,{message:err.detail,type:'custom'},{shouldFocus:true})   
//                     })
//                 }
//             }
//         }
//     })
//     const onClick = async(event:React.MouseEvent)=>{
//         event.stopPropagation()
//         const isNotError = await trigger(storeInfoFieldsSchema.keyof().options,{shouldFocus:true})
//         if(isNotError){
//             //
//             const values = storeInfoFieldsSchema.parse(getValues())
//             console.log(values)
//             await mutateAsync(values)
//         }
//     }
//     return(
//         <Button className="w-full" onClick={onClick}>
//             {isLoading ? <Spinner animation="border" /> : "CREATE"}
//         </Button>
//     )
// }