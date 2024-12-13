import { useDispatch, useSelector } from "react-redux";
import { ProductForm, ProductFormFields } from "./ProductForm";
import { RootState } from "../../store/store";
import { TextButton } from "../buttons/TextButtons";
import { useMutation } from "@tanstack/react-query";
import { useProductService } from "../../services/productService";
import { ProductModel } from "../../models/Product";
import { checkForError } from "../../constraints";
import { useParams } from "react-router-dom";
import { addStoreProduct } from "../../store/storeSlice";


export function ProductCreate(){
    const dispatch = useDispatch()
    const params = useParams()
    const store = useSelector((state:RootState)=>state.storeReducer.store)
    
    const {mutateAsync} = useMutation({
        mutationKey:['store-create-product'],
        mutationFn:async(product:ProductModel)=>{
            return await useProductService.createProduct({product,storeId:product.store,storeCategoryId:product.store_category})
        },
        onSuccess:(data)=>{
            const actualStoreCategory = params['sub-category-id']
            if(data && data.data && actualStoreCategory){
                if((data.data as ProductModel).store_category.toString() === actualStoreCategory){
                    // add the product to the session only if the user is visualizing the same sub category of the product category
                    dispatch(addStoreProduct(data.data))
                } 

            }
        }
    }) 
    
    
    return (
        store?.store_categories ? 
        <>
            <ProductForm 
                store_categorys={store?.store_categories}
                onSubmitForm={async (productData:ProductFormFields)=>{
                    if(!store.store_categories) return;
                    const formattedData = useProductService.serilizeProductData({productData,store,storeCategories:store.store_categories})
                    console.log("FORMETTED")
                    console.log(formattedData)
                    if(formattedData){
                        try{
                            await mutateAsync(formattedData)   
                        } catch(e){
                            return checkForError(e)
                        }
                    }
                }}
                >
                <TextButton
                    text="CREATE THE PRODUCT"
                    type="submit"
                    onClick={()=>{

                    }}
                />
            </ProductForm>
        </>
        : null
    )
}