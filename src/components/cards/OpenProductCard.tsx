import { ProductModel } from "../../models/Product";
import { TextButton } from "../Buttons/TextButtons";
import { Counter } from "../inputs/Counter/Counter";
import { BlurCard } from "./BlurCard";
import { CardImage } from "./CardImage";
import { Can } from "../../config/permissions/can";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useContext, useState } from "react";
import { DeleteProduct } from "../Buttons/DeleteProduct";
import { useCartService } from "../../services/cartService";
import { CartModel } from "../../models/cart";
import { addCart, updateCart } from "../../store/cartsSlice";
import { DialogContext } from "../Dialog/DialogContext";

export function OpenProductCard({product}:{product:ProductModel}){
    const dispatch = useDispatch()
    const [counter,setCounter] = useState(1)
    const {setOpen} = useContext(DialogContext)
    const store = useSelector((state:RootState)=>state.storeReducer.store)
    const carts = useSelector((state:RootState)=>state.cartsReducer.carts)

    const onProductAdd = async(product:ProductModel)=>{
        
        const cartIndex = carts.findIndex((cart)=>cart.store === store?.id)
        const order_item = {product_item:product.id!,product_quantity:counter}
        
        if(cartIndex!==-1){
            // the cart already exists , only update if
            const cart = useCartService.updateOrAddItem({cart:{...carts[cartIndex]},orderItem:order_item})
            console.log("CART")
            console.log(cart)
            const data = await useCartService.updateCart({cart})
            if(data){
                console.log("DATA CART")
                console.log(data)
                dispatch(updateCart(data))
            }
        } else{
            // create a new cart
            const cart:CartModel = {
                store:store?.id,
                order_items:[
                    order_item
                ]
            }
            const data  = await useCartService.createCart({cart})
            if(data){
                dispatch(addCart(data))
            }
            
        }
        setOpen(false)
    }

    return(
        <BlurCard className="rounded-xl" style={{padding:"0px"}}>
            <div className="w-[500px] flex flex-col gap-4 ">
                <CardImage image={product.image} className="rounded-t-xl"/>
                <div className="w-full flex flex-col gap-y-2 text-white px-4">
                    <h1 className="w-full text-3xl font-bold">{product.name}</h1>
                    <p>{product.description}</p>
                </div>
                <Counter counter={counter} setCounter={setCounter}/>
                <div className="w-full h-24 max-h-96 px-4 py-4 flex flex-row justify-center gap-x-2">
                    <TextButton
                        className="w-full max-w-[1000px] py-4  text-white"
                        text={`AGGIUNGI FOR ${product.price * counter}$`}
                        onClick={async()=>{
                            await onProductAdd(product)
                        }}
                />
                <Can I="delete" a="PRODUCT" this={store!}>
                    <DeleteProduct product={product}/>
                </Can>
                </div>
            </div>
        </BlurCard>    
    )
}