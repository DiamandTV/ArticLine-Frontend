import { CART_SECTOR } from "../constraints"
import { CartModel,OrderItemModel,StoreToCartModel } from "../models/Order"
import { StoreModel } from "../models/store"

export const useCartService = {
    saveCarts({cart}:{cart:StoreToCartModel}){
        const cartJSON = JSON.stringify(cart)
        localStorage.setItem(CART_SECTOR,cartJSON)
    },
    getCarts():StoreToCartModel{
        const cartsJSON = localStorage.getItem(CART_SECTOR)
        if(!cartsJSON) return {}
        try{
        const carts = JSON.parse(cartsJSON)
        return carts as StoreToCartModel
        }catch(e){
            console.log(e)
            return {}
        }
    },
    getCartFromCarts({payload,carts}:{payload:{store:StoreModel,orderItem:OrderItemModel},carts:StoreToCartModel}):{cart:CartModel|null,orderItem:OrderItemModel|null,store:StoreModel|null}{
        const storeId:number = (payload.store as StoreModel).id
        const orderItem = payload.orderItem as OrderItemModel
        if(orderItem && orderItem.product_item.id){
            const cartKeys = Object.keys(carts)
            const cart = cartKeys.indexOf(storeId.toString()) !== -1 ? carts[storeId] : {}
            return {cart,orderItem,store:payload.store as StoreModel}
        }
        return {store:null,cart:null,orderItem:null}
    },
    // not having the create Cart model because i will adding the items and if it exits it updates it or create it
    getCarts(){

    },
    updateCart(){

    },
    deleteCart(){

    }
}