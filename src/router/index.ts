import { createBrowserRouter } from "react-router-dom";
import { UserSignIn } from "../page/UserSignIn";
import { CompanySignIn } from "../page/CompanySignIn";

const router = createBrowserRouter([
    { 
        path: "/user/signin", 
        element: UserSignIn(),
        
    },
    { 
        path: "/company/signin",
        element: CompanySignIn() 
    }
]);
export default router