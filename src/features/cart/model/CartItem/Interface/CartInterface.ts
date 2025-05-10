export interface CartItemInterface{
    id:number,
    product_quantity:number,
    product_item:{
        id:number,
        image:string,
        name:string,
        price:number,
        store_category:{
            id:number,
            name:string
        }
    }
}