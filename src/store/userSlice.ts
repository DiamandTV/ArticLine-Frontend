// ArticLine authentication slice

import { createSlice } from "@reduxjs/toolkit";
import { AuthModel } from "../models/auth";
import { UserProfileModel } from "../models/user";
import { CompanyProfileModel } from "../models/company";

export interface AuthSliceIntialValueProps {
    auth:AuthModel
}

const authSlice = createSlice({
    name:"Auth Slice",
    initialState:{
        profile:UserP
    },
    reducers:{

    }
})


