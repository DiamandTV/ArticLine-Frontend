import { createBrowserRouter } from "react-router-dom";
import { UserSignIn } from "../page/UserSignIn";
import { CompanySignIn } from "../page/CompanySignIn";
import { LogIn } from "../page/Login";
import { EmailAndResend } from "../page/EmailAndResend";
import { PasswordForget } from "../page/PasswordForget";
import { PasswordResetSend } from "../page/PasswordResetSend";
import { PasswordReset } from "../page/PasswordReset";
const router = createBrowserRouter([
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
    }
]);
export default router