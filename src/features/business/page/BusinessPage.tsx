import { NavigationBar } from "src/layout/NavBar/NavBar";
import { BusinessBottomNavigation } from "../layout/BottomBar/BusinessBottomBar";

export function BusinessPage(){
    return(
        <div>
            <NavigationBar />
            <BusinessBottomNavigation/>
        </div>
    )
}