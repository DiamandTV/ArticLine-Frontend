import { createBrowserRouter } from "react-router-dom";
import { UserSignIn } from "../page/UserSignIn";
import { CompanySignIn } from "../page/CompanySignIn";
import { LogIn } from "../page/login";
import { VerifyEmail } from "../page/VerifyEmail";
const router = createBrowserRouter([
    {
        path:"/email/verify/:id/:token",
        element:<VerifyEmail/>,
    },
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
   
]);
export default router