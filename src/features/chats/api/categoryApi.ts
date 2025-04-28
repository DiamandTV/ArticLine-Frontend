import { HOST_URL } from '@data/server'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const categoryApi = createApi({
    baseQuery:fetchBaseQuery({baseUrl:HOST_URL}),
    endpoints:(build)=>({

    }),
    
})