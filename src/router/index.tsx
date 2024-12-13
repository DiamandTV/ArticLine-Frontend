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
import { ProductCreate } from "../page/Store/ProductCreate";
import { StoresCompany } from "../page/Store/CompanyStores";
const router = createBrowserRouter([
    {path:"/product",element:<ProductCreate/>},
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
                    path: "user/signin", 
                    element: <UserSignIn/>,
                    
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