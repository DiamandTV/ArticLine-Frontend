import { Dialog, DialogContent } from "@mui/material";
import { ProductModel } from "../../models/Product";
import { useContext } from "react";
import { ProductCard } from "./ProductCard";
import { DialogContext } from "../Dialog/DialogContext";
import { OpenProductCard } from "./OpenProductCard";

export function DialogProductCard({product}:{product:ProductModel}){
    const {open,setOpen} = useContext(DialogContext)
    return(
        <>
            <Dialog 
                maxWidth="lg"
                open={open} 
                onClose={()=>setOpen(false)}
                PaperProps={{
                    style:{
                        backgroundColor:"transparent"
                    }
                }}
                >
                <DialogContent>
                    <OpenProductCard product={product}/>
                </DialogContent>
                
            </Dialog>
            <ProductCard 
                product={product}
            />
        </>
    )
}