//!!! ACTUAL STORE VISUALIZING SESSION
import { createSlice } from "@reduxjs/toolkit";
import { StoreModel } from "../models/store";
import { PaginationModel } from "../models/pagination";
import { ProductModel } from "../models/Product";
import { StoreCategoriesModel } from "../models/StoreCategories";
import { CartModel } from "../models/cart";

export interface StoreDetailsModel{
    store:StoreModel | null,
    cart:CartModel | null,
    //productPage:number,
    products:Array<ProductModel>|null,
    pageCountCategories:Record<string,number> | null,
    pagination:Omit<PaginationModel,'results'> |null
}

const storeIntialValues:StoreDetailsModel = {
    store:null,
    cart:null,
    pageCountCategories:null,
    products:null,
    pagination:null
}

const storeSlice = createSlice({
    name:"store-details",
    initialState:storeIntialValues,
    reducers:{
        setStoreDetails:(state,action)=>{
            state.cart = action.payload.carts
            delete action.payload.carts
            state.store = action.payload
            const pageCount:Record<string,number> = {};
            state.store?.store_categories?.forEach((subCategorie)=>{
                pageCount[subCategorie!.id!.toString()] = 1
            })
            state.pageCountCategories = {...pageCount}
        },
        updateStoreDetails:(state,action)=>{
            state.store = {...action.payload}
        },
        deleteStoreCategory:(state,action)=>{
            const storeCategoryToDelete = action.payload as StoreCategoriesModel
            console.log(state.store)
            if(state.store && state.store.categories){
                const storeCategories = [...state.store!.store_categories!.filter((category)=>{
                    if(category.id === storeCategoryToDelete.id) return false
                    return true
                })]
                state.store = {...state.store,store_categories:[...storeCategories]}
                // if the product store category is the same of the store cateogory to delete, delete also the products
                if(state.products?.length && state.products[0].store_category === storeCategoryToDelete.id){
                    state.products = []
                }
            }
        },
        updateStoreCategories:(state,action)=>{
            const store_categories:StoreCategoriesModel[] = action.payload
            if(state.store && store_categories){
                state.store = {...state.store,store_categories:[...store_categories]}
                
            }
        },
        updateStoreCategory:(state,action)=>{
            if(state.store && state.store?.store_categories){;
                const storeCategoryToUpdate = action.payload as StoreCategoriesModel
                const storeCategories:Array<StoreCategoriesModel> = state.store.store_categories.map((category)=>{
                    if(category.id === storeCategoryToUpdate.id) return storeCategoryToUpdate
                    return category
                })
                state.store = {...state.store,store_categories:[...storeCategories]}
            }
        },
        clearStoreDetails:(state)=>{
            state.store = null;
            state.pageCountCategories = null;
        },
        addStoreCategory:(state,action)=>{
            if(!state.store) return; 
            const storeCategories = !state.store.store_categories ? [action.payload] : [...(state.store.store_categories!),action.payload]
            state.store = {...state.store,store_categories:storeCategories}
        },
        addStoreProduct:(state,action)=>{
            const products = !state.products ? [action.payload] : [...(state.products),action.payload]
            state.products = products
        },
        updateStoreProduct:(state,action)=>{
            if(!state.products) return;
            const productToUpdate = action.payload as ProductModel
            state.products = [...state.products.map((product)=>{
                if(product.id===productToUpdate.id) return productToUpdate
                return product
            })]
        },
        deleteStoreProduct:(state,action)=>{
            if(!state.products) return;
            const productToDelete = action.payload as ProductModel
            state.products = [...state.products.filter((product)=>product.id!==productToDelete.id)]
        },
        setCategoriesAndPagination:(state,action)=>{
            const pagination:PaginationModel = action.payload
            state.pagination = {...pagination}
            console.log(pagination.results)
            state.products = [...(pagination.results as Array<ProductModel>)]
        },
        setPageForCategory:(state,action)=>{
            const storeCategoryID = action.payload.storeCategoryId
            state.pageCountCategories = {...state.pageCountCategories,[storeCategoryID]:action.payload.page} 
        },
    }
})

export const {setStoreDetails,updateStoreDetails,deleteStoreCategory,updateStoreCategories,updateStoreCategory,deleteStoreProduct,clearStoreDetails,addStoreCategory,setCategoriesAndPagination,setPageForCategory,addStoreProduct,updateStoreProduct} = storeSlice.actions
export const storeReducer = storeSlice.reducer