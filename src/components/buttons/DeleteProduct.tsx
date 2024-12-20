import { useDispatch } from "react-redux";
import { ProductModel } from "../../models/Product";
import { useProductService } from "../../services/productService";
import { DeleteButton } from "./DeleteButton";
import { useContext } from "react";
import { DrawerContext } from "../Drawer/DrawerContext";
import { deleteStoreProduct } from "../../store/storeSlice";

export function DeleteProduct({product}:{product:ProductModel}){
    const dispatch = useDispatch()
    const {setOpen} = useContext(DrawerContext)
    return (
        <DeleteButton
            className=""
            onClick={()=>{
                try{
                    // delete this product and remove it from the actual store session
                    useProductService.deleteProduct({product})
                    dispatch(deleteStoreProduct(product))    
                    if(setOpen) setOpen(false)
                
                }catch(e){
                    console.log(e)
                }
            }}
        />
    )
}
