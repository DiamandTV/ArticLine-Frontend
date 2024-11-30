// MAIN PAGE ACCOUNT
import { NavBar } from "../../components/NavBar/NavBar"
import { MainView } from "../../views/MainView"
import { NavBarType } from "../../components/NavBar/NavBarTypes"
import { SearchBar } from "../../components/SearchBar/SearchBar"
export function Main(){
    return (
        <MainView>
            <NavBar
                type={NavBarType.TITLE_AND_LOGO}
            />
            <SearchBar
                placeholder="SEARCH.."
            />
        </MainView>
    )
}