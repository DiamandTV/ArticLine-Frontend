import { createBrowserRouter } from "react-router-dom";
import { UserSignIn } from "../page/UserSignIn";
import { CompanySignIn } from "../page/CompanySignIn";
import { LogIn } from "../page/login";
import { EmailAndResend } from "../page/EmailAndResend";
import { PasswordForget } from "../page/PasswordForget";
import { PasswordResetSend } from "../page/PasswordResetSend";
import { PasswordReset } from "../page/PasswordReset";
import { Main } from "../page/App/Main";
import { ProtectedRoute } from "./ProtectedRoute";
import { StoreForm } from "../components/forms/StoreForm";
const router = createBrowserRouter([
    // authenticated routes
    { 
        path: "/user/signin", 
        element: <UserSignIn/>,
        
    },
    { 
        path: "/company/signin",
        element:<CompanySignIn/> 
    },
    {
        path:"/login",
        element:<LogIn/>,
    },
    {
        path:"/email/verify/:id/:token",
        element:<EmailAndResend/>,
    },
    {
        path:"/password/reset",
        element:<PasswordForget/>
    },
    {
        path:"/password/reset-send",
        element:<PasswordResetSend/>
    },
    {
        path:"/password/reset/:token",
        element:<PasswordReset/>
    },
    // main app routes
    {
        path:"/",
        element:(
            <ProtectedRoute>
                <Main/>
            </ProtectedRoute>
        )
    },
    {
        path:"/create/store",
        element:<StoreForm/>
        
    }
]);
export default router