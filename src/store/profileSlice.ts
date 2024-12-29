import { createSlice } from "@reduxjs/toolkit";
import { UserProfileModel } from "../models/user";
import { CompanyProfileModel } from "../models/company";
import { StoreModel } from "../models/store";
import { DeviceModel } from "../models/Device";

export interface ProfileSliceModel{
    profile:UserProfileModel | CompanyProfileModel | null,
    notification:unknown,
    stores:Array<StoreModel>,
    devices:Array<DeviceModel>
}

const profileInitalState:ProfileSliceModel = {
    profile:null,
    notification:null,
    stores:[],
    devices:[]
}

const profileSlice = createSlice({
    name:'profile',
    initialState:profileInitalState,
    reducers:{
        setProfile:(state,action)=>{
            state.profile = action.payload.profile
        },
        setStores:(state,action)=>{
            state.stores = action.payload
        },
        addStore:(state,action)=>{
            state.stores = [...state.stores,action.payload]
        },
        updateStore:(state,action)=>{
            const storeToUpdate = action.payload as StoreModel
            state.stores = [...state.stores.map((store)=>{
                if(store.id === storeToUpdate.id){
                    return storeToUpdate
                }
                return store
            })] 
        },
        // deleteStoreCategory:(state,action)=>{
             
        // },
        deleteStore:(state,action)=>{
            const storeToDelete = action.payload as StoreModel
            state.stores = [...state.stores.filter((store)=>store.id!==storeToDelete.id)]
        },

        setDevices:(state,actions)=>{
            state.devices = [...actions.payload]
        }
    },
})

export const { setProfile,setStores,addStore,updateStore,deleteStore ,setDevices} = profileSlice.actions
export const profileReducer = profileSlice.reducer