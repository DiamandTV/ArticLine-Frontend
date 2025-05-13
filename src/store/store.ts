import { authReducer } from "@features/autentication"
import { cartReducer } from "@features/cart/slice/cartSlice"
import { configureStore } from "@reduxjs/toolkit"
export const store = configureStore({
    reducer:{
        authReducer,
        cartReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type StoreAsyncThunkConfig<Extra = unknown,RejectValue = unknown,SerializedErrorType = unknown,PendingMeta = unknown,FullFilledMeta = unknown,RejectedMeta = unknown> = {
    state:RootState,
    dispatch:AppDispatch,
    extra: Extra
    /** type to be passed into `rejectWithValue`'s first argument that will end up on `rejectedAction.payload` */
    rejectValue: RejectValue
    /** return type of the `serializeError` option callback */
    serializedErrorType: SerializedErrorType
    /** type to be returned from the `getPendingMeta` option callback & merged into `pendingAction.meta` */
    pendingMeta: PendingMeta
    /** type to be passed into the second argument of `fulfillWithValue` to finally be merged into `fulfilledAction.meta` */
    fulfilledMeta: FullFilledMeta
    /** type to be passed into the second argument of `rejectWithValue` to finally be merged into `rejectedAction.meta` */
    rejectedMeta: RejectedMeta
}