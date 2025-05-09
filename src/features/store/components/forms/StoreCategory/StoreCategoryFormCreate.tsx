import { StoreCategoryFields, StoreCategoryInfoFieldsProvider } from "../../fields/StoreCategory/StoreCategoryFields";
import {  storeCategoryInfoFieldsSchema, StoreCategoryInfoFieldsType } from "@features/store/model/StoreCategory/Fields/StoreCategoryFields";
import { useMutation } from "react-query";
import { storeBusinessCategoryServices } from "@features/store/services/storeBusinessCategoryService";
import { useContext } from "react";
import { BottomSheetModalContext } from "@context/BottomSheetModal/BottomSheetModalContext";
import { FormCreateButton } from "@components/buttons/FormCreateButton/FormCreateButton";
import { StoreCategoryFormProps } from "./StoreCategoryForm";
import { storeCategoryCacheKey } from "@features/store/data/query";

export function Create(params:StoreCategoryFormProps){
    if(!params) return null
    return(
        <div className="w-full flex flex-col gap-2 ">
            <StoreCategoryInfoFieldsProvider>
                <StoreCategoryFields/>
                <CreateButton {...params}/>
            </StoreCategoryInfoFieldsProvider>
        </div>
    )
}

function CreateButton(params:StoreCategoryFormProps){
    const {storeId} = params
    const {setOpen} = useContext(BottomSheetModalContext) 
    const mutationResults = useMutation({
        mutationKey:[storeCategoryCacheKey.create],
        mutationFn:async(storeCategoryInfo:StoreCategoryInfoFieldsType)=>{
            console.log(storeCategoryInfo)
            return await storeBusinessCategoryServices.create(Number(storeId),storeCategoryInfo)
        },
        onSuccess:(data)=>{
            // todo: save this in the cache
            console.log(data)
            setOpen(false)
        }
    })
    return(
        <FormCreateButton<StoreCategoryInfoFieldsType>
            mutationResult={mutationResults}
            schema={storeCategoryInfoFieldsSchema}
        />
    )
}

// // todo: create a generic create button to DRY
// function CreateButton(){
//     const {setOpen} = useContext(BottomSheetModalContext)
//     const params = useParams()
//     const {trigger,getValues,setError} = useFormContext<StoreCategoryInfoFieldsType>()
//     const {isLoading,mutateAsync} = useMutation({
//         mutationKey:['create-store-category'],
//         mutationFn:async(storeCategoryInfo:StoreCategoryInfoFieldsType)=>{
//             const storeId = params['store-id']
//             if(storeId){
//                 return await storeBusinessCategoryServices.create(Number(storeId),storeCategoryInfo)
//             }
//             return Promise.reject()
//         },
//         onError:(err)=>{
//             if(err instanceof AxiosError){
//                 const errorReponse = err.response?.data as ServerErrorsAndTypeInterface
//                 if(errorReponse && errorReponse?.type === 'validation_error'){
//                     const errors = errorReponse.errors
//                     errors.forEach((err)=>{
//                         const attr = err.attr as string                      
//                         setError(attr as keyof StoreCategoryInfoFieldsType,{message:err.detail,type:'custom'},{shouldFocus:true})   
//                     })
//                 }
//             }
//         },
//         onSuccess:(data)=>{
//             // todo: save this in the cache
//             console.log(data)
//             setOpen(false)
//         }
//     })
//     const onClick = async()=>{
//         const isNotError = await trigger(undefined,{shouldFocus:true})
//         if(isNotError){
//             const values = getValues()
//             await mutateAsync(values)
//         } 
//     }
//     return(
//         <Button variant="primary" onClick={onClick}>
//             {isLoading ? <Spinner animation="border"/> : "CREATE"}
//         </Button>
//     )
// }