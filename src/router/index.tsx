import { createBrowserRouter } from "react-router-dom";
import { UserSignIn } from "../page/UserSignIn";
import { CompanySignIn } from "../page/CompanySignIn";
import { LogIn } from "../page/Login";
import { UnsignedRoute } from "./UnsignedRoute";
import { EmailAndResend } from "../page/EmailAndResend";
import { PasswordForget } from "../page/PasswordForget";
import { PasswordResetSend } from "../page/PasswordResetSend";
import { PasswordReset } from "../page/PasswordReset";
import { ProtectedRoute } from "./ProtectedRoute";
import { StoreCreate } from "../page/Store/StoreCreate";
import { Main } from "../page/App/Main";
import { Home } from "../page/Home/Home";
import { Store } from "../page/Store/Store";
import { StoreCategory } from "../page/Store/StoreCategory";
//import { ProductCreate } from "../page/Store/ProductCreate";
import { StoresCompany } from "../page/Store/CompanyStores";
import { Checkout } from "../page/Checkout/Checkout";
import { Carts } from "../page/Carts/Carts";
import { Orders } from "../page/Orders/Orders";
import { OrderDetail } from "../components/Order/OrderDetail";
import { OrdersCompany } from "../page/Orders/OrdersCompany";
import { CourierSignIn } from "../page/CourierSignIn";
import { ChooseSignIn } from "../page/ChooseSignIn"
import { Devices } from "../page/Devices/Devices";
import { OrdersCompanyBatch } from "../page/OrderBatch/OrdersCompanyBatch";
import { ActiveOrderBatchData } from "../page/OrderBatchData/ActiveOrderBatchData";
import { InActiveOrderBatchData } from "../page/OrderBatchData/InActiveOrderBatchData";
import { InActiveOrderData } from "../page/Order/InActiveOrderData";
import { ActiveOrderData } from "../page/Order/ActiveOrderData";
const router = createBrowserRouter([
    //{path:"/product",element:<ProductCreate/>},
    // main app routes
    {
        path:"",
        element:<ProtectedRoute/>,
        children:[
            {
                path:"",
                element:<Main/>,
                children:[
                    {path:"/",element:<Home/>},
                    {path:'store/create',element:<StoreCreate/>},
                    {path:'/store/list/company',element:<StoresCompany/>},
                    {
                        path:'store/details/:store-id/',
                        element:<Store/>,
                        children:[
                            {path:'sub-category/:sub-category-id',element:<StoreCategory/>}
                        ]
                    },
                    {
                        path:"carts",
                        element:<Carts/>,
                        children:[
                            {path:"checkout/payment/:cart-id",element:<Checkout/>}
                        ]
                    },
                    {
                        path:"orders",
                        element:<Orders/>,
                        children:[
                            {path:"details",element:<OrderDetail/>}
                        ]
                    },
                    {
                        path:"orders/company",
                        element:<OrdersCompany/>

                    },
                    {
                        path:"/orders/batch/company",
                        element:<OrdersCompanyBatch/>,
                    },
                    {
                        path:"/order/batch/:order-batch-id/active/data",
                        element:<ActiveOrderBatchData/>
                    },
                    {
                        path:"/order/batch/:order-batch-id/inactive/data",
                        element:<InActiveOrderBatchData/>
                    },
                    {
                         path:"/order/:order-id/inactive/data",
                         element:<InActiveOrderData/>
                     },
                     {
                         path:"/order/:order-id/active/data",
                         element:<ActiveOrderData/>
                    },
                    {
                        path:"devices/list/company",
                        element:<Devices/>
                    }
                    
                ]
            },

          
        ]
    },
    {
        path:"/",
        element:<UnsignedRoute/>,
        children:[
             // authenticated routes
                {
                    path:"choose/signin",
                    element:<ChooseSignIn/>
                },
                { 
                    path: "user/signin", 
                    element: <UserSignIn/>,
                    
                },
                {
                    path:"courier/signin",
                    element:<CourierSignIn/>
                },
                { 
                    path: "company/signin",
                    element:<CompanySignIn/> 
                },
                {
                    path:"login",
                    element:<LogIn/>,
                },
                {
                    path:"email/verify/:id/:token",
                    element:<EmailAndResend/>,
                },
                {
                    path:"password/reset",
                    element:<PasswordForget/>
                },
                {
                    path:"password/reset-send",
                    element:<PasswordResetSend/>
                },
                {
                    path:"password/reset/:token",
                    element:<PasswordReset/>
                },
        ]
    },
    
]);
export default router