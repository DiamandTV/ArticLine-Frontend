import { useDispatch, useSelector } from "react-redux";
import { ProductForm, ProductFormFields } from "./ProductForm";
import { RootState } from "../../store/store";
import { TextButton } from "../buttons/TextButtons";
import { useMutation } from "@tanstack/react-query";
import { useProductService } from "../../services/productService";
import { ProductModel } from "../../models/Product";
import { checkForError } from "../../constraints";
import { useParams } from "react-router-dom";
import { updateStoreProduct } from "../../store/storeSlice";
import { useContext } from "react";
import { DrawerContext } from "../Drawer/DrawerContext";
import { DeleteProduct } from "../buttons/DeleteProduct";


export function ProductEdit({product}:{product:ProductModel}){
    const dispatch = useDispatch()
    const params = useParams()
    const store = useSelector((state:RootState)=>state.storeReducer.store)
    
    const {setOpen} = useContext(DrawerContext)
    const {mutateAsync} = useMutation({
        mutationKey:['store-edit-product'],
        mutationFn:async(product:ProductModel)=>{
            return await useProductService.updateProduct({product})
        },
        onSuccess:(data)=>{
            const actualStoreCategory = params['sub-category-id']
            if(data && data.data && actualStoreCategory){
                if((data.data as ProductModel).store_category.toString() === actualStoreCategory){
                    // add the product to the session only if the user is visualizing the same sub category of the product category
                    dispatch(updateStoreProduct(data.data))
                    // close the drawer
                    setOpen(false)       
                } 

            }
        }
    }) 
    
    
    return (
        store?.store_categories ? 
        <>
            <ProductForm 
                product={product}
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
                <div className="w-full h-14 flex flex-row  gap-x-2">
                    <TextButton
                        className="max-w-[1000px] w-full"
                        text="EDIT THE PRODUCT"
                        type="submit"
                        onClick={()=>{

                        }}
                    />
                    <DeleteProduct product={product}/>
                </div>
            </ProductForm>
        </>
        : null
    )
}