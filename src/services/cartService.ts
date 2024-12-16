import { CART_SECTOR } from "../constraints"
import { CartModel } from "../models/cart"
import { OrderItemModel } from "../models/Order"
import { StoreModel } from "../models/store"
import { api } from "./api"

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
    getCartFromCarts({payload,carts}:{payload:{store:StoreModel,orderItem:OrderItemModel},carts:Array<CartModel>}):{filterCart:Array<CartModel>,cart:CartModel|null,orderItem:OrderItemModel|null,store:StoreModel|null}{
        const storeId:number = (payload.store as StoreModel).id
        const orderItem = payload.orderItem as OrderItemModel
        if(orderItem && orderItem.product_item.id){
            const cartIndex = carts.findIndex((cart)=>cart.store.id=storeId)
            const cart = carts[cartIndex]
            const _carts = carts.filter((_,index)=>index!==cartIndex)
            if (cart) return {cart,orderItem,filterCart:_carts,store:payload.store as StoreModel}
        }
        return {store:null,cart:null,orderItem:null}
    },
    // not having the create Cart model because i will adding the items and if it exits it updates it or create it
    // getFetchCarts( {cart}:{cart:CartModel}){
        
    // },
    createCart({cart}:{cart:CartModel}){
        return api.post('/store/carts',{cart})
    },
    updateCart({cart}:{cart:CartModel}){
        return api.put(`/store/carts/${cart.id}/update`)
    },
    deleteCart({cart}:{cart:CartModel}){
        return api.delete(`/store/carts/${cart.id}/delete`)
    },
    doesCartExist({cart}:{carts?:Array<CartModel>,cart:CartModel}){
        return cart.id ? true : false
    }    
}