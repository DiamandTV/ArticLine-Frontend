import { CART_SECTOR } from "../constraints"
import { CartModel } from "../models/cart"
import { OrderItemModel } from "../models/Order"
import { AxiosResponse } from "axios"
import { api } from "./api"
import { ProductModel } from "../models/Product"

export const useCartService = {
    // saveCarts({cart}:{cart:StoreToCartModel}){
    //     const cartJSON = JSON.stringify(cart)
    //     localStorage.setItem(CART_SECTOR,cartJSON)
    // },
    getCarts():Array<CartModel>{
        const cartsJSON = localStorage.getItem(CART_SECTOR)
        if(!cartsJSON) return []
        try{
        const carts = JSON.parse(cartsJSON)
        return carts as Array<CartModel>
        }catch(e){
            console.log(e)
            return []
        }
    },
    // getCartFromCarts({payload,carts}:{payload:{store:StoreModel,orderItem:OrderItemModel},carts:Array<CartModel>}):{filterCart:Array<CartModel>,cart:CartModel|null,orderItem:OrderItemModel|null,store:StoreModel|null}{
    //     const storeId:number = (payload.store as StoreModel).id
    //     const orderItem = payload.orderItem as OrderItemModel
    //     if(orderItem && orderItem.product_item.id){
    //         const cartIndex = carts.findIndex((cart)=>cart.store.id=storeId)
    //         const cart = carts[cartIndex]
    //         const _carts = carts.filter((_,index)=>index!==cartIndex)
    //         if (cart) return {cart,orderItem,filterCart:_carts,store:payload.store as StoreModel}
    //     }
    //     return {store:null,cart:null,orderItem:null}
    // },
    // not having the create Cart model because i will adding the items and if it exits it updates it or create it
    // getFetchCarts( {cart}:{cart:CartModel}){
        
    // },
    updateOrAddItem({cart,orderItem}:{cart:CartModel,orderItem:OrderItemModel}):CartModel{
        let finded = false
        const orderItems = cart.order_items.map((_orderItem)=>{
            if((_orderItem.product_item as ProductModel).id === orderItem.product_item){         
                finded = true
                return {..._orderItem,product_item:(_orderItem.product_item as ProductModel).id!,product_quantity:_orderItem.product_quantity + orderItem.product_quantity}
            }
            return {..._orderItem,product_item:(_orderItem.product_item as ProductModel).id!}
        })
        cart.order_items = orderItems
        if(!finded) cart.order_items.push(orderItem)
        return cart
    },
    // createNewCart({cart,orderItem}:{cart:CartModel,orderItem:OrderItemModel}){
    // },
    removeItem({cart,orderItem}:{cart:CartModel,orderItem:OrderItemModel}):CartModel{
        const order_items = [...cart.order_items.filter((_orderItem:OrderItemModel)=>_orderItem.id!==orderItem.id)]
        return {...cart,order_items:order_items}
    },
    async createCart({cart}:{cart:CartModel}):Promise<CartModel|null>{
        console.log(cart)
        try{
            
            const data =  await api.post('/store/carts',cart)
            if(data && (data as AxiosResponse).data){
                return data.data as CartModel
            }
        }catch(e){
            console.log(e)
        }
        return null
    },
    async updateCart({cart}:{cart:CartModel}):Promise<CartModel|null>{
        console.log(cart)
        try{    
            const data = await api.put(`/store/carts/${cart.id}/update`,cart)
            if(data && data.data){
                return data.data as CartModel
            }
        }catch(e){
            console.log(e)
        }
        return null
    },
    deleteCart({cart}:{cart:CartModel}){
        try{
            api.delete(`/store/carts/${cart.id}/delete`)
            return true
        } catch(e){
            console.log(e)
        }   
        return null
    },
    doesCartExist({cart}:{carts?:Array<CartModel>,cart:CartModel}){
        return cart.id ? true : false
    },
    getCartsList(){
        return api.get('/store/carts')
    },   
}