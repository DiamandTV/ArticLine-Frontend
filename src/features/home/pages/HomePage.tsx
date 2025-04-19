import { Container } from "react-bootstrap";
import { NavigationBar } from "../layout/NavBar/NavBar";
import { SearchField } from "../components/fields/SearchField/SearchField";

export function HomePage(){
    return(
        <div>
            <NavigationBar/>
            <SearchField/>
        </div>
    )
}