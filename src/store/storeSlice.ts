//!!! ACTUAL STORE VISUALIZING SESSION
import { createSlice } from "@reduxjs/toolkit";
import { StoreModel } from "../models/store";
import { PaginationModel } from "../models/pagination";
import { ProductModel } from "../models/Product";

export interface StoreDetailsModel{
    store:StoreModel | null,
    //productPage:number,
    products:Array<ProductModel>|null,
    pageCountCategories:Record<string,number> | null,
    pagination:Omit<PaginationModel,'results'> |null
}

const storeIntialValues:StoreDetailsModel = {
    store:null,
    pageCountCategories:null,
    products:null,
    pagination:null
}

const storeSlice = createSlice({
    name:"store-details",
    initialState:storeIntialValues,
    reducers:{
        setStoreDetails:(state,action)=>{
            state.store = action.payload
            const pageCount:Record<string,number> = {};
            state.store?.store_categories?.forEach((subCategorie)=>{
                pageCount[subCategorie!.id!.toString()] = 1
            })
            state.pageCountCategories = {...pageCount}
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

export const {setStoreDetails,clearStoreDetails,addStoreCategory,setCategoriesAndPagination,setPageForCategory,addStoreProduct} = storeSlice.actions
export const storeReducer = storeSlice.reducer