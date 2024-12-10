import { createSlice } from "@reduxjs/toolkit";
import { StoreModel } from "../models/store";
import { Product } from "../models/Product";
import { PaginationModel } from "../models/pagination";

export interface StoreDetailsModel{
    store:StoreModel | null,
    //productPage:number,
    products:Array<Product>|null,
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
        setCategoriesAndPagination:(state,action)=>{
            const pagination:PaginationModel = action.payload
            state.pagination = {...pagination}
            console.log(pagination.results)
            state.products = [...(pagination.results as Array<Product>)]
        },
        setPageForCategory:(state,action)=>{
            
            const storeCategoryID = action.payload.storeCategoryId
            state.pageCountCategories = {...state.pageCountCategories,[storeCategoryID]:action.payload.page} 
        },
    }
})

export const {setStoreDetails,clearStoreDetails,setCategoriesAndPagination,setPageForCategory} = storeSlice.actions
export const storeReducer = storeSlice.reducer