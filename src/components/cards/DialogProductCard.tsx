import { Dialog } from "@mui/material";
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
                        backgroundColor:"#0f172a",
                        padding:"0px",
                        margin:"0px"
                    }
                }}
                sx={{
                    "& .MuiDialogContent-root":{
                        padding:"0px",
                        backgroundColor:"#0f172a"
                    }
                }}
                >
                <OpenProductCard product={product}/>
            </Dialog>
            <ProductCard 
                product={product}
            />
        </>
    )
}