import { createSlice } from "@reduxjs/toolkit";
import { CategoryModel } from "../models/category";

export interface CategorySliceModel{
    categories:Array<CategoryModel> | null,
}

const categorySliceInitialValue:CategorySliceModel = {
    categories:null
}

const categorySlice = createSlice({
    name:"category",
    initialState:categorySliceInitialValue,
    reducers:{
        setCategories:(state,action)=>{
            state.categories = [...action.payload]
        },
        clearCategory:(state,action)=>{
            state.categories = null
        }
    }
})

export const { setCategories,clearCategory } = categorySlice.actions
export const categoryReducer = categorySlice.reducer