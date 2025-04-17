import { NavigationLoader } from "@components/loaders/NavigationLoader/NavigationLoader"
import { useLoaderData } from "react-router"

export function AuthVerificationStatusPage(){
    // typeof verification account type
    const result = useLoaderData()
    console.log(result)
    return(
        <NavigationLoader>
            <div>
                {
                    /*
                        todo: set the message of the password reset based on the status return byt the route loader
                    */
                }                
            </div>
        </NavigationLoader>
    )
}