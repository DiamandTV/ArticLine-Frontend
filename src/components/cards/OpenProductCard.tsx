import { ProductModel } from "../../models/Product";
import { TextButton } from "../Buttons/TextButtons";
import { Counter } from "../inputs/Counter/Counter";
import { BlurCard } from "./BlurCard";
import { CardImage } from "./CardImage";
import { Can } from "../../config/permissions/can";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { DeleteButton } from "../Buttons/DeleteButton";
import { useContext, useState } from "react";
import { addProductToCart } from "../../store/cartsSlice";
import { OrderItemModel } from "../../models/Order";
import { DialogContext } from "../Dialog/DialogContext";

export function OpenProductCard({product}:{product:ProductModel}){
    const dispatch = useDispatch()
    const [counter,setCounter] = useState(1)
    const {setOpen} = useContext(DialogContext)
    const store = useSelector((state:RootState)=>state.storeReducer.store)
    
    return(
        <BlurCard className="p-0 w-96" style={{padding:"0px"}}>
            <div className="w-[500px] flex flex-col gap-4">
                <CardImage image={product.image}/>
                <div className="w-full flex flex-col gap-y-2 text-white px-4">
                    <h1 className="w-full text-3xl font-bold">{product.name}</h1>
                    <p>{product.description}</p>
                </div>
                <Counter counter={counter} setCounter={setCounter}/>
                <div className="w-full h-24 max-h-96 px-4 py-4 flex flex-row justify-center gap-x-2">
                    <TextButton
                        className="w-full max-w-[1000px] py-4  text-white"
                        text={`AGGIUNGI FOR ${product.price * counter}$`}
                        onClick={()=>{
                            // add this item to the this store cart
                            const orderItem:OrderItemModel = {
                                product_item:product,
                                product_quantity:counter
                            }
                            dispatch(addProductToCart({store,orderItem}))
                            // close the dialog after the product has been added to the cart
                            setOpen(false)
                    }}
                />
                <Can I="delete" a="PRODUCT" this={store!}>
                    <DeleteButton onClick={()=>{

                    }}/>
                </Can>
                </div>
            </div>
        </BlurCard>    
    )
}