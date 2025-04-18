import { NavigationLoader } from "@components/loaders/NavigationLoader/NavigationLoader"
import { AuthenticationView } from "@features/autentication/view/AuthenticationView/AuthenticationView"
import { useLoaderData } from "react-router"

export function AuthVerificationStatusPage(){
    // typeof verification account type
    const result = useLoaderData()
    console.log(result)
    return(
        <NavigationLoader>
            <AuthenticationView>
                <div>
                    {
                        /*
                            todo: set the message of the password reset based on the status return byt the route loader
                        */
                    }                
                </div>
            </AuthenticationView>
        </NavigationLoader>
    )
}