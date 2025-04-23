import { autenticationFeatureRoutes } from "./router/router";
import { ProtectedRoute } from "./router/ProtectedRoute"; 
import { UnProtectedRoute } from "./router/UnProtectedRoute";
import {authReducer,authSliceActions} from "./slices/authSlice"
export {
    autenticationFeatureRoutes,
    ProtectedRoute,
    UnProtectedRoute,

    authReducer,
    authSliceActions,

}

