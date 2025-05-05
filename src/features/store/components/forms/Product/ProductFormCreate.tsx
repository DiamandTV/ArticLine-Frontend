import { useFormContext } from "react-hook-form";
import { ProductFields, ProductInfoFieldsProvider } from "../../fields/Product/ProductFields";
import { productInfoFieldsSchema, ProductInfoFieldsType } from "@features/store/model/Product/Fields/ProductFields";
import { useMutation } from "react-query";
import { storeBusinessProductServices } from "@features/store/services/storeBusinessProductService";
import { useParams } from "react-router";
import { Button, Spinner } from "react-bootstrap";
import { AxiosError } from "axios";
import { ServerErrorsAndTypeInterface } from "@models/ApiResponse/ErrorResponse/ServerErrorResponseInterface";
import { FormCreateButton } from "@components/buttons/FormCreateButton/FormCreateButton";

export function Create(){
    return(
        <div className="w-full flex flex-col gap-2 ">
            <ProductInfoFieldsProvider>
                <ProductFields />
                <CreateButton/>
            </ProductInfoFieldsProvider>
        </div>
    )
}

function CreateButton(){
    const params = useParams()
    const storeId = params['store-id']
    const storeCategoryId = params['store-category-id']
    const mutationResults = useMutation({
        mutationKey:['create-product'],
        mutationFn:async(productInfo:ProductInfoFieldsType)=>{
            console.log(storeId)
            console.log(storeCategoryId)
            if(storeId && storeCategoryId){
                return await storeBusinessProductServices.create(Number(storeId),Number(storeCategoryId),productInfo)
            }
            return Promise.reject()
        },
        onError:(err)=>{
            // if(err instanceof AxiosError){
            //     const errorReponse = err.response?.data as ServerErrorsAndTypeInterface
            //     if(errorReponse && errorReponse?.type === 'validation_error'){
            //         const errors = errorReponse.errors
            //         errors.forEach((err)=>{
            //             const attr = err.attr as string                      
            //             setError(attr as keyof ProductInfoFieldsType,{message:err.detail,type:'custom'},{shouldFocus:true})   
            //         })
            //     }
            // }
            
        },
        onSuccess:(data)=>{
            // todo:send to the list of pages
            console.log(data)
        }
    })
    return(
        <FormCreateButton<ProductInfoFieldsType>
            mutationResult={mutationResults}
            schema={productInfoFieldsSchema}
        />
    )
}

// function CreateButton(){
//     const params = useParams()
//     const storeId = params['store-id']
//     const storeCategoryId = params['store-category-id']
//     const {trigger,getValues,setError} = useFormContext<ProductInfoFieldsType>()
//     const {isLoading,mutateAsync} = useMutation({
//         mutationKey:['create-product'],
//         mutationFn:async(productInfo:ProductInfoFieldsType)=>{
//             console.log(storeId)
//             console.log(storeCategoryId)
//             if(storeId && storeCategoryId){
//                 return await storeBusinessProductServices.create(Number(storeId),Number(storeCategoryId),productInfo)
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
//                         setError(attr as keyof ProductInfoFieldsType,{message:err.detail,type:'custom'},{shouldFocus:true})   
//                     })
//                 }
//             }
//         },
//         onSuccess:(data)=>{
//             // todo:send to the list of pages
//             console.log(data)
//         }
//     })
//     const onClick = async(event:React.MouseEvent)=>{
//         event.stopPropagation()
//         const isNotError = await trigger(productInfoFieldsSchema.keyof().options,{shouldFocus:true})
//         if(isNotError){
//             //
//             const values = productInfoFieldsSchema.parse(getValues())
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