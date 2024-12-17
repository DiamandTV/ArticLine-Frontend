import { createSlice } from "@reduxjs/toolkit";
import { CartModel } from "../models/cart";
import { MAX_CART_LENGTH } from "../constraints";

export interface CartsSliceModel{
    carts:Array<CartModel>
}

const cartsInitalState:CartsSliceModel = {
    carts:[]
}

const cartsSlice = createSlice({
    name:'carts',
    initialState:cartsInitalState,
    reducers:{
        setCarts:(state,action)=>{
            state.carts = [...action.payload]
        },
        addCart:(state,action)=>{
            if(state.carts.length < MAX_CART_LENGTH){
                state.carts = state.carts.concat(action.payload)
            }
        },
        updateCart:(state,action)=>{
            const cartToUpdate = action.payload as CartModel
            state.carts = state.carts.map((cart)=>{
                if(cart.id === cartToUpdate.id) return cartToUpdate
                return cart
            })
            
        },
        // addProductToCart:(state,action)=>{
        //     const {cart,orderItem,store,filterCart} = useCartService.getCartFromCarts({payload:action.payload,carts:state.carts})
        //     if(cart && orderItem && store){
        //         const productId:number= orderItem.product_item.id!
        //         const productQuantity = orderItem.product_quantity
        //         const item:OrderItemModel = cart[productId] ? {...orderItem,product_quantity:productQuantity+cart[productId].product_quantity} : {...orderItem}
        //         cart.order_items.push(item)
        //         state.carts = [...filterCart,cart]
        //     }
        // },
        deleteOrderItemFromCart:(state,action)=>{
            const cart = action.payload as CartModel
            state.carts = state.carts.flatMap((_cart)=>{
                if(_cart.id === cart.id){
                    return cart.order_items.length ? [cart] : []
                }
                return [_cart]
            })
        },
        deleteCart:(state,action)=>{
            const cartToDelete = action.payload as CartModel
            state.carts = state.carts.filter((cart)=>cart.id !== cartToDelete.id)
        }
    }
})

export const {setCarts,addCart,updateCart,deleteOrderItemFromCart,/*addProductToCart,*/deleteCart,} = cartsSlice.actions
export const cartsReducer = cartsSlice.reducer