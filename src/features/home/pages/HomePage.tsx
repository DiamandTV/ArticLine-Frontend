import { NavigationBar } from "../../../layout/NavBar/NavBar";
import { CategoryList } from "../components/lists/Category/CategoryList";


export function HomePage(){
    return(
        <div>
            <NavigationBar/>
            <CategoryList/>
        </div>
    )
}