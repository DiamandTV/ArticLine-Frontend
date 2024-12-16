import { createSlice } from "@reduxjs/toolkit";
import { CartModel } from "../models/cart";
import { useCartService } from "../services/cartService";
import { OrderItemModel } from "../models/Order";

// dealing the cart with the javascript Object and not Array
/*
{
    storeId:{
        productId:ORDER_ITEM_MODEL
    },
     storeId:{
        productId:ORDER_ITEM_MODEL
    },
     storeId:{
        productId:ORDER_ITEM_MODEL
    },
    ...
}
*/ 
export interface CartsSliceModel{
    carts:Array<CartModel>
}

const cartsInitalState:CartsSliceModel = {
    carts:[]
}

// const cartsSlice = createSlice({
//     name:'carts',
//     initialState:cartsInitalState,
//     reducers:{
//         addProductToCart:(state,action)=>{
//             const {cart,orderItem,store} = useCartService.getCartFromCarts({payload:action.payload,carts:state.carts})
//             if(cart && orderItem && store){
//                 const productId = orderItem.product_item.id!
//                 const productQuantity = orderItem.product_quantity
//                 const storeId = store.id
//                 const item:OrderItemModel = cart[productId] ? {...orderItem,product_quantity:productQuantity+cart[productId].product_quantity} : {...orderItem}
//                 state.carts = {...state.carts,
//                     [storeId]:
//                         {...state.carts[storeId],
//                             [productId]:item
//                         }}
//                 useCartService.saveCarts({cart:state.carts})
//             }
//         },
//         deleteProductFromCart:(state,action)=>{
//             const {cart,orderItem,store} = useCartService.getCartFromCarts({payload:action.payload,carts:state.carts})
//             if(cart && orderItem && store){
//                 const storeId = store.id
//                 const newItems = {...state.carts[storeId]}
//                 delete newItems[orderItem.product_item.id!]
                
//                 state.carts = {
//                     ...state.carts,
//                     [storeId]:newItems
//                 }
//                 if(!Object.keys(newItems).length) delete state.carts[storeId]
//                 useCartService.saveCarts({cart:state.carts})
//             }
//         },
//         deleteCart:(state,action)=>{
//             const store = action.payload.store as StoreModel
//             delete state.carts[store.id]
//             state.carts = {...state.carts}
//             useCartService.saveCarts({cart:state.carts})
//         }
        
//     }
// })

const cartsSlice = createSlice({
    name:'carts',
    initialState:cartsInitalState,
    reducers:{
        addProductToCart:(state,action)=>{
            const {cart,orderItem,store,filterCart} = useCartService.getCartFromCarts({payload:action.payload,carts:state.carts})
            if(cart && orderItem && store){
                const productId:number= orderItem.product_item.id!
                const productQuantity = orderItem.product_quantity
                const item:OrderItemModel = cart[productId] ? {...orderItem,product_quantity:productQuantity+cart[productId].product_quantity} : {...orderItem}
                cart.order_items.push(item)
                state.carts = [...filterCart,cart]
            }
        },
        deleteProductToCart:(state,action)=>{

        },
        deleteCart:(state,action)=>{

        }
    }
})

export const {} = cartsSlice.actions
export const cartsReducer = cartsSlice.reducer